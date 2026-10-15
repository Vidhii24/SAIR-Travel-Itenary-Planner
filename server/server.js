import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DESTINATIONS, findDestination } from './data/destinations.js';
import { 
  generateItinerary, 
  generateRuleBasedItinerary, 
  optimizeBudgetBreakdown, 
  replaceActivityInPlan 
} from './services/itineraryEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory trips store for the server session (alongside client localStorage persistence)
let savedTripsStore = [];

// 1. Health & AI Capability Status
app.get('/api/health', (req, res) => {
  const hasAiKey = Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY);
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiConfigured: hasAiKey,
    activeEngine: hasAiKey ? 'AI Model (Gemini/OpenAI) + Rule-Based Fallback' : 'Transparent Rule-Based Recommendation Engine',
    destinationsCount: DESTINATIONS.length,
    savedTripsCount: savedTripsStore.length
  });
});

// 2. Destinations List & Filter
app.get('/api/destinations', (req, res) => {
  const { interest, style, budgetTier, search } = req.query;
  let results = [...DESTINATIONS];

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(s) || 
      d.state.toLowerCase().includes(s) || 
      d.tagline.toLowerCase().includes(s)
    );
  }

  if (interest) {
    results = results.filter(d => d.suitableInterests.includes(interest));
  }

  if (style) {
    results = results.filter(d => d.suitableStyles.includes(style));
  }

  if (budgetTier) {
    results = results.filter(d => d.budgetTier.toLowerCase() === budgetTier.toLowerCase());
  }

  res.json({
    count: results.length,
    destinations: results
  });
});

// 3. Single Destination Detail
app.get('/api/destinations/:id', (req, res) => {
  const dest = findDestination(req.params.id);
  if (!dest) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(dest);
});

// 4. Generate Personalized Itinerary
app.post('/api/itinerary/generate', async (req, res) => {
  try {
    const preferences = req.body || {};

    // Form Validation (Test Case 2: Missing Destination)
    if (!preferences.destination || typeof preferences.destination !== 'string' || !preferences.destination.trim()) {
      return res.status(400).json({ 
        error: 'Destination is required. Please specify where you would like to travel.' 
      });
    }

    // Date Validation (Test Case 3: Invalid Dates)
    if (preferences.departureDate && preferences.returnDate) {
      const dep = new Date(preferences.departureDate);
      const ret = new Date(preferences.returnDate);
      if (ret < dep) {
        return res.status(400).json({ 
          error: 'Invalid dates: Return date cannot be earlier than departure date.' 
        });
      }
    }

    // Budget Validation
    if (preferences.budget !== undefined && Number(preferences.budget) <= 0) {
      return res.status(400).json({
        error: 'Budget must be a positive amount in Indian Rupees.'
      });
    }

    // Duration Validation
    const durationDays = Number(preferences.durationDays) || 3;
    if (durationDays < 1 || durationDays > 30) {
      return res.status(400).json({
        error: 'Trip duration must be between 1 and 30 days.'
      });
    }

    const itinerary = await generateItinerary(preferences);
    res.json(itinerary);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ 
      error: 'Failed to generate itinerary. Falling back to default itinerary engine.',
      details: error.message 
    });
  }
});

// 5. Optimize Itinerary Budget
app.post('/api/itinerary/optimize', (req, res) => {
  try {
    const { currentPlan } = req.body;
    if (!currentPlan || !currentPlan.budgetSummary) {
      return res.status(400).json({ error: 'Valid current itinerary plan is required for optimization.' });
    }

    const optimizationResult = optimizeBudgetBreakdown(currentPlan);
    res.json(optimizationResult);
  } catch (error) {
    console.error('Error optimizing budget:', error);
    res.status(500).json({ error: 'Budget optimization error', details: error.message });
  }
});

// 6. Replace an Activity
app.post('/api/itinerary/replace-activity', (req, res) => {
  try {
    const { currentPlan, dayNumber, timeSlot, targetCategory } = req.body;
    if (!currentPlan || !dayNumber || !timeSlot) {
      return res.status(400).json({ error: 'currentPlan, dayNumber, and timeSlot are required.' });
    }

    const updatedPlan = replaceActivityInPlan(currentPlan, dayNumber, timeSlot, targetCategory);
    res.json(updatedPlan);
  } catch (error) {
    console.error('Error replacing activity:', error);
    res.status(500).json({ error: 'Failed to replace activity', details: error.message });
  }
});

// 7. Saved Trips Management (Persistence)
app.get('/api/trips', (req, res) => {
  res.json({
    count: savedTripsStore.length,
    trips: savedTripsStore
  });
});

app.post('/api/trips', (req, res) => {
  const newTrip = req.body;
  if (!newTrip || !newTrip.destination) {
    return res.status(400).json({ error: 'Trip destination and details are required.' });
  }

  const tripId = newTrip.tripId || `trip-${Date.now()}`;
  const savedTrip = {
    ...newTrip,
    tripId,
    createdAt: newTrip.createdAt || new Date().toISOString(),
    status: newTrip.status || 'Planned'
  };

  // Replace if exists, else append
  const existingIdx = savedTripsStore.findIndex(t => t.tripId === tripId);
  if (existingIdx !== -1) {
    savedTripsStore[existingIdx] = savedTrip;
  } else {
    savedTripsStore.unshift(savedTrip);
  }

  res.status(201).json({
    message: 'Trip saved successfully!',
    trip: savedTrip
  });
});

app.delete('/api/trips/:id', (req, res) => {
  const tripId = req.params.id;
  const initialLen = savedTripsStore.length;
  savedTripsStore = savedTripsStore.filter(t => t.tripId !== tripId);

  res.json({
    message: 'Trip deleted successfully.',
    deleted: savedTripsStore.length < initialLen,
    tripId
  });
});

app.listen(PORT, () => {
  console.log(`AI TravelMate Server listening on http://localhost:${PORT}`);
  console.log(`Active Engine: ${process.env.GEMINI_API_KEY ? 'Google Gemini AI' : 'Transparent Rule-Based Recommendation Engine'}`);
});
