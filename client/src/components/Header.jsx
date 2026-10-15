import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Header({ 
  activePage, 
  setActivePage, 
  savedTripsCount = 0,
  currentUser = null,
  onOpenLogin,
  onOpenJoin,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = activePage === 'home' && !isScrolled;

  const handleLinkClick = (sectionOrPage) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);

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

    if (sectionOrPage === 'my-trips') {
      setActivePage('my-trips');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll to section on home page
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionOrPage);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionOrPage);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-white/95 backdrop-blur-md text-[#222820] border-b border-[#EEE9DF] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* LEFT: SAIR Logo and Gold Brand Mark */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img 
              src="/logo.png" 
              alt="SAIR — Journeys Made Simple" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20"
            />
            <div className="flex flex-col text-left">
              <span className={`font-serif text-2xl sm:text-3xl font-normal tracking-wider transition-colors ${
                isTransparent ? 'text-[#F3E7D3]' : 'text-[#222820] group-hover:text-[#244C3A]'
              }`}>
                SAIR
              </span>
              <span className={`text-[8.5px] sm:text-[9px] font-semibold tracking-[0.22em] uppercase -mt-0.5 transition-colors ${
                isTransparent ? 'text-[#F3E7D3]/80' : 'text-[#6D756E]'
              }`}>
                Journeys Made Simple
              </span>
            </div>
          </div>

          {/* CENTER: Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            <button
              onClick={() => handleLinkClick('discover')}
              className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer py-1 ${
                isTransparent 
                  ? 'text-white/90 hover:text-white' 
                  : 'text-[#222820]/80 hover:text-[#244C3A]'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => handleLinkClick('destinations')}
              className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer py-1 ${
                activePage === 'explore'
                  ? (isTransparent ? 'text-white font-bold' : 'text-[#244C3A] font-bold')
                  : (isTransparent ? 'text-white/90 hover:text-white' : 'text-[#222820]/80 hover:text-[#244C3A]')
              }`}
            >
              Destinations
            </button>

            <button
              onClick={() => handleLinkClick('experiences')}
              className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer py-1 ${
                isTransparent 
                  ? 'text-white/90 hover:text-white' 
                  : 'text-[#222820]/80 hover:text-[#244C3A]'
              }`}
            >
              Experiences
            </button>

            <button
              onClick={() => handleLinkClick('journal')}
              className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer py-1 ${
                isTransparent 
                  ? 'text-white/90 hover:text-white' 
                  : 'text-[#222820]/80 hover:text-[#244C3A]'
              }`}
            >
              Travel Journal
            </button>
          </nav>

          {/* RIGHT: Separator, Log In, Join SAIR, Plan a Trip */}
          <div className="hidden md:flex items-center gap-4 xl:gap-5">
            
            {/* Subtle Divider Line */}
            <div className={`h-4 w-px hidden lg:block ${isTransparent ? 'bg-white/30' : 'bg-[#EEE9DF]'}`} />

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                    isTransparent
                      ? 'border-white/30 bg-black/25 text-white hover:bg-black/40'
                      : 'border-[#EEE9DF] bg-[#F7F8F4] text-[#222820] hover:bg-[#EEE9DF]/60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#163A2B] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name || 'Member'}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-[#EEE9DF] py-2 text-left animate-in fade-in z-50 text-[#222820]">
                    <div className="px-4 py-2 border-b border-[#EEE9DF]">
                      <p className="text-xs font-bold truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-[#6D756E] truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => handleLinkClick('my-trips')}
                      className="w-full px-4 py-2 text-xs hover:bg-[#F7F8F4] flex items-center justify-between transition-colors"
                    >
                      <span>My Trips</span>
                      {savedTripsCount > 0 && (
                        <span className="text-[10px] bg-[#163A2B] text-white px-2 py-0.5 rounded-full font-bold">
                          {savedTripsCount}
                        </span>
                      )}
                    </button>
                    <div className="border-t border-[#EEE9DF] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full px-4 py-2 text-xs text-red-700 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer py-1 ${
                    isTransparent ? 'text-white hover:text-white/80' : 'text-[#222820] hover:text-[#244C3A]'
                  }`}
                >
                  Log In
                </button>

                <button
                  onClick={onOpenJoin}
                  className={`text-xs xl:text-[13px] font-medium tracking-[0.14em] uppercase px-5 py-2 rounded-full border transition-all cursor-pointer ${
                    isTransparent 
                      ? 'border-white/70 text-white hover:bg-white/10' 
                      : 'border-[#244C3A] text-[#244C3A] hover:bg-[#244C3A]/5'
                  }`}
                >
                  Join SAIR
                </button>
              </>
            )}

            {/* Deep Forest-Green Pill Action Button */}
            <button
              onClick={() => handleLinkClick('wizard')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md ${
                isTransparent
                  ? 'bg-[#163A2B]/90 hover:bg-[#163A2B] border border-white/20'
                  : 'bg-[#244C3A] hover:bg-[#163A2B]'
              }`}
            >
              <span>Plan a Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isTransparent 
                  ? 'text-white hover:bg-white/20' 
                  : 'text-[#222820] hover:bg-[#F7F8F4]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEE9DF] bg-white px-6 pt-5 pb-8 space-y-4 shadow-xl text-left animate-in fade-in duration-200 text-[#222820]">
          <div className="space-y-1 pb-3 border-b border-[#EEE9DF]">
            <button
              onClick={() => handleLinkClick('discover')}
              className="w-full text-left py-2.5 text-sm font-medium uppercase tracking-wide text-[#222820] hover:text-[#244C3A]"
            >
              Discover
            </button>
            <button
              onClick={() => handleLinkClick('destinations')}
              className="w-full text-left py-2.5 text-sm font-medium uppercase tracking-wide text-[#222820] hover:text-[#244C3A]"
            >
              Destinations
            </button>
            <button
              onClick={() => handleLinkClick('experiences')}
              className="w-full text-left py-2.5 text-sm font-medium uppercase tracking-wide text-[#222820] hover:text-[#244C3A]"
            >
              Experiences
            </button>
            <button
              onClick={() => handleLinkClick('journal')}
              className="w-full text-left py-2.5 text-sm font-medium uppercase tracking-wide text-[#222820] hover:text-[#244C3A]"
            >
              Travel Journal
            </button>
            <button
              onClick={() => handleLinkClick('my-trips')}
              className="w-full flex items-center justify-between py-2.5 text-sm font-medium uppercase tracking-wide text-[#222820] hover:text-[#244C3A]"
            >
              <span>My Trips</span>
              {savedTripsCount > 0 && (
                <span className="text-xs bg-[#163A2B] text-white px-2 py-0.5 rounded-full font-bold">
                  {savedTripsCount}
                </span>
              )}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF]">
                <div>
                  <p className="text-xs font-bold text-[#222820]">{currentUser.name}</p>
                  <p className="text-[11px] text-[#6D756E]">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="text-xs text-red-700 font-semibold cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="py-2.5 rounded-full border border-[#EEE9DF] text-xs font-semibold uppercase tracking-wider text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenJoin) onOpenJoin();
                  }}
                  className="py-2.5 rounded-full border border-[#244C3A] text-[#244C3A] text-xs font-semibold uppercase tracking-wider text-center"
                >
                  Join SAIR
                </button>
              </div>
            )}

            <button
              onClick={() => handleLinkClick('wizard')}
              className="w-full py-3 rounded-full bg-[#163A2B] text-white text-xs font-semibold uppercase tracking-wider text-center shadow-xs"
            >
              Plan a Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
