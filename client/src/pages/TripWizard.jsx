import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Heart, 
  Users, 
  Sliders, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Compass, 
  Landmark, 
  Mountain, 
  Waves, 
  Utensils, 
  ShoppingBag, 
  Palmtree, 
  Camera, 
  Coffee, 
  Moon, 
  Trees, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  Bed,
  HelpCircle
} from 'lucide-react';
import { getUserProfile } from '../services/api';

const INTERESTS_OPTIONS = [
  { id: 'Historical Monuments', label: 'Historical Monuments', icon: Landmark, desc: 'Forts, palaces, museums & ruins' },
  { id: 'Nature and Mountains', label: 'Nature & Mountains', icon: Mountain, desc: 'Hill stations, valleys & viewpoints' },
  { id: 'Beaches', label: 'Beaches & Coastal', icon: Waves, desc: 'Sandy shores, sunsets & sea breeze' },
  { id: 'Adventure', label: 'Adventure & Thrills', icon: Compass, desc: 'Rafting, paragliding, treks & sports' },
  { id: 'Local Food', label: 'Local Food & Street Eats', icon: Utensils, desc: 'Authentic regional culinary delights' },
  { id: 'Shopping', label: 'Shopping & Bazaars', icon: ShoppingBag, desc: 'Handicrafts, textiles & local markets' },
  { id: 'Culture and Heritage', label: 'Culture & Heritage', icon: Palmtree, desc: 'Folk dances, traditions & craft' },
  { id: 'Spiritual Places', label: 'Spiritual Places', icon: SunIcon, desc: 'Temples, ghats & tranquil ashrams' },
  { id: 'Nightlife', label: 'Nightlife & Lounges', icon: Moon, desc: 'Live music, shacks & evening vibes' },
  { id: 'Photography', label: 'Photography Spots', icon: Camera, desc: 'Iconic sunrise, dusk & drone views' },
  { id: 'Relaxation', label: 'Relaxation & Wellness', icon: Coffee, desc: 'Leisurely cafes, spa & quiet retreats' },
  { id: 'Wildlife', label: 'Wildlife & Nature Parks', icon: Trees, desc: 'Sanctuaries, safaris & biodiversity' }
];

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

const POPULAR_DESTINATION_SUGGESTIONS = [
  'Udaipur', 'Jaipur', 'Goa', 'Manali', 'Rishikesh', 'Kerala', 'Varanasi', 'Ladakh'
];

const POPULAR_STARTING_CITIES = [
  'Indore', 'New Delhi', 'Mumbai', 'Bengaluru', 'Ahmedabad', 'Kolkata', 'Pune', 'Jaipur'
];

