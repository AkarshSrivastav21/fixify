import React, { useState, useEffect } from "react";
import {
  Briefcase, TrendingUp, DollarSign, Calendar, Users,
  Shield, CheckCircle, BarChart3, Clock, Zap, Star,
  Award, Target, Handshake, Rocket
} from "lucide-react";
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from "lucide-react";
import ProviderNav from "./ProviderNav"; // Navbar
import axios from "axios";

const ProviderLanding = () => {
  const [stats, setStats] = useState({
    totalProviders: 0,
    totalBookings: 0,
    avgRating: 4.8,
    completedBookings: 0,
    testimonials: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderStats();
  }, []);

  const fetchProviderStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/provider-stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching provider stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Rocket, title: "Launch Your Career", desc: "Join India's fastest growing home services platform with unlimited earning potential", color: "from-blue-900 to-indigo-800", iconColor: "from-indigo-600 to-blue-700" },
    { icon: Target, title: "Targeted Customers", desc: "Connect with customers who are actively looking for your specific services", color: "from-emerald-900 to-green-800", iconColor: "from-green-600 to-emerald-700" },
    { icon: Award, title: "Build Your Brand", desc: "Establish yourself as a trusted professional with verified reviews and ratings", color: "from-purple-900 to-violet-800", iconColor: "from-violet-600 to-purple-700" },
    { icon: DollarSign, title: "Guaranteed Payments", desc: "Secure and instant payments with zero transaction fees for providers", color: "from-orange-900 to-red-800", iconColor: "from-red-600 to-orange-700" },
    { icon: Calendar, title: "Smart Scheduling", desc: "AI-powered booking system that optimizes your schedule for maximum efficiency", color: "from-teal-900 to-cyan-800", iconColor: "from-cyan-600 to-teal-700" },
    { icon: Handshake, title: "24/7 Support", desc: "Dedicated support team to help you grow your business and resolve any issues", color: "from-pink-900 to-rose-800", iconColor: "from-rose-600 to-pink-700" },
  ];

  const displayStats = [
    { number: loading ? "..." : `${stats.totalProviders}+`, label: "Active Providers", icon: Users },
    { number: loading ? "..." : `${stats.totalBookings}+`, label: "Total Bookings", icon: Calendar },
    { number: loading ? "..." : `${stats.avgRating}★`, label: "Average Rating", icon: Star },
    { number: loading ? "..." : `${Math.round((stats.completedBookings / stats.totalBookings) * 100) || 95}%`, label: "Success Rate", icon: CheckCircle },
  ];

  const displayTestimonials = stats.testimonials.length > 0 ? stats.testimonials.slice(0, 3).map(t => ({
    name: t.userId?.fullname ? `${t.userId.fullname.firstname} ${t.userId.fullname.lastname}` : "Verified User",
    feedback: t.comment,
    rating: t.rating,
    profession: t.providerId?.profession || "Service Provider"
  })) : [
    { name: "Rajesh Kumar", feedback: "Fixify transformed my plumbing business! I now get 5-10 bookings daily.", rating: 5, profession: "Plumber" },
    { name: "Priya Sharma", feedback: "The best platform for home service providers. Payments are always on time!", rating: 5, profession: "House Cleaner" },
    { name: "Amit Singh", feedback: "Professional support and genuine customers. My income doubled in 3 months!", rating: 5, profession: "Electrician" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <ProviderNav />

      {/* HERO SECTION */}
      <section className="relative py-20 px-4 min-h-screen flex items-center bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-gray-800/95 to-slate-900/95"></div>

        {/* Hero Content */}
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex p-6 bg-emerald-500/20 backdrop-blur-md rounded-3xl mb-8 animate-pulse-glow border border-emerald-400/30 shadow-2xl">
            <Briefcase className="w-20 h-20 text-emerald-200" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            Your Business.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-200 animate-gradient">
              Your Success.
            </span>
          </h1>
          <p className="text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium">
            Join thousands of service professionals earning more and growing their business with real-time bookings and powerful tools.
          </p>
          <button className="px-12 py-5 rounded-full font-bold text-xl text-emerald-950 bg-white shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 inline-flex items-center gap-3 animate-pulse-glow">
            <Zap className="w-7 h-7 text-emerald-600" />
            Start Earning Today - It's Free
          </button>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {displayStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-emerald-500/15 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/30 hover:bg-emerald-500/25 hover:border-emerald-400/50 transition-all duration-300 shadow-xl group">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8 text-emerald-200 group-hover:text-white transition-colors" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-4xl font-black text-white mb-2 drop-shadow-lg">{stat.number}</div>
                  <div className="text-emerald-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 to-gray-800/30"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              Why Choose Fixify?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build a successful service business in one powerful platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className={`group p-8 rounded-3xl border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br ${benefit.color} text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr ${benefit.iconColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{benefit.title}</h3>
                  <p className="text-white/90 leading-relaxed relative z-10">{benefit.desc}</p>
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-slate-800/50"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Real providers sharing their journey with Fixify
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayTestimonials.map((t, i) => (
              <div key={i} className="group p-8 bg-slate-700/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-600/50">
                <div className="flex justify-center mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 mb-6 italic text-lg leading-relaxed">
                  "{t.feedback}"
                </p>
                <div className="border-t border-slate-600 pt-4">
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-indigo-400 font-medium capitalize">{t.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-4 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-gray-800/90"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-black mb-6 leading-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-300">
                Service Business
              </span>
            </h2>
            <p className="text-2xl mb-12 text-slate-200 leading-relaxed">
              Join {stats.totalProviders}+ successful providers earning more with Fixify's smart platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-12 py-5 rounded-full font-bold text-xl bg-white text-emerald-800 hover:bg-emerald-50 hover:scale-110 transition-all duration-300 shadow-2xl flex items-center gap-3">
                <Rocket className="w-6 h-6" />
                Start Earning Today
              </button>
              <button className="px-12 py-5 rounded-full font-bold text-xl border-2 border-white text-white hover:bg-white hover:text-emerald-800 transition-all duration-300">
                Learn More
              </button>
            </div>
            <div className="mt-12 flex justify-center items-center gap-8 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>No Registration Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Instant Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">Fixify</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Empowering service providers across India with cutting-edge technology.</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by {stats.totalProviders}+ providers</span>
            </div>
          </div>
          {/* For Providers */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">For Providers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500" />Join Platform</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2"><BarChart3 size={16} className="text-emerald-500" />Analytics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2"><Shield size={16} className="text-emerald-500" />Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2"><DollarSign size={16} className="text-emerald-500" />Earnings</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Phone size={16} className="text-emerald-600" />
                </div>
                +91 9876543210
              </div>
              <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-emerald-600" />
                </div>
                providers@fixify.com
              </div>
              <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-emerald-600" />
                </div>
                Lucknow, UP
              </div>
            </div>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={20} className="text-blue-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-100 hover:bg-sky-200 rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={20} className="text-sky-600" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={20} className="text-pink-600" />
              </a>
            </div>
            <p className="text-sm text-gray-500">Follow for updates & tips</p>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6">
          <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; 2024 Fixify. Empowering service providers nationwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProviderLanding;
