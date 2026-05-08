"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
          {/* Loading Icon */}
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: brandGradient }}>
            <svg className="animate-spin w-10 h-10 text-black" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          {/* Verifying Message */}
          <h1 className="text-2xl font-extrabold text-white mb-2">
            Verifying...
          </h1>
          
          <p className="text-slate-400 text-sm">
            Please wait while we verify your authentication.
          </p>
        </div>
      </div>
    </main>
  );
}

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Check for type in query params
      let type = searchParams.get("type");
      
      // If not in query params, check URL hash (Supabase uses hash fragments)
      if (!type && typeof window !== "undefined") {
        const hash = window.location.hash.substring(1); // Remove the # symbol
        const hashParams = new URLSearchParams(hash);
        type = hashParams.get("type");
      }
      
      if (type === "recovery") {
        // For password recovery, redirect to reset-password page WITH hash
        if (typeof window !== "undefined" && window.location.hash) {
          router.push(`/reset-password${window.location.hash}`);
        } else {
          router.push("/reset-password");
        }
        return;
      }

      // For regular auth (login/signup), check session
      const { data } = await supabase.auth.getSession();

      // Check if this is a mobile app request
      // Mobile apps will have opened this in an in-app browser
      const isMobileApp = typeof window !== "undefined" && (
        window.navigator.userAgent.includes('Expo') ||
        window.navigator.userAgent.includes('ReactNative') ||
        // Check if opened from mobile app deep link
        document.referrer.includes('unifesto://') ||
        // Check if there's a mobile-specific parameter
        searchParams.get('platform') === 'mobile'
      );

      if (data.session) {
        if (isMobileApp) {
          // Redirect to mobile app with the full hash (contains tokens)
          const hash = window.location.hash;
          window.location.href = `unifesto://${hash}`;
        } else {
          // Redirect to web app
          window.location.href = "https://www.unifesto.app";
        }
      } else {
        // No session - redirect to auth page
        if (isMobileApp) {
          window.location.href = "unifesto://";
        } else {
          window.location.href = "https://www.unifesto.app/auth";
        }
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <LoadingScreen />;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CallbackContent />
    </Suspense>
  );
}