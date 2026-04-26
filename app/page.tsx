"use client";

import { useEffect } from "react";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";
const gradientText = {
  background: "linear-gradient(135deg, #3491ff, #0062ff)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as React.CSSProperties;

export default function Home() {
  useEffect(() => {
    // Redirect to main site after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://www.unifesto.app";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
          {/* Logo/Icon */}
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: brandGradient }}>
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Welcome to <span style={gradientText}>Unifesto</span>
          </h1>
          
          <p className="text-slate-400 text-base mb-6 leading-relaxed">
            Your gateway to discovering and attending amazing campus events.
          </p>

          {/* Redirect Notice */}
          <p className="text-sm text-slate-500 mb-6">
            Redirecting to main site...
          </p>

          {/* Manual Navigation */}
          <a
            href="https://www.unifesto.app"
            className="inline-block rounded-full px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,145,255,0.5)] hover:-translate-y-0.5"
            style={{ background: brandGradient }}
          >
            Go to Unifesto →
          </a>
        </div>
      </div>
    </main>
  );
}
