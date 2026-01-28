import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import PostHogProvider from "@/components/PostHogProvider";
import ErrorBoundary from "@/components/ErrorBoundary";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Musn't Miss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
        <Navbar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          {/* Teal light from top-left */}
          <div className="absolute inset-0 mix-blend-screen">
            <ErrorBoundary>
              <LightRays
                raysOrigin="top-left"
                raysColor="#0d8175"
                raysSpeed={0.5}
                lightSpread={0.5}
                rayLength={3}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0}
                distortion={0.01}
              />
            </ErrorBoundary>
          </div>
          {/* Blue light from top-right */}
          <div className="absolute inset-0 mix-blend-screen">
            <ErrorBoundary>
              <LightRays
                raysOrigin="top-right"
                raysColor="#183864"
                raysSpeed={0.5}
                lightSpread={0.5}
                rayLength={3}
                followMouse={true}
                mouseInfluence={0.08}
                noiseAmount={0}
                distortion={0.01}
              />
            </ErrorBoundary>
          </div>
        </div>
        <PostHogProvider>
          <main>
            {children}
          </main>
        </PostHogProvider>
      </body>
    </html>
  );
}
