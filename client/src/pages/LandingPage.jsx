import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Sparkles, 
  Compass, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  CheckCircle2, 
  Sliders, 
  PieChart, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { StoryReaderModal } from '../components/AuthModals';

// Curated destinations for Section 7
const DISCOVER_DESTINATIONS = [
  {
    id: 'udaipur',
    name: 'Udaipur',
    region: 'Rajasthan · Lake City',
    image: '/images/hero-udaipur.jpg',
    desc: 'Lakeside palaces, marble courtyards, and tranquil sunsets reflected on Lake Pichola.'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan · The Pink City',
    image: '/images/jaipur.jpg',
    desc: 'Regal fortresses, vibrant artisan bazaars, and timeless Rajput architecture.'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    region: 'South India · Backwaters',
    image: '/images/kerala.jpg',
    desc: 'Emerald palm lagoons, traditional houseboats, and misty tea estate slopes.'
  },
  {
    id: 'manali',
    name: 'Manali',
    region: 'Himachal Pradesh · Himalayas',
    image: '/images/manali.jpg',
    desc: 'Snow-capped alpine peaks, fragrant cedar valleys, and refreshing mountain trails.'
  },
  {
    id: 'goa',
    name: 'Goa',
    region: 'West Coast · Arabian Sea',
    image: '/images/goa.jpg',
    desc: 'Golden shoreline coves, colonial Portuguese quarters, and relaxed coastal culture.'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    region: 'Uttarakhand · Foothills',
    image: '/images/rishikesh.jpg',
    desc: 'Sacred riverbanks, yoga ashrams, and rejuvenating Himalayan breezes.'
  }
];

// Featured travel experiences for Section 8
const TRAVEL_EXPERIENCES = [
  {
    id: 'nature',
    title: 'Nature Escapes',
    desc: 'Breathe in wild serenity and pristine mountain horizons.',
    image: '/images/kerala.jpg',
    dest: 'Kerala'
  },
  {
    id: 'cultural',
    title: 'Cultural Journeys',
    desc: 'Immerse in centuries of living art, palaces, and royal folklore.',
    image: '/images/hero-udaipur.jpg',
    dest: 'Udaipur'
  },
  {
    id: 'coastal',
    title: 'Coastal Retreats',
    desc: 'Let the ocean rhythm and warm trade winds restore your ease.',
    image: '/images/goa.jpg',
    dest: 'Goa'
  },
  {
    id: 'mountain',
    title: 'Mountain Adventures',
    desc: 'Elevate your perspective along pine-forested alpine trails.',
    image: '/images/manali.jpg',
    dest: 'Manali'
  },
  {
    id: 'food',
    title: 'Food & Local Experiences',
    desc: 'Savor generational family recipes and fragrant bazaar flavors.',
    image: '/images/varanasi.jpg',
    dest: 'Jaipur'
  },
  {
    id: 'slow',
    title: 'Slow Travel',
    desc: 'Unwind without checklists and let each morning unfold naturally.',
    image: '/images/rishikesh.jpg',
    dest: 'Rishikesh'
  }
];

// Featured journeys for Section 10
const FEATURED_JOURNEYS = [
  {
    id: 'j1',
    title: 'A Heritage Weekend in Udaipur',
    destination: 'Udaipur',
    duration: '3 Days · 2 Nights',
    theme: 'Heritage & Royalty',
    budget: '₹14,500',
    image: '/images/hero-udaipur.jpg'
  },
  {
    id: 'j2',
    title: 'A Peaceful Escape to Kerala',
    destination: 'Kerala',
    duration: '4 Days · 3 Nights',
    theme: 'Backwaters & Houseboat',
    budget: '₹18,000',
    image: '/images/kerala.jpg'
  },
  {
    id: 'j3',
    title: 'A Mountain Retreat in Manali',
    destination: 'Manali',
    duration: '4 Days · 3 Nights',
    theme: 'Alpine Air & Valleys',
    budget: '₹12,500',
    image: '/images/manali.jpg'
  },
  {
    id: 'j4',
    title: 'A Cultural Journey through Jaipur',
    destination: 'Jaipur',
    duration: '3 Days · 2 Nights',
    theme: 'Forts & Royal Cuisine',
    budget: '₹11,000',
    image: '/images/jaipur.jpg'
  },
  {
    id: 'j5',
    title: 'A Coastal Break in Goa',
    destination: 'Goa',
    duration: '3 Days · 2 Nights',
    theme: 'Beaches & Latin Cafés',
    budget: '₹13,000',
    image: '/images/goa.jpg'
  }
];

