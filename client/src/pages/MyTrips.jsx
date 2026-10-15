import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  Users, 
  Trash2, 
  Copy, 
  Edit3, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle,
  Clock,
  Compass
} from 'lucide-react';

export default function MyTrips({ 
  savedTrips, 
  onViewItinerary, 
  onEditTrip, 
  onDuplicateTrip, 
  onDeleteTrip, 
  onStartPlanning 
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [deleteConfirmTripId, setDeleteConfirmTripId] = useState(null);

  // Tab Filtering
  const filteredTrips = savedTrips.filter(trip => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return trip.status === 'Upcoming';
    if (activeTab === 'planned') return trip.status === 'Planned' || !trip.status;
    if (activeTab === 'past') return trip.status === 'Past';
    return true;
  });

  const tripToDelete = savedTrips.find(t => t.tripId === deleteConfirmTripId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* 1. Header & Tabs Bar */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F3] text-[#264638] text-[11px] font-bold uppercase tracking-wider border border-[#E8E2D8]">
              <BookmarkCheck className="w-3.5 h-3.5 text-[#264638]" />
              <span>Saved Travel Plans</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252A27] tracking-tight mt-1">
              My Trips ({savedTrips.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#747873] font-light">
              Manage your saved itineraries. Persisted across browser sessions for seamless offline revisiting.
            </p>
          </div>

          <button
            onClick={onStartPlanning}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8A9B7A]" />
            <span>Plan a New Trip</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E2D8] pb-3">
          {[
            { id: 'all', label: 'All Trips' },
            { id: 'planned', label: 'Planned' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past Trips' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#264638] text-[#FAF8F3] shadow-xs'
                  : 'text-[#747873] hover:bg-[#FAF8F3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Empty State */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F3] text-[#264638] flex items-center justify-center mx-auto border border-[#E8E2D8]">
            <Compass className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h2 className="font-serif text-2xl font-normal text-[#252A27]">
            No trips planned yet
          </h2>
          <p className="text-xs sm:text-sm text-[#747873] font-light">
            Start creating your next adventure! Select your destination, budget, and travel interests to build an intelligent itinerary.
          </p>
          <button
            onClick={onStartPlanning}
            className="px-7 py-3 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#8A9B7A]" />
            <span>Plan a Trip</span>
          </button>
        </div>
      ) : (
        /* 3. Trip Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => {
            const cost = trip.budgetSummary?.totalEstimatedCost || trip.userBudget || 0;
            const createdFormatted = trip.createdAt 
              ? new Date(trip.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Recently created';

            return (
              <div
                key={trip.tripId}
                className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 space-y-4 group text-left"
              >
                {/* Header & Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#264638] border border-[#E8E2D8]">
                      {trip.status || 'Planned'}
                    </span>
                    <span className="text-[11px] text-[#747873] font-light">
                      Saved {createdFormatted}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#252A27] group-hover:text-[#264638] transition-colors">
                    {trip.destination}
                  </h3>
                  <p className="text-xs text-[#747873] font-light">
                    {trip.durationDays} Days • {trip.travelers} Traveler(s) ({trip.travelGroup || 'Solo'})
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#747873] font-medium uppercase tracking-wider block">Total Estimate</span>
                    <span className="text-base font-serif font-bold text-[#252A27]">
                      ₹{cost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#747873] font-medium uppercase tracking-wider block">Travel Style</span>
                    <span className="text-xs font-semibold text-[#264638]">
                      {trip.travelStyle || 'Balanced'}
                    </span>
                  </div>
                </div>

                {/* Selected Interests Tags */}
                {trip.interests?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {trip.interests.slice(0, 3).map((it, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#747873] border border-[#E8E2D8] font-medium">
                        {it}
                      </span>
                    ))}
                    {trip.interests.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF8F3] text-[#747873] border border-[#E8E2D8]">
                        +{trip.interests.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewItinerary(trip)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                  >
                    <span>View Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDuplicateTrip(trip)}
                    className="p-2 rounded-full border border-[#E8E2D8] text-[#747873] hover:bg-[#FAF8F3] hover:text-[#252A27] transition-colors cursor-pointer"
                    title="Duplicate Trip"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEditTrip(trip)}
                    className="p-2 rounded-full border border-[#E8E2D8] text-[#747873] hover:bg-[#FAF8F3] hover:text-[#252A27] transition-colors cursor-pointer"
                    title="Edit Preferences"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmTripId(trip.tripId)}
                    className="p-2 rounded-full border border-[#E8E2D8] text-[#747873] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. CONFIRMATION MODAL BEFORE DELETION (Test Case 10) */}
      {deleteConfirmTripId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Delete Saved Trip?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently remove your saved itinerary for <strong>{tripToDelete?.destination}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmTripId(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteTrip(deleteConfirmTripId);
                  setDeleteConfirmTripId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Yes, Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
