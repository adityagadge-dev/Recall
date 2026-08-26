import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { RecallLogo } from '../brand/RecallLogo';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Subjects', href: '#subjects' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Impact', href: '#impact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        // Need a slight delay to allow navigation before scrolling
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#323B4E]/30 bg-[#07080C]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group" onClick={(e) => handleNavClick(e as any, '#hero')}>
          <RecallLogo color="#F7F8FC" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold text-[#9AA4B8] hover:text-[#F7F8FC] hover:-translate-y-0.5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/creator/sign-in"
            className="text-sm font-bold text-[#9AA4B8] hover:text-[#F7F8FC] hover:-translate-y-0.5 transition-all duration-200"
          >
            Creators
          </Link>

          <Link
            to="/sign-in"
            className="group relative flex items-center gap-2 rounded-full bg-[#11151F] border border-[#323B4E] px-6 py-2.5 text-sm font-bold text-[#F7F8FC] hover:border-[#FF6B61] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,97,0.2)] hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B61] to-[#FFD166] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <span className="relative z-10">Start Game</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#9AA4B8] hover:bg-[#11151F] hover:text-[#F7F8FC]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#323B4E] bg-[#07080C] px-4 py-5 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block py-3 text-lg font-bold text-[#9AA4B8] hover:text-[#F7F8FC]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 border-t border-[#323B4E] flex flex-col gap-4">
            <Link
              to="/creator/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#323B4E] bg-[#11151F] py-3.5 text-base font-bold text-[#9AA4B8] hover:text-[#F7F8FC]"
            >
              <span>Creators</span>
            </Link>
            <Link
              to="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B61] to-[#FF4D5A] py-3.5 text-base font-bold text-white shadow-[0_0_15px_rgba(255,107,97,0.3)]"
            >
              <span>Start Game</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#1A2030] bg-[#07080C] text-[#9AA4B8] py-16 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6 md:col-span-1">
          <RecallLogo color="#F7F8FC" />
          <p className="text-sm text-[#687286] leading-relaxed pr-4 font-medium">
            Teaching what your school never did — one quest, one streak at a time.
          </p>
          <div className="text-xs text-[#323B4E] font-bold">
            © {new Date().getFullYear()} RECALL. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold text-[#323B4E] uppercase tracking-widest mb-6">Worlds</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#subjects" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Financial Literacy</a></li>
            <li><a href="#subjects" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Digital Safety</a></li>
            <li><a href="#subjects" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">First Aid</a></li>
            <li><a href="#subjects" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Communication</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-[#323B4E] uppercase tracking-widest mb-6">System</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#how-it-works" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">How Recall Works</a></li>
            <li><a href="#impact" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Impact Metrics</a></li>
            <li><Link to="/creator" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Creator Network</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-xs font-bold text-[#323B4E] uppercase tracking-widest mb-6">Action</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/sign-in" className="hover:text-[#FF6B61] hover:translate-x-1 inline-block transition-transform text-[#F7F8FC] font-bold">Start Playing</Link></li>
            <li><Link to="/creator/sign-in" className="hover:text-[#F7F8FC] hover:translate-x-1 inline-block transition-transform">Creator Login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
