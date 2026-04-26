"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const brandGradient = "linear-gradient(135deg, #3491ff, #0062ff)";

export default function CallbackPage() {
  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        window.location.href = "https://www.unifesto.app";
      } else {
        window.location.href = "https://www.unifesto.app";
      }
    };

    run();
  }, []);

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