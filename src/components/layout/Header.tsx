/**
 * Application header component
 */

"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  showActions?: boolean;
  className?: string;
}

export function Header({ showActions = true, className = "" }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Event Showcase
              </span>
            </div>
          </Link>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <SignedOut>
                <SignInButton>
                  <Button size="sm" variant="outline">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </SignedIn>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 