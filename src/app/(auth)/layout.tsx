'use client';
import Logo from '@/components/core/Logo';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex w-screen h-screen bg-background">
      {/* Left Section - Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8">
        <div className="block lg:hidden mb-12">
          <Logo />
        </div>
        {children}
      </div>

      {/* Right Section - Brand Showcase */}
      <div className="hidden lg:flex w-1/2 h-screen bg-linear-to-br from-secondary to-background flex-col items-center justify-center px-12 border-l border-border/10 relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Logo Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
                animation: `float 3s ease-in-out ${i * 0.5}s infinite alternate`
              }}
            >
              <div className="w-8 h-8 bg-primary rounded-lg transform rotate-45"></div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>

        <div className="text-center max-w-[600px] relative z-10">
          {/* Main Logo with Glow Effect */}
          <div className="mb-5 transform hover:scale-105 transition-transform duration-300">
            <div className="relative inline-block">
              <Logo />
            </div>
          </div>

          {/* Welcome Content */}
          <div className="space-y-4">
            <h1 className="text-foreground font-medium text-5xl leading-tight">
              Stunties<br />
              Admin Corner
            </h1>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 absolute bottom-8 w-full text-center">
          <p className="text-gray-400 text-sm">
            © STUNTIES - Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;