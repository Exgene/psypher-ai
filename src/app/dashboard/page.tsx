"use client";

import { useEffect, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { getEvents, updateUserTier } from "../actions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TierSelector } from "@/components/features/TierSelector";
import { SkeletonCard } from "./SkeletonCard";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Event, type Tier, type DashboardState } from "@/types";
import { EventCard } from "@/components/features/EventCard";

export default function DashboardPage() {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<DashboardState>({
    events: [],
    currentTier: "free",
    isLoading: true,
    error: null,
    hasLoadedData: false,
  });

  const fetchEventData = async () => {
    if (!isSignedIn || !user) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    startTransition(async () => {
      try {
        const response = await getEvents();
        setState(prev => ({
          ...prev,
          events: response.events,
          currentTier: response.userTier,
          error: response.success ? null : response.error || "Failed to load events",
          hasLoadedData: true,
          isLoading: false,
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to load events",
          isLoading: false,
        }));
        console.error("Failed to load events:", err);
      }
    });
  };

  const handleTierChange = (newTier: string) => {
    setState(prev => ({ ...prev, error: null })); // Clear any previous errors
    
    startTransition(async () => {
      try {
        await updateUserTier(newTier as Tier);
        const response = await getEvents();

        setState(prev => ({
          ...prev,
          events: response.events,
          currentTier: response.userTier,
          error: response.success ? null : response.error || "Failed to update tier",
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : "Failed to update tier",
        }));
        console.error("Tier update failed:", err);
      }
    });
  };

  // Effect to handle authentication state changes
  useEffect(() => {
    if (!isUserLoaded) {
      // Still loading authentication state
      return;
    }

    if (!isSignedIn) {
      // User is not signed in, reset state
      setState({
        events: [],
        currentTier: "free",
        isLoading: false,
        error: null,
        hasLoadedData: false,
      });
      return;
    }

    // User is signed in, fetch data if we haven't already or user changed
    if (!state.hasLoadedData || !user) {
      setState(prev => ({ ...prev, isLoading: true }));
      fetchEventData();
    }
  }, [isUserLoaded, isSignedIn, user?.id, state.hasLoadedData]);

  // Show loading skeleton when authentication is still loading or when fetching initial data
  if (!isUserLoaded || (state.isLoading && isSignedIn)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Header skeleton */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-12 w-[220px]" />
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Show message when user is not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Calendar className="h-12 w-12 text-primary/60" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Event Showcase</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to access your personalized events dashboard and discover exclusive experiences tailored to your tier.
          </p>
          <div className="text-sm text-muted-foreground">
            Use the sign in button in the header to get started.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with floating effect */}
      <div className="z-10 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-6 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Event Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.firstName || "Member"}! Here are your available events for your {" "}
                <span className="font-semibold text-primary capitalize">{state.currentTier}</span> tier.
              </p>
            </div>
            <TierSelector
              onTierChange={handleTierChange}
              isLoading={isPending}
              value={state.currentTier}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Error Message */}
        <AnimatePresence>
          {state.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="relative p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-red-800 text-sm font-medium">{state.error}</p>
                  </div>
                  <button
                    onClick={() => setState(prev => ({ ...prev, error: null }))}
                    className="ml-3 inline-flex text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Events Grid */}
        <div className="relative">
          {/* Show skeleton cards during tier updates */}
          {isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: Math.max(3, state.events.length) }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          )}
          
          {/* Show actual events when not loading */}
          {!isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {state.events.map((event: Event, i: number) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {/* Empty state when no events and not loading */}
          {!isPending && state.events.length === 0 && state.hasLoadedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Calendar className="h-12 w-12 text-primary/60" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No Events Available</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                There are no events available for your current tier. Try upgrading your membership to access more exclusive events.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

function getTierBadgeClass(tier: string): string {
  const baseClass =
    "text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border-none shadow-md";
  switch (tier) {
    case "platinum":
      return `${baseClass} bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700`;
    case "gold":
      return `${baseClass} bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600`;
    case "silver":
      return `${baseClass} bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700`;
    default:
      return `${baseClass} bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600`;
  }
}
