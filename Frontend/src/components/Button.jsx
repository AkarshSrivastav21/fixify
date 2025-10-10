import React from "react";

export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-xl bg-gradient-to-r from-primary-700 to-secondary-800 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
}
