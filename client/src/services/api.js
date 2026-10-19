// Frontend API client with seamless backend connection and offline fallback

const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline_mode',
      activeEngine: 'Client-Side Rule-Based Recommendation Engine (Offline Mode)',
      aiConfigured: false
    };
  }
}

export async function fetchDestinations(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/destinations?${query}`);
    if (!res.ok) throw new Error('Failed to fetch destinations');
    return await res.json();
  } catch (err) {
    console.warn('API error, using fallback destinations', err);
    return { count: FALLBACK_DESTINATIONS.length, destinations: FALLBACK_DESTINATIONS };
  }
}

export async function generateItineraryApi(preferences) {
  try {
    const res = await fetch(`${API_BASE}/itinerary/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences)
    });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, generating via client-side engine:', err.message);
    return generateClientSideItinerary(preferences);
  }
}

export async function optimizeBudgetApi(currentPlan) {
  try {
    const res = await fetch(`${API_BASE}/itinerary/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPlan })
    });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) {
      throw new Error(`Server returned ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    // Client-side fallback optimization
    return calculateClientOptimization(currentPlan);
  }
}

export async function replaceActivityApi(currentPlan, dayNumber, timeSlot, targetCategory) {
  try {
    const res = await fetch(`${API_BASE}/itinerary/replace-activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPlan, dayNumber, timeSlot, targetCategory })
    });
    if (!res.ok) throw new Error('Replace activity failed');
    return await res.json();
  } catch (err) {
    // Client fallback
    return currentPlan;
  }
}

// Client Storage for My Trips (persisting both in localStorage and API)
export function getSavedTrips() {
  try {
    const stored = localStorage.getItem('ai_travelmate_trips');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function saveTripToStorage(trip) {
  const existing = getSavedTrips();
  const index = existing.findIndex(t => t.tripId === trip.tripId);
  let updated;
  if (index !== -1) {
    updated = existing.map(t => t.tripId === trip.tripId ? trip : t);
  } else {
    updated = [trip, ...existing];
  }
  localStorage.setItem('ai_travelmate_trips', JSON.stringify(updated));

  // Sync with server if online
  fetch(`${API_BASE}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  }).catch(() => {});

  return updated;
}

export function deleteTripFromStorage(tripId) {
  const existing = getSavedTrips();
  const updated = existing.filter(t => t.tripId !== tripId);
  localStorage.setItem('ai_travelmate_trips', JSON.stringify(updated));

  fetch(`${API_BASE}/trips/${tripId}`, { method: 'DELETE' }).catch(() => {});
  return updated;
}

// User Profile Storage
export function getUserProfile() {
  try {
    const stored = localStorage.getItem('ai_travelmate_profile');
    return stored ? JSON.parse(stored) : {
      displayName: 'Aarav Sharma',
      startingCity: 'Indore',
      travelStyle: 'Balanced',
      typicalBudget: 10000,
      favoriteInterests: ['Historical Monuments', 'Local Food', 'Culture and Heritage'],
      accommodationType: 'Budget Hotel / Guesthouse',
      dietaryPreferences: 'Vegetarian',
      preferredTransportation: 'Train / Sleeper'
    };
  } catch (e) {
    return {
      displayName: 'Guest Traveler',
      startingCity: 'Indore',
      travelStyle: 'Balanced',
      typicalBudget: 8000,
      favoriteInterests: ['Historical Monuments', 'Local Food'],
      accommodationType: 'Budget Hotel / Guesthouse',
      dietaryPreferences: 'Vegetarian',
      preferredTransportation: 'Train / Sleeper'
    };
  }
}

export function saveUserProfile(profile) {
  localStorage.setItem('ai_travelmate_profile', JSON.stringify(profile));
}

// Client fallback data
export const FALLBACK_DESTINATIONS = [
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North-West',
    tagline: 'The City of Lakes & Royal Palaces',
    description: 'Renowned for its lavish royal residences, serene lakes, marble palaces, and rich Mewar history.',
    image: '/images/udaipur.jpg',
    suitableInterests: ['Historical Monuments', 'Culture and Heritage', 'Local Food', 'Photography', 'Relaxation'],
    suitableStyles: ['Relaxed', 'Balanced'],
    typicalDurationDays: 3,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2400,
    highlights: ['City Palace', 'Lake Pichola Boat Ride', 'Saheliyon-ki-Bari', 'Bagore Ki Haveli Folk Dance', 'Jag Mandir']
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North-West',
    tagline: 'The Pink City of Royal Fortresses',
    description: 'Capital of Rajasthan featuring UNESCO World Heritage hill forts, astronomical observatories, and vibrant spice and gemstone bazaars.',
    image: '/images/jaipur.jpg',
    suitableInterests: ['Historical Monuments', 'Culture and Heritage', 'Local Food', 'Shopping', 'Photography'],
    suitableStyles: ['Balanced', 'Relaxed'],
    typicalDurationDays: 3,
    budgetTier: 'Budget-friendly',
    avgDailyCostPerPerson: 2100,
    highlights: ['Amber Palace', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort Sunset']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    region: 'South-Coast',
    tagline: 'God’s Own Country: Munnar Hills & Alleppey Backwaters',
    description: 'Emerald tropical paradise acclaimed for tranquil palm-fringed backwaters, rolling tea estates, Ayurvedic wellness, and spice-laden cuisine.',
    image: '/images/kerala.jpg',
    suitableInterests: ['Nature and Mountains', 'Relaxation', 'Local Food', 'Photography', 'Culture and Heritage'],
    suitableStyles: ['Relaxed', 'Balanced'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2900,
    highlights: ['Alleppey Houseboat Cruise', 'Munnar Tea Plantations', 'Kathakali Dance Performance', 'Fort Kochi Heritage', 'Periyar Spice Walk']
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North-Himalayas',
    tagline: 'Snow-Capped Peaks, Pine Valleys & High Passes',
    description: 'Picturesque Himalayan hill town nestled in the Beas River valley, serving as the adventure capital of Himachal Pradesh.',
    image: '/images/manali.jpg',
    suitableInterests: ['Nature and Mountains', 'Adventure', 'Relaxation', 'Photography', 'Local Food'],
    suitableStyles: ['Adventure-Focused', 'Balanced'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2300,
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali Cafes', 'Jogini Waterfalls Trek']
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West-Coast',
    tagline: 'Sun, Sand, Seafood & Portuguese Heritage',
    description: 'India’s premier coastal paradise blending golden Arabian Sea beaches, colonial churches, water sports, and laid-back susegad lifestyle.',
    image: '/images/goa.jpg',
    suitableInterests: ['Beaches', 'Adventure', 'Nightlife', 'Relaxation', 'Local Food', 'Culture and Heritage'],
    suitableStyles: ['Relaxed', 'Balanced', 'Adventure-Focused'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2800,
    highlights: ['Baga & Anjuna Beaches', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Fontainhas Latin Quarter', 'Aguada Fort']
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North-Himalayas',
    tagline: 'Yoga Capital of the World & Ganga River Rafting',
    description: 'Spiritual haven at the foothills of the Himalayas where the emerald Ganges flows, famous for whitewater rafting, ashrams, and Ganga Aarti.',
    image: '/images/rishikesh.jpg',
    suitableInterests: ['Adventure', 'Spiritual Places', 'Nature and Mountains', 'Relaxation', 'Culture and Heritage'],
    suitableStyles: ['Balanced', 'Adventure-Focused', 'Relaxed'],
    typicalDurationDays: 3,
    budgetTier: 'Budget-friendly',
    avgDailyCostPerPerson: 1800,
    highlights: ['Ganges River Rafting', 'Triveni Ghat Evening Aarti', 'Beatles Ashram', 'Lakshman Jhula', 'Neer Garh Waterfall']
  }
];

function generateClientSideItinerary(pref) {
  const destName = pref.destination || 'Udaipur';
  const duration = Number(pref.durationDays) || 3;
  const travelers = Number(pref.travelers) || 1;
  const totalBudget = (pref.budgetType === 'per_person' ? (Number(pref.budget || 8000) * travelers) : Number(pref.budget || 8000));
  
  const estimatedTotal = Math.round(duration * 2400 * travelers + 1500 * travelers);
  const remaining = totalBudget - estimatedTotal;

  return {
    tripId: `trip-${Date.now()}`,
    generatedBy: 'rule_based',
    engineNotice: 'Generated by Client-Side Transparent Engine (Offline Prototype Mode)',
    destination: destName,
    startingCity: pref.startingCity || 'Indore',
    durationDays: duration,
    travelers,
    userBudget: totalBudget,
    interests: pref.interests || ['Historical Monuments', 'Local Food'],
    travelStyle: pref.travelStyle || 'Balanced',
    travelGroup: pref.travelGroup || 'Solo',
    dietaryPreferences: pref.dietaryPreferences || 'Vegetarian',
    preferredTransportation: pref.preferredTransportation || 'Train / Sleeper',
    accommodationPreferences: pref.accommodationPreferences || 'Budget Hotel / Guesthouse',
    departureDate: pref.departureDate || '',
    returnDate: pref.returnDate || '',
    tripOverview: `Curated ${duration}-day ${destName} trip for ${travelers} traveler(s) balancing ${pref.interests?.join(', ') || 'heritage and cuisine'}.`,
    matchExplanations: [
      `Designed around your chosen interests: ${(pref.interests || ['Heritage', 'Food']).join(', ')}.`,
      `Adjusted for ${pref.travelStyle || 'Balanced'} travel pacing.`,
      `Estimated expenses tailored for your group size of ${travelers}.`
    ],
    itineraryDays: Array.from({ length: duration }).map((_, i) => ({
      dayNumber: i + 1,
      date: `Day ${i + 1}`,
      dayTitle: `Day ${i + 1}: Highlights & Exploration of ${destName}`,
      morning: {
        id: `m-${i}`,
        name: `${destName} Heritage Landmark & Museum`,
        category: 'Historical Monuments',
        typicalDuration: '2.5 Hours',
        avgCost: 250,
        description: `Explore historic architecture and local art treasures.`,
        recommendationReason: 'Selected based on your interest in Culture & History.'
      },
      afternoon: {
        id: `a-${i}`,
        name: `${destName} Scenic Walk & Cafe Break`,
        category: 'Relaxation',
        typicalDuration: '2 Hours',
        avgCost: 150,
        description: `Stroll through old town streets and enjoy afternoon tea.`,
        recommendationReason: 'Included for balanced travel pacing.'
      },
      evening: {
        id: `e-${i}`,
        name: `${destName} Sunset Point & Cultural Performance`,
        category: 'Culture and Heritage',
        typicalDuration: '2 Hours',
        avgCost: 200,
        description: `Panoramic twilight vistas followed by regional folk performance.`,
        recommendationReason: 'Signature evening experience.'
      },
      mealSuggestions: {
        breakfast: { name: 'Regional Breakfast & Masala Chai', estimatedCost: 100 },
        lunch: { name: 'Traditional Thali Platter', estimatedCost: 300 },
        dinner: { name: 'Local Specialties Dinner', estimatedCost: 450 }
      },
      dailyEstimatedCost: 1450 * travelers
    })),
    budgetSummary: {
      userBudget: totalBudget,
      totalEstimatedCost: estimatedTotal,
      remainingBudget: remaining,
      costPerPerson: Math.round(estimatedTotal / travelers),
      dailyAverageExpense: Math.round(estimatedTotal / duration),
      budgetStatus: remaining < 0 ? 'over_budget' : 'on_budget',
      expenseBreakdown: {
        transportation: Math.round(1500 * travelers),
        accommodation: Math.round(duration * 1200),
        food: Math.round(duration * 650 * travelers),
        activities: Math.round(duration * 400 * travelers),
        localTravel: Math.round(duration * 350),
        shopping: Math.round(500 * travelers),
        emergencyBuffer: Math.round(estimatedTotal * 0.08),
        miscellaneous: Math.round(estimatedTotal * 0.04)
      }
    },
    practicalTips: [
      'Carry cash for small markets and auto rickshaws.',
      'Wear comfortable walking shoes for heritage exploration.'
    ],
    disclaimer: 'Travel estimates and AI-generated recommendations are for planning purposes only. Verify current prices and opening hours before booking.'
  };
}

function calculateClientOptimization(plan) {
  const currentTotal = plan.budgetSummary.totalEstimatedCost;
  const savings = Math.round(currentTotal * 0.22);
  return {
    originalTotal: currentTotal,
    optimizedTotal: currentTotal - savings,
    totalSavings: savings,
    suggestions: [
      {
        category: 'accommodation',
        title: 'Switch to Certified Heritage Homestay / Boutique B&B',
        description: 'Replace standard mid-tier hotel rooms with highly rated family-run homestays or boutique guesthouses.',
        savingAmount: Math.round(savings * 0.55),
        impact: 'High Comfort, Authentic Local Hospitality'
      },
      {
        category: 'transportation',
        title: 'Opt for Train AC Sleeper over Taxis',
        description: 'Book confirmed train tickets in advance for an economical, scenic intercity journey.',
        savingAmount: Math.round(savings * 0.45),
        impact: 'Minimal Impact on Travel Time'
      }
    ]
  };
}
