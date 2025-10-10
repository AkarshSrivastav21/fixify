import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, LogOut, BarChart3, User, Wrench } from "lucide-react";

const ProviderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("utilityData");
    localStorage.removeItem("token");
    navigate("/");
  };

  const NavItem = ({ to, label, icon: Icon }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <Link
        to={to}
        className="relative px-5 py-2.5 rounded-full font-bold transition-all duration-500 transform"
        style={{
          color: hovered ? "#fff" : "#065f46",
          background: hovered
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "transparent",
          boxShadow: hovered
            ? "0 8px 32px rgba(16, 185, 129, 0.4), 0 0 0 3px rgba(16, 185, 129, 0.1)"
            : "none",
          transform: hovered ? "translateY(-2px) scale(1.05)" : "translateY(0)"
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
          {hovered && <Sparkles className="w-4 h-4 animate-pulse" />}
        </span>
        {hovered && (
          <span
            className="absolute inset-0 rounded-full opacity-50 blur-xl"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(99,102,241,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left: Static Logo */}
          <Link to="/provider-landing" className="flex items-center space-x-2">
                        <span className="text-2xl font-extrabold text-white tracking-tight">
              Fixify
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-3">
            <NavItem to="/provider-board" label="Dashboard" icon={BarChart3} />
            <NavItem to="/provider-landing" label="Home" icon={Wrench} />
           
          </div>

          {/* Right: Logout Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="relative px-5 py-2.5 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                boxShadow: "0 8px 24px rgba(239,68,68,0.4)"
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl transition-all duration-300"
              style={{
                background: isMenuOpen
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "rgba(16,185,129,0.15)",
                boxShadow: isMenuOpen
                  ? "0 8px 24px rgba(16,185,129,0.4)"
                  : "none"
              }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-emerald-600" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden border-t animate-slide-down"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.98) 100%)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(16,185,129,0.15)"
            }}
          >
            <div className="flex flex-col p-6 space-y-3">
              <Link
                to="/provider-board"
                className="py-3 px-5 rounded-xl font-bold text-slate-200 transition-all duration-300 hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/provider-landing"
                className="py-3 px-5 rounded-xl font-bold text-slate-200 transition-all duration-300 hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>

              <button
                onClick={handleLogout}
                className="w-full py-3 px-5 rounded-xl font-bold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  boxShadow: "0 8px 24px rgba(239,68,68,0.4)"
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default ProviderNav;
