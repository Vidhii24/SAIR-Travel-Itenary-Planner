import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Calendar, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  X, 
  Info, 
  Check, 
  Utensils, 
  Ticket, 
  Compass 
} from 'lucide-react';
import { fetchDestinations, FALLBACK_DESTINATIONS } from '../services/api';

export default function DestinationExplorer({ onSelectDestinationForTrip }) {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('All');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  // Detail Modal State
  const [activeModalDest, setActiveModalDest] = useState(null);

  // Load from server API if online
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchDestinations();
      if (res?.destinations?.length > 0) {
        setDestinations(res.destinations);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Filtered List
  const filtered = destinations.filter(dest => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = dest.name.toLowerCase().includes(q);
      const matchState = dest.state.toLowerCase().includes(q);
      const matchDesc = dest.description.toLowerCase().includes(q);
      const matchTags = dest.suitableInterests?.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchState && !matchDesc && !matchTags) return false;
    }

    // Interest Filter
    if (selectedInterest !== 'All') {
      if (!dest.suitableInterests?.includes(selectedInterest)) return false;
    }

    // Budget Tier Filter
    if (selectedBudgetTier !== 'All') {
      if (dest.budgetTier?.toLowerCase() !== selectedBudgetTier.toLowerCase()) return false;
    }

    // Travel Style Filter
    if (selectedStyle !== 'All') {
      if (!dest.suitableStyles?.includes(selectedStyle)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F3] text-[#264638] text-[11px] font-bold uppercase tracking-wider border border-[#E8E2D8]">
          <Compass className="w-3.5 h-3.5 text-[#264638]" />
          <span>Curated Travel Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#252A27] tracking-tight">
          Explore Curated Destinations
        </h1>
        <p className="text-sm sm:text-base text-[#5A5F58] font-light leading-relaxed">
          Discover verified cultural centers, Himalayan passes, and coastal retreats. Filter by budget, travel interests, and duration to personalize your next journey.
        </p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs p-4 sm:p-6 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#8A9B7A] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city (e.g. Udaipur, Goa), state, or keyword..."
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-[#E8E2D8] text-sm text-[#252A27] placeholder-[#747873]/60 focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-[#747873] hover:text-[#252A27]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Interest Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Travel Interest
            </label>
            <select
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Interests</option>
              <option value="Historical Monuments">Historical Monuments</option>
              <option value="Culture and Heritage">Culture & Heritage</option>
              <option value="Nature and Mountains">Nature & Mountains</option>
              <option value="Beaches">Beaches & Coastal</option>
              <option value="Adventure">Adventure & Sports</option>
              <option value="Local Food">Local Food & Cuisine</option>
              <option value="Relaxation">Relaxation & Wellness</option>
              <option value="Spiritual Places">Spiritual Places</option>
            </select>
          </div>

          {/* Budget Tier Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Budget Category
            </label>
            <select
              value={selectedBudgetTier}
              onChange={(e) => setSelectedBudgetTier(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Budgets</option>
              <option value="Budget-friendly">Budget-friendly (&lt; ₹3,000/day)</option>
              <option value="Moderate">Moderate (₹3,000 - ₹6,000/day)</option>
              <option value="Premium">Premium (&gt; ₹6,000/day)</option>
            </select>
          </div>

          {/* Travel Style Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Styles</option>
              <option value="Relaxed">Relaxed Pace</option>
              <option value="Balanced">Balanced Flow</option>
              <option value="Adventure-Focused">Adventure-Focused</option>
            </select>
          </div>

        </div>

      </div>

      {/* 3. Destination Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filtered.length}</strong> matching destinations</span>
          {(searchQuery || selectedInterest !== 'All' || selectedBudgetTier !== 'All' || selectedStyle !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedInterest('All');
                setSelectedBudgetTier('All');
                setSelectedStyle('All');
              }}
              className="text-teal-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No destinations match your criteria</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search keywords or relaxing filter parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest) => (
              <div 
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo & State Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold">
                    {dest.state}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold">
                    Est. ₹{dest.avgDailyCostPerPerson?.toLocaleString('en-IN') || 2200}/day
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#252A27] group-hover:text-[#264638] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs font-medium text-[#C98262] mb-2">{dest.tagline}</p>
                    <p className="text-xs text-[#5A5F58] line-clamp-2 leading-relaxed font-light">
                      {dest.description}
                    </p>
                  </div>

                  {/* Highlights / Interests Badges */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {dest.suitableInterests?.slice(0, 3).map((it, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#747873] border border-[#E8E2D8] font-medium">
                          {it}
                        </span>
                      ))}
                      {dest.suitableInterests?.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F3] text-[#747873] border border-[#E8E2D8]">
                          +{dest.suitableInterests.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectDestinationForTrip(dest.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs hover:shadow-sm transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8A9B7A]" />
                      <span>Plan This Trip</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveModalDest(dest)}
                      className="px-4 py-2.5 rounded-full border border-[#E8E2D8] hover:bg-[#FAF8F3] text-[#252A27] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Explore
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. DESTINATION DETAIL MODAL DRAWER */}
      {activeModalDest && (
        <div className="fixed inset-0 z-50 bg-[#252A27]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E2D8] max-h-[90vh] overflow-y-auto text-left">
            
            {/* Header & Photo */}
            <div className="relative aspect-16/8 rounded-2xl overflow-hidden bg-[#F1E9DD]">
              <img
                src={activeModalDest.image}
                alt={activeModalDest.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalDest(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-[#252A27]/70 text-white hover:bg-[#252A27]"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-[#252A27]/80 backdrop-blur-md text-white text-xs font-semibold">
                {activeModalDest.name}, {activeModalDest.state} ({activeModalDest.region})
              </div>
            </div>

            {/* Description & Overview */}
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-normal text-[#252A27]">
                {activeModalDest.name}
              </h2>
              <p className="text-xs font-semibold text-[#C98262]">
                {activeModalDest.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#5A5F58] leading-relaxed font-light">
                {activeModalDest.description}
              </p>
            </div>

            {/* Top Attractions List */}
            {activeModalDest.attractions?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252A27] flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-[#264638]" />
                  <span>Key Attractions & Estimated Costs</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalDest.attractions.slice(0, 4).map((att) => (
                    <div key={att.id} className="p-3.5 rounded-xl border border-[#E8E2D8] bg-[#FAF8F3]">
                      <div className="font-bold text-[#252A27]">{att.name}</div>
                      <div className="text-[11px] text-[#264638] font-semibold">
                        {att.avgCost === 0 ? 'Free Entry' : `Est. ₹${att.avgCost}`} • {att.typicalDuration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Food Highlights */}
            {activeModalDest.foodHighlights?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#252A27] flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#264638]" />
                  <span>Local Food Highlights</span>
                </h4>
                <ul className="text-xs text-[#5A5F58] space-y-1.5 font-light">
                  {activeModalDest.foodHighlights.map((f, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>• {f.name}</span>
                      <span className="font-medium text-[#252A27]">~₹{f.estimatedCost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Travel Tips */}
            {activeModalDest.travelTips?.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#E8E2D8] text-xs text-[#5A5F58] space-y-1.5 font-light">
                <div className="font-bold flex items-center gap-1.5 text-[#252A27]">
                  <Info className="w-4 h-4 text-[#264638]" />
                  <span>Traveler Tips</span>
                </div>
                {activeModalDest.travelTips.map((tip, i) => (
                  <p key={i} className="leading-relaxed text-[11px]">• {tip}</p>
                ))}
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalDest(null)}
                className="px-5 py-2.5 rounded-full border border-[#E8E2D8] hover:bg-[#FAF8F3] text-[#252A27] text-xs font-medium uppercase tracking-wider"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectDestinationForTrip(activeModalDest.name);
                  setActiveModalDest(null);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#8A9B7A]" />
                <span>Plan This Trip with SAIR</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
