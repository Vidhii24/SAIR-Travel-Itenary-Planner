import React from 'react';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer({ 
  onOpenAiInfo, 
  setActivePage,
  onOpenAbout,
  onOpenTerms,
  onOpenContact
}) {
  const handleNav = (sectionOrPage) => {
    if (sectionOrPage === 'destinations' || sectionOrPage === 'explore') {
      setActivePage('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionOrPage === 'wizard') {
      setActivePage('wizard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionOrPage === 'budget') {
      setActivePage('budget');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionOrPage === 'my-trips') {
      setActivePage('my-trips');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionOrPage === 'academic') {
      setActivePage('academic');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById(sectionOrPage);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#163A2B] text-white pt-20 pb-12 border-t border-[#244C3A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10 text-left">
          
          {/* Column 1: SAIR Brand Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="SAIR Logo" 
                className="w-11 h-11 rounded-full object-cover ring-1 ring-white/30"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-2xl text-white tracking-wider">
                    SAIR
                  </span>
                  <span className="text-xs text-[#C98262] font-medium tracking-[0.2em]">
                    सैर
                  </span>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#A3B49A] uppercase -mt-0.5">
                  Journeys Made Simple
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A3B49A] leading-relaxed max-w-sm font-light">
              An AI-powered, human-centered travel companion creating personalized, balanced itineraries that honor your budget, interests, and curiosity.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-[#A3B49A]">
              <ShieldCheck className="w-4 h-4 text-[#C98262]" />
              <span>Transparent AI-Receptive System · Deterministic Budgets</span>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-[#A3B49A] font-light">
              <li>
                <button 
                  onClick={() => handleNav('discover')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Discover
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('destinations')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('experiences')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Experiences
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('journal')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Travel Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: PLAN */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
              Plan
            </h4>
            <ul className="space-y-3 text-sm text-[#A3B49A] font-light">
              <li>
                <button 
                  onClick={() => handleNav('wizard')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Plan a Trip
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('my-trips')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Trips
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('budget')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Budget Planner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('ai-planner')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How AI Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & LEGAL */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
              About & Legal
            </h4>
            <ul className="space-y-3 text-sm text-[#A3B49A] font-light">
              <li>
                <button 
                  onClick={onOpenAbout} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About SAIR
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAiInfo} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Transparency & Limitations
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Use & Privacy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('academic')} 
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Academic Dossier</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Editorial Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3B49A] font-light">
          <p>© {new Date().getFullYear()} SAIR — Journeys Made Simple. All rights reserved.</p>
          <p className="tracking-wide">
            Designed for thoughtful travelers &middot; Rooted in Human-Centered Design
          </p>
        </div>

      </div>
    </footer>
  );
}
