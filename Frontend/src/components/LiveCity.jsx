import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const LiveCity = () => {
  const { address, setAddress, locationType } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (locationType === "live") {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          )
            .then((res) => res.json())
            .then((data) => {
              const addressData = data.address || {};
              
              // Extract place, city, district, village, and college/university
              const place = addressData.suburb || addressData.neighbourhood || addressData.hamlet || addressData.residential || data.display_name?.split(',')[0] || "";
              const village = addressData.village || "";
              const college = addressData.university || addressData.college || addressData.school || "";
              const city = addressData.city || addressData.town || addressData.municipality || "";
              const district = addressData.state_district || addressData.county || addressData.state || "";
              
              // Format the address with all available location info
              const locationParts = [college, village, place, city, district].filter(Boolean);
              const formattedAddress = locationParts.join(", ");
              setAddress(formattedAddress || "Location not found");
              setLoading(false);
            })
            .catch(() => {
              setAddress("Location unavailable");
              setLoading(false);
            });
        },
        () => {
          setAddress("Location access denied");
          setLoading(false);
        }
      );
    }
  }, [locationType]); // ✅ run only when live is selected

  if (loading) return <span>Getting location...</span>;

  return <span>{address || "No location"}</span>;
};

export default LiveCity;
