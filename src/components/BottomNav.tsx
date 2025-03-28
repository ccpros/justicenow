"use client";

import ControlCenter from "./ui/layouts/ControlCenter";



export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex h-20 md:h-24">
      {/* Left third (transparent on md+) */}
      <div className="w-1/3 hidden md:block bg-transparent"></div>

      {/* Center control area */}
      <div className="w-full md:w-40% flex items-center justify-center relative">
      <div className="relative w-[100%] md:w-[50%] h-40 md:h-44 z-20 flex items-center justify-center">
  <div className="absolute inset-0 clip-half-octagon z-10" />
  <div className="relative z-20 px-6">
    <ControlCenter />
  </div>
</div>



      </div>

      {/* Right third (transparent on md+) */}
      <div className="w-1/3 hidden md:block bg-transparent"></div>
    </div>
  );
}
