import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Crosshair, Plus, Star, MapPin, X, Users, MessageCircle, ChevronRight, List } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { pods, hotspots, sponsoredEvents } from '@/data/mockData';
import { Button } from '@/components/ui/button';

type MapMode = 'offices' | 'explore';

export default function MapPage() {
  const [mode, setMode] = useState<MapMode>('offices');
  const [selectedPod, setSelectedPod] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [showEventList, setShowEventList] = useState(false);

  const activePod = pods.find(p => p.id === selectedPod);
  const activeEvent = sponsoredEvents.find(e => e.id === selectedEvent);
  const activeHotspot = hotspots.find(h => h.id === selectedHotspot);

  const closeAll = () => {
    setSelectedPod(null);
    setSelectedEvent(null);
    setSelectedHotspot(null);
    setShowEventList(false);
  };

  return (
    <AppLayout>
      <div className="relative h-[calc(100vh-5rem)] overflow-hidden">
        {/* Map Background - placeholder for real map */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-muted/60">
          {/* Simulated map grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />
          {/* Simulated roads */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
          <div className="absolute top-1/4 left-0 right-0 h-px bg-border/50" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-border/50" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-border/50" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-border/50" />
        </div>

        {/* Header: Search + Toggle */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 h-11 px-4 rounded-full glass border border-border shadow-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search by company, location, or interest..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {mode === 'explore' && (
              <button
                onClick={() => setShowEventList(!showEventList)}
                className="w-11 h-11 rounded-full glass border border-border shadow-sm flex items-center justify-center"
              >
                <List className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {/* Mode Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-full glass border border-border shadow-sm">
              {[
                { key: 'offices' as const, label: '🏢 Offices' },
                { key: 'explore' as const, label: '🗺 Explore' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setMode(key); closeAll(); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    mode === key
                      ? 'gradient-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Office View - Pod Bubbles */}
        {mode === 'offices' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {pods.map((pod, i) => {
                const positions = [
                  { top: '15%', left: '55%' },
                  { top: '40%', left: '25%' },
                  { top: '60%', left: '65%' },
                  { top: '75%', left: '35%' },
                ];
                const pos = positions[i % positions.length];
                return (
                  <motion.button
                    key={pod.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.15, type: 'spring' }}
                    onClick={() => { closeAll(); setSelectedPod(pod.id); }}
                    className="absolute animate-pulse-slow"
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full gradient-pod flex items-center justify-center shadow-lg shadow-primary/20">
                        <div className="text-center">
                          <div className="text-primary-foreground font-black text-lg">{pod.internCount}</div>
                          <div className="text-primary-foreground/80 text-[9px] font-semibold">interns</div>
                        </div>
                      </div>
                      {/* Stacked avatars */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex -space-x-1.5">
                        {pod.interns.slice(0, 3).map(intern => (
                          <AvatarCircle key={intern.id} name={intern.name} size="sm" className="ring-2 ring-background" />
                        ))}
                      </div>
                      {/* Label */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-foreground bg-card px-2 py-0.5 rounded-full shadow-sm border border-border">
                        {pod.name}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Explore View */}
        {mode === 'explore' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Event Pins */}
              {sponsoredEvents.map((event, i) => {
                const positions = [
                  { top: '20%', left: '60%' },
                  { top: '45%', left: '30%' },
                  { top: '35%', left: '70%' },
                  { top: '65%', left: '50%' },
                ];
                const pos = positions[i % positions.length];
                return (
                  <motion.button
                    key={event.id}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                    onClick={() => { closeAll(); setSelectedEvent(event.id); }}
                    className="absolute z-10"
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shadow-md shadow-sponsored/30">
                      <span className="text-lg">📅</span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-foreground bg-card px-2 py-0.5 rounded-full shadow-sm border border-border">
                      {event.company}
                    </div>
                  </motion.button>
                );
              })}
              {/* Hotspot Pins */}
              {hotspots.map((spot, i) => {
                const positions = [
                  { top: '55%', left: '20%' },
                  { top: '25%', left: '40%' },
                  { top: '70%', left: '70%' },
                  { top: '80%', left: '35%' },
                ];
                const pos = positions[i % positions.length];
                const pinColor = spot.rating >= 4.5 ? 'bg-verified' : spot.rating >= 3.5 ? 'bg-yellow-500' : 'bg-destructive';
                return (
                  <motion.button
                    key={spot.id}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    onClick={() => { closeAll(); setSelectedHotspot(spot.id); }}
                    className="absolute"
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className={`w-8 h-8 rounded-full ${pinColor} flex items-center justify-center shadow-md`}>
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                    {spot.tagCount >= 5 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-verified flex items-center justify-center">
                        <span className="text-[8px] text-primary-foreground">✓</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* My Location Button */}
        <button className="absolute bottom-24 right-4 z-20 w-11 h-11 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Crosshair className="w-5 h-5 text-foreground" />
        </button>

        {/* Drop a Hotspot FAB */}
        {mode === 'explore' && (
          <button className="absolute bottom-24 right-4 z-20 flex items-center gap-2 px-4 py-3 rounded-full gradient-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 mr-14">
            <Plus className="w-4 h-4" />
            Drop a Hotspot
          </button>
        )}

        {/* Pod Sidebar */}
        <AnimatePresence>
          {activePod && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-0 left-0 right-0 z-40 bg-card rounded-t-3xl shadow-2xl border-t border-border max-h-[70vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{activePod.name}</h3>
                    <p className="text-sm text-muted-foreground">{activePod.internCount} interns · {activePod.companies.join(', ')}</p>
                  </div>
                  <button onClick={closeAll} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Company logos */}
                <div className="flex gap-2 mb-4">
                  {activePod.companies.map(c => (
                    <div key={c} className="px-3 py-1 rounded-full bg-muted text-xs font-semibold text-foreground">{c}</div>
                  ))}
                </div>
                {/* Intern list */}
                <div className="space-y-3">
                  {activePod.interns.map(intern => (
                    <div key={intern.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                      <AvatarCircle name={intern.name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">{intern.name}</div>
                        <div className="text-xs text-muted-foreground">{intern.company}</div>
                        <div className="flex gap-1 mt-1">
                          {intern.interests.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 h-12 rounded-xl gradient-primary text-primary-foreground font-bold">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Pod Chat
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Card */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-0 left-0 right-0 z-40 bg-card rounded-t-3xl shadow-2xl border-t border-border"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-sponsored">Sponsored</div>
                      <div className="font-bold text-foreground">{activeEvent.title}</div>
                    </div>
                  </div>
                  <button onClick={closeAll} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-muted-foreground mb-2">{activeEvent.date} · {activeEvent.time} · {activeEvent.location}</div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeEvent.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-sponsored/10 text-sponsored font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{activeEvent.description}</p>
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {activeEvent.rsvpCount} RSVPs
                </div>
                <Button className="w-full h-12 rounded-xl gradient-gold text-primary-foreground font-bold">
                  RSVP →
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">Hosted by {activeEvent.company} · Sponsored</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hotspot Card */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-0 left-0 right-0 z-40 bg-card rounded-t-3xl shadow-2xl border-t border-border"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg text-foreground">{activeHotspot.name}</div>
                    <div className="text-sm text-muted-foreground">{activeHotspot.address}</div>
                  </div>
                  <button onClick={closeAll} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⭐</span>
                  <span className="font-bold text-foreground">{activeHotspot.rating}</span>
                  {activeHotspot.tagCount >= 5 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-verified/10 text-verified font-semibold">✓ Verified Hotspot</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeHotspot.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground font-medium">{tag}</span>
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  {activeHotspot.notes.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/50">
                      <div className="text-xs text-muted-foreground mb-0.5">{note.user} · {note.date}</div>
                      <div className="text-sm text-foreground">{note.text}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full h-11 rounded-xl font-semibold">
                  Leave a Note
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event List */}
        <AnimatePresence>
          {showEventList && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 bottom-0 w-full sm:w-96 z-40 bg-card border-l border-border shadow-2xl overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-foreground">Events Feed</h3>
                  <button onClick={() => setShowEventList(false)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {sponsoredEvents.map(event => (
                    <button
                      key={event.id}
                      onClick={() => { setShowEventList(false); setSelectedEvent(event.id); }}
                      className="w-full text-left p-4 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-md gradient-gold flex items-center justify-center">
                          <Star className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="text-xs font-semibold text-sponsored">Sponsored</span>
                      </div>
                      <div className="font-bold text-sm text-foreground mb-1">{event.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">{event.date} · {event.time}</div>
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-sponsored/10 text-sponsored font-medium">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{event.rsvpCount} RSVPs</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
