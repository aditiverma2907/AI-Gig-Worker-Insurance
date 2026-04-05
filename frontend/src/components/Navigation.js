import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './DesignSystem';

const Navigation = ({ isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="relative bg-[#2d3436] border-b-2 border-[#babecc] sticky top-0 z-50">
      <div className="max-w-prose mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white hover:text-[#ff4757] transition-colors"
        >
          <span className="text-2xl">🛡️</span>
          <span className="font-mono font-bold text-lg tracking-widest hidden sm:inline">
            SmartShield
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link to="/policies">
                <Button variant="ghost" size="sm">
                  Insurance
                </Button>
              </Link>
              <Link to="/claims">
                <Button variant="ghost" size="sm">
                  Claims
                </Button>
              </Link>
              <button onClick={handleLogout}>
                <Button variant="secondary" size="sm">
                  Logout
                </Button>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-[#ff4757] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2d3436] border-t-2 border-[#babecc] px-6 py-4 space-y-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block">
                <Button variant="secondary" size="md" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="primary" size="md" className="w-full">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block">
                <Button variant="secondary" size="md" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <Link to="/policies" className="block">
                <Button variant="secondary" size="md" className="w-full">
                  Insurance
                </Button>
              </Link>
              <Link to="/claims" className="block">
                <Button variant="secondary" size="md" className="w-full">
                  Claims
                </Button>
              </Link>
              <button onClick={handleLogout} className="block w-full">
                <Button variant="primary" size="md" className="w-full">
                  Logout
                </Button>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