// Editorial travel stories for Section 12
const TRAVEL_STORIES = [
  {
    id: 's1',
    title: 'The Timeless Beauty of Udaipur',
    category: 'Heritage & Culture',
    destination: 'Udaipur',
    image: '/images/hero-udaipur.jpg',
    desc: 'Watching morning light wash across Lake Pichola reveals why kings built their dreams in white marble.',
    readTime: '4 min read'
  },
  {
    id: 's2',
    title: 'Slow Mornings in Kerala',
    category: 'Mindful Travel',
    destination: 'Kerala',
    image: '/images/kerala.jpg',
    desc: 'A drifting houseboat through palm-lined backwaters offers a quiet cure for modern hurry.',
    readTime: '5 min read'
  },
  {
    id: 's3',
    title: 'Hidden Experiences in Rajasthan',
    category: 'Off the Beaten Path',
    destination: 'Jaipur',
    image: '/images/jaipur.jpg',
    desc: 'Beyond the grand fortresses lie tucked-away block-printing workshops and spice courtyards.',
    readTime: '4 min read'
  },
  {
    id: 's4',
    title: 'A Weekend in the Mountains',
    category: 'Alpine Retreats',
    destination: 'Manali',
    image: '/images/manali.jpg',
    desc: 'Crisp pine air, wooden chalets, and the timeless stillness of snow-crowned Himalayan valleys.',
    readTime: '3 min read'
  },
  {
    id: 's5',
    title: 'Discovering Local Food While Travelling',
    category: 'Culinary Journeys',
    destination: 'Jaipur',
    image: '/images/varanasi.jpg',
    desc: 'How authentic regional dining connects you more deeply to people than any museum ticket ever could.',
    readTime: '5 min read'
  }
];

