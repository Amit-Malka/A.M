import React from 'react';

const DynamicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Simplified static gradient background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(57, 83, 171, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #111933 50%, #1a1a2e 100%)
          `
        }}
      />
      
      {/* Simplified geometric shapes - no animations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/10 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-secondary/15 transform rotate-45" />
        <div className="absolute top-2/3 left-1/6 w-16 h-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg" />
        <div className="absolute top-1/2 right-1/6 w-20 h-20 border-2 border-primary/20 rounded-full" />
      </div>
      
      {/* Static subtle orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #3953ab 0%, transparent 70%)',
            top: '10%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #b5c0e6 0%, transparent 70%)',
            bottom: '20%',
            left: '20%',
            transform: 'translate(-50%, 50%)',
          }}
        />
      </div>
    </div>
  );
};

export default DynamicBackground;