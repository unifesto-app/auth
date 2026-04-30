"use client";

import { useEffect } from "react";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";

export default function AuthCallbackPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get the URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    
    // Check for access token (OAuth callback)
    const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
    const code = searchParams.get('code');
    
    // Check for redirect origin (where the user came from)
    const redirectOrigin = searchParams.get('redirect_origin') || sessionStorage.getItem('auth_redirect_origin');
    
    // Determine where to redirect
    let redirectUrl = 'https://www.unifesto.app';
    
    if (redirectOrigin) {
      // Redirect back to the origin domain
      const allowedDomains = [
        'today.unifesto.app',
        'www.unifesto.app',
        'org.unifesto.app',
        'checkin.unifesto.app',
        'beta.unifesto.app',
        'localhost:3001',
        'localhost:3000',
      ];
      
      try {
        const origin = new URL(redirectOrigin);
        const hostname = origin.hostname + (origin.port ? `:${origin.port}` : '');
        
        if (allowedDomains.includes(hostname)) {
          // Build the redirect URL with the auth parameters
          if (code) {
            // Redirect to the origin's callback with the code
            redirectUrl = `${redirectOrigin}/auth/callback?code=${code}`;
          } else if (accessToken) {
            // Redirect to the origin's callback with the hash
            redirectUrl = `${redirectOrigin}/auth/callback${window.location.hash}`;
          } else {
            // No auth params, just redirect to origin
            redirectUrl = redirectOrigin;
          }
          
          // Clear the stored origin
          sessionStorage.removeItem('auth_redirect_origin');
          
          console.log('🔄 Redirecting back to origin:', redirectUrl);
        } else {
          console.warn('⚠️ Redirect origin not in allowed domains:', hostname);
        }
      } catch (e) {
        console.error('❌ Invalid redirect origin:', e);
      }
    } else if (accessToken || code) {
      // No redirect origin specified, try mobile app first
      const mobileUrl = `unifesto://auth/callback${window.location.hash}${window.location.search}`;
      console.log('📱 Attempting mobile redirect:', mobileUrl);
      window.location.href = mobileUrl;
      
      // If mobile app doesn't open, redirect to main site after 2 seconds
      setTimeout(() => {
        if (code) {
          window.location.href = `https://www.unifesto.app/auth/callback?code=${code}`;
        } else {
          window.location.href = `https://www.unifesto.app/auth/callback${window.location.hash}`;
        }
      }, 2000);
      return;
    }
    
    // Perform the redirect
    console.log('✅ Final redirect:', redirectUrl);
    window.location.href = redirectUrl;
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
            Redirecting you back...
          </p>

          <p className="text-xs text-slate-500 mt-6">
            If you're not redirected automatically, please return to the app manually.
          </p>
        </div>
      </div>
    </main>
  );
}