export default function TripWizard({ 
  initialDestination = '', 
  onGenerate, 
  isLoading = false 
}) {
  const profile = getUserProfile();

  // Multi-step form state
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form Fields
  const [destination, setDestination] = useState(initialDestination || 'Udaipur');
  const [startingCity, setStartingCity] = useState(profile.startingCity || 'Indore');
  
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [budget, setBudget] = useState(8000);
  const [budgetType, setBudgetType] = useState('per_person'); // 'per_person' or 'group_total'
  const [budgetTier, setBudgetTier] = useState('Moderate');

  const [interests, setInterests] = useState(profile.favoriteInterests || ['Historical Monuments', 'Local Food']);
  const [travelStyle, setTravelStyle] = useState(profile.travelStyle || 'Balanced');

  const [travelGroup, setTravelGroup] = useState('Solo');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(false);
  const [seniorFriendly, setSeniorFriendly] = useState(false);

  const [dietaryPreferences, setDietaryPreferences] = useState(profile.dietaryPreferences || 'Vegetarian');
  const [preferredTransportation, setPreferredTransportation] = useState(profile.preferredTransportation || 'Train / Sleeper');
  const [accommodationPreferences, setAccommodationPreferences] = useState(profile.accommodationType || 'Budget Hotel / Guesthouse');
  const [additionalRequirements, setAdditionalRequirements] = useState('I prefer historical sites, local vegetarian food, and less crowded places.');

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Sync initial destination if passed
  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  // Recalculate duration when dates change
  useEffect(() => {
    if (departureDate && returnDate) {
      const dep = new Date(departureDate);
      const ret = new Date(returnDate);
      const diffTime = ret - dep;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      if (diffDays > 0) {
        setDurationDays(diffDays);
        if (errors.returnDate) {
          setErrors(prev => ({ ...prev, returnDate: null }));
        }
      }
    }
  }, [departureDate, returnDate]);

  // Sync travelers count with adults + children
  useEffect(() => {
    setTravelers(Math.max(1, adults + children));
  }, [adults, children]);

  // Validate current step
  const validateStep = (currentStep) => {
    const errs = {};

    if (currentStep === 1) {
      if (!destination || !destination.trim()) {
        errs.destination = 'Please specify where you would like to travel.';
      }
      if (!startingCity || !startingCity.trim()) {
        errs.startingCity = 'Please enter your starting city or departure hub.';
      }
    }

    if (currentStep === 2) {
      if (departureDate && returnDate) {
        const dep = new Date(departureDate);
        const ret = new Date(returnDate);
        if (ret < dep) {
          errs.returnDate = 'Return date cannot be earlier than departure date.';
        }
      }
      if (!durationDays || Number(durationDays) < 1) {
        errs.durationDays = 'Trip duration must be at least 1 day.';
      }
      if (Number(durationDays) > 30) {
        errs.durationDays = 'Maximum supported duration is 30 days.';
      }
      if (travelers < 1) {
        errs.travelers = 'There must be at least 1 traveler.';
      }
    }

    if (currentStep === 3) {
      if (!budget || Number(budget) <= 0) {
        errs.budget = 'Please enter a valid budget in Indian Rupees (₹).';
      } else if (Number(budget) < 1500) {
        errs.budget = 'Estimated minimum budget is ₹1,500 for a practical itinerary.';
      }
    }

    if (currentStep === 4) {
      if (interests.length === 0) {
        errs.interests = 'Please select at least one travel interest.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(totalSteps, prev + 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const toggleInterest = (interestId) => {
    setInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(i => i !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: null }));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setStep(1);
      return;
    }

    const payload = {
      destination: destination.trim(),
      startingCity: startingCity.trim(),
      departureDate,
      returnDate,
      durationDays: Number(durationDays),
      travelers: Number(travelers),
      adults: Number(adults),
      children: Number(children),
      budget: Number(budget),
      budgetType,
      budgetTier,
      interests,
      travelStyle,
      travelGroup,
      accessibilityNeeds,
      seniorFriendly,
      dietaryPreferences,
      preferredTransportation,
      accommodationPreferences,
      additionalRequirements
    };

    onGenerate(payload);
  };

  const stepTitles = [
    { num: 1, title: 'Destination', subtitle: 'Where & starting point' },
    { num: 2, title: 'Duration & Dates', subtitle: 'Trip length & group' },
    { num: 3, title: 'Budget', subtitle: 'Financial preferences' },
    { num: 4, title: 'Interests & Style', subtitle: 'Activities & pacing' },
    { num: 5, title: 'Travel Group', subtitle: 'Companions & comfort' },
    { num: 6, title: 'Preferences & Review', subtitle: 'Diet, transit & summary' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      
      {/* Wizard Header */}
      <div className="text-center space-y-2.5 mb-10">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#C98262] uppercase">
          Step {step} of {totalSteps}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252A27] tracking-tight">
          Design your personalized itinerary
        </h1>
        <p className="text-sm text-[#747873] max-w-lg mx-auto font-light">
          Share your preferences and let our engine curate a balanced, budget-aware journey.
        </p>
      </div>

      {/* Progress Bar & Steps Indicator */}
      <div className="mb-10 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] shadow-xs">
        {/* Step Indicator Pills */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {stepTitles.map((st) => {
            const isCompleted = step > st.num;
            const isCurrent = step === st.num;
            return (
              <div 
                key={st.num}
                onClick={() => { if (st.num < step) setStep(st.num); }}
                className={`text-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-[#EBF0E7] border border-[#8A9B7A] text-[#264638]' 
                    : isCompleted 
                    ? 'text-[#264638] hover:bg-[#FAF8F3]' 
                    : 'text-[#A2A89F] opacity-70'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {isCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-[#264638] text-[#FAF8F3] flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isCurrent ? 'bg-[#264638] text-[#FAF8F3]' : 'bg-[#F1E9DD] text-[#5A5F58]'
                    }`}>
                      {st.num}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium truncate hidden sm:block">
                  {st.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-full bg-[#F1E9DD] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#264638] h-full transition-all duration-400"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-10 text-left transition-all">
        
        {/* STEP 1: DESTINATION & STARTING CITY */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                Where would you like to travel?
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Enter your target destination and starting city for route and transit estimation.
              </p>
            </div>

            {/* Destination Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Destination <span className="text-[#C98262]">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-[#264638] pointer-events-none" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    if (errors.destination) setErrors(prev => ({ ...prev, destination: null }));
                  }}
                  placeholder="e.g. Udaipur, Jaipur, Goa, Manali, Rishikesh"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-[#252A27] placeholder-[#747873]/60 focus:outline-none focus:ring-2 focus:ring-[#264638] transition-all bg-[#FAF8F3]/50 ${
                    errors.destination ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8E2D8]'
                  }`}
                />
              </div>
              {errors.destination && (
                <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.destination}</span>
                </p>
              )}

              {/* Suggestions */}
              <div className="pt-1">
                <span className="text-xs text-[#747873] font-medium mr-2">Quick suggestions:</span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1.5">
                  {POPULAR_DESTINATION_SUGGESTIONS.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setDestination(city);
                        if (errors.destination) setErrors(prev => ({ ...prev, destination: null }));
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                        destination.toLowerCase() === city.toLowerCase()
                          ? 'bg-[#264638] text-[#FAF8F3] border-[#264638] shadow-xs'
                          : 'bg-[#FAF8F3] text-[#252A27] border-[#E8E2D8] hover:bg-[#F1E9DD]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Starting City Input */}
            <div className="space-y-3 pt-6 border-t border-[#E8E2D8]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Starting City (Origin) <span className="text-[#C98262]">*</span>
              </label>
              <div className="relative">
                <Compass className="absolute left-3.5 top-3.5 w-5 h-5 text-[#8A9B7A] pointer-events-none" />
                <input
                  type="text"
                  value={startingCity}
                  onChange={(e) => {
                    setStartingCity(e.target.value);
                    if (errors.startingCity) setErrors(prev => ({ ...prev, startingCity: null }));
                  }}
                  placeholder="e.g. Indore, Delhi, Mumbai, Bengaluru"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-[#252A27] placeholder-[#747873]/60 focus:outline-none focus:ring-2 focus:ring-[#264638] transition-all bg-[#FAF8F3]/50 ${
                    errors.startingCity ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8E2D8]'
                  }`}
                />
              </div>
              {errors.startingCity && (
                <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.startingCity}</span>
                </p>
              )}

              {/* Suggestions */}
              <div className="pt-1">
                <span className="text-xs text-[#747873] font-medium mr-2">Common starting hubs:</span>
                <div className="inline-flex flex-wrap gap-1.5 mt-1.5">
                  {POPULAR_STARTING_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setStartingCity(city);
                        if (errors.startingCity) setErrors(prev => ({ ...prev, startingCity: null }));
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                        startingCity.toLowerCase() === city.toLowerCase()
                          ? 'bg-[#264638] text-[#FAF8F3] border-[#264638] shadow-xs'
                          : 'bg-[#FAF8F3] text-[#252A27] border-[#E8E2D8] hover:bg-[#F1E9DD]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#264638] shrink-0 mt-0.5" />
              <p className="text-xs text-[#252A27] leading-relaxed">
                <strong className="text-[#264638]">Curated Knowledge Base:</strong> Suggestions are matched with curated regional attraction archives and transparent travel distance matrices.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: TRIP DURATION & DATES */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                How long is your adventure?
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Select specific travel dates or define your trip duration directly.
              </p>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Departure Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-[#8A9B7A] pointer-events-none" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8E2D8] text-sm text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] transition-all bg-[#FAF8F3]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Return Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-[#8A9B7A] pointer-events-none" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] transition-all bg-[#FAF8F3]/50 ${
                      errors.returnDate ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8E2D8]'
                    }`}
                  />
                </div>
                {errors.returnDate && (
                  <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.returnDate}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Direct Duration Days Input */}
            <div className="space-y-3 pt-6 border-t border-[#E8E2D8]">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Number of Days <span className="text-[#C98262]">*</span>
                </label>
                <span className="text-xs text-[#747873] font-medium">
                  Ideal for {destination}: 3-5 days
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="flex-1 accent-[#264638] h-2 bg-[#F1E9DD] rounded-lg cursor-pointer"
                />
                <div className="w-24 px-3 py-2 rounded-xl bg-[#FAF8F3] text-center font-serif font-bold text-[#252A27] text-base border border-[#E8E2D8]">
                  {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                </div>
              </div>
              {errors.durationDays && (
                <p className="text-xs text-rose-600 font-medium">{errors.durationDays}</p>
              )}
            </div>

            {/* Travelers Count */}
            <div className="space-y-4 pt-6 border-t border-[#E8E2D8]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Number of Travelers <span className="text-[#C98262]">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Adults */}
                <div className="p-4 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F3]/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#252A27]">Adults</div>
                    <div className="text-xs text-[#747873]">Age 12+ years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D8] font-bold text-[#252A27] hover:bg-[#F1E9DD] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm text-[#252A27] w-4 text-center">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults(prev => Math.min(10, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D8] font-bold text-[#252A27] hover:bg-[#F1E9DD] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="p-4 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F3]/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#252A27]">Children</div>
                    <div className="text-xs text-[#747873]">Under 12 years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D8] font-bold text-[#252A27] hover:bg-[#F1E9DD] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm text-[#252A27] w-4 text-center">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren(prev => Math.min(8, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D8] font-bold text-[#252A27] hover:bg-[#F1E9DD] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#747873] font-medium">
                Total group size: <strong className="text-[#252A27]">{travelers} traveler{travelers > 1 ? 's' : ''}</strong>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                What is your estimated travel budget?
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Enter your budget in Indian Rupees. We will optimize hotel, food, and transit allocations around it.
              </p>
            </div>

            {/* Budget Per Person vs Group Total Toggle */}
            <div className="flex p-1 bg-[#F1E9DD] rounded-xl max-w-sm border border-[#E8E2D8]">
              <button
                type="button"
                onClick={() => setBudgetType('per_person')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  budgetType === 'per_person'
                    ? 'bg-white text-[#264638] shadow-xs'
                    : 'text-[#5A5F58] hover:text-[#252A27]'
                }`}
              >
                Budget Per Person
              </button>
              <button
                type="button"
                onClick={() => setBudgetType('group_total')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  budgetType === 'group_total'
                    ? 'bg-white text-[#264638] shadow-xs'
                    : 'text-[#5A5F58] hover:text-[#252A27]'
                }`}
              >
                Total Group Budget
              </button>
            </div>

            {/* Budget Input Field */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                {budgetType === 'per_person' ? 'Estimated Budget per Person (₹ INR)' : 'Estimated Total Group Budget (₹ INR)'} <span className="text-[#C98262]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-base font-bold text-[#8A9B7A]">₹</span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={budget}
                  onChange={(e) => {
                    setBudget(Number(e.target.value));
                    if (errors.budget) setErrors(prev => ({ ...prev, budget: null }));
                  }}
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border text-base font-bold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] transition-all bg-[#FAF8F3]/50 ${
                    errors.budget ? 'border-rose-400 bg-rose-50/20' : 'border-[#E8E2D8]'
                  }`}
                />
              </div>
              {errors.budget && (
                <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.budget}</span>
                </p>
              )}

              {/* Quick Preset Buttons */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#747873] font-medium">Presets:</span>
                {[5000, 8000, 12000, 20000, 35000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setBudget(amt);
                      if (errors.budget) setErrors(prev => ({ ...prev, budget: null }));
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                      budget === amt 
                        ? 'bg-[#264638] text-[#FAF8F3] border-[#264638]' 
                        : 'bg-[#FAF8F3] text-[#252A27] border-[#E8E2D8] hover:bg-[#F1E9DD]'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Category Cards */}
            <div className="space-y-3 pt-6 border-t border-[#E8E2D8]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Budget Category Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'Budget-friendly',
                    label: 'Budget-Friendly',
                    range: '₹1,500 - ₹3,000 / day',
                    desc: 'Hostels / guesthouses, local food, sleeper trains, public buses & free sights.'
                  },
                  {
                    id: 'Moderate',
                    label: 'Moderate',
                    range: '₹3,000 - ₹6,000 / day',
                    desc: 'Comfortable 3-star boutique hotels, mix of authentic cafes, AC trains / cabs.'
                  },
                  {
                    id: 'Premium',
                    label: 'Premium / Luxury',
                    range: '₹6,000+ / day',
                    desc: 'Heritage Havelis / 5-star resorts, private guided tours, fine dining & flights.'
                  }
                ].map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setBudgetTier(tier.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left space-y-2 ${
                      budgetTier === tier.id
                        ? 'border-[#264638] bg-[#FAF8F3] shadow-xs'
                        : 'border-[#E8E2D8] hover:border-[#8A9B7A] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#252A27]">{tier.label}</span>
                      {budgetTier === tier.id && <Check className="w-4 h-4 text-[#264638]" />}
                    </div>
                    <div className="text-xs font-semibold text-[#264638]">{tier.range}</div>
                    <p className="text-[11px] text-[#747873] leading-relaxed font-light">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] text-[#252A27] text-xs flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#C98262] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#264638]">Transparent Pricing:</strong> Displayed budgets reflect estimated actual expenditures for planning simulations, not guaranteed hotel quotations.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: TRAVEL PREFERENCES & INTERESTS */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                Select your travel interests & style
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Choose the activities you love most so our recommendation engine can score and prioritize sights.
              </p>
            </div>

            {/* Interests Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Travel Interests <span className="text-[#C98262]">*</span>
                </label>
                <span className="text-xs text-[#264638] font-semibold">
                  {interests.length} selected
                </span>
              </div>

              {errors.interests && (
                <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.interests}</span>
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {INTERESTS_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = interests.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left space-y-2 ${
                        isSelected
                          ? 'border-[#264638] bg-[#FAF8F3] shadow-xs'
                          : 'border-[#E8E2D8] hover:border-[#8A9B7A] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#264638] text-[#FAF8F3]' : 'bg-[#FAF8F3] text-[#747873]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#264638]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#252A27] leading-snug">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-[#747873] line-clamp-1 mt-0.5 font-light">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Travel Style Selection */}
            <div className="space-y-3 pt-6 border-t border-[#E8E2D8]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Travel Style & Pace
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'Relaxed',
                    title: 'Relaxed Pace',
                    desc: '1-2 key activities per day, generous cafe breaks, afternoon downtime, zero rush.'
                  },
                  {
                    id: 'Balanced',
                    title: 'Balanced Flow',
                    desc: '2-3 activities per day, structured mornings with flexible twilight exploration.'
                  },
                  {
                    id: 'Adventure-Focused',
                    title: 'Adventure-Focused',
                    desc: '3-4 activities per day, early morning departures, outdoor hikes & action-packed days.'
                  }
                ].map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setTravelStyle(style.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left space-y-1.5 ${
                      travelStyle === style.id
                        ? 'border-[#264638] bg-[#FAF8F3] shadow-xs'
                        : 'border-[#E8E2D8] hover:border-[#8A9B7A] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#252A27]">{style.title}</span>
                      {travelStyle === style.id && <Check className="w-4 h-4 text-[#264638]" />}
                    </div>
                    <p className="text-xs text-[#747873] leading-relaxed font-light">{style.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STEP 5: TRAVEL GROUP */}
        {step === 5 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                Who are you traveling with?
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Helps us tune accommodation room arrangements and activity suitability.
              </p>
            </div>

            {/* Group Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'Solo', label: 'Solo Traveler', icon: Users, desc: 'Flexible, independent journey' },
                { id: 'Couple', label: 'Couple', icon: Heart, desc: 'Scenic vistas & intimate dining' },
                { id: 'Family', label: 'Family with Kids', icon: Users, desc: 'Comfortable, kid-friendly pacing' },
                { id: 'Friends', label: 'Group of Friends', icon: Users, desc: 'Social, fun & shared memories' }
              ].map((grp) => {
                const Icon = grp.icon;
                return (
                  <div
                    key={grp.id}
                    onClick={() => setTravelGroup(grp.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left space-y-2 ${
                      travelGroup === grp.id
                        ? 'border-[#264638] bg-[#FAF8F3] shadow-xs'
                        : 'border-[#E8E2D8] hover:border-[#8A9B7A] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        travelGroup === grp.id ? 'bg-[#264638] text-[#FAF8F3]' : 'bg-[#FAF8F3] text-[#747873]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {travelGroup === grp.id && <Check className="w-4 h-4 text-[#264638]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#252A27]">{grp.label}</div>
                      <div className="text-[10px] text-[#747873] mt-0.5 font-light">{grp.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accessibility & Comfort Preferences */}
            <div className="space-y-3 pt-6 border-t border-[#E8E2D8]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Comfort & Accessibility Preferences (Optional)
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8E2D8] hover:bg-[#FAF8F3] transition-colors cursor-pointer bg-white">
                  <input
                    type="checkbox"
                    checked={accessibilityNeeds}
                    onChange={(e) => setAccessibilityNeeds(e.target.checked)}
                    className="w-4 h-4 text-[#264638] rounded border-[#E8E2D8] accent-[#264638]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#252A27]">Wheelchair / Step-Free Accessibility</div>
                    <div className="text-[11px] text-[#747873] font-light">Prioritize monuments and viewpoints with ramp or elevator facilities.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E8E2D8] hover:bg-[#FAF8F3] transition-colors cursor-pointer bg-white">
                  <input
                    type="checkbox"
                    checked={seniorFriendly}
                    onChange={(e) => setSeniorFriendly(e.target.checked)}
                    className="w-4 h-4 text-[#264638] rounded border-[#E8E2D8] accent-[#264638]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#252A27]">Senior-Friendly Pacing</div>
                    <div className="text-[11px] text-[#747873] font-light">Minimize strenuous uphill walks and schedule shaded midday rest stops.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: ADDITIONAL PREFERENCES & REVIEW SUMMARY */}
        {step === 6 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
                Refine preferences & generate itinerary
              </h2>
              <p className="text-xs sm:text-sm text-[#747873] mt-1 font-light">
                Specify dietary options, preferred transit mode, and review your selections before generation.
              </p>
            </div>

            {/* Dietary & Transit & Stay Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Dietary */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Dietary Preference
                </label>
                <select
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
                >
                  <option value="Vegetarian">Pure Vegetarian</option>
                  <option value="Vegan">Vegan (Plant-Based)</option>
                  <option value="Non-Vegetarian">Non-Vegetarian / Multi-Cuisine</option>
                  <option value="Jain">Jain (No Root Veggies)</option>
                  <option value="Halal">Halal Friendly</option>
                </select>
              </div>

              {/* Transit */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Preferred Transportation
                </label>
                <select
                  value={preferredTransportation}
                  onChange={(e) => setPreferredTransportation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
                >
                  <option value="Train / Sleeper">Indian Railways (AC Train / Sleeper)</option>
                  <option value="Flight">Flight (Fast Transit)</option>
                  <option value="Intercity AC Bus">Intercity AC Volvo Bus</option>
                  <option value="Self-Drive / Rental">Self-Drive Car / Road Trip</option>
                </select>
              </div>

              {/* Stay */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  Accommodation Style
                </label>
                <select
                  value={accommodationPreferences}
                  onChange={(e) => setAccommodationPreferences(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
                >
                  <option value="Budget Hotel / Guesthouse">Budget Hotel / Guesthouse</option>
                  <option value="Boutique Homestay / 3-Star">Boutique Homestay / 3-Star</option>
                  <option value="Heritage Haveli / 4-Star">Heritage Haveli / 4-Star</option>
                  <option value="Luxury Resort / 5-Star">Luxury Resort / 5-Star</option>
                  <option value="Backpacker Hostel Dorm">Backpacker Hostel Dorm</option>
                </select>
              </div>

            </div>

            {/* Free-Text Requirements Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Anything else we should know about your trip? (Optional)
              </label>
              <textarea
                rows="2"
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="e.g. I prefer historical sites, local vegetarian food, and less crowded sunset spots."
                className="w-full px-4 py-3 rounded-xl border border-[#E8E2D8] text-xs sm:text-sm text-[#252A27] placeholder-[#747873]/60 focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
              />
            </div>

            {/* SELECTION SUMMARY CARD BEFORE GENERATION */}
            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C98262]">
                  Plan Summary Review
                </span>
                <span className="text-xs text-[#264638] font-bold">
                  Ready to Process
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-[#747873] font-light">Destination:</div>
                  <div className="font-bold text-[#252A27]">{destination}</div>
                  <div className="text-[11px] text-[#747873]">From {startingCity}</div>
                </div>

                <div>
                  <div className="text-[#747873] font-light">Duration:</div>
                  <div className="font-bold text-[#252A27]">{durationDays} Days</div>
                  <div className="text-[11px] text-[#747873]">{travelers} Traveler(s) ({travelGroup})</div>
                </div>

                <div>
                  <div className="text-[#747873] font-light">Budget:</div>
                  <div className="font-bold text-[#252A27]">₹{Number(budget).toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-[#747873]">{budgetType === 'per_person' ? 'Per Person' : 'Total Group'}</div>
                </div>

                <div>
                  <div className="text-[#747873] font-light">Pace & Style:</div>
                  <div className="font-bold text-[#252A27]">{travelStyle}</div>
                  <div className="text-[11px] text-[#747873]">{interests.length} Interests</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E2D8] flex flex-wrap gap-1.5">
                {interests.map((it, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-md bg-[#EBF0E7] text-[#264638] font-medium">
                    {it}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Wizard Controls & Action Buttons */}
        <div className="pt-8 mt-8 border-t border-[#E8E2D8] flex items-center justify-between gap-4">
          
          {/* Back Button */}
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8E2D8] hover:bg-[#F1E9DD] text-[#252A27] font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {/* Next / Submit Button */}
          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] font-medium text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] font-medium text-sm sm:text-base tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Curating Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate My Itinerary</span>
                </>
              )}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
