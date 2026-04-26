"use client";

import { useEffect } from "react";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";

export default function AuthCallbackPage() {
  useEffect(() => {
    // This page is used for mobile OAuth callbacks
    // Try to close the WebBrowser window
    if (typeof window !== "undefined") {
      // Signal to the WebBrowser that auth is complete
      // The WebBrowser should automatically close when it detects this URL
      
      // For web browsers (not WebBrowser), redirect to main site
      const timer = setTimeout(() => {
        if (window.opener) {
          // Opened in popup, close it
          window.close();
        } else {
          // Regular browser, redirect
          window.location.href = "https://www.unifesto.app";
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse" style={{ background: brandGradient }}>
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-extrabold text-white mb-2">
            Authentication Successful!
          </h1>
          
          <p className="text-slate-400 text-sm mb-4">
            Returning to app...
          </p>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
