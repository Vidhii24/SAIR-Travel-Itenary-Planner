import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Sliders, 
  IndianRupee, 
  Utensils, 
  Bed, 
  Car, 
  Check, 
  ShieldCheck, 
  Info,
  Save,
  Sparkles
} from 'lucide-react';
import { getUserProfile, saveUserProfile } from '../services/api';

const INTERESTS_CHOICES = [
  'Historical Monuments', 'Nature and Mountains', 'Beaches', 'Adventure', 
  'Local Food', 'Shopping', 'Culture and Heritage', 'Spiritual Places', 
  'Nightlife', 'Photography', 'Relaxation', 'Wildlife'
];

export default function UserProfile({ showToast, onPreferencesUpdated }) {
  const [profile, setProfile] = useState(getUserProfile());
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field, val) => {
    setProfile(prev => ({ ...prev, [field]: val }));
    setIsSaved(false);
  };

  const toggleInterest = (interest) => {
    setProfile(prev => {
      const current = prev.favoriteInterests || [];
      const updated = current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest];
      return { ...prev, favoriteInterests: updated };
    });
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveUserProfile(profile);
    setIsSaved(true);
    if (onPreferencesUpdated) onPreferencesUpdated(profile);
    showToast({
      type: 'success',
      title: 'Preferences Saved',
      message: 'Your travel preferences have been saved and will pre-fill future trips.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF0E7] text-[#264638] flex items-center justify-center font-bold">
            <User className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#252A27] tracking-tight">
              User Profile & Default Travel Preferences
            </h1>
            <p className="text-xs sm:text-sm text-[#747873] font-light">
              Customize your default baseline settings. These preferences auto-populate the Trip Planning Wizard.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] flex items-start gap-2.5 text-xs text-[#5A5F58] font-light">
          <Info className="w-4 h-4 text-[#264638] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#252A27] font-medium">Local Prototype Storage:</strong> Preferences are persisted in browser local storage for convenience and privacy without requiring server account registration.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Name & Origin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Display Name
            </label>
            <input
              type="text"
              value={profile.displayName || ''}
              onChange={(e) => handleChange('displayName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
              placeholder="e.g. Aarav Sharma"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Home City / Departure Hub
            </label>
            <input
              type="text"
              value={profile.startingCity || ''}
              onChange={(e) => handleChange('startingCity', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
              placeholder="e.g. Indore"
            />
          </div>
        </div>

        {/* Travel Style & Typical Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E8E2D8]">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Default Travel Style
            </label>
            <select
              value={profile.travelStyle || 'Balanced'}
              onChange={(e) => handleChange('travelStyle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-xs sm:text-sm font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
            >
              <option value="Relaxed">Relaxed Pace (1-2 Sights, generous breaks)</option>
              <option value="Balanced">Balanced Flow (2-3 Sights, steady pacing)</option>
              <option value="Adventure-Focused">Adventure-Focused (3-4 Sights, early starts)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Typical Target Budget (₹ INR)
            </label>
            <input
              type="number"
              step="500"
              value={profile.typicalBudget || 8000}
              onChange={(e) => handleChange('typicalBudget', Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] text-sm font-bold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
            />
          </div>
        </div>

        {/* Favorite Travel Interests */}
        <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Favorite Travel Interests
            </label>
            <span className="text-xs text-[#264638] font-semibold">
              {(profile.favoriteInterests || []).length} Selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESTS_CHOICES.map((int) => {
              const isSelected = (profile.favoriteInterests || []).includes(int);
              return (
                <button
                  type="button"
                  key={int}
                  onClick={() => toggleInterest(int)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#264638] text-[#FAF8F3] border-[#264638] shadow-xs'
                      : 'bg-[#FAF8F3] text-[#252A27] border-[#E8E2D8] hover:bg-[#F1E9DD]'
                  }`}
                >
                  {int}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary & Stay & Transit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8E2D8]">
          
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Dietary Preference
            </label>
            <select
              value={profile.dietaryPreferences || 'Vegetarian'}
              onChange={(e) => handleChange('dietaryPreferences', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
            >
              <option value="Vegetarian">Pure Vegetarian</option>
              <option value="Vegan">Vegan (Plant-Based)</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Jain">Jain (No Root Veg)</option>
              <option value="Halal">Halal</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Accommodation Style
            </label>
            <select
              value={profile.accommodationType || 'Budget Hotel / Guesthouse'}
              onChange={(e) => handleChange('accommodationType', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
            >
              <option value="Budget Hotel / Guesthouse">Budget Hotel / Guesthouse</option>
              <option value="Boutique Homestay / 3-Star">Boutique Homestay / 3-Star</option>
              <option value="Heritage Haveli / 4-Star">Heritage Haveli / 4-Star</option>
              <option value="Luxury Resort / 5-Star">Luxury Resort / 5-Star</option>
              <option value="Backpacker Hostel Dorm">Backpacker Hostel Dorm</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#252A27]">
              Preferred Transit Mode
            </label>
            <select
              value={profile.preferredTransportation || 'Train / Sleeper'}
              onChange={(e) => handleChange('preferredTransportation', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-[#FAF8F3]/50"
            >
              <option value="Train / Sleeper">Indian Railways (AC Train / Sleeper)</option>
              <option value="Flight">Flight</option>
              <option value="Intercity AC Bus">Intercity AC Bus</option>
              <option value="Self-Drive / Rental">Self-Drive / Road Trip</option>
            </select>
          </div>

        </div>

        {/* Save CTA */}
        <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
          <span className="text-xs text-[#747873] font-light">
            {isSaved ? '✓ All changes saved to local prototype storage.' : 'Unsaved changes pending.'}
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#8A9B7A]" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
}
