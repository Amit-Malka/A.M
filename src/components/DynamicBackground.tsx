import React from 'react';

const DynamicBackground: React.FC = () => {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(57, 83, 171, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #111933 50%, #1a1a2e 100%)
          `,
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 8s ease infinite',
        }}
      />
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-accent/20 rounded-full animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-secondary/30 transform rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/6 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg animate-particle-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/6 w-20 h-20 border-2 border-primary/40 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10 animate-glow"
          style={{
            background: 'radial-gradient(circle, #3953ab 0%, transparent 70%)',
            top: '10%',
            left: '80%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-15 animate-glow"
          style={{
            background: 'radial-gradient(circle, #b5c0e6 0%, transparent 70%)',
            bottom: '20%',
            left: '20%',
            transform: 'translate(-50%, 50%)',
            animationDelay: '1s',
          }}
        />
      </div>
    </div>
  );
};

export default DynamicBackground;