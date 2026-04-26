import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unifesto — Reset Password",
  description: "Reset your Unifesto account password",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-black antialiased">
        {children}
      </body>
    </html>
  );
}