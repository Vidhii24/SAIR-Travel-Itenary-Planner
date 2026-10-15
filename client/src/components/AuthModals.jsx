import React, { useState } from 'react';
import { X, Eye, EyeOff, ShieldCheck, Check, ArrowRight, BookOpen } from 'lucide-react';
import Modal from './Modal';

export function LoginModal({ isOpen, onClose, onSwitchToJoin, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Prototype authentication: derive display name from email or stored profile
    const derivedName = email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const user = {
      email,
      name: derivedName,
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem('sair_user', JSON.stringify(user));
    onLoginSuccess(user);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="p-2 text-left space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F7F8F4] border border-[#EEE9DF] mb-1">
            <img src="/logo.png" alt="SAIR" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <h3 className="font-serif text-2xl text-[#222820] font-normal">
            Welcome to SAIR
          </h3>
          <p className="text-xs text-[#6D756E] font-light">
            Log in to revisit saved itineraries and custom trip budgets.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#222820] mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#222820] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#6D756E] hover:text-[#244C3A] flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#6D756E] pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-[#EEE9DF] text-[#244C3A] focus:ring-0" />
              <span>Remember me</span>
            </label>
            <span className="text-[11px] text-[#A3B49A]">Secure prototype session</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#244C3A] hover:bg-[#163A2B] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer mt-2"
          >
            Log In
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#EEE9DF]">
          <p className="text-xs text-[#6D756E]">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={onSwitchToJoin}
              className="font-semibold text-[#244C3A] hover:underline cursor-pointer ml-1"
            >
              Join SAIR
            </button>
          </p>
        </div>

      </div>
    </Modal>
  );
}

export function JoinModal({ isOpen, onClose, onSwitchToLogin, onJoinSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    const user = {
      name: name.trim(),
      email,
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem('sair_user', JSON.stringify(user));
    onJoinSuccess(user);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="p-2 text-left space-y-5">
        
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F7F8F4] border border-[#EEE9DF] mb-1">
            <img src="/logo.png" alt="SAIR" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <h3 className="font-serif text-2xl text-[#222820] font-normal">
            Join SAIR
          </h3>
          <p className="text-xs text-[#6D756E] font-light">
            Unlock thoughtful AI itineraries, custom travel budgets, and saved journeys.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#222820] mb-1 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aarav Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222820] mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aarav@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#222820] uppercase tracking-wider">
                Create Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#6D756E] hover:text-[#244C3A] flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222820] mb-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F7F8F4] border border-[#EEE9DF] text-sm text-[#222820] focus:outline-none focus:border-[#244C3A] focus:bg-white transition-colors"
            />
          </div>

          <p className="text-[11px] text-[#6D756E] font-light">
            By creating an account, you agree to SAIR's ethical travel principles and prototype demonstration guidelines.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#244C3A] hover:bg-[#163A2B] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer mt-1"
          >
            Create Account
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#EEE9DF]">
          <p className="text-xs text-[#6D756E]">
            Already a member?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-[#244C3A] hover:underline cursor-pointer ml-1"
            >
              Log In
            </button>
          </p>
        </div>

      </div>
    </Modal>
  );
}

export function StoryReaderModal({ isOpen, onClose, story, onPlanTrip }) {
  if (!story) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-3xl">
      <div className="space-y-6 text-left">
        
        {/* Story Hero Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#EEE9DF]">
          <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C98262] px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
              {story.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
              {story.title}
            </h2>
            <p className="text-xs text-white/80 font-light">
              By SAIR Editorial &middot; {story.readTime || '4 min read'}
            </p>
          </div>
        </div>

        {/* Story Body */}
        <div className="space-y-4 text-sm text-[#222820] leading-relaxed font-light px-2">
          {story.content ? (
            story.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))
          ) : (
            <>
              <p className="text-base font-serif italic text-[#244C3A]">
                "{story.desc}"
              </p>
              <p>
                Traveling slowly is an invitation to witness destinations not as hurried checklist items, but as living, breathing stories. In {story.destination || 'this region'}, the morning mist gives way to centuries of quiet rituals, fragrant spices, and architectural grandeur that commands your stillness.
              </p>
              <p>
                From lakeside chai vendors greeting the sunrise to the cool stone corridors of historic havelis, every corner offers an authentic dialogue with heritage and nature. SAIR's personalized planning engine weaves these quiet moments directly into your travel rhythm, reserving daylight for authentic encounters rather than rushed transit.
              </p>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#EEE9DF] flex items-center justify-between px-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-[#EEE9DF] text-xs font-semibold text-[#6D756E] hover:text-[#222820] cursor-pointer"
          >
            Close Story
          </button>

          <button
            onClick={() => {
              onClose();
              if (onPlanTrip) onPlanTrip(story.destination || 'Udaipur');
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#244C3A] hover:bg-[#163A2B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Plan This Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </Modal>
  );
}
