import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const LiveCity = () => {
  const { address, setAddress, locationType } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (locationType !== "live") return;
      
      setLoading(true);
      
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setAddress("Geolocation not supported");
        setLoading(false);
        return;
      }

      try {
        // Get current position with better options
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes cache
            }
          );
        });

        const { latitude, longitude } = position.coords;
        
        // Fetch address from coordinates
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'Fixify-App/1.0'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        
        const data = await response.json();
        const addressData = data.address || {};
        
        // Extract location components
        const place = addressData.suburb || addressData.neighbourhood || addressData.hamlet || addressData.residential || "";
        const village = addressData.village || "";
        const college = addressData.university || addressData.college || addressData.school || "";
        const city = addressData.city || addressData.town || addressData.municipality || "";
        const district = addressData.state_district || addressData.county || addressData.state || "";
        
        // Format address
        const locationParts = [college, village, place, city, district].filter(Boolean);
        const formattedAddress = locationParts.length > 0 
          ? locationParts.join(", ") 
          : data.display_name?.split(',').slice(0, 3).join(', ') || "Location found";
        
        setAddress(formattedAddress);
        
      } catch (error) {
        console.error('Location error:', error);
        if (error.code === 1) {
          setAddress("Location access denied");
        } else if (error.code === 2) {
          setAddress("Location unavailable");
        } else if (error.code === 3) {
          setAddress("Location timeout");
        } else {
          setAddress("Location error");
        }
      } finally {
        setLoading(false);
      }
    };

    getCurrentLocation();
  }, [locationType, setAddress]);

  if (loading) return <span>Getting location...</span>;

  return <span>{address || "No location"}</span>;
};

export default LiveCity;
