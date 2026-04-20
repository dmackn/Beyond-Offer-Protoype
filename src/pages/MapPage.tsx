import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Crosshair, Plus, Star, MapPin, X, Users, MessageCircle, List, Globe } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { pods, hotspots, sponsoredEvents } from '@/data/mockData';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type MapMode = 'offices' | 'explore' | 'globe';

const CITY_COORDS: Record<string, [number, number]> = {
  'Atlanta': [-84.3880, 33.7490],
  'NYC': [-74.0060, 40.7128],
  'SF': [-122.4194, 37.7749],
  'Chicago': [-87.6298, 41.8781],
  'Seattle': [-122.3321, 47.6062],
  'Austin': [-97.7431, 30.2672],
  'Boston': [-71.0589, 42.3601],
  'LA': [-118.2437, 34.0522],
};

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mode, setMode] = useState<MapMode>('offices');
  const [selectedPod, setSelectedPod] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const activePod = pods.find(p => p.id === selectedPod);
  const activeEvent = sponsoredEvents.find(e => e.id === selectedEvent);
  const activeHotspot = hotspots.find(h => h.id === selectedHotspot);

  const closeAll = () => {
    setSelectedPod(null);
    setSelectedEvent(null);
    setSelectedHotspot(null);
  };

  const clearMarkers = () => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-84.3880, 33.7490],
      zoom: 11,
      pitch: 0,
    });

    map.current.on('load', () => setMapReady(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !map.current) return;
    clearMarkers();
    closeAll();

    if (mode === 'offices') {
      map.current.flyTo({ center: [-84.3880, 33.7490], zoom: 11, pitch: 0, bearing: 0, duration: 800 });

      pods.forEach(pod => {
        const el = document.createElement('div');
        el.style.cssText = `
          width: 64px; height: 64px; border-radius: 50%;
          background: #111; display: flex; flex-direction: column;
          align-items: center; justify-content: center; cursor: pointer;
          border: 3px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          color: #fff; font-family: Inter, system-ui, sans-serif;
        `;
        el.innerHTML = `
          <div style="font-size:18px;font-weight:800;line-height:1">${pod.internCount}</div>
          <div style="font-size:9px;opacity:0.7">interns</div>
        `;
        el.addEventListener('click', () => {
          closeAll();
          setSelectedPod(pod.id);
          map.current?.flyTo({ center: [pod.lng, pod.lat], zoom: 14, duration: 600 });
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([pod.lng, pod.lat])
          .addTo(map.current!);

        // Pod name label
        const label = document.createElement('div');
        label.style.cssText = `
          position: absolute; bottom: -26px; left: 50%; transform: translateX(-50%);
          white-space: nowrap; background: #fff; border: 1px solid #E5E5E5;
          border-radius: 50px; padding: 2px 8px; font-size: 11px;
          font-weight: 600; color: #111; font-family: Inter, system-ui, sans-serif;
          pointer-events: none;
        `;
        label.textContent = pod.name;
        el.style.position = 'relative';
        el.appendChild(label);

        markersRef.current.push(marker);
      });
    }

    if (mode === 'explore') {
      map.current.flyTo({ center: [-84.3880, 33.7490], zoom: 12, pitch: 0, duration: 800 });

      sponsoredEvents.forEach(event => {
        const el = document.createElement('div');
        el.style.cssText = `
          width: 44px; height: 44px; border-radius: 50%;
          background: #F59E0B; display: flex; align-items: center;
          justify-content: center; cursor: pointer; border: 3px solid #fff;
          box-shadow: 0 4px 12px rgba(245,158,11,0.4); font-size: 20px;
        `;
        el.innerHTML = '📅';
        el.addEventListener('click', () => { closeAll(); setSelectedEvent(event.id); });

        const coords: [number, number] = [
          -84.3880 + (Math.random() - 0.5) * 0.06,
          33.7490 + (Math.random() - 0.5) * 0.06,
        ];
        markersRef.current.push(
          new mapboxgl.Marker({ element: el }).setLngLat(coords).addTo(map.current!)
        );
      });

      hotspots.forEach(spot => {
        const el = document.createElement('div');
        const color = spot.rating >= 4.5 ? '#22C55E' : spot.rating >= 3.5 ? '#F59E0B' : '#EF4444';
        el.style.cssText = `
          width: 36px; height: 36px; border-radius: 50%;
          background: ${color}; display: flex; align-items: center;
          justify-content: center; cursor: pointer; border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2); font-size: 16px;
        `;
        el.innerHTML = '📍';
        el.addEventListener('click', () => { closeAll(); setSelectedHotspot(spot.id); });

        markersRef.current.push(
          new mapboxgl.Marker({ element: el })
            .setLngLat([spot.lng, spot.lat])
            .addTo(map.current!)
        );
      });
    }

    if (mode === 'globe') {
      map.current.setProjection({ name: 'globe' } as any);
      map.current.flyTo({ center: [-98, 39], zoom: 2.5, pitch: 0, bearing: 0, duration: 1200 });

      Object.entries(CITY_COORDS).forEach(([city, coords]) => {
        const el = document.createElement('div');
        el.style.cssText = `
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer;
        `;
        const dot = document.createElement('div');
        dot.style.cssText = `
          width: 12px; height: 12px; border-radius: 50%;
          background: ${city === 'Atlanta' ? '#22C55E' : '#111'};
          border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        `;
        const label = document.createElement('div');
        label.style.cssText = `
          background: #fff; border-radius: 50px; padding: 2px 8px;
          font-size: 10px; font-weight: 700; color: #111;
          font-family: Inter, system-ui, sans-serif;
          border: 1px solid #E5E5E5; white-space: nowrap;
        `;
        label.textContent = city;
        el.appendChild(dot);
        el.appendChild(label);

        markersRef.current.push(
          new mapboxgl.Marker({ element: el }).setLngLat(coords).addTo(map.current!)
        );
      });
    } else {
      map.current.setProjection({ name: 'mercator' } as any);
    }
  }, [mode, mapReady]);

  return (
    <AppLayout>
      <div style={{ position: 'relative', height: 'calc(100vh - 5rem)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* Map container */}
        <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

        {/* Search bar */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '10px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', backdropFilter: 'blur(10px)' }}>
            <Search style={{ width: '15px', height: '15px', color: '#999', flexShrink: 0 }} />
            <input placeholder="Search company, location, interest..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: '#111', flex: 1, fontFamily: 'Inter, system-ui, sans-serif' }} />
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ position: 'absolute', top: 68, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '3px', gap: '2px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', backdropFilter: 'blur(10px)' }}>
            {([
              { key: 'offices', label: '🏢 Offices' },
              { key: 'explore', label: '🗺 Explore' },
              { key: 'globe', label: '🌍 Globe' },
            ] as { key: MapMode; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                style={{ padding: '7px 16px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: mode === key ? '#111' : 'none', color: mode === key ? '#fff' : '#666', transition: 'all 0.2s', fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* My location button */}
        <button
          onClick={() => map.current?.flyTo({ center: [-84.3880, 33.7490], zoom: 13, duration: 600 })}
          style={{ position: 'absolute', bottom: mode === 'explore' ? 80 : 24, right: 16, zIndex: 10, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }}
        >
          <Crosshair style={{ width: '20px', height: '20px', color: '#111' }} />
        </button>

        {/* Drop hotspot FAB */}
        {mode === 'explore' && (
          <button style={{ position: 'absolute', bottom: 24, left: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <Plus style={{ width: '16px', height: '16px' }} />
            Drop a Hotspot
          </button>
        )}

        {/* Pod panel */}
        <AnimatePresence>
          {activePod && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', maxHeight: '70%', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{activePod.name}</div>
                  <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>{activePod.internCount} interns · {activePod.companies.join(', ')}</div>
                </div>
                <button onClick={closeAll} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {activePod.companies.map(c => (
                  <span key={c} style={{ padding: '4px 12px', borderRadius: '50px', background: '#F5F5F5', fontSize: '12px', fontWeight: '600', color: '#111' }}>{c}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activePod.interns.map(intern => (
                  <div key={intern.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: '#F9F9F9' }}>
                    <AvatarCircle name={intern.name} size="md" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{intern.name}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>{intern.company}</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        {intern.interests.slice(0, 2).map(tag => (
                          <span key={tag} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '50px', background: '#EEF2FF', color: '#4F46E5', fontWeight: '500' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0F0F0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageCircle style={{ width: '15px', height: '15px', color: '#111' }} />
                    </button>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', marginTop: '14px', height: '48px', borderRadius: '14px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Join Pod Chat →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event panel */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star style={{ width: '18px', height: '18px', color: '#D97706' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sponsored</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>{activeEvent.title}</div>
                  </div>
                </div>
                <button onClick={closeAll} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>{activeEvent.date} · {activeEvent.time} · {activeEvent.location}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {activeEvent.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '50px', background: '#FEF3C7', color: '#854F0B', fontWeight: '500' }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px', lineHeight: '1.6' }}>{activeEvent.description}</p>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>👥 {activeEvent.rsvpCount} RSVPs</div>
              <button style={{ width: '100%', height: '48px', borderRadius: '14px', background: '#F59E0B', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700', fontFamily: 'Inter, system-ui, sans-serif' }}>
                RSVP →
              </button>
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#bbb', marginTop: '6px' }}>Hosted by {activeEvent.company} · Sponsored</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hotspot panel */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', maxHeight: '60%', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{activeHotspot.name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{activeHotspot.address}</div>
                </div>
                <button onClick={closeAll} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px' }}>⭐</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>{activeHotspot.rating}</span>
                {activeHotspot.tagCount >= 5 && (
                  <span style={{ fontSize: '11px', background: '#D1FAE5', color: '#065F46', borderRadius: '50px', padding: '2px 8px', fontWeight: '600' }}>✓ Verified Hotspot</span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {activeHotspot.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '50px', background: '#F5F5F5', color: '#111', fontWeight: '500' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                {activeHotspot.notes.map((note, i) => (
                  <div key={i} style={{ background: '#F9F9F9', borderRadius: '10px', padding: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px' }}>{note.user} · {note.date}</div>
                    <div style={{ fontSize: '13px', color: '#111' }}>{note.text}</div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', height: '46px', borderRadius: '14px', background: '#fff', color: '#111', border: '1.5px solid #E5E5E5', cursor: 'pointer', fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, system-ui, sans-serif' }}>
                Leave a Note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}