export default function LandingPage({ 
  onStartPlanning, 
  onExploreDestinations, 
  onSelectDestinationForTrip
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleScrollToDiscover = () => {
    const el = document.getElementById('discover');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-[#222820] selection:bg-[#244C3A] selection:text-white">
      
      {/* ========================================================
          1. CINEMATIC HERO VIDEO SECTION (Matching User Mockup)
          ======================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#163A2B] text-white">
        
        {/* Background Aerial Ocean Waves Travel Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-ocean.jpg"
          className="w-full h-full object-cover absolute inset-0 z-0 scale-100 transition-transform duration-1000 ease-out"
        >
          <source src="/videos/hero-travel.webm" type="video/webm" />
        </video>

        {/* Cinematic Film Overlay Gradient Matching Mockup */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/35 pointer-events-none" />

        {/* Minimalist Sound Control in Bottom Right Corner */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-sm group"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 opacity-80 group-hover:opacity-100" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#A3B49A]" />
          )}
        </button>

        {/* Center Editorial Hero Content Matching Mockup Exactly */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6 pt-24 pb-16">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-xs">
            <span className="text-[11px] font-medium tracking-[0.25em] text-white uppercase">
              DISCOVER &bull; DREAM &bull; DEPART
            </span>
          </div>

          {/* Main Large Editorial Heading */}
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[0.98] tracking-tight text-white drop-shadow-md">
            Your world. <br />
            <span className="italic font-normal">Your way.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-light max-w-xl mx-auto drop-shadow-sm">
            Discover extraordinary places, create meaningful journeys, and let every adventure unfold at your own pace.
          </p>

          {/* Dual CTAs Matching Mockup */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={handleScrollToDiscover}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#F7F8F4] text-[#163A2B] text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4 text-[#163A2B]" />
            </button>

            <button
              onClick={onStartPlanning}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#163A2B]/85 hover:bg-[#163A2B] text-white text-xs font-semibold tracking-widest uppercase border border-white/25 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              Plan Your Journey
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          7. TRAVEL INSPIRATION / DISCOVER SECTION
          ======================================================== */}
      <section id="discover" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C98262] block">
            Curated Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Find your kind of escape
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-xl mx-auto">
            From quiet mountain retreats to vibrant cultural cities, discover places that stay with you.
          </p>

          {/* Large Editorial Destination Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-12 text-left">
            {DISCOVER_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestinationForTrip(dest.name)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#EEE9DF] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl flex flex-col"
              >
                {/* Image Container with Consistent Ratio */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#F7F8F4]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-white/80 block">
                      {dest.region}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-white">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Understated Explore CTA */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[#6D756E] leading-relaxed font-light">
                    {dest.desc}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#EEE9DF]">
                    <span className="text-xs font-semibold text-[#244C3A] group-hover:underline flex items-center gap-1.5">
                      Explore Destination
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-[11px] text-[#A3B49A]">Custom Plan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          8. FEATURED TRAVEL EXPERIENCES SECTION
          ======================================================== */}
      <section id="experiences" className="py-24 sm:py-32 bg-[#F7F8F4] border-y border-[#EEE9DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#244C3A] block">
            Ways to Explore
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Travel the way you feel
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-xl mx-auto">
            Whether drawn to wild mountains, heritage courtyards, or sunlit coasts, begin with what moves you.
          </p>

          {/* Visual Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12 text-left">
            {TRAVEL_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                onClick={() => onSelectDestinationForTrip(exp.dest)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-colors" />

                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white space-y-1.5">
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#EEE9DF] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed max-w-xs">
                    {exp.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs text-[#A3B49A] font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                    <span>Discover Experiences</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          9. INTRODUCING SAIR'S AI TRAVEL PLANNER
          ======================================================== */}
      <section id="ai-planner" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F8F4] border border-[#EEE9DF] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C98262]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#244C3A]">
              Personalized Intelligence
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Your next journey, thoughtfully planned.
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-2xl mx-auto">
            Tell us what inspires you, how you like to travel, and what you want to spend. SAIR helps turn your ideas into a personalized itinerary.
          </p>

          {/* 3 Clear Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-16 text-left">
            
            <div className="p-8 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF] space-y-4 hover:border-[#244C3A]/30 transition-colors">
              <span className="font-mono text-xs font-bold text-[#C98262] tracking-widest block">
                01
              </span>
              <h3 className="font-serif text-xl font-normal text-[#222820]">
                Share your preferences
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Choose your destination, budget, interests, and trip duration. We balance cultural immersion, relaxation, and local food.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF] space-y-4 hover:border-[#244C3A]/30 transition-colors">
              <span className="font-mono text-xs font-bold text-[#244C3A] tracking-widest block">
                02
              </span>
              <h3 className="font-serif text-xl font-normal text-[#222820]">
                Discover your itinerary
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Receive a balanced, day-wise travel plan with morning, afternoon, and evening slots designed to prevent travel exhaustion.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF] space-y-4 hover:border-[#244C3A]/30 transition-colors">
              <span className="font-mono text-xs font-bold text-[#8A9B7A] tracking-widest block">
                03
              </span>
              <h3 className="font-serif text-xl font-normal text-[#222820]">
                Make it yours
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Adjust activities with one click, explore alternative sights, and optimize spending before you set out.
              </p>
            </div>

          </div>

          <div className="pt-10">
            <button
              onClick={onStartPlanning}
              className="px-8 py-4 rounded-full bg-[#244C3A] hover:bg-[#163A2B] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-2.5 group"
            >
              <span>Plan with SAIR</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================
          10. FEATURED JOURNEYS
          ======================================================== */}
      <section id="journeys" className="py-24 sm:py-32 bg-[#F7F8F4] border-y border-[#EEE9DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C98262] block">
            Ready-Made Escapes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Journeys to inspire you
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-xl mx-auto">
            Thoughtfully structured travel routes with indicative budget estimates and verified pacing.
          </p>

          {/* Horizontal / Grid Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 text-left">
            {FEATURED_JOURNEYS.map((j) => (
              <div
                key={j.id}
                className="rounded-2xl overflow-hidden border border-[#EEE9DF] bg-white shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EEE9DF]">
                  <img
                    src={j.image}
                    alt={j.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#244C3A]">
                    Est. {j.budget}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-medium tracking-wide text-[#6D756E] block">
                      {j.duration} &middot; {j.theme}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-[#222820]">
                      {j.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#A3B49A] font-light">
                    *Estimated indicative budget includes transit, stays, and curated meals.
                  </p>

                  <button
                    onClick={() => onSelectDestinationForTrip(j.destination)}
                    className="w-full py-3 rounded-xl border border-[#244C3A] text-[#244C3A] hover:bg-[#244C3A] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group-hover:border-[#244C3A]"
                  >
                    <span>Explore Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          11. WHY TRAVEL WITH SAIR?
          ======================================================== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#244C3A] block">
            The SAIR Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Travel planning, made personal
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-xl mx-auto">
            Designed to free you from spreadsheet clutter and generic tourist traps.
          </p>

          {/* 4 Core Value Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-14 text-left">
            
            <div className="space-y-3 p-6 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF]">
              <div className="w-10 h-10 rounded-full bg-[#244C3A]/10 text-[#244C3A] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#222820]">
                Personalized Journeys
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Plans tailored to your genuine interests, travel style, and available time.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF]">
              <div className="w-10 h-10 rounded-full bg-[#244C3A]/10 text-[#244C3A] flex items-center justify-center">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#222820]">
                Thoughtful Budgeting
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Understand estimated expenses—from transit and lodging to meals—before you depart.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF]">
              <div className="w-10 h-10 rounded-full bg-[#244C3A]/10 text-[#244C3A] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#222820]">
                Flexible Itineraries
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Modify activities, swap plans, and adjust pacing whenever your mood changes.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-[#F7F8F4] border border-[#EEE9DF]">
              <div className="w-10 h-10 rounded-full bg-[#244C3A]/10 text-[#244C3A] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#222820]">
                Meaningful Discovery
              </h3>
              <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed">
                Explore destinations and experiences that truly match your unique travel rhythm.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          12. TRAVEL JOURNAL / STORIES
          ======================================================== */}
      <section id="journal" className="py-24 sm:py-32 bg-[#F7F8F4] border-t border-[#EEE9DF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C98262] block">
            The Travel Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#222820] tracking-tight">
            Stories that take you places
          </h2>
          <p className="text-sm sm:text-base text-[#6D756E] font-light max-w-xl mx-auto">
            Dispatches on slow travel, architectural heritage, and regional culinary traditions.
          </p>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 text-left">
            {TRAVEL_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#EEE9DF] bg-white shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EEE9DF]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-white">
                    {story.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-normal text-[#222820] group-hover:text-[#244C3A] transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6D756E] font-light leading-relaxed line-clamp-2">
                    {story.desc}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-[#EEE9DF]">
                    <span className="text-xs font-semibold text-[#244C3A] flex items-center gap-1">
                      Read Story &rarr;
                    </span>
                    <span className="text-[11px] text-[#A3B49A]">{story.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          13. STRONG CLOSING CTA SECTION
          ======================================================== */}
      <section className="relative py-28 sm:py-36 bg-[#163A2B] text-white overflow-hidden text-center">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src="/images/hero-udaipur.jpg" alt="Background" className="w-full h-full object-cover filter blur-xs" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#163A2B] via-[#163A2B]/90 to-[#163A2B]/80 z-0" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C98262] block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            Somewhere beautiful is waiting.
          </h2>
          <p className="text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-xl mx-auto">
            Let your next journey begin with SAIR. Tell us what you love and receive a personalized itinerary in seconds.
          </p>

          <div className="pt-4">
            <button
              onClick={onStartPlanning}
              className="px-9 py-4 rounded-full bg-white hover:bg-[#EEE9DF] text-[#163A2B] text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer inline-flex items-center gap-2.5 group"
            >
              <span>Plan Your Next Escape</span>
              <ArrowRight className="w-4 h-4 text-[#244C3A] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Story Reader Modal */}
      <StoryReaderModal
        isOpen={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
        story={selectedStory}
        onPlanTrip={(dest) => {
          setSelectedStory(null);
          onSelectDestinationForTrip(dest);
        }}
      />

    </div>
  );
}
