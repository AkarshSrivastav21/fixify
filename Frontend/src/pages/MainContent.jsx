import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Wrench, Plug, Snowflake, Hammer, Paintbrush, Star, 
  CheckCircle, Clock, Shield, Users, Briefcase, TrendingUp, 
  Award, Zap, Heart, ArrowRight, Phone, Mail, ChevronRight
} from "lucide-react";
import BookingModal from '../components/BookingModal';
import { UserDataContext } from '../context/UserContext';
import { ServiceCardShimmer } from '../components/ShimmerUI';
import axios from 'axios';

const MainContent = () => {
  const navigate = useNavigate();
  const { user: userData } = useContext(UserDataContext);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [serviceFeedbacks, setServiceFeedbacks] = useState({});
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Force shimmer display
  useEffect(() => {
    const timer = setTimeout(() => {
      setServicesLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const heroImages = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80'
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchServiceFeedbacks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/feedback/all`);
        if (response.data.success) {
          const feedbacksByCategory = {};
          response.data.feedbacks.forEach(feedback => {
            if (!feedbacksByCategory[feedback.serviceCategory]) {
              feedbacksByCategory[feedback.serviceCategory] = [];
            }
            feedbacksByCategory[feedback.serviceCategory].push(feedback);
          });
          setServiceFeedbacks(feedbacksByCategory);
          // Get top 3 feedbacks with proper user data
          const topFeedbacks = response.data.feedbacks.slice(0, 3);
          setAllFeedbacks(topFeedbacks);
          console.log('Setting allFeedbacks:', topFeedbacks);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        // Don't set loading false here, let the timer handle it
      }
    };
    fetchServiceFeedbacks();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { 
      icon: Wrench, 
      title: "Plumbing", 
      name: "Plumbing",
      category: "plumber",
      desc: "Professional plumbing services for repairs, installations, and emergencies", 
      description: "Professional plumbing services for repairs, installations, and emergencies",
      color: "from-[#0047AB] to-[#10B981]",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80",
      jobs: "1,250+",
      price: 500,
      rating: 4.8
    },
    { 
      icon: Plug, 
      title: "Electrical", 
      name: "Electrical",
      category: "electrician",
      desc: "Expert electrical repairs, wiring, and safety inspections", 
      description: "Expert electrical repairs, wiring, and safety inspections",
      color: "from-[#10B981] to-[#0047AB]",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80",
      jobs: "980+",
      price: 600,
      rating: 4.9
    },
    { 
      icon: Snowflake, 
      title: "HVAC", 
      name: "HVAC",
      category: "technician",
      desc: "Heating, cooling, and air quality solutions for your comfort", 
      description: "Heating, cooling, and air quality solutions for your comfort",
      color: "from-[#0047AB] to-[#10B981]",
      image: "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&q=80",
      jobs: "850+",
      price: 450,
      rating: 4.7
    },
    { 
      icon: Hammer, 
      title: "Carpentry", 
      name: "Carpentry",
      category: "carpenter",
      desc: "Custom woodwork, furniture repairs, and home improvements", 
      description: "Custom woodwork, furniture repairs, and home improvements",
      color: "from-[#10B981] to-[#0047AB]",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
      jobs: "720+",
      price: 700,
      rating: 4.8
    },
    { 
      icon: Paintbrush, 
      title: "Painting", 
      name: "Painting",
      category: "painter",
      desc: "Interior and exterior painting with premium finish quality", 
      description: "Interior and exterior painting with premium finish quality",
      color: "from-[#0047AB] to-[#10B981]",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80",
      jobs: "1,100+",
      price: 400,
      rating: 4.9
    },
    { 
      icon: MapPin, 
      title: "Location Services", 
      name: "Location Services",
      category: "technician",
      desc: "Find local professionals in your area instantly", 
      description: "Find local professionals in your area instantly",
      color: "from-[#10B981] to-[#0047AB]",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80",
      jobs: "All Areas",
      price: 550,
      rating: 4.6
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Briefcase, value: "10K+", label: "Service Providers" },
    { icon: CheckCircle, value: "100K+", label: "Jobs Completed" },
    { icon: Star, value: "4.9/5", label: "Average Rating" }
  ];

  // Sample testimonials with real feedback style
  const testimonials = allFeedbacks && allFeedbacks.length > 0 ? 
    allFeedbacks.map((feedback, index) => ({
      name: feedback.userId?.fullname ? 
        `${feedback.userId.fullname.firstname} ${feedback.userId.fullname.lastname}` : 
        'Anonymous User',
      role: `${feedback.serviceCategory?.charAt(0).toUpperCase() + feedback.serviceCategory?.slice(1)} Customer`,
      image: `https://images.unsplash.com/photo-${index === 0 ? '1494790108377-be9c29b29330' : index === 1 ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=200&q=80`,
      text: feedback.comment || 'Great service experience!',
      rating: feedback.rating || 5
    })) : [
    {
      name: "Rahul Sharma",
      role: "Plumber Customer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      text: "Excellent plumbing service! The technician was very professional and fixed my issue quickly.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Electrician Customer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      text: "Amazing electrical work! Very satisfied with the quality and quick response time.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "Carpenter Customer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      text: "Outstanding carpentry service! The furniture repair was done perfectly. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .parallax-blob {
          transition: transform 0.3s ease-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-[90vh] flex items-center overflow-hidden">
        {/* Service-specific Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroImages[currentImage]})`, width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentImage ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="w-full px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-6 py-3 bg-[#10B981]/20 backdrop-blur-md rounded-full mb-8 border border-[#10B981]/30">
                <Wrench className="w-5 h-5 text-[#10B981] mr-3" />
                <span className="text-white font-bold">Professional Home Services</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                Fix It.
                <br />
                <span className="text-[#10B981]">
                  Fast.
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-lg">
                Expert plumbers, electricians, and technicians at your service. 
                Quality repairs and installations, guaranteed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button 
                  onClick={() => navigate('/serviceInfo')}
                  className="px-10 py-5 bg-[#10B981] text-white font-bold rounded-2xl hover:bg-[#0d9668] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
                >
                  <Wrench className="w-5 h-5" />
                  Book Service
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-10 py-5 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Shield className="w-5 h-5" />
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Content - Service Icons */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <Wrench className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Plumbing</h3>
                <p className="text-white/70">Pipes, leaks, installations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <Plug className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Electrical</h3>
                <p className="text-white/70">Wiring, repairs, safety</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <Hammer className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Carpentry</h3>
                <p className="text-white/70">Furniture, repairs, custom</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                <Paintbrush className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">Painting</h3>
                <p className="text-white/70">Interior, exterior, touch-ups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 px-4 bg-gradient-to-r from-[#0047AB] to-[#10B981]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <stat.icon className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent">
            Popular Services
          </h2>
          <p className="text-gray-600 text-xl mb-16 max-w-2xl mx-auto">
            Find trusted professionals for every service you need. Quality work, verified providers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {servicesLoading ? (
              [...Array(6)].map((_, i) => <ServiceCardShimmer key={i} />)
            ) : (
              services.map((service, i) => (
                <div
                  key={i}
                  className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                >
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center px-3 py-2 bg-gradient-to-r from-[#0047AB] to-[#10B981] backdrop-blur-md rounded-full shadow-xl">
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
                    <span className="text-sm font-bold text-white">{service.rating}</span>
                  </div>
                </div>

                {/* Full Image Section with Overlay Content */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Title */}
                    <div className="mb-3">
                      <h3 className="text-2xl font-black text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-2">
                      {service.desc}
                    </p>
                    

                    
                    {/* Features */}
                    <div className="flex items-center gap-4 mb-4 text-xs">
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        <span className="font-medium">Verified</span>
                      </div>
                      <div className="flex items-center text-blue-400">
                        <Shield className="w-3 h-3 mr-1" />
                        <span className="font-medium">Insured</span>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span className="font-medium">24/7</span>
                      </div>
                    </div>
                    
                    {/* Price and Book Service Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-2xl font-black text-[#10B981] flex items-center">
                          <span className="text-lg mr-1">₹</span>
                          {i === 0 ? '500' : i === 1 ? '600' : i === 2 ? '450' : i === 3 ? '700' : i === 4 ? '400' : '550'}
                        </div>
                        <div className="text-xs text-white/70 font-medium">per service</div>
                      </div>
                      <button
                        onClick={() => {
                          if (!userData) {
                            navigate('/login');
                            return;
                          }
                          setSelectedService(service);
                          setShowBookingModal(true);
                        }}
                        className="bg-gradient-to-r from-[#0047AB] via-[#007B89] to-[#10B981] text-white py-3 px-6 rounded-2xl font-bold text-sm flex items-center gap-2"
                      >
                        <service.icon className="w-4 h-4" />
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0047AB]/5 to-[#10B981]/5">
        <div className="container mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-[#0047AB] to-[#10B981] bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-gray-600 text-xl text-center mb-16">Real stories from our community</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#10B981]/20"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#10B981] text-[#10B981]" />
                  ))}
                </div>
                <p className="text-gray-700 italic line-clamp-3">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4 text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0047AB]/95 to-[#10B981]/95"></div>
        </div>

        <div className="relative z-10 container mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-95">
            Join our growing community of 50,000+ satisfied customers and professionals today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group px-12 py-5 bg-white text-[#0047AB] font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Sign Up as Customer
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="group px-12 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#10B981] transition-all duration-300 flex items-center justify-center gap-2">
              Join as Provider
              <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>1-800-SERVICE</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>hello@serviceplatform.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal
          service={selectedService}
          userId={userData?._id}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedService(null);
            setBookingError('');
          }}
          onConfirm={async (bookingData) => {
            try {
              console.log('Booking data being sent:', bookingData);
              console.log('Address being sent:', bookingData.address);
              
              const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/bookings/create`,
                {
                  userId: userData._id,
                  category: selectedService.category,
                  serviceId: selectedService.name,
                  preferredDate: bookingData.date,
                  preferredTime: bookingData.time,
                  location: bookingData.address,
                  details: bookingData.notes
                },
                {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                  }
                }
              );

              if (response.data.success) {
                alert('Booking created successfully! You will be notified once a provider accepts your request.');
                setShowBookingModal(false);
                setSelectedService(null);
              } else {
                setBookingError(response.data.message || 'Failed to create booking');
              }
            } catch (error) {
              console.error('Booking error:', error);
              setBookingError(error.response?.data?.message || 'Failed to create booking. Please try again.');
            }
          }}
          onError={(error) => {
            setBookingError(error);
          }}
        />
      )}

      {/* Error Display */}
      {bookingError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span>{bookingError}</span>
            <button 
              onClick={() => setBookingError('')}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;