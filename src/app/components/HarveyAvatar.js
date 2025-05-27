'use client';

import { useState } from 'react';

export default function HarveyAvatar({ size = 'md', showName = false, interactive = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl'
  };

  const harveyQuotes = [
    "Excellence isn't a skill, it's an attitude.",
    "I don't get lucky. I make my own luck.",
    "When you're backed against the wall, break the goddamn thing down.",
    "Winners don't make excuses when the other side plays the game.",
    "I don't have dreams, I have goals."
  ];

  const randomQuote = harveyQuotes[Math.floor(Math.random() * harveyQuotes.length)];

  return (
    <div className="relative">
      <div 
        className={`${sizeClasses[size]} bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${
          interactive ? 'hover:scale-110 hover:shadow-lg' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Harvey Specter - Your AI CoPilot"
      >
        {/* Professional suit silhouette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900"></div>
        
        {/* Tie */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full opacity-80"></div>
        
        {/* Face */}
        <div className="relative z-10 w-6 h-6 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
            <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Suit lapels */}
        <div className="absolute bottom-1 left-1 w-2 h-3 bg-slate-600 transform rotate-12 rounded-sm opacity-60"></div>
        <div className="absolute bottom-1 right-1 w-2 h-3 bg-slate-600 transform -rotate-12 rounded-sm opacity-60"></div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-20 pointer-events-none"></div>
        
        {/* Confidence glow */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-transparent to-transparent opacity-30 animate-pulse"></div>
        )}
      </div>

      {showName && (
        <div className="mt-2 text-center">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Harvey Specter</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Senior Partner</p>
        </div>
      )}

      {/* Hover quote tooltip */}
      {interactive && isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 animate-fade-in-up">
          <div className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-xl max-w-xs text-sm">
            <p className="italic">"{randomQuote}"</p>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-700 rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}