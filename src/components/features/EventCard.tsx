/**
 * Event card component for displaying event information
 */

import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithLoading } from "@/components/ImageWithLoading";
import { type Event } from "@/types";
import { formatDateTime, capitalize } from "@/lib/utils";
import { TIER_COLORS } from "@/types";
import React from "react";

interface EventCardProps {
  event: Event;
  index: number;
  className?: string;
}

export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ event, index, className = "" }, ref) => {
    const tierColorClass = TIER_COLORS[event.tier];

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={className}
      >
        <Card className="group h-full overflow-hidden bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
          {/* Event Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <ImageWithLoading
              src={event.image_url || ""}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              skeletonClassName="w-full h-48"
            />

            {/* Tier Badge Overlay */}
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className={`bg-background/90 backdrop-blur-sm ${tierColorClass} border-0 shadow-sm`}
              >
                {capitalize(event.tier)}
              </Badge>
            </div>
          </div>

          {/* Event Content */}
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {formatDateTime(event.event_date)}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {event.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/30">
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{capitalize(event.tier)} tier</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

EventCard.displayName = "EventCard"; 