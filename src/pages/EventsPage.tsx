import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MapPin, Calendar, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { sponsoredEvents } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function EventsPage() {
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  const toggleRsvp = (id: string) => {
    setRsvped(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto">
        <div className="px-6 pt-4 pb-2">
          <h2 className="text-xl font-bold text-foreground">Events</h2>
          <p className="text-sm text-muted-foreground">Sponsored events from companies seeking intern talent</p>
        </div>

        <div className="px-6 space-y-4 pb-6">
          {sponsoredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              {/* Gold top bar */}
              <div className="h-1.5 gradient-gold" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-bold text-sponsored uppercase tracking-wide">Sponsored Event</span>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-2">{event.title}</h3>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {event.date} · {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location} — {event.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {event.rsvpCount + (rsvped.has(event.id) ? 1 : 0)} RSVPs
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sponsored/10 text-sponsored font-medium">{tag}</span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                <Button
                  onClick={() => toggleRsvp(event.id)}
                  className={`w-full h-11 rounded-xl font-bold ${
                    rsvped.has(event.id)
                      ? 'bg-verified text-primary-foreground hover:bg-verified/90'
                      : 'gradient-gold text-primary-foreground'
                  }`}
                >
                  {rsvped.has(event.id) ? '✓ RSVPd — See You There!' : 'RSVP →'}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">Hosted by {event.company} · Sponsored</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
