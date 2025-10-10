import React, { useState } from "react";
import { Star, Calendar, Zap, Shield, Clock, ArrowRight, Heart, CheckCircle } from "lucide-react";

const ServiceCard = ({ service, onBookService }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">



      {/* Like Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Full Image Section with Overlay Content */}
      <div className="relative overflow-hidden h-80">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
        

        
        {/* Rating Badge */}
        <div className="absolute top-4 right-16">
          <div className="flex items-center px-3 py-2 bg-gradient-to-r from-[#0047AB] to-[#10B981] backdrop-blur-md rounded-full shadow-xl">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 mr-1" />
            <span className="text-sm font-bold text-white">{service.rating}</span>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-2xl font-black text-white leading-tight">
              {service.name}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-2">
            {service.description}
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
                {service.price}
              </div>
              <div className="text-xs text-white/70 font-medium">per service</div>
            </div>
            <button
              onClick={onBookService}
              className="bg-gradient-to-r from-[#0047AB] via-[#007B89] to-[#10B981] text-white py-3 px-6 rounded-2xl font-bold text-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceCard;
