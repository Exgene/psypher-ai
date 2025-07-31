export function SkeletonCard() {
  return (
    <div className="h-full overflow-hidden bg-card/30 backdrop-blur-sm border border-border/30 shadow-sm rounded-xl animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-3/4" />
            <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-1/2" />
          </div>
          {/* Badge skeleton */}
          <div className="h-6 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-full animate-shimmer bg-[length:200%_100%]" />
        </div>
        
        {/* Date skeleton */}
        <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-1/3" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-full" />
          <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-4/5" />
          <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-2/3" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-24" />
          <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%] w-20" />
        </div>
      </div>
    </div>
  );
} 