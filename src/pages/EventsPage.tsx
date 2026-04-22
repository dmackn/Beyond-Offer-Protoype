import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { whoIsOut, eventStories, CITY_EVENTS } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

const LIVE_EVENT_IDS = ['atl1', 'atl2', 'nyc1', 'sf2', 'sea1'];

export default function EventsPage() {
  const { rsvped, addRsvp } = useAppContext();
  const [openStories, setOpenStories] = useState<string | null>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const allEvents = Object.values(CITY_EVENTS).flat();
  const activeEvent = openStories ? allEvents.find(e => e.id === openStories) : null;

  // Stories now keyed to new IDs — atl1, atl2, nyc1 etc
  const enrichedStories = [
    { id: 's1', eventId: 'atl1', user: 'Tyler R.', userInit: 'TR', userColor: '#7C3AED', caption: 'Rooftop views are insane right now 🌆', emoji: '🌆', time: '8:42 PM', expiresIn: '3h left' },
    { id: 's2', eventId: 'atl1', user: 'Aisha K.', userInit: 'AK', userColor: '#0D9488', caption: 'Free drinks + good people = perfect Friday', emoji: '🍸', time: '8:55 PM', expiresIn: '3h left' },
    { id: 's3', eventId: 'atl1', user: 'Jordan M.', userInit: 'JM', userColor: '#4F46E5', caption: 'Just met someone from my hometown here lol', emoji: '😂', time: '9:10 PM', expiresIn: '2h left' },
    { id: 's4', eventId: 'atl2', user: 'Marcus T.', userInit: 'MT', userColor: '#0D9488', caption: 'F1 simulator is no joke 🏎️', emoji: '🏎️', time: '6:30 PM', expiresIn: '18h left' },
    { id: 's5', eventId: 'atl2', user: 'Priya S.', userInit: 'PS', userColor: '#4F46E5', caption: 'Taco bar is incredible, highly recommend', emoji: '🌮', time: '7:00 PM', expiresIn: '17h left' },
    { id: 's6', eventId: 'nyc1', user: 'Chris P.', userInit: 'CP', userColor: '#4F46E5', caption: 'Empire State views from the roof 🗽', emoji: '🗽', time: '7:30 PM', expiresIn: '5h left' },
    { id: 's7', eventId: 'sf2', user: 'Maya J.', userInit: 'MJ', userColor: '#0891B2', caption: 'Airbnb HQ is literally a giant treehouse', emoji: '🌲', time: '6:15 PM', expiresIn: '10h left' },
    { id: 's8', eventId: 'sea1', user: 'Kai N.', userInit: 'KN', color: '#059669', userColor: '#059669', caption: 'Amazon intern summit — this is massive', emoji: '🚀', time: '4:45 PM', expiresIn: '8h left' },
  ];

  const toggleRsvp = (id: string) => addRsvp(id);

  // Get live events (ones with stories) for the stories row
  const eventsWithStories = allEvents.filter(e =>
    enrichedStories.some(s => s.eventId === e.id)
  );

  const activeEventStories = openStories
    ? enrichedStories.filter(s => s.eventId === openStories)
    : [];

  return (
    <AppLayout>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '480px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Events</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', background: '#F0FDF4', color: '#16A34A', padding: '5px 12px', borderRadius: '50px', border: '1px solid #BBF7D0' }}>
              🟢 {LIVE_EVENT_IDS.length} live now
            </span>
          </div>
        </div>

        {/* Stories row — Instagram style */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' as const }}>
            {eventsWithStories.map(event => {
              const stories = enrichedStories.filter(s => s.eventId === event.id);
              const isLive = LIVE_EVENT_IDS.includes(event.id);
              const firstStory = stories[0];
              return (
                <button
                  key={event.id}
                  onClick={() => { setOpenStories(event.id); setActiveStoryIdx(0); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{
                    width: '62px', height: '62px', borderRadius: '50%',
                    padding: '2px',
                    background: isLive
                      ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                      : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      background: firstStory?.userColor || '#4F46E5',
                      border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      {firstStory?.emoji || '🎉'}
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#111', textAlign: 'center', maxWidth: '64px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {event.company}
                  </div>
                  {isLive && (
                    <div style={{ fontSize: '9px', fontWeight: '700', color: '#16A34A', marginTop: '-3px' }}>LIVE</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Who's out tonight */}
        {whoIsOut.length > 0 && (
          <div style={{ margin: '0 16px 16px', background: '#F9F9F9', borderRadius: '16px', padding: '12px 14px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              👀 Who's out tonight
            </div>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' as const }}>
              {whoIsOut.map(w => (
                <div key={w.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: w.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#fff' }}>{w.init}</div>
                    <div style={{ position: 'absolute', bottom: -1, right: -1, fontSize: '12px' }}>{w.emoji}</div>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#111' }}>{w.name.split(' ')[0]}</div>
                  <div style={{ fontSize: '9px', color: '#999', textAlign: 'center', maxWidth: '56px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.venue}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events list */}
        <div style={{ padding: '0 16px 80px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>All Events</div>
          {allEvents.map((event, i) => {
            const isRsvped = rsvped.has(event.id);
            const isLive = LIVE_EVENT_IDS.includes(event.id);
            const storyCount = enrichedStories.filter(s => s.eventId === event.id).length;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{ background: '#fff', border: '1px solid #F0F0F0', borderRadius: '18px', padding: '16px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Star style={{ width: '16px', height: '16px', color: '#D97706' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: '#D97706', background: '#FEF3C7', padding: '1px 7px', borderRadius: '50px' }}>Sponsored</span>
                      {isLive && <span style={{ fontSize: '10px', fontWeight: '700', color: '#16A34A', background: '#F0FDF4', padding: '1px 7px', borderRadius: '50px', border: '1px solid #BBF7D0' }}>🟢 Live</span>}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginTop: '2px', lineHeight: 1.2 }}>{event.title}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{event.date} · {event.time} · {event.location}</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                  {event.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '50px', background: '#FEF3C7', color: '#854F0B', fontWeight: '500' }}>{tag}</span>
                  ))}
                </div>

                <p style={{ fontSize: '13px', color: '#888', marginBottom: '10px', lineHeight: '1.5' }}>{event.description}</p>

                {/* Social proof */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex' }}>
                    {['#4F46E5', '#0D9488', '#7C3AED'].map((c, idx) => (
                      <div key={idx} style={{ width: '22px', height: '22px', borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: idx === 0 ? 0 : '-6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: '700', color: '#fff' }}>
                        {['J', 'A', 'P'][idx]}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    <span style={{ fontWeight: '600', color: '#111' }}>Jordan, Aisha</span> + {Math.max(0, event.rsvpCount + (isRsvped ? 1 : 0) - 3)} others going
                  </span>
                </div>

                {/* Stories preview */}
                {storyCount > 0 && (
                  <button
                    onClick={() => { setOpenStories(event.id); setActiveStoryIdx(0); }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F5F5F5', border: 'none', borderRadius: '10px', padding: '9px 12px', cursor: 'pointer', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex' }}>
                        {enrichedStories.filter(s => s.eventId === event.id).slice(0, 3).map((s, idx) => (
                          <div key={s.id} style={{ width: '24px', height: '24px', borderRadius: '50%', background: s.userColor, border: '2px solid #fff', marginLeft: idx === 0 ? 0 : '-6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#fff' }}>
                            {s.userInit}
                          </div>
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#111' }}>{storyCount} stories · {enrichedStories.find(s => s.eventId === event.id)?.expiresIn}</span>
                    </div>
                    <ChevronRight style={{ width: '14px', height: '14px', color: '#999' }} />
                  </button>
                )}

                {/* RSVP button */}
                <button
                  onClick={() => toggleRsvp(event.id)}
                  style={{
                    width: '100%', height: '46px', borderRadius: '12px',
                    background: isRsvped ? '#F0FDF4' : '#F59E0B',
                    color: isRsvped ? '#16A34A' : '#fff',
                    border: isRsvped ? '1.5px solid #BBF7D0' : 'none',
                    cursor: 'pointer', fontSize: '15px', fontWeight: '700',
                    transition: 'all 0.2s',
                  }}>
                  {isRsvped ? '✓ RSVPd — See You There!' : 'RSVP →'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stories modal */}
      <AnimatePresence>
        {openStories && activeEvent && activeEventStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100, display: 'flex', flexDirection: 'column' }}>

            {/* Progress bars */}
            <div style={{ display: 'flex', gap: '4px', padding: '12px 16px 8px' }}>
              {activeEventStories.map((_, i) => (
                <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i < activeStoryIdx ? '#fff' : i === activeStoryIdx ? '#fff' : 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
                  {i === activeStoryIdx && (
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      onAnimationComplete={() => {
                        if (activeStoryIdx < activeEventStories.length - 1) {
                          setActiveStoryIdx(prev => prev + 1);
                        } else {
                          setOpenStories(null);
                        }
                      }}
                      style={{ height: '100%', background: '#fff', borderRadius: '2px' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Story header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: activeEventStories[activeStoryIdx]?.userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff' }}>
                  {activeEventStories[activeStoryIdx]?.userInit}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{activeEventStories[activeStoryIdx]?.user}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{activeEventStories[activeStoryIdx]?.time} · {activeEventStories[activeStoryIdx]?.expiresIn}</div>
                </div>
              </div>
              <button onClick={() => setOpenStories(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X style={{ width: '22px', height: '22px', color: '#fff' }} />
              </button>
            </div>

            {/* Story content — tap left/right to navigate */}
            <div
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
              onClick={e => {
                const x = e.clientX;
                const w = window.innerWidth;
                if (x < w / 2) {
                  if (activeStoryIdx > 0) setActiveStoryIdx(prev => prev - 1);
                  else setOpenStories(null);
                } else {
                  if (activeStoryIdx < activeEventStories.length - 1) setActiveStoryIdx(prev => prev + 1);
                  else setOpenStories(null);
                }
              }}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>{activeEventStories[activeStoryIdx]?.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', lineHeight: '1.3', marginBottom: '12px' }}>
                  {activeEventStories[activeStoryIdx]?.caption}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{activeEvent.title}</div>
              </div>
            </div>

            {/* Bottom RSVP */}
            <div style={{ padding: '16px 24px 40px' }}>
              <button
                onClick={() => { toggleRsvp(activeEvent.id); setOpenStories(null); }}
                style={{ width: '100%', height: '50px', borderRadius: '14px', background: rsvped.has(activeEvent.id) ? '#F0FDF4' : '#F59E0B', color: rsvped.has(activeEvent.id) ? '#16A34A' : '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '700' }}>
                {rsvped.has(activeEvent.id) ? '✓ RSVPd!' : `RSVP to ${activeEvent.company} →`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}