import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, MapPin, Calendar, X, Radio, Navigation } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import EventStories from '@/components/EventStories';
import { sponsoredEvents, whoIsOut, eventStories } from '@/data/mockData';

const LIVE_EVENT_IDS = ['e1', 'e2'];

export default function EventsPage() {
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());
  const [openStories, setOpenStories] = useState<string | null>(null);
  const [droppingPin, setDroppingPin] = useState(false);
  const [pinVenue, setPinVenue] = useState('');
  const [pinDropped, setPinDropped] = useState(false);
  const [whoIsOutList, setWhoIsOutList] = useState(whoIsOut);

  const toggleRsvp = (id: string) => {
    setRsvped(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleDropPin = () => {
    if (!pinVenue.trim()) return;
    setPinDropped(true);
    setDroppingPin(false);
    setPinVenue('');
    setTimeout(() => setPinDropped(false), 3000);
  };

  const activeEvent = openStories ? sponsoredEvents.find(e => e.id === openStories) : null;

  return (
    <AppLayout>
      <div style={{ maxWidth: '480px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* Header */}
        <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Events</div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>Sponsored by companies seeking intern talent</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FEF2F2', borderRadius: '50px', padding: '6px 12px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444' }}>{LIVE_EVENT_IDS.length} Live</span>
          </div>
        </div>

        {/* Who's Out Tonight */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Navigation style={{ width: '14px', height: '14px', color: '#111' }} />
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>Who's out tonight</span>
            </div>
            <button
              onClick={() => setDroppingPin(true)}
              style={{ fontSize: '12px', fontWeight: '600', color: '#22C55E', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              + Drop your pin
            </button>
          </div>

          {pinDropped && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '10px 14px', marginBottom: '10px', fontSize: '13px', color: '#16A34A', fontWeight: '600' }}>
              ✓ You're on the map! Pin expires in 3 hours.
            </div>
          )}

          <AnimatePresence>
            {droppingPin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ background: '#F8F8F8', borderRadius: '14px', padding: '14px', marginBottom: '10px', overflow: 'hidden' }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '8px' }}>Where are you right now?</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={pinVenue}
                    onChange={e => setPinVenue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleDropPin()}
                    placeholder="e.g. The Painted Pin, Piedmont Park..."
                    style={{ flex: 1, height: '40px', border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '0 12px', fontSize: '14px', color: '#111', background: '#fff', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
                    autoFocus
                  />
                  <button onClick={handleDropPin} style={{ padding: '0 16px', height: '40px', borderRadius: '10px', background: '#111', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                    Drop
                  </button>
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>Your pin expires automatically in 3 hours</div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {whoIsOutList.map(person => (
              <div key={person.id} style={{ flexShrink: 0, background: '#fff', border: '1px solid #F0F0F0', borderRadius: '14px', padding: '10px 12px', minWidth: '130px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: person.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                    {person.init}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{person.name}</div>
                    <div style={{ fontSize: '10px', color: '#999' }}>{person.podName}</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#111', fontWeight: '500' }}>{person.emoji} {person.venue}</div>
                <div style={{ fontSize: '10px', color: '#BBB', marginTop: '3px' }}>{person.expiresIn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div style={{ padding: '0 20px 80px' }}>
          {sponsoredEvents.map((event, i) => {
            const isLive = LIVE_EVENT_IDS.includes(event.id);
            const storyCount = eventStories.filter(s => s.eventId === event.id).length;
            const isRsvped = rsvped.has(event.id);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: '18px', overflow: 'hidden', marginBottom: '14px' }}
              >
                {/* Live indicator bar */}
                {isLive && (
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, #22C55E, #16A34A)' }} />
                )}

                {/* Story ring / thumbnail row */}
                {isLive && storyCount > 0 && (
                  <button
                    onClick={() => setOpenStories(event.id)}
                    style={{ width: '100%', padding: '12px 16px', background: '#F8FFF8', border: 'none', borderBottom: '1px solid #F0F0F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <div style={{ display: 'flex', marginRight: '4px' }}>
                      {eventStories.filter(s => s.eventId === event.id).slice(0, 3).map((s, si) => (
                        <div key={s.id} style={{ width: '32px', height: '32px', borderRadius: '50%', background: s.userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff', border: '2px solid #fff', marginLeft: si > 0 ? '-8px' : '0', boxShadow: '0 0 0 2px #22C55E' }}>
                          {s.userInit}
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#16A34A' }}>Live stories · {storyCount} moments</div>
                      <div style={{ fontSize: '11px', color: '#999' }}>Tap to see what's happening now</div>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', animation: 'pulse 1.5s infinite' }} />
                  </button>
                )}

                <div style={{ padding: '16px' }}>
                  {/* Sponsored badge + live tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star style={{ width: '15px', height: '15px', color: '#D97706' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sponsored</span>
                    {isLive && (
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#22C55E', background: '#F0FDF4', borderRadius: '50px', padding: '2px 8px', border: '1px solid #BBF7D0' }}>● Live now</span>
                    )}
                  </div>

                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '10px', letterSpacing: '-0.3px' }}>{event.title}</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                      <Calendar style={{ width: '13px', height: '13px' }} />
                      {event.date} · {event.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                      <MapPin style={{ width: '13px', height: '13px' }} />
                      {event.location}
                    </div>
                  </div>

                  {/* RSVP social proof */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '10px 12px', background: '#F8F8F8', borderRadius: '10px' }}>
                    <div style={{ display: 'flex' }}>
                      {['#4F46E5','#0D9488','#7C3AED'].map((c, ci) => (
                        <div key={ci} style={{ width: '24px', height: '24px', borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: ci > 0 ? '-6px' : '0', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700' }}>
                          {['JM','AK','PS'][ci]}
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      <span style={{ fontWeight: '600', color: '#111' }}>Jordan, Aisha + {event.rsvpCount + (isRsvped ? 1 : 0) - 3} others</span> are going
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {event.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '50px', background: '#FEF3C7', color: '#854F0B', fontWeight: '500' }}>{tag}</span>
                    ))}
                  </div>

                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px', lineHeight: '1.6' }}>{event.description}</p>

                  <button
                    onClick={() => toggleRsvp(event.id)}
                    style={{ width: '100%', height: '46px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700', background: isRsvped ? '#F0FDF4' : '#111', color: isRsvped ? '#16A34A' : '#fff', transition: 'all 0.2s' }}
                  >
                    {isRsvped ? '✓ RSVPd — See You There!' : 'RSVP →'}
                  </button>
                  <div style={{ textAlign: 'center', fontSize: '11px', color: '#bbb', marginTop: '6px' }}>Hosted by {event.company} · Sponsored</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stories modal */}
        <AnimatePresence>
          {openStories && activeEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end' }}
              onClick={(e) => { if (e.target === e.currentTarget) setOpenStories(null); }}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                style={{ background: '#fff', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '20px', maxHeight: '85vh', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>{activeEvent.title}</div>
                    <div style={{ fontSize: '12px', color: '#22C55E', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Radio style={{ width: '11px', height: '11px' }} /> Live now
                    </div>
                  </div>
                  <button onClick={() => setOpenStories(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X style={{ width: '16px', height: '16px', color: '#111' }} />
                  </button>
                </div>
                <EventStories
                  eventId={openStories}
                  eventTitle={activeEvent.title}
                  isLive={LIVE_EVENT_IDS.includes(openStories)}
                  onClose={() => setOpenStories(null)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}