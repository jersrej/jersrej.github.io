import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl animate-spin-slow"></div>
            <div className="absolute inset-2 bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                JC
              </span>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-loading-bar"></div>
        </div>

        <p className="mt-4 text-sm text-gray-400 animate-pulse">Loading portfolio...</p>
      </div>
    </div>
  );
};
