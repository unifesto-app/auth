"use client";

import { useEffect } from "react";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";

export default function AuthCallbackPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if this is a mobile OAuth callback
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const accessToken = hashParams.get('access_token');
    
    // If we have an access token, this is an OAuth callback
    if (accessToken) {
      // Try to redirect to the mobile app using custom scheme
      const mobileUrl = `unifesto://auth/callback${window.location.hash}`;
      
      // Attempt to open the mobile app
      window.location.href = mobileUrl;
      
      // If the mobile app doesn't open after 2 seconds, show instructions
      setTimeout(() => {
        // User is probably on web, not mobile
        // The page will show the success message
      }, 2000);
    } else {
      // No token, redirect to main site
      window.location.href = "https://www.unifesto.app";
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
            Opening Unifesto app...
          </p>

          <p className="text-xs text-slate-500 mt-6">
            If the app doesn't open automatically, please return to the app manually.
          </p>
        </div>
      </div>
    </main>
  );
}
