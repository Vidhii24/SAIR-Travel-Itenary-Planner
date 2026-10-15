import React, { useState, useEffect } from 'react';
import { 
  PieChart as PieIcon, 
  IndianRupee, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders, 
  RefreshCw, 
  Sparkles, 
  HelpCircle,
  Car,
  Bed,
  Utensils,
  Ticket,
  MapPin,
  ShoppingBag,
  Shield,
  Layers,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Legend 
} from 'recharts';
import { optimizeBudgetApi } from '../services/api';

const COLORS = ['#264638', '#8A9B7A', '#C98262', '#D4AF37', '#5A7D6C', '#747873', '#3D5A4C', '#A2A89F'];

export default function BudgetPlanner({ 
  itinerary, 
  onUpdateItinerary, 
  showToast,
  onNavigateToWizard
}) {
  if (!itinerary) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EBF0E7] text-[#264638] flex items-center justify-center mx-auto">
          <PieIcon className="w-8 h-8 stroke-[1.8]" />
        </div>
        <h2 className="font-serif text-3xl font-normal text-[#252A27]">No Active Trip Selected</h2>
        <p className="text-sm text-[#747873] max-w-md mx-auto font-light">
          Please curate an itinerary first or load a saved trip to view its intelligent expense breakdown and smart budget optimization.
        </p>
        <button
          onClick={onNavigateToWizard}
          className="px-7 py-3 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          Plan a Trip Now
        </button>
      </div>
    );
  }

  const {
    destination,
    durationDays = 3,
    travelers = 1,
    budgetSummary: initialBudgetSummary = {}
  } = itinerary;

  // Local state for editable expense categories (Test Case 7: Budget Modification)
  const [breakdown, setBreakdown] = useState(
    initialBudgetSummary.expenseBreakdown || {
      transportation: 1500,
      accommodation: 2500,
      food: 1800,
      activities: 800,
      localTravel: 500,
      shopping: 400,
      emergencyBuffer: 600,
      miscellaneous: 300
    }
  );

  const [userBudget, setUserBudget] = useState(initialBudgetSummary.userBudget || 8000);

  // Optimization Modal / Suggestions State
  const [optimizationData, setOptimizationData] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Keep breakdown in sync when itinerary changes
  useEffect(() => {
    if (itinerary?.budgetSummary?.expenseBreakdown) {
      setBreakdown(itinerary.budgetSummary.expenseBreakdown);
      setUserBudget(itinerary.budgetSummary.userBudget || 8000);
    }
  }, [itinerary]);

  // Recalculate totals immediately when user edits any category (Section 10 & Test Case 7)
  const totalEstimatedCost = Object.values(breakdown).reduce((a, b) => Number(a) + Number(b), 0);
  const remainingBudget = Number(userBudget) - totalEstimatedCost;
  const costPerPerson = Math.round(totalEstimatedCost / Math.max(1, travelers));
  const dailyAverageExpense = Math.round(totalEstimatedCost / Math.max(1, durationDays));
  const budgetStatus = remainingBudget < 0 ? 'over_budget' : 'on_budget';

  const handleExpenseChange = (category, value) => {
    const num = Math.max(0, Number(value) || 0);
    const updatedBreakdown = { ...breakdown, [category]: num };
    
    // Auto recalculate emergency buffer (8%) and misc (4%) if user changes core categories
    if (!['emergencyBuffer', 'miscellaneous'].includes(category)) {
      const coreSubtotal = (
        updatedBreakdown.transportation +
        updatedBreakdown.accommodation +
        updatedBreakdown.food +
        updatedBreakdown.activities +
        updatedBreakdown.localTravel +
        updatedBreakdown.shopping
      );
      updatedBreakdown.emergencyBuffer = Math.round(coreSubtotal * 0.08);
      updatedBreakdown.miscellaneous = Math.round(coreSubtotal * 0.04);
    }

    setBreakdown(updatedBreakdown);

    // Update parent itinerary
    const newTotal = Object.values(updatedBreakdown).reduce((a, b) => Number(a) + Number(b), 0);
    const newRemaining = Number(userBudget) - newTotal;
    
    const updatedPlan = JSON.parse(JSON.stringify(itinerary));
    updatedPlan.budgetSummary.expenseBreakdown = updatedBreakdown;
    updatedPlan.budgetSummary.totalEstimatedCost = newTotal;
    updatedPlan.budgetSummary.remainingBudget = newRemaining;
    updatedPlan.budgetSummary.costPerPerson = Math.round(newTotal / Math.max(1, travelers));
    updatedPlan.budgetSummary.dailyAverageExpense = Math.round(newTotal / Math.max(1, durationDays));
    updatedPlan.budgetSummary.budgetStatus = newRemaining < 0 ? 'over_budget' : 'on_budget';
    onUpdateItinerary(updatedPlan);
  };

  // Run Optimization Assistant
  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    try {
      const opt = await optimizeBudgetApi(itinerary);
      setOptimizationData(opt);
      setIsOptimizing(false);
      showToast({
        type: 'info',
        title: 'Optimization Plan Ready',
        message: `Identified ₹${opt.totalSavings?.toLocaleString('en-IN') || 0} in prospective savings.`
      });
    } catch (e) {
      setIsOptimizing(false);
      showToast({
        type: 'error',
        title: 'Optimization Error',
        message: 'Could not compute budget optimizations.'
      });
    }
  };

  // Accept Optimization Proposals (Informing the user and updating itinerary)
  const handleAcceptOptimization = () => {
    if (!optimizationData?.optimizedExpenseBreakdown) return;
    const newBreakdown = optimizationData.optimizedExpenseBreakdown;
    setBreakdown(newBreakdown);

    const updatedPlan = JSON.parse(JSON.stringify(itinerary));
    updatedPlan.budgetSummary.expenseBreakdown = newBreakdown;
    updatedPlan.budgetSummary.totalEstimatedCost = optimizationData.optimizedTotal;
    updatedPlan.budgetSummary.remainingBudget = optimizationData.newRemaining;
    updatedPlan.budgetSummary.costPerPerson = Math.round(optimizationData.optimizedTotal / Math.max(1, travelers));
    updatedPlan.budgetSummary.dailyAverageExpense = Math.round(optimizationData.optimizedTotal / Math.max(1, durationDays));
    updatedPlan.budgetSummary.budgetStatus = optimizationData.newRemaining < 0 ? 'over_budget' : 'on_budget';
    updatedPlan.budgetSummary.budgetWarning = null; // Cleared warning

    onUpdateItinerary(updatedPlan);
    setOptimizationData(null);
    showToast({
      type: 'success',
      title: 'Budget Optimized Successfully',
      message: `Saved ₹${optimizationData.totalSavings?.toLocaleString('en-IN')}! Total cost updated to ₹${optimizationData.optimizedTotal?.toLocaleString('en-IN')}.`
    });
  };

  const handleRejectOptimization = () => {
    setOptimizationData(null);
    showToast({
      type: 'info',
      title: 'Optimization Dismissed',
      message: 'Original budget allocations preserved.'
    });
  };

  // Chart data formatting
  const pieChartData = [
    { name: 'Transport', value: breakdown.transportation },
    { name: 'Stay', value: breakdown.accommodation },
    { name: 'Food', value: breakdown.food },
    { name: 'Activities', value: breakdown.activities },
    { name: 'Local Transit', value: breakdown.localTravel },
    { name: 'Shopping', value: breakdown.shopping },
    { name: 'Buffer (8%)', value: breakdown.emergencyBuffer },
    { name: 'Misc (4%)', value: breakdown.miscellaneous }
  ].filter(d => d.value > 0);

  const barComparisonData = [
    { name: 'User Budget', Amount: userBudget },
    { name: 'Estimated Total', Amount: totalEstimatedCost }
  ];

  const categoryMeta = [
    { key: 'transportation', label: 'Intercity Transport', icon: Car, tip: 'Trains, flights, or intercity cabs from origin' },
    { key: 'accommodation', label: 'Accommodation', icon: Bed, tip: 'Rooms for the duration of stay' },
    { key: 'food', label: 'Food & Dining', icon: Utensils, tip: 'Daily breakfast, lunch, and regional dinner' },
    { key: 'activities', label: 'Attractions & Entry', icon: Ticket, tip: 'Monuments, boat rides, museum admissions' },
    { key: 'localTravel', label: 'Local Travel / Autos', icon: MapPin, tip: 'Auto-rickshaws, cabs, metro, two-wheelers' },
    { key: 'shopping', label: 'Shopping & Souvenirs', icon: ShoppingBag, tip: 'Local handicrafts, textiles, spices' },
    { key: 'emergencyBuffer', label: 'Emergency Buffer (8%)', icon: Shield, tip: 'Contingency for medical or transit delays' },
    { key: 'miscellaneous', label: 'Misc & Tips (4%)', icon: Layers, tip: 'Bottled water, tips, luggage storage' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 text-left">
      
      {/* 1. Header & Quick Actions */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0E7] text-[#264638] text-[11px] font-bold uppercase tracking-wider">
              <PieIcon className="w-3.5 h-3.5 text-[#264638]" />
              <span>Smart Budget Planner</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252A27] tracking-tight mt-1">
              Expense Analysis: {destination}
            </h1>
            <p className="text-xs sm:text-sm text-[#747873] font-light">
              Interactive 8-category expense itemization with real-time recalculation and AI optimization.
            </p>
          </div>

          <button
            onClick={handleRunOptimization}
            disabled={isOptimizing}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8A9B7A]" />
            <span>{isOptimizing ? 'Analyzing Options...' : 'Optimize My Budget'}</span>
          </button>
        </div>

        {/* 2. Key Budget Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          
          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
            <div className="text-[#747873] text-xs font-medium">User Budget</div>
            <div className="text-lg font-serif font-bold text-[#252A27] mt-0.5">
              ₹{Number(userBudget).toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#747873] font-light">Stated Target</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
            <div className="text-[#747873] text-xs font-medium">Estimated Total</div>
            <div className="text-lg font-serif font-bold text-[#252A27] mt-0.5">
              ₹{totalEstimatedCost.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#747873] font-light">Sum of 8 Categories</div>
          </div>

          <div className={`p-4 rounded-2xl border ${
            remainingBudget >= 0 
              ? 'bg-[#EBF0E7]/60 border-[#8A9B7A]/40' 
              : 'bg-rose-50/60 border-rose-200'
          }`}>
            <div className={`text-xs font-medium ${remainingBudget >= 0 ? 'text-[#264638]' : 'text-rose-800'}`}>
              Remaining Budget
            </div>
            <div className={`text-lg font-serif font-bold mt-0.5 ${remainingBudget >= 0 ? 'text-[#264638]' : 'text-rose-900'}`}>
              {remainingBudget >= 0 ? `+₹${remainingBudget.toLocaleString('en-IN')}` : `-₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`}
            </div>
            <div className={`text-[11px] font-medium ${remainingBudget >= 0 ? 'text-[#264638]' : 'text-rose-700'}`}>
              {remainingBudget >= 0 ? 'Comfortable Surplus' : 'Plan Exceeds Budget!'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
            <div className="text-[#747873] text-xs font-medium">Cost Per Person</div>
            <div className="text-lg font-serif font-bold text-[#252A27] mt-0.5">
              ₹{costPerPerson.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#747873] font-light">For {travelers} Traveler(s)</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8]">
            <div className="text-[#747873] text-xs font-medium">Daily Average</div>
            <div className="text-lg font-serif font-bold text-[#252A27] mt-0.5">
              ₹{dailyAverageExpense.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#747873] font-light">Over {durationDays} Days</div>
          </div>

        </div>

      </div>

      {/* 3. Visual Charts Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pie Chart of Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#252A27]">
              Expense Distribution Breakdown
            </h3>
            <span className="text-xs text-[#747873] font-light">Categorical Share</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Color Legend Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-3 border-t border-[#E8E2D8]">
            {pieChartData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[#5A5F58] truncate font-light">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Comparison Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#252A27]">
              Budget vs Estimated Cost
            </h3>
            <span className="text-xs text-[#747873] font-light">Comparison</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barComparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5A5F58' }} />
                <YAxis tick={{ fontSize: 11, fill: '#5A5F58' }} />
                <Tooltip formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount']} />
                <Bar dataKey="Amount" fill="#264638" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF8F3] text-xs text-[#5A5F58] leading-relaxed border border-[#E8E2D8]">
            {remainingBudget >= 0 ? (
              <span className="text-[#264638] font-medium">
                ✓ Your plan fits safely within your allocated budget with an 8% emergency cushion.
              </span>
            ) : (
              <span className="text-rose-800 font-medium">
                ⚠️ Your estimated expenses exceed your budget by ₹{Math.abs(remainingBudget).toLocaleString('en-IN')}. Consider clicking "Optimize My Budget" above.
              </span>
            )}
          </div>
        </div>

      </div>

      {/* 4. Interactive Expense Category Editor (Test Case 7) */}
      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D8] pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#252A27]">
              Itemized Category Editor
            </h3>
            <p className="text-xs text-[#747873] font-light">
              Edit any category value below to immediately recalculate total trip expenses and remaining funds.
            </p>
          </div>
          <span className="text-xs font-medium text-[#264638] bg-[#EBF0E7] px-3 py-1 rounded-full">
            Live Calculations Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryMeta.map((cat) => {
            const Icon = cat.icon;
            const currentVal = breakdown[cat.key] || 0;
            return (
              <div 
                key={cat.key}
                className="p-4 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F3]/50 hover:bg-white hover:border-[#8A9B7A] transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#E8E2D8] text-[#264638] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#252A27]">{cat.label}</span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-[#747873]">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={currentVal}
                    onChange={(e) => handleExpenseChange(cat.key, e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-[#E8E2D8] text-sm font-bold text-[#252A27] focus:outline-none focus:ring-2 focus:ring-[#264638] bg-white"
                  />
                </div>

                <p className="text-[10px] text-[#747873] leading-snug line-clamp-1 font-light">
                  {cat.tip}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-xs text-[#747873] text-center font-light">
          *Note: Emergency contingency buffer (8%) and miscellaneous (4%) recalculate automatically to maintain sound fiscal resilience.
        </div>
      </div>

      {/* 5. BUDGET OPTIMIZATION PROPOSAL MODAL / DRAWER (Section 10) */}
      {optimizationData && (
        <div className="fixed inset-0 z-50 bg-[#252A27]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8E2D8] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-[#E8E2D8] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] text-[#C98262] text-[11px] font-bold uppercase tracking-wider mb-1 border border-[#E8E2D8]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C98262]" />
                  <span>Proposed Budget Adjustments</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#252A27]">
                  Save Up to ₹{optimizationData.totalSavings?.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-[#747873] font-light">
                  We identified actionable adjustments that keep your trip comfortable while cutting costs.
                </p>
              </div>
              <button
                onClick={handleRejectOptimization}
                className="p-1 rounded-lg text-[#747873] hover:text-[#252A27]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Before vs After Summary */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D8] text-xs">
              <div>
                <span className="text-[#747873] font-medium block mb-0.5">Current Total Cost</span>
                <span className="text-base font-serif font-bold text-[#747873] line-through">
                  ₹{optimizationData.originalTotal?.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[#264638] font-semibold block mb-0.5">Optimized Total Cost</span>
                <span className="text-lg font-serif font-bold text-[#264638]">
                  ₹{optimizationData.optimizedTotal?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Suggestions List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252A27]">
                Actionable Optimization Details
              </h4>

              {optimizationData.suggestions?.map((sug, i) => (
                <div key={i} className="p-4 rounded-2xl border border-[#E8E2D8] bg-white space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#252A27]">{sug.title}</span>
                    <span className="text-xs font-bold text-[#264638] bg-[#EBF0E7] px-2.5 py-0.5 rounded-full">
                      Save ₹{sug.savingAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5F58] leading-relaxed font-light">
                    {sug.description}
                  </p>
                  <div className="text-[11px] text-[#264638] font-medium">
                    Travel Experience Impact: {sug.impact}
                  </div>
                </div>
              ))}
            </div>

            {/* Accept or Reject Buttons */}
            <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end gap-3">
              <button
                onClick={handleRejectOptimization}
                className="px-5 py-2.5 rounded-full border border-[#E8E2D8] hover:bg-[#FAF8F3] text-[#252A27] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reject Changes
              </button>
              <button
                onClick={handleAcceptOptimization}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#264638] hover:bg-[#1A3228] text-[#FAF8F3] text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#8A9B7A]" />
                <span>Apply Optimization</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
