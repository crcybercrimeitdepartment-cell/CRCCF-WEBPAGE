import React, { useEffect, useState } from 'react';
import BuildingAnimation from '../components/BuildingAnimation';

export default function IntroAnimation({ onComplete }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Intentionally removed auto-redirect. User MUST click a button.
  }, [onComplete]);

  if (hasError) {
    setTimeout(() => { if (onComplete) onComplete(); }, 2000);
    return (
      <div className="w-full h-screen flex items-center justify-center bg-sky-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-hidden bg-sky-400 transition-opacity duration-1000 ease-in-out opacity-100">
      <BuildingAnimation onComplete={onComplete} />
    </div>
  );
}
