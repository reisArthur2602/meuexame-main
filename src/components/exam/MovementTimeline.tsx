import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  actor?: string;
  timestamp: string;
  active?: boolean;
}

interface MovementTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function MovementTimeline({
  events,
  className,
}: MovementTimelineProps) {
  return (
    <div className={cn("space-y-5 border-l border-border pl-5", className)}>
      {events.map((event) => (
        <div key={event.id} className="relative">
          <span
            className={cn(
              "absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full ring-4",
              event.active
                ? "bg-brand-600 ring-brand-50"
                : "bg-border-strong ring-surface-subtle"
            )}
          />
          <p className="text-sm font-bold text-ink">{event.title}</p>
          {event.description && (
            <p className="mt-0.5 text-xs text-ink-soft">{event.description}</p>
          )}
          <p className="mt-1 text-xs text-ink-soft">
            {event.actor && (
              <span className="font-semibold text-ink-muted">
                {event.actor} ·{" "}
              </span>
            )}
            {event.timestamp}
          </p>
        </div>
      ))}
    </div>
  );
}
