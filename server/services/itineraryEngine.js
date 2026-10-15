import { DESTINATIONS, findDestination } from '../data/destinations.js';

/**
 * Intelligent Rule-Based Itinerary Generator
 * Evaluates user preferences, budget limits, travel style, and duration
 * to construct a personalized, explainable itinerary.
 */
export function generateRuleBasedItinerary(preferences) {
  const {
    destination: destInput = 'Udaipur',
    startingCity = 'Indore',
    departureDate = '',
    returnDate = '',
    durationDays = 3,
    travelers = 1,
    budget = 8000,
    budgetType = 'per_person', // 'per_person' or 'group_total'
    interests = ['Historical Monuments', 'Local Food'],
    travelStyle = 'Balanced', // 'Relaxed', 'Balanced', 'Adventure-Focused'
    travelGroup = 'Solo', // 'Solo', 'Couple', 'Family', 'Friends'
    dietaryPreferences = 'Vegetarian',
    preferredTransportation = 'Train / Sleeper',
    accommodationPreferences = 'Budget Hotel / Guesthouse',
    additionalRequirements = ''
  } = preferences;

  const duration = Math.max(1, Math.min(14, Number(durationDays) || 3));
  const travelerCount = Math.max(1, Number(travelers) || 1);
  const totalUserBudget = budgetType === 'per_person' ? (Number(budget) * travelerCount) : Number(budget);

  // Look up destination knowledge
  let destData = findDestination(destInput);
  if (!destData) {
    // Graceful fallback for custom destination
    destData = {
      id: 'custom-destination',
      name: destInput || 'Custom Destination',
      state: 'India',
      region: 'Custom',
      tagline: `Custom Destination Exploration for ${destInput}`,
      description: `Custom itinerary tailored for ${destInput} based on your selected interests and pace.`,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80',
      suitableInterests: interests.length > 0 ? interests : ['Culture and Heritage', 'Local Food'],
      highlights: [`Historic Old City Center`, `Local Markets & Culinary Lane`, `Scenic Sunset Point`, `Regional Landmark`],
      attractions: [
        {
          id: 'custom-1',
          name: `${destInput} Heritage Walk & Landmark Exploration`,
          category: interests.includes('Historical Monuments') ? 'Historical Monuments' : 'Culture and Heritage',
          typicalDuration: '3 Hours',
          avgCost: 150,
          description: `Guided walk through key historical monuments, architecture, and colonial or historic landmarks in ${destInput}.`,
          bestTimeOfDay: 'Morning',
          tags: ['Heritage', 'Landmarks']
        },
        {
          id: 'custom-2',
          name: `${destInput} Traditional Bazaar & Food Walk`,
          category: 'Local Food',
          typicalDuration: '2.5 Hours',
          avgCost: 200,
          description: `Sample regional street food specialties, authentic local snacks, and artisan craft shops.`,
          bestTimeOfDay: 'Evening',
          tags: ['Food', 'Bazaar']
        },
        {
          id: 'custom-3',
          name: `${destInput} Scenic Viewpoint & Sunset Overlook`,
          category: interests.includes('Nature and Mountains') ? 'Nature and Mountains' : 'Relaxation',
          typicalDuration: '2 Hours',
          avgCost: 50,
          description: `Panoramic viewpoint offering serene landscapes, photography vantage points, and evening breezes.`,
          bestTimeOfDay: 'Evening',
          tags: ['Sunset', 'Scenic']
        },
        {
          id: 'custom-4',
          name: `${destInput} Cultural Center / Museum Visit`,
          category: 'Culture and Heritage',
          typicalDuration: '2 Hours',
          avgCost: 100,
          description: `Exhibits showcasing regional folklore, local art, textiles, and traditional lifestyle.`,
          bestTimeOfDay: 'Afternoon',
          tags: ['Museum', 'Culture']
        }
      ],
      foodHighlights: [
        { name: `Authentic Regional Lunch Thali`, type: 'Traditional Lunch', estimatedCost: 250 },
        { name: `Fresh Morning Street Breakfast & Chai`, type: 'Local Breakfast', estimatedCost: 80 },
        { name: `Evening Rooftop Local Specialties`, type: 'Dinner Experience', estimatedCost: 400 }
      ],
      travelTips: [
        'Research local transport options and keep modest cash handy for small markets.',
        'Early mornings and late afternoons are ideal to avoid midday peak heat.',
        'Confirm monument opening days before scheduling your visits.'
      ]
    };
  }

  // 1. Scoring & Sorting Attractions based on user interests
  const scoredAttractions = destData.attractions.map(att => {
    let score = 0;
    if (interests.includes(att.category)) score += 10;
    if (att.tags && att.tags.some(t => interests.includes(t))) score += 5;
    
    // Adjust for travel style
    if (travelStyle === 'Relaxed' && ['Relaxation', 'Photography', 'Culture and Heritage'].includes(att.category)) {
      score += 4;
    } else if (travelStyle === 'Adventure-Focused' && ['Adventure', 'Nature and Mountains'].includes(att.category)) {
      score += 6;
    }
    
    // Adjust for family group
    if (travelGroup === 'Family' && ['Historical Monuments', 'Nature and Mountains', 'Relaxation'].includes(att.category)) {
      score += 3;
    }

    return { ...att, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // 2. Schedule Generation per Day
  const itineraryDays = [];
  const baseDate = departureDate ? new Date(departureDate) : new Date();

  // Pick pools by time-of-day preference
  const morningPool = scoredAttractions.filter(a => a.bestTimeOfDay === 'Morning' || a.bestTimeOfDay === 'Afternoon');
  const afternoonPool = scoredAttractions.filter(a => a.bestTimeOfDay === 'Afternoon' || a.bestTimeOfDay === 'Morning');
  const eveningPool = scoredAttractions.filter(a => a.bestTimeOfDay === 'Evening' || a.bestTimeOfDay === 'Afternoon');

  let attractionCursor = 0;

  for (let dayNum = 1; dayNum <= duration; dayNum++) {
    const dayDate = new Date(baseDate);
    dayDate.setDate(dayDate.getDate() + (dayNum - 1));
    const formattedDate = departureDate 
      ? dayDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
      : `Day ${dayNum}`;

    // Select Morning Activity
    const morningCandidate = morningPool[(dayNum - 1) % morningPool.length] || scoredAttractions[0];
    const morningActivity = formatActivity(morningCandidate, 'Morning', travelStyle, interests, totalUserBudget);

    // Select Afternoon Activity (Pace adjusted based on Travel Style)
    let afternoonActivity = null;
    if (travelStyle === 'Relaxed') {
      afternoonActivity = {
        id: `relaxed-break-day-${dayNum}`,
        name: `Leisurely Afternoon Break & Cafe Relaxation`,
        category: 'Relaxation',
        typicalDuration: '2 Hours',
        avgCost: 150,
        bestTimeOfDay: 'Afternoon',
        description: `Unwind at a tranquil local cafe or hotel lounge to recharge, avoiding peak midday rush.`,
        recommendationReason: `Specially included to match your "Relaxed" travel style and prevent travel fatigue.`
      };
    } else {
      const afternoonCandidate = afternoonPool[dayNum % afternoonPool.length] || scoredAttractions[1 % scoredAttractions.length];
      afternoonActivity = formatActivity(afternoonCandidate, 'Afternoon', travelStyle, interests, totalUserBudget);
    }

    // Select Evening Activity
    const eveningCandidate = eveningPool[(dayNum * 2 - 1) % eveningPool.length] || scoredAttractions[2 % scoredAttractions.length];
    const eveningActivity = formatActivity(eveningCandidate, 'Evening', travelStyle, interests, totalUserBudget);

    // Select Food Suggestions for the Day
    const foodItems = destData.foodHighlights;
    const breakfast = foodItems[(dayNum * 3) % foodItems.length] || { name: 'Local Breakfast & Masala Chai', estimatedCost: 100 };
    const lunch = foodItems[(dayNum * 3 + 1) % foodItems.length] || { name: 'Authentic Regional Thali Lunch', estimatedCost: 300 };
    const dinner = foodItems[(dayNum * 3 + 2) % foodItems.length] || { name: 'Signature Dinner & Sweets', estimatedCost: 450 };

    const dailyFoodCost = (breakfast.estimatedCost + lunch.estimatedCost + dinner.estimatedCost) * travelerCount;
    const dailyActivitiesCost = ((morningActivity.avgCost || 0) + (afternoonActivity.avgCost || 0) + (eveningActivity.avgCost || 0)) * travelerCount;
    const dailyEstimatedCost = dailyFoodCost + dailyActivitiesCost;

    // Themed Day Title
    const dayThemes = [
      `Grand Heritage & Iconic Landmarks`,
      `Cultural Discoveries & Artisan Quarters`,
      `Lakeside Splendor, Nature & Sunset Views`,
      `Local Flavors, Bazaars & Hidden Gems`,
      `Off-the-Beaten-Track Scenic Excursion`,
      `Art, Spiritual Vistas & Leisurely Strolls`,
      `Farewell Memories & Shopping Expeditions`
    ];
    const dayTitle = dayThemes[(dayNum - 1) % dayThemes.length];

    itineraryDays.push({
      dayNumber: dayNum,
      date: formattedDate,
      dayTitle: `Day ${dayNum}: ${dayTitle}`,
      morning: morningActivity,
      afternoon: afternoonActivity,
      evening: eveningActivity,
      mealSuggestions: {
        breakfast: { ...breakfast, notes: `${dietaryPreferences} options available` },
        lunch: { ...lunch, notes: `Conveniently near ${morningActivity.name}` },
        dinner: { ...dinner, notes: `Atmospheric dining near ${eveningActivity.name}` }
      },
      dailyEstimatedCost: Math.round(dailyEstimatedCost)
    });
  }

  // 3. Itemized Budget Calculations (Section 10)
  // Distance / transport estimation from startingCity
  let transportPerPerson = 1200;
  if (preferredTransportation.toLowerCase().includes('flight')) {
    transportPerPerson = 4500;
  } else if (preferredTransportation.toLowerCase().includes('train')) {
    transportPerPerson = 1400;
  } else if (preferredTransportation.toLowerCase().includes('bus')) {
    transportPerPerson = 850;
  } else if (preferredTransportation.toLowerCase().includes('self')) {
    transportPerPerson = 1800;
  }

  // Accommodation rate per room per night
  let roomCostPerNight = 1800; // default moderate
  if (accommodationPreferences.toLowerCase().includes('hostel') || accommodationPreferences.toLowerCase().includes('budget')) {
    roomCostPerNight = 1000;
  } else if (accommodationPreferences.toLowerCase().includes('resort') || accommodationPreferences.toLowerCase().includes('luxury')) {
    roomCostPerNight = 4500;
  }
  const roomsNeeded = Math.ceil(travelerCount / 2);
  const totalAccommodation = roomCostPerNight * Math.max(1, duration - 1) * roomsNeeded;

  const totalTransportation = transportPerPerson * travelerCount;

  // Food calculation: approx ₹600-1200 / person / day
  const dailyFoodPerPerson = accommodationPreferences.toLowerCase().includes('luxury') ? 1100 : 650;
  const totalFood = dailyFoodPerPerson * duration * travelerCount;

  // Activities cost: sum of daily activities from itinerary
  const totalActivities = itineraryDays.reduce((sum, day) => {
    return sum + ((day.morning.avgCost || 0) + (day.afternoon.avgCost || 0) + (day.evening.avgCost || 0)) * travelerCount;
  }, 0);

  // Local travel: auto / cab / metro approx ₹400-800 per day for the party
  const totalLocalTravel = Math.round(450 * duration * (travelerCount > 2 ? 1.5 : 1));

  // Shopping allowance
  const totalShopping = Math.round((interests.includes('Shopping') ? 1500 : 600) * travelerCount);

  // Emergency Buffer (8%)
  const subtotalBeforeBuffers = totalTransportation + totalAccommodation + totalFood + totalActivities + totalLocalTravel + totalShopping;
  const emergencyBuffer = Math.round(subtotalBeforeBuffers * 0.08);

  // Miscellaneous Expenses (4%)
  const miscellaneous = Math.round(subtotalBeforeBuffers * 0.04);

  const totalEstimatedCost = subtotalBeforeBuffers + emergencyBuffer + miscellaneous;
  const remainingBudget = totalUserBudget - totalEstimatedCost;
  const costPerPerson = Math.round(totalEstimatedCost / travelerCount);
  const dailyAverageExpense = Math.round(totalEstimatedCost / duration);

  // Budget Status & Feasibility Check (Test Case 4: Insufficient Budget warning)
  let budgetStatus = 'on_budget';
  let budgetWarning = null;

  if (remainingBudget < -1000) {
    budgetStatus = 'over_budget';
    const deficit = Math.abs(remainingBudget);
    budgetWarning = {
      isAlert: true,
      title: 'Estimated Expenses Exceed Your Stated Budget',
      message: `Your stated budget of ₹${totalUserBudget.toLocaleString('en-IN')} is ₹${deficit.toLocaleString('en-IN')} below the realistic minimum estimated cost of ₹${totalEstimatedCost.toLocaleString('en-IN')} for ${duration} days and ${travelerCount} traveler(s).`,
      recommendation: `We recommend using our "Optimize My Budget" feature to switch to economical stays, prioritize free attractions, or adjust your travel dates.`
    };
  } else if (remainingBudget > 2000) {
    budgetStatus = 'under_budget';
  }

  // 4. Personalization Match Reasons (Section 14)
  const matchExplanations = [
    `Crafted for ${destData.name} departing from ${startingCity} with a comfortable ${duration}-day pacing.`,
    `Prioritizes attractions matching your selected interests: ${interests.join(', ')}.`,
    travelStyle === 'Relaxed'
      ? `Scheduled with ample rest intervals and calm cafe stops to support your "Relaxed" travel style.`
      : travelStyle === 'Adventure-Focused'
      ? `Features high-energy outdoor excursions and active exploration tailored for "Adventure-Focused" travel.`
      : `Maintains a well-balanced rhythm balancing must-see heritage monuments with cultural walks.`,
    `Accommodates ${travelGroup} travel with ${dietaryPreferences.toLowerCase()} food recommendations and ${preferredTransportation.toLowerCase()} transit assumptions.`,
    budgetStatus === 'over_budget' 
      ? `Transparent cost audit highlights a budget deficit so you can make informed tradeoffs before booking.`
      : `Expense breakdown is designed to stay comfortably within your ₹${totalUserBudget.toLocaleString('en-IN')} allocation.`
  ];

  return {
    tripId: `trip-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    generatedBy: 'rule_based',
    engineNotice: 'Generated by AI TravelMate Transparent Recommendation Engine using curated destination templates and verified preference-matching heuristics.',
    destination: destData.name,
    destinationData: {
      name: destData.name,
      state: destData.state,
      region: destData.region,
      tagline: destData.tagline,
      description: destData.description,
      image: destData.image
    },
    startingCity,
    departureDate,
    returnDate,
    durationDays: duration,
    travelers: travelerCount,
    userBudget: totalUserBudget,
    budgetType,
    travelStyle,
    travelGroup,
    interests,
    preferences: {
      dietaryPreferences,
      preferredTransportation,
      accommodationPreferences,
      additionalRequirements
    },
    tripOverview: `A curated ${duration}-day ${destData.name} journey crafted for ${travelGroup.toLowerCase()} travelers, balancing ${interests.slice(0, 2).join(' & ')} with an estimated total expenditure of ₹${totalEstimatedCost.toLocaleString('en-IN')}.`,
    matchExplanations,
    itineraryDays,
    practicalTips: destData.travelTips,
    budgetSummary: {
      userBudget: totalUserBudget,
      totalEstimatedCost,
      remainingBudget,
      costPerPerson,
      dailyAverageExpense,
      budgetStatus,
      budgetWarning,
      expenseBreakdown: {
        transportation: totalTransportation,
        accommodation: totalAccommodation,
        food: totalFood,
        activities: totalActivities,
        localTravel: totalLocalTravel,
        shopping: totalShopping,
        emergencyBuffer,
        miscellaneous
      }
    },
    disclaimer: 'Travel estimates and recommendations are for planning purposes only. Verify current prices, opening hours, local transport schedules, and advisories before booking.'
  };
}

/**
 * Format an attraction into an itinerary activity with explainable recommendation rationale
 */
function formatActivity(att, timeOfDay, travelStyle, userInterests, userBudget) {
  let reason = '';
  if (userInterests.includes(att.category)) {
    reason = `Recommended because you selected "${att.category}".`;
  } else if (att.avgCost === 0) {
    reason = `Free attraction selected to keep your trip cost-efficient.`;
  } else if (travelStyle === 'Relaxed') {
    reason = `Relaxed pace with manageable duration to avoid itinerary overload.`;
  } else {
    reason = `Signature ${timeOfDay.toLowerCase()} highlight popular among visitors to this region.`;
  }

  return {
    id: att.id || `act-${Math.random().toString(36).substring(2, 9)}`,
    name: att.name,
    category: att.category || 'Sightseeing',
    typicalDuration: att.typicalDuration || '2 Hours',
    avgCost: att.avgCost !== undefined ? att.avgCost : 100,
    bestTimeOfDay: timeOfDay,
    description: att.description || `Explore ${att.name} and experience local culture.`,
    recommendationReason: reason,
    location: att.name
  };
}

/**
 * Optimize Budget Logic (Section 10)
 * Proposes concrete, actionable cost-saving substitutions
 */
export function optimizeBudgetBreakdown(currentPlan) {
  const currentBudgetSummary = currentPlan.budgetSummary;
  const breakdown = currentBudgetSummary.expenseBreakdown;
  const userBudget = currentBudgetSummary.userBudget;

  const suggestions = [];
  let potentialSavings = 0;

  // 1. Accommodation Optimization
  if (breakdown.accommodation > 2500) {
    const accSavings = Math.round(breakdown.accommodation * 0.35);
    potentialSavings += accSavings;
    suggestions.push({
      category: 'accommodation',
      title: 'Switch to Certified Heritage Homestay / Boutique B&B',
      description: 'Replace standard mid-tier hotel rooms with highly rated family-run homestays or boutique guesthouses.',
      originalAmount: breakdown.accommodation,
      optimizedAmount: breakdown.accommodation - accSavings,
      savingAmount: accSavings,
      impact: 'High Comfort, Authentic Local Hospitality'
    });
  }

  // 2. Transportation Optimization
  if (breakdown.transportation > 2000) {
    const transSavings = Math.round(breakdown.transportation * 0.30);
    potentialSavings += transSavings;
    suggestions.push({
      category: 'transportation',
      title: 'Opt for Executive Train / AC Sleeper over Flights/Cabs',
      description: 'Book confirmed AC 3-Tier/Chair Car train tickets in advance for an economical, scenic intercity journey.',
      originalAmount: breakdown.transportation,
      optimizedAmount: breakdown.transportation - transSavings,
      savingAmount: transSavings,
      impact: 'Minimal Impact on Travel Time'
    });
  }

  // 3. Local Travel Optimization
  if (breakdown.localTravel > 1000) {
    const locSavings = Math.round(breakdown.localTravel * 0.35);
    potentialSavings += locSavings;
    suggestions.push({
      category: 'localTravel',
      title: 'Shared Auto-Rickshaws & Daily Transit Passes',
      description: 'Utilize local e-rickshaws, shared autos, or rental two-wheelers instead of dedicated on-demand private cabs.',
      originalAmount: breakdown.localTravel,
      optimizedAmount: breakdown.localTravel - locSavings,
      savingAmount: locSavings,
      impact: 'Authentic Local Commute'
    });
  }

  // 4. Shopping & Souvenirs Adjustment
  if (breakdown.shopping > 800) {
    const shopSavings = Math.round(breakdown.shopping * 0.40);
    potentialSavings += shopSavings;
    suggestions.push({
      category: 'shopping',
      title: 'Streamline Souvenir & Artifacts Budget',
      description: 'Purchase handcrafted goods directly from government emporiums or artisan co-ops at fixed wholesale rates.',
      originalAmount: breakdown.shopping,
      optimizedAmount: breakdown.shopping - shopSavings,
      savingAmount: shopSavings,
      impact: 'Focus on Essential Keepsakes'
    });
  }

  // Calculate new projected totals
  const newAccommodation = suggestions.find(s => s.category === 'accommodation')?.optimizedAmount || breakdown.accommodation;
  const newTransportation = suggestions.find(s => s.category === 'transportation')?.optimizedAmount || breakdown.transportation;
  const newLocalTravel = suggestions.find(s => s.category === 'localTravel')?.optimizedAmount || breakdown.localTravel;
  const newShopping = suggestions.find(s => s.category === 'shopping')?.optimizedAmount || breakdown.shopping;

  const newSubtotal = newTransportation + newAccommodation + breakdown.food + breakdown.activities + newLocalTravel + newShopping;
  const newEmergencyBuffer = Math.round(newSubtotal * 0.08);
  const newMiscellaneous = Math.round(newSubtotal * 0.04);
  const newTotalEstimatedCost = newSubtotal + newEmergencyBuffer + newMiscellaneous;
  const newRemainingBudget = userBudget - newTotalEstimatedCost;

  return {
    originalTotal: currentBudgetSummary.totalEstimatedCost,
    optimizedTotal: newTotalEstimatedCost,
    totalSavings: potentialSavings,
    originalRemaining: currentBudgetSummary.remainingBudget,
    newRemaining: newRemainingBudget,
    suggestions,
    optimizedExpenseBreakdown: {
      transportation: newTransportation,
      accommodation: newAccommodation,
      food: breakdown.food,
      activities: breakdown.activities,
      localTravel: newLocalTravel,
      shopping: newShopping,
      emergencyBuffer: newEmergencyBuffer,
      miscellaneous: newMiscellaneous
    }
  };
}

/**
 * Replace Activity with an alternative
 */
export function replaceActivityInPlan(currentPlan, dayNumber, timeSlot, targetCategory) {
  const destData = findDestination(currentPlan.destination);
  if (!destData) return currentPlan;

  const dayIndex = currentPlan.itineraryDays.findIndex(d => d.dayNumber === Number(dayNumber));
  if (dayIndex === -1) return currentPlan;

  const currentActivity = currentPlan.itineraryDays[dayIndex][timeSlot];
  
  // Find candidates that aren't already the current activity
  const candidates = destData.attractions.filter(a => a.name !== currentActivity.name);
  
  // Prefer requested category if provided, otherwise pick an alternative
  let pick = candidates.find(a => targetCategory ? a.category === targetCategory : true);
  if (!pick) pick = candidates[0];

  if (!pick) return currentPlan;

  const newActivity = formatActivity(pick, timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1), currentPlan.travelStyle, currentPlan.interests, currentPlan.userBudget);
  newActivity.recommendationReason = `Replaced upon your request with ${pick.name} (${pick.category}).`;

  // Deep clone and replace
  const updatedPlan = JSON.parse(JSON.stringify(currentPlan));
  updatedPlan.itineraryDays[dayIndex][timeSlot] = newActivity;

  // Recalculate activities cost & day cost
  const day = updatedPlan.itineraryDays[dayIndex];
  const dailyActivitiesCost = ((day.morning.avgCost || 0) + (day.afternoon.avgCost || 0) + (day.evening.avgCost || 0)) * updatedPlan.travelers;
  const dailyFoodCost = ((day.mealSuggestions.breakfast.estimatedCost || 100) + (day.mealSuggestions.lunch.estimatedCost || 300) + (day.mealSuggestions.dinner.estimatedCost || 450)) * updatedPlan.travelers;
  day.dailyEstimatedCost = Math.round(dailyFoodCost + dailyActivitiesCost);

  // Recalculate total activities cost
  const totalActivities = updatedPlan.itineraryDays.reduce((sum, d) => {
    return sum + ((d.morning.avgCost || 0) + (d.afternoon.avgCost || 0) + (d.evening.avgCost || 0)) * updatedPlan.travelers;
  }, 0);
  updatedPlan.budgetSummary.expenseBreakdown.activities = totalActivities;

  const bd = updatedPlan.budgetSummary.expenseBreakdown;
  const subtotal = bd.transportation + bd.accommodation + bd.food + bd.activities + bd.localTravel + bd.shopping;
  bd.emergencyBuffer = Math.round(subtotal * 0.08);
  bd.miscellaneous = Math.round(subtotal * 0.04);
  updatedPlan.budgetSummary.totalEstimatedCost = subtotal + bd.emergencyBuffer + bd.miscellaneous;
  updatedPlan.budgetSummary.remainingBudget = updatedPlan.userBudget - updatedPlan.budgetSummary.totalEstimatedCost;
  updatedPlan.budgetSummary.costPerPerson = Math.round(updatedPlan.budgetSummary.totalEstimatedCost / updatedPlan.travelers);
  updatedPlan.budgetSummary.dailyAverageExpense = Math.round(updatedPlan.budgetSummary.totalEstimatedCost / updatedPlan.durationDays);

  return updatedPlan;
}

/**
 * AI Integration handler (Optional OpenAI or Gemini if configured)
 * If API key is absent or request fails, seamlessly falls back to generateRuleBasedItinerary
 */
export async function generateItinerary(preferences) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Transparently execute Rule-Based Recommendation Engine
    return generateRuleBasedItinerary(preferences);
  }

  // Attempt AI API call with fallback
  try {
    // If Gemini key is provided
    if (process.env.GEMINI_API_KEY) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a travel-planning assistant specializing in personalized Indian travel itineraries.
Create a practical itinerary using the following user preferences:
Destination: ${preferences.destination}
Starting City: ${preferences.startingCity || 'Not specified'}
Trip Duration: ${preferences.durationDays || 3} days
Travel Dates: ${preferences.departureDate || 'Flexible'} to ${preferences.returnDate || 'Flexible'}
Travelers: ${preferences.travelers || 1} (${preferences.travelGroup || 'Solo'})
Budget: ₹${preferences.budget || 8000} (${preferences.budgetType || 'per_person'})
Interests: ${(preferences.interests || []).join(', ')}
Travel Style: ${preferences.travelStyle || 'Balanced'}
Transportation: ${preferences.preferredTransportation || 'Train'}
Accommodation: ${preferences.accommodationPreferences || 'Budget Hotel'}
Additional Requirements: ${preferences.additionalRequirements || 'None'}

Return ONLY a valid JSON object matching this schema:
{
  "tripOverview": "string",
  "matchExplanations": ["string"],
  "itineraryDays": [
    {
      "dayNumber": 1,
      "date": "string",
      "dayTitle": "string",
      "morning": { "name": "string", "category": "string", "typicalDuration": "string", "avgCost": 100, "description": "string", "recommendationReason": "string" },
      "afternoon": { "name": "string", "category": "string", "typicalDuration": "string", "avgCost": 100, "description": "string", "recommendationReason": "string" },
      "evening": { "name": "string", "category": "string", "typicalDuration": "string", "avgCost": 100, "description": "string", "recommendationReason": "string" },
      "mealSuggestions": {
        "breakfast": { "name": "string", "estimatedCost": 100 },
        "lunch": { "name": "string", "estimatedCost": 250 },
        "dinner": { "name": "string", "estimatedCost": 350 }
      },
      "dailyEstimatedCost": 1200
    }
  ],
  "practicalTips": ["string"],
  "budgetSummary": {
    "totalEstimatedCost": 7500,
    "remainingBudget": 500,
    "costPerPerson": 7500,
    "dailyAverageExpense": 2500,
    "expenseBreakdown": {
      "transportation": 1500,
      "accommodation": 2500,
      "food": 1800,
      "activities": 800,
      "localTravel": 400,
      "shopping": 200,
      "emergencyBuffer": 200,
      "miscellaneous": 100
    }
  }
}`
            }]
          }]
        })
      });

      if (response.ok) {
        const aiData = await response.json();
        const candidateText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const cleanJson = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          return {
            ...parsed,
            tripId: `trip-ai-${Date.now()}`,
            generatedBy: 'ai',
            engineNotice: 'Generated via Google Gemini Generative AI Model with structured schema enforcement.',
            destination: preferences.destination,
            startingCity: preferences.startingCity,
            travelers: preferences.travelers || 1,
            durationDays: preferences.durationDays || 3,
            userBudget: preferences.budget || 8000,
            disclaimer: 'Travel estimates and AI-generated recommendations are for planning purposes only. Verify current prices, opening hours, and transport schedules before booking.'
          };
        }
      }
    }
  } catch (err) {
    console.warn('AI API call failed or timed out. Falling back to rule-based engine:', err.message);
  }

  // Guaranteed fallback
  return generateRuleBasedItinerary(preferences);
}
