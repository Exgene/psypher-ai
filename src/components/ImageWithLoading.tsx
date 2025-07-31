"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type ImageWithLoadingProps } from "@/types";
import { IMAGE_CONFIG } from "@/lib/constants";

export function ImageWithLoading({
  src,
  alt,
  className,
  skeletonClassName,
  fallbackSrc = IMAGE_CONFIG.defaultFallback,
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton loading state */}
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]",
            skeletonClassName
          )}
        />
      )}

      {/* Actual image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />

      {/* Loading overlay with pulse effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
          </div>
        </div>
      )}
    </div>
  );
} 