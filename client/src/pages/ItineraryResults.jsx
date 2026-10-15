import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  BookmarkCheck, 
  PieChart, 
  Printer, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  ArrowLeftRight, 
  AlertTriangle, 
  Info, 
  ThumbsUp, 
  Sliders, 
  Utensils, 
  Coffee, 
  Sunrise, 
  Sun, 
  Sunset,
  Share2,
  Check,
  Compass
} from 'lucide-react';
import { replaceActivityApi } from '../services/api';

export default function ItineraryResults({ 
  itinerary, 
  onSaveTrip, 
  onEditPreferences, 
  onRegenerate, 
  onViewBudget, 
  onUpdateItinerary,
  onApplyFeedback,
  showToast
}) {
  const [activeDayTab, setActiveDayTab] = useState(1);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [replacingSlot, setReplacingSlot] = useState({ day: 1, slot: 'morning' });
  const [selectedReplacementCategory, setSelectedReplacementCategory] = useState('Culture and Heritage');

  if (!itinerary) return null;

  const {
    destination,
    durationDays,
    travelers,
    userBudget,
    interests = [],
    travelStyle,
    tripOverview,
    matchExplanations = [],
    itineraryDays = [],
    budgetSummary = {},
    practicalTips = [],
    generatedBy = 'rule_based',
    engineNotice = '',
    disclaimer = ''
  } = itinerary;

  const currentDay = itineraryDays.find(d => d.dayNumber === activeDayTab) || itineraryDays[0];

  // Handle Remove Activity
  const handleRemoveActivity = (dayNum, slot) => {
    const updated = JSON.parse(JSON.stringify(itinerary));
    const day = updated.itineraryDays.find(d => d.dayNumber === dayNum);
    if (day) {
      day[slot] = {
        name: 'Free Time / Self-Guided Leisure',
        category: 'Relaxation',
        typicalDuration: '1.5 Hours',
        avgCost: 0,
        description: 'Open window for unscheduled relaxation, tea breaks, or independent souvenir shopping.',
        recommendationReason: 'Cleared upon your request to allow flexible free time.'
      };
      onUpdateItinerary(updated);
      showToast({
        type: 'info',
        title: 'Activity Removed',
        message: `${slot.charAt(0).toUpperCase() + slot.slice(1)} slot is now open for leisure.`
      });
    }
  };

  // Trigger Activity Replacement
  const handleOpenReplace = (dayNum, slot) => {
    setReplacingSlot({ day: dayNum, slot });
    setReplaceModalOpen(true);
  };

  const handleConfirmReplace = async () => {
    try {
      const updated = await replaceActivityApi(
        itinerary,
        replacingSlot.day,
        replacingSlot.slot,
        selectedReplacementCategory
      );
      onUpdateItinerary(updated);
      setReplaceModalOpen(false);
      showToast({
        type: 'success',
        title: 'Activity Replaced',
        message: `Updated Day ${replacingSlot.day} ${replacingSlot.slot} activity successfully.`
      });
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Replacement Failed',
        message: 'Could not fetch alternative activity.'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const destSlug = (destination || 'udaipur').toLowerCase().replace(/\s+/g, '');
  const destinationImage = `/images/${destSlug}.jpg`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 text-left">
      
      {/* 1. RESULTS HEADER WITH DESTINATION PHOTOGRAPH BANNER */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm overflow-hidden space-y-0">
        
        {/* Destination Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F1E9DD]">
          <img 
            src={destinationImage} 
            alt={destination}
            className="w-full h-full object-cover editorial-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/udaipur.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252A27]/85 via-[#252A27]/30 to-transparent" />
          
          {/* Top Floating Action Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/95 backdrop-blur-md text-[#264638] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C98262]" />
                <span>Curated Itinerary</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#252A27] text-[11px] font-medium tracking-wide shadow-sm">
                {generatedBy === 'ai' ? 'AI Synthesized' : 'Rule-Based Engine'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 sm:px-3.5 sm:py-2 rounded-full bg-[#FAF8F3]/90 hover:bg-white text-[#252A27] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm backdrop-blur-xs"
                title="Print Itinerary"
              >
                <Printer className="w-3.5 h-3.5 text-[#5A5F58]" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
              <button
                onClick={onSaveTrip}
                className="px-5 py-2 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <BookmarkCheck className="w-4 h-4 text-[#8A9B7A]" />
                <span>Save Trip</span>
              </button>
            </div>
          </div>

          {/* Bottom Title on Banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8E2D8] block mb-1">
              {destination} · {durationDays} Days · {travelers} Traveler{travelers > 1 ? 's' : ''}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#FAF8F3] tracking-tight leading-tight">
              Your Journey to {destination}
            </h1>
          </div>
        </div>

        {/* Content Body Inside Card */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-[#5A5F58] leading-relaxed font-light">
            Designed around your love for <strong className="text-[#252A27] font-semibold">{interests.slice(0, 3).join(', ')}</strong> with a {travelStyle.toLowerCase()} pace.
          </p>

          {/* Key Overview Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
              <div className="text-[#747873] text-xs font-medium flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#264638]" />
                <span>Duration</span>
              </div>
              <div className="text-lg font-serif font-bold text-[#252A27]">
                {durationDays} Days
              </div>
              <div className="text-[11px] text-[#747873]">{itinerary.startingCity ? `From ${itinerary.startingCity}` : 'Departing soon'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
              <div className="text-[#747873] text-xs font-medium flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-[#264638]" />
                <span>Travelers</span>
              </div>
              <div className="text-lg font-serif font-bold text-[#252A27]">
                {travelers} {travelers > 1 ? 'People' : 'Solo'}
              </div>
              <div className="text-[11px] text-[#747873]">{itinerary.travelGroup || 'Independent'}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
              <div className="text-[#747873] text-xs font-medium flex items-center gap-1 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-[#264638]" />
                <span>Estimated Cost</span>
              </div>
              <div className="text-lg font-serif font-bold text-[#252A27]">
                ₹{(budgetSummary.totalEstimatedCost || 0).toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#747873]">₹{Math.round((budgetSummary.totalEstimatedCost || 0) / (durationDays || 1)).toLocaleString('en-IN')}/day</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
              <div className="text-[#747873] text-xs font-medium flex items-center gap-1 mb-1">
                <PieChart className="w-3.5 h-3.5 text-[#264638]" />
                <span>Budget Status</span>
              </div>
              <div className="text-base font-bold flex items-center gap-1.5">
                {budgetSummary.budgetStatus === 'over_budget' ? (
                  <span className="text-rose-600 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Over Budget
                  </span>
                ) : (
                  <span className="text-[#264638] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#8A9B7A]" />
                    Within Budget
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#747873]">
                {budgetSummary.remainingBudget >= 0 
                  ? `+₹${budgetSummary.remainingBudget.toLocaleString('en-IN')} buffer` 
                  : `-₹${Math.abs(budgetSummary.remainingBudget).toLocaleString('en-IN')} deficit`}
              </div>
            </div>

          </div>

        {/* Budget Warning Banner if over budget (Test Case 4) */}
        {budgetSummary.budgetWarning && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-rose-900">{budgetSummary.budgetWarning.title}</div>
                <div className="text-rose-800 mt-0.5">{budgetSummary.budgetWarning.message}</div>
              </div>
            </div>
            <button
              onClick={onViewBudget}
              className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Optimize Budget Now
            </button>
          </div>
        )}

        {/* Overview & Explainable Match Rationale */}
        <div className="pt-6 border-t border-[#E8E2D8] space-y-4">
          <p className="text-xs sm:text-sm text-[#5A5F58] leading-relaxed font-light">
            {tripOverview}
          </p>

          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#C98262]">
              Why this itinerary matches your preferences:
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#5A5F58] font-light">
              {matchExplanations.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#264638] shrink-0 mt-0.5" />
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pt-6 border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onEditPreferences}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] hover:bg-[#FAF8F3] text-[#252A27] text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#747873]" />
              <span>Edit Preferences</span>
            </button>
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] hover:bg-[#FAF8F3] text-[#252A27] text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#747873]" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={onViewBudget}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#EBF0E7] hover:bg-[#DDE7D8] text-[#264638] text-xs font-semibold tracking-wide uppercase transition-colors cursor-pointer"
            >
              <PieChart className="w-3.5 h-3.5 text-[#264638]" />
              <span>Smart Budget Planner</span>
            </button>
          </div>

          <div className="text-xs text-[#747873] font-light">
            {engineNotice}
          </div>
        </div>

      </div>

      </div>

      {/* 2. DAY-WISE ITINERARY TABS & CARDS */}
      <div className="space-y-6">
        
        {/* Days Tab Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D8] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {itineraryDays.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayTab(d.dayNumber)}
                className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeDayTab === d.dayNumber
                    ? 'bg-[#264638] text-[#FAF8F3] shadow-xs'
                    : 'bg-white text-[#5A5F58] hover:bg-[#FAF8F3] border border-[#E8E2D8]'
                }`}
              >
                Day {d.dayNumber}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#747873] font-normal hidden sm:block">
            Estimated Day Cost: <strong className="text-[#252A27]">₹{(currentDay?.dailyEstimatedCost || 0).toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Selected Day Container */}
        {currentDay && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-8">
            
            {/* Day Title & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C98262]">
                  {currentDay.date || `Day ${currentDay.dayNumber}`}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] mt-1 tracking-tight">
                  {currentDay.dayTitle}
                </h3>
              </div>
              <div className="text-xs text-[#747873] font-light sm:text-right">
                Includes Sightseeing, Food & Activity estimates
              </div>
            </div>

            {/* Morning, Afternoon, Evening Activity Cards */}
            <div className="space-y-6">
              
              {/* MORNING */}
              <ActivityCard
                slotName="Morning"
                icon={Sunrise}
                activity={currentDay.morning}
                onReplace={() => handleOpenReplace(currentDay.dayNumber, 'morning')}
                onRemove={() => handleRemoveActivity(currentDay.dayNumber, 'morning')}
              />

              {/* AFTERNOON */}
              <ActivityCard
                slotName="Afternoon"
                icon={Sun}
                activity={currentDay.afternoon}
                onReplace={() => handleOpenReplace(currentDay.dayNumber, 'afternoon')}
                onRemove={() => handleRemoveActivity(currentDay.dayNumber, 'afternoon')}
              />

              {/* EVENING */}
              <ActivityCard
                slotName="Evening"
                icon={Sunset}
                activity={currentDay.evening}
                onReplace={() => handleOpenReplace(currentDay.dayNumber, 'evening')}
                onRemove={() => handleRemoveActivity(currentDay.dayNumber, 'evening')}
              />

            </div>

            {/* MEALS SUGGESTIONS FOR THE DAY */}
            {currentDay.mealSuggestions && (
              <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#252A27]">
                  <Utensils className="w-4 h-4 text-[#264638]" />
                  <span>Curated Dining for Day {currentDay.dayNumber}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-[#E8E2D8]">
                    <span className="font-bold text-[#747873] block mb-1 uppercase tracking-wider text-[10px]">Breakfast</span>
                    <div className="font-bold text-[#252A27] text-sm">{currentDay.mealSuggestions.breakfast?.name}</div>
                    <div className="text-[11px] text-[#264638] font-semibold mt-1">
                      Est. ₹{currentDay.mealSuggestions.breakfast?.estimatedCost || 100} • {currentDay.mealSuggestions.breakfast?.notes || 'Local stall'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8E2D8]">
                    <span className="font-bold text-[#747873] block mb-1 uppercase tracking-wider text-[10px]">Lunch</span>
                    <div className="font-bold text-[#252A27] text-sm">{currentDay.mealSuggestions.lunch?.name}</div>
                    <div className="text-[11px] text-[#264638] font-semibold mt-1">
                      Est. ₹{currentDay.mealSuggestions.lunch?.estimatedCost || 300} • {currentDay.mealSuggestions.lunch?.notes || 'Traditional Thali'}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8E2D8]">
                    <span className="font-bold text-[#747873] block mb-1 uppercase tracking-wider text-[10px]">Dinner</span>
                    <div className="font-bold text-[#252A27] text-sm">{currentDay.mealSuggestions.dinner?.name}</div>
                    <div className="text-[11px] text-[#264638] font-semibold mt-1">
                      Est. ₹{currentDay.mealSuggestions.dinner?.estimatedCost || 450} • {currentDay.mealSuggestions.dinner?.notes || 'Signature dinner'}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 3. INTERACTIVE USER FEEDBACK & REVISION ACTIONS (Section 9) */}
      <div className="bg-[#264638] text-[#FAF8F3] rounded-3xl p-6 sm:p-8 space-y-4 no-print shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase font-bold tracking-widest text-[#FAF8F3]/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C98262]" />
              <span>Interactive User Feedback Loop</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
              How does this itinerary feel to you?
            </h3>
            <p className="text-xs text-[#E8E2D8]/80 font-light mt-0.5">
              Select any feedback option to tune the pacing, budget, or activity mix instantaneously.
            </p>
          </div>
        </div>

        {/* Feedback Options */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={() => onApplyFeedback('looks_good')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium border border-white/15 transition-colors cursor-pointer"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-[#8A9B7A]" />
            <span>Looks Good!</span>
          </button>

          <button
            onClick={() => onApplyFeedback('more_budget_friendly')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium border border-white/15 transition-colors cursor-pointer"
          >
            <IndianRupee className="w-3.5 h-3.5 text-[#E8E2D8]" />
            <span>Make It More Budget-Friendly</span>
          </button>

          <button
            onClick={() => onApplyFeedback('more_adventure')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium border border-white/15 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#FAF8F3]" />
            <span>Add More Adventure</span>
          </button>

          <button
            onClick={() => onApplyFeedback('relaxed_pace')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium border border-white/15 transition-colors cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 text-[#8A9B7A]" />
            <span>Relaxed Pace / Less Transit</span>
          </button>

          <button
            onClick={() => onApplyFeedback('more_local_food')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium border border-white/15 transition-colors cursor-pointer"
          >
            <Utensils className="w-3.5 h-3.5 text-[#C98262]" />
            <span>Include More Local Food</span>
          </button>
        </div>
      </div>

      {/* 4. PRACTICAL TRAVEL TIPS */}
      {practicalTips.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-8 space-y-4">
          <h4 className="font-serif text-lg font-normal text-[#252A27] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#264638]" />
            <span>Practical Travel Notes for {destination}</span>
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#5A5F58] font-light">
            {practicalTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#264638] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. AI DISCLAIMER & LIMITATIONS BOX */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] text-[#5A5F58] text-xs flex items-start gap-3 font-light">
        <AlertTriangle className="w-4 h-4 text-[#C98262] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#252A27] font-medium">Planner Notice:</strong> {disclaimer || 'Travel estimates and recommendations are for planning purposes only. Verify current prices, opening hours, availability, transportation details, and relevant travel advisories before making bookings.'}
        </p>
      </div>

      {/* MODAL: REPLACE ACTIVITY */}
      {replaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#252A27]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-xl border border-[#E8E2D8]">
            <h3 className="font-serif text-xl font-normal text-[#252A27]">
              Replace {replacingSlot.slot.toUpperCase()} Activity (Day {replacingSlot.day})
            </h3>
            <p className="text-xs text-[#747873] font-light">
              Select what type of activity you would like to substitute into this slot:
            </p>

            <div className="space-y-2 pt-2">
              {[
                'Historical Monuments',
                'Culture and Heritage',
                'Local Food',
                'Relaxation',
                'Nature and Mountains',
                'Adventure',
                'Shopping'
              ].map((cat) => (
                <label 
                  key={cat}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                    selectedReplacementCategory === cat ? 'border-[#264638] bg-[#FAF8F3] text-[#264638]' : 'border-[#E8E2D8] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <span>{cat}</span>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedReplacementCategory === cat}
                    onChange={() => setSelectedReplacementCategory(cat)}
                    className="accent-[#264638]"
                  />
                </label>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setReplaceModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#747873] hover:bg-[#FAF8F3]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReplace}
                className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] shadow-xs cursor-pointer"
              >
                Apply Replacement
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Activity Card Sub-component
function ActivityCard({ slotName, icon: Icon, activity, onReplace, onRemove }) {
  if (!activity) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#E8E2D8] bg-white hover:border-[#8A9B7A] transition-all space-y-3">
      {/* Header Slot & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] text-[#264638] flex items-center justify-center border border-[#E8E2D8]">
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#252A27]">
            {slotName}
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#747873] font-medium border border-[#E8E2D8]">
            {activity.category}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 no-print">
          <button
            onClick={onReplace}
            className="p-1.5 rounded-lg text-[#747873] hover:text-[#264638] hover:bg-[#FAF8F3] transition-colors"
            title="Replace Activity"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg text-[#747873] hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Remove / Clear Activity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Activity Title & Cost */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <h4 className="font-serif text-lg font-bold text-[#252A27]">
          {activity.name}
        </h4>
        <div className="text-xs font-semibold text-[#264638] shrink-0">
          {activity.avgCost === 0 ? 'Free Entry' : `Est. ₹${activity.avgCost || 0} / person`}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#5A5F58] leading-relaxed font-light">
        {activity.description}
      </p>

      {/* Meta Footer & Recommendation Reason */}
      <div className="pt-3 border-t border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
        <div className="text-[#264638] font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C98262] shrink-0" />
          <span>{activity.recommendationReason}</span>
        </div>
        <div className="text-[#747873] flex items-center gap-1 shrink-0 font-light">
          <Clock className="w-3 h-3" />
          <span>Duration: {activity.typicalDuration || '2 Hours'}</span>
        </div>
      </div>
    </div>
  );
}
