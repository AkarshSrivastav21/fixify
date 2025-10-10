import React from 'react';
import { 
  Users, Target, Award, Heart, Shield, Clock, 
  CheckCircle, Star, Zap, Phone, Mail, MapPin 
} from 'lucide-react';
import NavLinkContent from './NavLinkContent';

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Award, value: "10K+", label: "Service Providers" },
    { icon: CheckCircle, value: "100K+", label: "Services Completed" },
    { icon: Star, value: "4.9/5", label: "Average Rating" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "All our service providers are verified and background-checked for your peace of mind."
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get connected with professionals in minutes, not hours. Fast and reliable service."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to exceed expectations."
    },
    {
      icon: Zap,
      title: "Quality Service",
      description: "Premium quality work guaranteed. Professional standards maintained across all services."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      description: "10+ years experience in service industry"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
      description: "Expert in service quality management"
    },
    {
      name: "Amit Patel",
      role: "Technology Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
      description: "Building seamless digital experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavLinkContent />
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0047AB] via-[#007B89] to-[#10B981] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">About Fixify</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
            Connecting communities with trusted service professionals across India
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <Shield className="w-5 h-5" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <Clock className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#0047AB] to-[#10B981] rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded in 2023, Fixify was born from a simple idea: make it easy for people to find 
              reliable service professionals in their neighborhood. We started as a small team with 
              big dreams and have grown into India's trusted service marketplace.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 md:p-12 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  To bridge the gap between service seekers and skilled professionals, creating 
                  opportunities for growth while ensuring quality service delivery across India.
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the most trusted and comprehensive service platform, empowering 
                  millions of professionals and serving communities nationwide.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&q=80" 
                  alt="Team collaboration"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mb-6 bg-gradient-to-r from-[#0047AB] to-[#10B981] rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">The passionate people behind Fixify</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-[#10B981] font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0047AB] to-[#10B981] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Get In Touch</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Have questions or want to partner with us? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-white/90">+91 1800-FIXIFY</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-white/90">hello@fixify.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-white/90">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;