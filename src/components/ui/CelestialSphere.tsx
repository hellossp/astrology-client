"use client";

import React from "react";

export const CelestialSphere: React.FC = () => {
  return (
    <div className="relative w-80 h-80 sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] flex items-center justify-center group pointer-events-auto select-none">
      {/* 1. Deep Space Cosmic Ambient Glow (Harmonizes with hero cosmic waves) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-900/35 via-indigo-950/20 to-transparent blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-1000 ease-out" />
      <div className="absolute inset-20 rounded-full bg-amber-400/20 blur-2xl pointer-events-none animate-pulse" />

      {/* 2. Orbiting Golden & Star Nodes */}
      <div className="absolute inset-0 animate-spin-slow pointer-events-none">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_#f3d884]" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_#f3d884]" />
        <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_10px_#93c5fd]" />
        <div className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_10px_#a5b4fc]" />
      </div>

      {/* 3. Pure Luminance-Transparent 3D Celestial Constellation Sphere */}
      <div className="relative w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 ease-out">
        <img
          src="/celestial-ultra-blend.png"
          alt="100% Seamless Blended 3D Armillary Celestial Constellation Sphere"
          className="w-full h-full object-contain mix-blend-screen opacity-95 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        />

        {/* Center Star Core Flare */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-amber-300/20 blur-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};







