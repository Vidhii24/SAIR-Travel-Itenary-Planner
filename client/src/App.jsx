import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Modal from './components/Modal';

import LandingPage from './pages/LandingPage';
import TripWizard from './pages/TripWizard';
import ItineraryResults from './pages/ItineraryResults';
import BudgetPlanner from './pages/BudgetPlanner';
import DestinationExplorer from './pages/DestinationExplorer';
import MyTrips from './pages/MyTrips';
import UserProfile from './pages/UserProfile';
import AcademicShowcase from './pages/AcademicShowcase';

import { LoginModal, JoinModal } from './components/AuthModals';
import { 
  fetchHealth, 
  generateItineraryApi, 
  getSavedTrips, 
  saveTripToStorage, 
  deleteTripFromStorage,
  optimizeBudgetApi
} from './services/api';
import { Sparkles, ShieldCheck, AlertTriangle, Code, ArrowRight, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif text-[#252A27]">Something went wrong</h2>
          <p className="text-sm text-[#747873] max-w-md">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
              else window.location.reload();
            }}
            className="px-6 py-2.5 rounded-full bg-[#264638] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm hover:bg-[#1A3228]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [serverHealth, setServerHealth] = useState(null);
  const [wizardInitialDest, setWizardInitialDest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [aiInfoModalOpen, setAiInfoModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sair_user') || 'null');
    } catch {
      return null;
    }
  });

  // Initialize saved trips & server health
  useEffect(() => {
    window.__setActivePage = setActivePage;
    window.__setCurrentItinerary = setCurrentItinerary;
    setSavedTrips(getSavedTrips());
    fetchHealth().then(data => setServerHealth(data)).catch(() => {});
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast({
      type: 'success',
      title: 'Welcome to SAIR',
      message: `Hello, ${user.name || 'Traveler'}! Your membership session is active.`
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('sair_user');
    setCurrentUser(null);
    showToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have signed out of your SAIR session.'
    });
  };

  const showToast = (toastData) => {
    setToast(toastData);
  };

  // 1. Navigation & Quick Trip Launchers
  const handleStartPlanning = () => {
    setWizardInitialDest('');
    setActivePage('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestinationForTrip = (destName) => {
    setWizardInitialDest(destName);
    setActivePage('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast({
      type: 'info',
      title: 'Destination Selected',
      message: `Pre-filled ${destName} into your trip planning wizard.`
    });
  };

  // 2. Generate Itinerary Flow
  const handleGenerateItinerary = async (preferences) => {
    setIsGenerating(true);
    try {
      const plan = await generateItineraryApi(preferences);
      setCurrentItinerary(plan);
      setIsGenerating(false);
      setActivePage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast({
        type: 'success',
        title: 'Itinerary Ready!',
        message: `Your customized ${plan.durationDays}-day plan for ${plan.destination} has been generated.`
      });
    } catch (err) {
      setIsGenerating(false);
      showToast({
        type: 'error',
        title: 'Generation Failed',
        message: err.message || 'Could not synthesize itinerary. Please try again.'
      });
    }
  };

  // 3. Save Active Trip
  const handleSaveActiveTrip = () => {
    if (!currentItinerary) return;
    const updatedList = saveTripToStorage(currentItinerary);
    setSavedTrips(updatedList);
    showToast({
      type: 'success',
      title: 'Trip Saved Successfully!',
      message: `${currentItinerary.destination} is now stored in My Trips.`
    });
  };

  // 4. Saved Trips Actions
  const handleViewTrip = (trip) => {
    setCurrentItinerary(trip);
    setActivePage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditTrip = (trip) => {
    setWizardInitialDest(trip.destination);
    setActivePage('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateTrip = (trip) => {
    const dup = {
      ...JSON.parse(JSON.stringify(trip)),
      tripId: `trip-${Date.now()}`,
      destination: `${trip.destination} (Copy)`,
      createdAt: new Date().toISOString()
    };
    const updatedList = saveTripToStorage(dup);
    setSavedTrips(updatedList);
    showToast({
      type: 'info',
      title: 'Trip Duplicated',
      message: `Created a copy of ${trip.destination} for experimentation.`
    });
  };

  const handleDeleteTrip = (tripId) => {
    const updatedList = deleteTripFromStorage(tripId);
    setSavedTrips(updatedList);
    showToast({
      type: 'info',
      title: 'Trip Removed',
      message: 'Saved itinerary was deleted.'
    });
  };

  // 5. Interactive Revision & Feedback Loop (Section 9)
  const handleFeedbackAction = async (actionType) => {
    if (!currentItinerary) return;

    if (actionType === 'looks_good') {
      showToast({
        type: 'success',
        title: 'Glad You Like It!',
        message: 'You can now save this trip, print it, or inspect the budget breakdown.'
      });
      return;
    }

    if (actionType === 'more_budget_friendly') {
      try {
        const opt = await optimizeBudgetApi(currentItinerary);
        if (opt.optimizedExpenseBreakdown) {
          const updatedPlan = JSON.parse(JSON.stringify(currentItinerary));
          updatedPlan.budgetSummary.expenseBreakdown = opt.optimizedExpenseBreakdown;
          updatedPlan.budgetSummary.totalEstimatedCost = opt.optimizedTotal;
          updatedPlan.budgetSummary.remainingBudget = opt.newRemaining;
          updatedPlan.budgetSummary.budgetStatus = opt.newRemaining < 0 ? 'over_budget' : 'on_budget';
          setCurrentItinerary(updatedPlan);
          showToast({
            type: 'success',
            title: 'Budget Optimized',
            message: `Trimmed expenses by ₹${opt.totalSavings?.toLocaleString('en-IN')}! Total is now ₹${opt.optimizedTotal?.toLocaleString('en-IN')}.`
          });
        }
      } catch (e) {
        showToast({ type: 'error', title: 'Error', message: 'Could not optimize budget.' });
      }
      return;
    }

    if (actionType === 'more_adventure') {
      const newInterests = Array.from(new Set([...(currentItinerary.interests || []), 'Adventure']));
      handleGenerateItinerary({
        ...currentItinerary,
        interests: newInterests,
        travelStyle: 'Adventure-Focused'
      });
      return;
    }

    if (actionType === 'relaxed_pace') {
      handleGenerateItinerary({
        ...currentItinerary,
        travelStyle: 'Relaxed'
      });
      return;
    }

    if (actionType === 'more_local_food') {
      const newInterests = Array.from(new Set([...(currentItinerary.interests || []), 'Local Food']));
      handleGenerateItinerary({
        ...currentItinerary,
        interests: newInterests
      });
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222820] font-sans selection:bg-[#244C3A] selection:text-white">
      
      {/* Global Header with Transparent Video Overlay & Scroll States */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        savedTripsCount={savedTrips.length}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Dynamic View Content */}
      <ErrorBoundary onReset={() => setActivePage('home')}>
        <main className={`flex-1 w-full ${activePage === 'home' ? '' : 'pt-20'}`}>
          {activePage === 'home' && (
            <LandingPage
              onStartPlanning={handleStartPlanning}
              onExploreDestinations={() => { setActivePage('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onSelectDestinationForTrip={handleSelectDestinationForTrip}
            />
          )}

          {activePage === 'wizard' && (
            <TripWizard
              initialDestination={wizardInitialDest}
              onGenerate={handleGenerateItinerary}
              isLoading={isGenerating}
            />
          )}

          {activePage === 'results' && (
            <ItineraryResults
              itinerary={currentItinerary}
              onSaveTrip={handleSaveActiveTrip}
              onEditPreferences={() => { setActivePage('wizard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onRegenerate={() => handleGenerateItinerary(currentItinerary)}
              onViewBudget={() => { setActivePage('budget'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onUpdateItinerary={setCurrentItinerary}
              onApplyFeedback={handleFeedbackAction}
              showToast={showToast}
            />
          )}

          {activePage === 'budget' && (
            <BudgetPlanner
              itinerary={currentItinerary}
              onUpdateItinerary={setCurrentItinerary}
              showToast={showToast}
              onNavigateToWizard={handleStartPlanning}
            />
          )}

          {activePage === 'explore' && (
            <DestinationExplorer
              onSelectDestinationForTrip={handleSelectDestinationForTrip}
            />
          )}

          {activePage === 'my-trips' && (
            <MyTrips
              savedTrips={savedTrips}
              onViewItinerary={handleViewTrip}
              onEditTrip={handleEditTrip}
              onDuplicateTrip={handleDuplicateTrip}
              onDeleteTrip={handleDeleteTrip}
              onStartPlanning={handleStartPlanning}
            />
          )}

          {activePage === 'profile' && (
            <UserProfile
              showToast={showToast}
              onPreferencesUpdated={(prof) => {
                showToast({
                  type: 'info',
                  title: 'Default Profile Updated',
                  message: `Origin set to ${prof.startingCity || 'Indore'}.`
                });
              }}
            />
          )}

          {activePage === 'academic' && (
            <AcademicShowcase
              onNavigateToWizard={handleStartPlanning}
              onNavigateToResults={() => setActivePage('results')}
            />
          )}
        </main>
      </ErrorBoundary>

      {/* Global Luxury Footer */}
      <Footer
        onOpenAiInfo={() => setAiInfoModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
        setActivePage={setActivePage}
      />

      {/* Global Feedback Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToJoin={() => {
          setLoginModalOpen(false);
          setJoinModalOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Join SAIR Modal */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onSwitchToLogin={() => {
          setJoinModalOpen(false);
          setLoginModalOpen(true);
        }}
        onJoinSuccess={handleLoginSuccess}
      />

      {/* About SAIR Modal */}
      <Modal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title="About SAIR — Journeys Made Simple"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#222820] leading-relaxed text-left">
          <p>
            <strong>SAIR (सैर)</strong> was born out of a desire to replace overwhelmed travel planning with calm, thoughtful discovery.
          </p>
          <p>
            Traditional travel booking turns holiday dreams into endless browser tabs, confusing rates, and generic tourist traps. SAIR harnesses human-centered AI to synthesize your genuine travel pace, budget ceiling, and curiosity into an authentic, day-wise narrative.
          </p>
          <div className="p-4 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] space-y-2">
            <h5 className="font-bold text-[#244C3A]">Our Three Core Principles</h5>
            <ul className="list-disc pl-4 space-y-1 text-xs text-[#6D756E]">
              <li><strong>Paced Travel:</strong> We deliberately limit daily activities to prevent exhaustion.</li>
              <li><strong>Realistic Math:</strong> Estimated expenses include transit, accommodations, and an 8% buffer.</li>
              <li><strong>Cultural Reverence:</strong> Promoting mindful heritage exploration and regional artisans.</li>
            </ul>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setAboutModalOpen(false)}
              className="px-5 py-2 rounded-full bg-[#244C3A] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Terms & Privacy Modal */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="Terms of Use & Privacy Statement"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#222820] leading-relaxed text-left">
          <p>
            Welcome to SAIR. By exploring itineraries and utilizing our planning tools, you acknowledge that all travel recommendations, route suggestions, and budget estimates are generated for educational planning demonstration.
          </p>
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#244C3A]">Privacy & Data Retention</h5>
          <p className="text-xs text-[#6D756E]">
            SAIR does not sell, track, or commercialize your personal travel preferences. All saved trips and customized itineraries are stored directly within your local browser storage (`localStorage`), giving you complete ownership over your data.
          </p>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setTermsModalOpen(false)}
              className="px-5 py-2 rounded-full bg-[#244C3A] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Understood
            </button>
          </div>
        </div>
      </Modal>

      {/* AI Limitations & System Info Modal (Section 17) */}
      <Modal
        isOpen={aiInfoModalOpen}
        onClose={() => setAiInfoModalOpen(false)}
        title="AI Architecture, Transparency & System Limitations"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#222820] leading-relaxed text-left">
          
          <div className="p-4 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF] space-y-1">
            <div className="font-bold text-[#244C3A] flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#244C3A]" />
              <span>Current Engine Status</span>
            </div>
            <p className="text-xs text-[#6D756E]">
              {serverHealth?.activeEngine || 'Transparent Rule-Based Recommendation Engine with Verified Indian Travel Matrices'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#222820] text-sm mb-1">
              AI-Receptive Design Philosophy
            </h4>
            <p className="text-xs text-[#6D756E]">
              SAIR combines Generative AI language modeling with rigorous deterministic heuristic calculation. Rather than allowing an LLM to hallucinate flight ticket numbers or invent impossible bus timings, all financial calculations (transport, accommodation, dining, 8% contingency buffer) are mathematically calculated and verified.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#EEE9DF]">
            <h4 className="font-bold text-[#222820] text-sm">
              Acknowledged Limitations & Ethical Guidelines
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6D756E]">
              <li>
                <strong>Estimated Pricing:</strong> All Rupee amounts represent planning simulations, not binding quotes or verified live ticket bookings.
              </li>
              <li>
                <strong>Independent Verification:</strong> Users must verify current monument opening days, weather road closures, and official train seat availability.
              </li>
              <li>
                <strong>Data Provenance:</strong> Curated knowledge profiles reflect authentic travel conditions for destinations like Udaipur, Jaipur, Goa, Manali, Rishikesh, and Kerala.
              </li>
              <li>
                <strong>Zero Hallucinated Live Connections:</strong> We do not claim live connections to external booking portals when using prototype simulations.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#EEE9DF] flex items-center justify-end">
            <button
              onClick={() => setAiInfoModalOpen(false)}
              className="px-5 py-2 rounded-full bg-[#244C3A] text-white text-xs font-bold hover:bg-[#163A2B]"
            >
              Understood
            </button>
          </div>

        </div>
      </Modal>

    </div>
  );
}
