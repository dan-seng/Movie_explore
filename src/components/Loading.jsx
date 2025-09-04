import React from 'react';
import { Image } from '@heroui/react';

export default function Loading({ fullScreen = true, message = 'Loading...' }) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'} bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      <div className="relative w-32 h-32 mb-6">
        {/* Animated film reel */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-gray-300 dark:border-gray-600 rounded-full animate-spin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Movie clapperboard */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 bg-red-600 rounded-md transform rotate-12">
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/20"></div>
            <div className="absolute top-4 left-1/2 w-1 h-12 bg-amber-800 -translate-x-1/2"></div>
            <div className="absolute top-4 right-0 w-4 h-12 bg-amber-900 rounded-l-full"></div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{message}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm">Please wait while we load your content</p>
      
      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-6">
        <div className="h-full bg-red-600 rounded-full animate-progress"></div>
      </div>
      
      {/* Add custom animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={`inline-block ${sizes[size]} ${className}`}>
      <div className="animate-spin rounded-full h-full w-full border-b-2 border-red-600 dark:border-red-500"></div>
    </div>
  );
}

export function LoadingSkeleton({ count = 3, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}