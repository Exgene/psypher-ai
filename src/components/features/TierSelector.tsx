"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { canUpgradeToTier } from "@/lib/tier-utils";
import { 
  TIER_ORDER, 
  TIER_COLORS, 
  TIER_GRADIENTS, 
  type Tier,
  type TierSelectorProps 
} from "@/types";
import { TIER_ICONS } from "@/lib/constants";

export function TierSelector({
  onTierChange,
  isLoading,
  value,
  disabled = false,
  className = "",
}: TierSelectorProps) {
  const currentTier = value as Tier;
  const CurrentIcon = TIER_ICONS[currentTier];
  
  return (
    <div className="relative w-[220px]">
      <Select
        onValueChange={onTierChange}
        disabled={isLoading}
        value={value}
      >
        <SelectTrigger className="w-full h-12 bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary/20">
          <div className="flex items-center space-x-3 w-full">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
            ) : (
              <CurrentIcon className={`h-4 w-4 flex-shrink-0 ${TIER_COLORS[currentTier]}`} />
            )}
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="font-medium capitalize text-sm truncate">
                {currentTier} Tier
              </span>
            </div>
          </div>
        </SelectTrigger>
        
        <SelectContent className="w-[220px] bg-popover/95 backdrop-blur-md border border-border/50 shadow-xl rounded-lg p-1">
          {Object.keys(TIER_ORDER).map((tier) => {
            const isAvailable = canUpgradeToTier(currentTier, tier as Tier);
            const isCurrentTier = tier === currentTier;
            const TierIcon = TIER_ICONS[tier as Tier];
            const colorClass = TIER_COLORS[tier as Tier];
            const gradientClass = TIER_GRADIENTS[tier as Tier];
            
            return (
              <SelectItem 
                key={tier} 
                value={tier}
                disabled={!isAvailable}
                className={`
                  relative cursor-pointer transition-all duration-200 rounded-md mx-1 my-0.5
                  ${isCurrentTier 
                    ? "bg-primary/10 border border-primary/20 font-semibold" 
                    : "hover:bg-accent/50"
                  }
                  ${!isAvailable && !isCurrentTier ? "opacity-50 cursor-not-allowed" : ""}
                  focus:bg-accent/50 focus:outline-none
                `}
              >
                <div className="flex items-center justify-between w-full py-2 px-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-full bg-gradient-to-br ${gradientClass} shadow-sm`}>
                      <TierIcon className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium capitalize text-sm">
                          {tier}
                        </span>
                        {isCurrentTier && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      {!isAvailable && !isCurrentTier && (
                        <span className="text-xs text-muted-foreground">
                          🔒 Locked
                        </span>
                      )}
                      {isAvailable && !isCurrentTier && tier !== "free" && (
                        <span className="text-xs text-green-600 dark:text-green-400">
                          ✓ Available
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex items-center">
                    {isCurrentTier && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                    {!isAvailable && !isCurrentTier && (
                      <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                    )}
                    {isAvailable && !isCurrentTier && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      
      {/* Enhanced tier status indicator */}
      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full" />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] rounded-md flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-100" />
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-200" />
          </div>
        </div>
      )}
    </div>
  );
}