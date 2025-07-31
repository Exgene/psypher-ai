"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative w-full py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000" />
          
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-sm">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Tier-Based Events Platform
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                    Welcome to the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Event Showcase
                  </span>
                </h1>
                
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Discover exclusive events tailored to your membership tier. 
                  Unlock premium experiences and connect with like-minded individuals 
                  in your exclusive community.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <SignedOut>
                  <SignInButton>
                    <Button 
                      size="lg" 
                      className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-hover"
                    >
                      <span className="relative flex items-center">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </SignInButton>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </SignedOut>
                
                <SignedIn>
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-hover"
                    >
                      <span className="relative flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </SignedIn>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl w-full">
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Exclusive Events</h3>
                  <p className="text-sm text-muted-foreground">Access premium events based on your membership level</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Tier System</h3>
                  <p className="text-sm text-muted-foreground">Upgrade your tier to unlock more exclusive content</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">Simple one-click access to your personalized dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
