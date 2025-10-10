import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 backdrop-blur-xl border-t border-primary-200/50 text-primary-900 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">

        {/* Enhanced Logo & About */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-600 to-secondary-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-primary-700 to-secondary-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">Fixify</h2>
          </div>
          <p className="text-secondary-700 leading-relaxed">
            Your trusted partner for hassle-free home services.
            Book plumbers, electricians, cleaners, and more with just one click.
          </p>
        </div>

        {/* Enhanced Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-primary-800 mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 font-medium">Home</Link></li>
            <li><Link to="/services" className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 font-medium">Services</Link></li>
            <li><Link to="/about" className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 font-medium">About Us</Link></li>
            <li><a href="mailto:support@fixify.com" className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 font-medium">Contact</a></li>
          </ul>
        </div>

        {/* Enhanced Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-primary-800 mb-6">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-secondary-600 hover:text-primary-800 transition-colors duration-300">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Phone size={16} className="text-primary-700"/>
              </div>
              <span className="font-medium">+91 9876543210</span>
            </li>
            <li className="flex items-center gap-3 text-secondary-600 hover:text-primary-800 transition-colors duration-300">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <Mail size={16} className="text-secondary-700"/>
              </div>
              <span className="font-medium">support@fixify.com</span>
            </li>
            <li className="flex items-center gap-3 text-secondary-600 hover:text-primary-800 transition-colors duration-300">
              <div className="p-2 bg-accent-100 rounded-lg">
                <MapPin size={16} className="text-accent-700"/>
              </div>
              <span className="font-medium">Lucknow, Uttar Pradesh</span>
            </li>
          </ul>
        </div>

        {/* Enhanced Socials */}
        <div>
          <h3 className="text-xl font-bold text-primary-800 mb-6">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com/fixify" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary-100 rounded-xl hover:bg-primary-200 transition-all duration-300 transform hover:scale-110">
              <Facebook size={20} className="text-primary-700"/>
            </a>
            <a href="https://twitter.com/fixify" target="_blank" rel="noopener noreferrer" className="p-3 bg-secondary-100 rounded-xl hover:bg-secondary-200 transition-all duration-300 transform hover:scale-110">
              <Twitter size={20} className="text-secondary-700"/>
            </a>
            <a href="https://instagram.com/fixify" target="_blank" rel="noopener noreferrer" className="p-3 bg-accent-100 rounded-xl hover:bg-accent-200 transition-all duration-300 transform hover:scale-110">
              <Instagram size={20} className="text-accent-700"/>
            </a>
          </div>

          {/* Newsletter signup */}
          <div className="mt-8">
            <p className="text-sm text-secondary-600 mb-3">Stay updated with our latest offers</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-white/80 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button 
                onClick={() => alert('Thank you for subscribing! We will keep you updated.')}
                className="px-4 py-2 bg-gradient-to-r from-primary-700 to-secondary-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="relative border-t border-primary-200/50 text-center py-6">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
          <p className="text-secondary-600 font-medium">
            © {new Date().getFullYear()} Fixify. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" onClick={() => alert('Privacy Policy: We protect your data and privacy.')} className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 text-sm font-medium">Privacy Policy</a>
            <a href="#" onClick={() => alert('Terms of Service: Please read our terms and conditions.')} className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 text-sm font-medium">Terms of Service</a>
            <a href="#" onClick={() => alert('Cookie Policy: We use cookies to improve your experience.')} className="text-secondary-600 hover:text-primary-800 transition-colors duration-300 text-sm font-medium">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
