import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Crosshair, Plus, Star, X, MessageCircle } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { pods, hotspots, CITY_EVENTS } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type MapMode = 'offices' | 'explore' | 'globe';

const CITY_COORDS: Record<string, [number, number]> = {
  'Atlanta': [-84.3880, 33.7490],
  'NYC': [-73.9857, 40.7549],
  'SF': [-122.4194, 37.7749],
  'Chicago': [-87.6298, 41.8827],
  'Seattle': [-122.3321, 47.6062],
  'Austin': [-97.7431, 30.2672],
  'Boston': [-71.0589, 42.3601],
  'LA': [-118.2437, 34.0522],
  'London': [-0.0922, 51.5155],
  'Toronto': [-79.3849, 43.6483],
  'Dubai': [55.2796, 25.2084],
  'Singapore': [103.8565, 1.2789],
  'Tokyo': [139.7642, 35.6812],
  'Sydney': [151.2093, -33.8688],
  'Berlin': [13.4050, 52.5200],
};

interface PodData {
  name: string;
  count: number;
  cos: string[];
  color: string;
  lng: number;
  lat: number;
}

const CITY_PODS: Record<string, PodData[]> = {
  Atlanta: [
    { name: 'Ponce City Market', count: 22, cos: ['McKinsey', 'Google', 'BlackRock'], color: '#4F46E5', lng: -84.3655, lat: 33.7726 },
    { name: 'Midtown ATL', count: 11, cos: ['Deloitte', 'PwC'], color: '#0D9488', lng: -84.3830, lat: 33.7866 },
    { name: 'Buckhead', count: 14, cos: ['Goldman Sachs', 'JPMorgan'], color: '#7C3AED', lng: -84.3798, lat: 33.8400 },
    { name: 'Perimeter Center', count: 9, cos: ['Cox', 'NCR', 'Home Depot'], color: '#B45309', lng: -84.3450, lat: 33.9200 },
    { name: 'Tech Square', count: 18, cos: ['Google', 'Microsoft', 'Salesforce'], color: '#0891B2', lng: -84.3963, lat: 33.7756 },
    { name: 'Hartsfield Area', count: 7, cos: ['Delta', 'Chick-fil-A'], color: '#DC2626', lng: -84.4277, lat: 33.6407 },
    { name: 'Cumberland', count: 12, cos: ['Home Depot HQ', 'Truist'], color: '#059669', lng: -84.4669, lat: 33.8673 },
    { name: 'Alpharetta', count: 8, cos: ['Microsoft', 'Salesforce', 'NCR'], color: '#7C3AED', lng: -84.2941, lat: 34.0754 },
  ],
  NYC: [
    { name: 'Hudson Yards', count: 34, cos: ['McKinsey', 'BCG', 'Bain'], color: '#4F46E5', lng: -74.0019, lat: 40.7540 },
    { name: 'Midtown Manhattan', count: 58, cos: ['Goldman Sachs', 'JPMorgan', 'Citi'], color: '#DC2626', lng: -73.9857, lat: 40.7549 },
    { name: 'Financial District', count: 29, cos: ['Morgan Stanley', 'BlackRock'], color: '#7C3AED', lng: -74.0112, lat: 40.7074 },
    { name: 'DUMBO Brooklyn', count: 22, cos: ['Meta', 'Amazon', 'Spotify'], color: '#0D9488', lng: -73.9877, lat: 40.7033 },
    { name: 'Flatiron District', count: 31, cos: ['Deloitte', 'KPMG', 'EY'], color: '#B45309', lng: -73.9897, lat: 40.7411 },
    { name: 'Chelsea', count: 19, cos: ['Google NYC', 'IAC', 'Apple'], color: '#0891B2', lng: -74.0014, lat: 40.7465 },
    { name: 'Times Square', count: 24, cos: ['Viacom', 'Ernst & Young', 'PwC'], color: '#DC2626', lng: -73.9855, lat: 40.7580 },
    { name: 'Long Island City', count: 16, cos: ['Amazon', 'JetBlue', 'Macy\'s'], color: '#059669', lng: -73.9442, lat: 40.7447 },
  ],
  SF: [
    { name: 'SoMa', count: 41, cos: ['Salesforce', 'Airbnb', 'Twitter'], color: '#4F46E5', lng: -122.4016, lat: 37.7785 },
    { name: 'Mission District', count: 28, cos: ['Lyft', 'Uber', 'DoorDash'], color: '#0D9488', lng: -122.4194, lat: 37.7599 },
    { name: 'Financial District', count: 19, cos: ['Wells Fargo', 'Visa', 'Stripe'], color: '#DC2626', lng: -122.4015, lat: 37.7946 },
    { name: 'Embarcadero', count: 35, cos: ['Google', 'Facebook', 'LinkedIn'], color: '#7C3AED', lng: -122.3971, lat: 37.7955 },
    { name: 'Palo Alto', count: 24, cos: ['Apple', 'HP', 'VMware'], color: '#0891B2', lng: -122.1430, lat: 37.4419 },
    { name: 'Mountain View', count: 38, cos: ['Google HQ', 'Mozilla', 'Intuit'], color: '#059669', lng: -122.0841, lat: 37.3861 },
    { name: 'Menlo Park', count: 26, cos: ['Meta HQ', 'Andreessen Horowitz'], color: '#B45309', lng: -122.1817, lat: 37.4529 },
    { name: 'South SF', count: 15, cos: ['Genentech', 'Gilead', 'BioMarin'], color: '#7C3AED', lng: -122.4058, lat: 37.6547 },
  ],
  Chicago: [
    { name: 'The Loop', count: 31, cos: ['Deloitte', 'Accenture', 'Kraft'], color: '#4F46E5', lng: -87.6298, lat: 41.8827 },
    { name: 'River North', count: 24, cos: ['Trading Firms', 'Morningstar'], color: '#DC2626', lng: -87.6344, lat: 41.8932 },
    { name: 'West Loop', count: 17, cos: ['Grubhub', 'Motorola', 'McDonald\'s'], color: '#0D9488', lng: -87.6516, lat: 41.8836 },
    { name: 'Fulton Market', count: 13, cos: ['Google Chicago', 'McDonald\'s HQ'], color: '#7C3AED', lng: -87.6524, lat: 41.8864 },
    { name: 'Streeterville', count: 11, cos: ['Abbott', 'Tribune Media', 'Aon'], color: '#B45309', lng: -87.6162, lat: 41.8942 },
    { name: 'Oak Brook', count: 9, cos: ['McDonald\'s', 'Ace Hardware', 'Inland'], color: '#059669', lng: -87.9484, lat: 41.8500 },
  ],
  Seattle: [
    { name: 'South Lake Union', count: 45, cos: ['Amazon', 'Microsoft', 'Boeing'], color: '#4F46E5', lng: -122.3365, lat: 47.6254 },
    { name: 'Capitol Hill', count: 16, cos: ['Starbucks', 'Nordstrom'], color: '#0D9488', lng: -122.3148, lat: 47.6253 },
    { name: 'Redmond', count: 38, cos: ['Microsoft HQ', 'Nintendo America'], color: '#DC2626', lng: -122.1215, lat: 47.6740 },
    { name: 'Bellevue', count: 22, cos: ['T-Mobile', 'Expedia', 'Valve'], color: '#7C3AED', lng: -122.2015, lat: 47.6101 },
    { name: 'Fremont', count: 14, cos: ['Google Seattle', 'Adobe', 'Tableau'], color: '#B45309', lng: -122.3500, lat: 47.6512 },
    { name: 'SODO', count: 11, cos: ['Starbucks HQ', 'Concur', 'Rover'], color: '#059669', lng: -122.3301, lat: 47.5793 },
  ],
  Austin: [
    { name: 'Downtown Austin', count: 27, cos: ['Dell', 'Apple', 'Tesla'], color: '#4F46E5', lng: -97.7431, lat: 30.2672 },
    { name: 'The Domain', count: 33, cos: ['Google', 'Amazon', 'Indeed'], color: '#0D9488', lng: -97.7214, lat: 30.4012 },
    { name: 'East Austin', count: 14, cos: ['Oracle', 'Bumble', 'Indeed'], color: '#DC2626', lng: -97.7200, lat: 30.2630 },
    { name: 'Gigafactory Area', count: 19, cos: ['Tesla', 'Samsung Austin'], color: '#7C3AED', lng: -97.6200, lat: 30.2200 },
    { name: 'Cedar Park', count: 11, cos: ['Apple Campus', '3M', 'Polycom'], color: '#B45309', lng: -97.8203, lat: 30.5052 },
  ],
  Boston: [
    { name: 'Back Bay', count: 22, cos: ['Fidelity', 'State Street', 'Putnam'], color: '#DC2626', lng: -71.0845, lat: 42.3503 },
    { name: 'Cambridge', count: 19, cos: ['HubSpot', 'Wayfair', 'Biogen'], color: '#4F46E5', lng: -71.1056, lat: 42.3736 },
    { name: 'Seaport', count: 15, cos: ['Liberty Mutual', 'Raytheon', 'PTC'], color: '#0D9488', lng: -71.0444, lat: 42.3516 },
    { name: 'Longwood Medical', count: 11, cos: ['Vertex', 'Moderna', 'Biogen'], color: '#7C3AED', lng: -71.1061, lat: 42.3368 },
    { name: 'Kendall Square', count: 24, cos: ['Google', 'MIT Spinoffs', 'Sanofi'], color: '#B45309', lng: -71.0892, lat: 42.3626 },
    { name: 'Waltham', count: 9, cos: ['Brandeis', 'Constant Contact', 'TripAdvisor'], color: '#059669', lng: -71.2356, lat: 42.3765 },
  ],
  LA: [
    { name: 'Santa Monica', count: 29, cos: ['Snap', 'Hulu', 'Activision'], color: '#4F46E5', lng: -118.4912, lat: 34.0195 },
    { name: 'Downtown LA', count: 22, cos: ['KPMG', 'Deloitte', 'City National'], color: '#DC2626', lng: -118.2437, lat: 34.0522 },
    { name: 'Culver City', count: 18, cos: ['Apple TV+', 'Amazon Studios', 'Sony'], color: '#7C3AED', lng: -118.3965, lat: 34.0211 },
    { name: 'El Segundo', count: 24, cos: ['SpaceX', 'Northrop Grumman', 'Raytheon'], color: '#0891B2', lng: -118.4165, lat: 33.9192 },
    { name: 'West Hollywood', count: 16, cos: ['Riot Games', 'Warner Music', 'Netflix'], color: '#0D9488', lng: -118.3617, lat: 34.0900 },
    { name: 'Playa Vista', count: 21, cos: ['Google', 'YouTube', 'Facebook'], color: '#B45309', lng: -118.4270, lat: 33.9775 },
    { name: 'Burbank', count: 13, cos: ['Disney', 'Warner Bros', 'NBC'], color: '#059669', lng: -118.3089, lat: 34.1808 },
  ],
  London: [
    { name: 'Canary Wharf', count: 44, cos: ['HSBC', 'Barclays', 'JPMorgan'], color: '#4F46E5', lng: -0.0235, lat: 51.5054 },
    { name: 'City of London', count: 38, cos: ['Goldman Sachs', 'Morgan Stanley', 'BlackRock'], color: '#DC2626', lng: -0.0922, lat: 51.5155 },
    { name: 'Shoreditch', count: 22, cos: ['Google London', 'Amazon', 'Deliveroo'], color: '#0D9488', lng: -0.0774, lat: 51.5224 },
    { name: 'South Bank', count: 16, cos: ['Deloitte', 'PwC', 'EY'], color: '#7C3AED', lng: -0.1057, lat: 51.5045 },
    { name: 'Paddington', count: 14, cos: ['Vodafone', 'Marks & Spencer', 'BT'], color: '#B45309', lng: -0.1769, lat: 51.5154 },
  ],
  Toronto: [
    { name: 'Financial District', count: 28, cos: ['TD Bank', 'RBC', 'Scotiabank'], color: '#DC2626', lng: -79.3849, lat: 43.6483 },
    { name: 'MaRS District', count: 21, cos: ['Google Toronto', 'Shopify', 'Uber Canada'], color: '#4F46E5', lng: -79.3930, lat: 43.6596 },
    { name: 'Waterfront', count: 17, cos: ['Sidewalk Labs', 'Porter Airlines', 'CIBC'], color: '#0D9488', lng: -79.3777, lat: 43.6409 },
    { name: 'Mississauga', count: 12, cos: ['Microsoft Canada', 'Apple Canada', 'Amazon'], color: '#7C3AED', lng: -79.6441, lat: 43.5890 },
  ],
  Dubai: [
    { name: 'DIFC', count: 32, cos: ['Goldman Sachs', 'JPMorgan', 'HSBC Middle East'], color: '#4F46E5', lng: 55.2796, lat: 25.2084 },
    { name: 'Dubai Marina', count: 18, cos: ['Emaar', 'Damac', 'Visa MENA'], color: '#DC2626', lng: 55.1488, lat: 25.0805 },
    { name: 'Downtown Dubai', count: 24, cos: ['Microsoft Gulf', 'Amazon MENA', 'Oracle'], color: '#0D9488', lng: 55.2762, lat: 25.1972 },
    { name: 'Dubai Internet City', count: 29, cos: ['Google', 'LinkedIn', 'Facebook'], color: '#7C3AED', lng: 55.1565, lat: 25.1023 },
  ],
  Singapore: [
    { name: 'Marina Bay', count: 36, cos: ['Goldman Sachs', 'JPMorgan', 'Citi Asia'], color: '#4F46E5', lng: 103.8565, lat: 1.2789 },
    { name: 'One-North', count: 27, cos: ['Google', 'Meta', 'Grab HQ'], color: '#0D9488', lng: 103.7877, lat: 1.2993 },
    { name: 'Orchard Road', count: 15, cos: ['Procter & Gamble', 'EY', 'KPMG'], color: '#DC2626', lng: 103.8303, lat: 1.3048 },
    { name: 'Jurong East', count: 11, cos: ['Alibaba', 'Tencent', 'ByteDance'], color: '#7C3AED', lng: 103.7426, lat: 1.3329 },
  ],
  Tokyo: [
    { name: 'Shinjuku', count: 19, cos: ['Sony', 'NTT', 'Rakuten'], color: '#DC2626', lng: 139.6917, lat: 35.6895 },
    { name: 'Shibuya', count: 24, cos: ['Google Japan', 'Amazon Japan', 'DeNA'], color: '#4F46E5', lng: 139.7016, lat: 35.6580 },
    { name: 'Marunouchi', count: 31, cos: ['Goldman Sachs Japan', 'JPMorgan', 'Mitsubishi'], color: '#7C3AED', lng: 139.7642, lat: 35.6812 },
    { name: 'Roppongi', count: 14, cos: ['Morgan Stanley', 'McKinsey Japan', 'BCG'], color: '#0D9488', lng: 139.7317, lat: 35.6627 },
  ],
  Sydney: [
    { name: 'CBD', count: 22, cos: ['Macquarie', 'ANZ', 'Commonwealth Bank'], color: '#DC2626', lng: 151.2093, lat: -33.8688 },
    { name: 'North Sydney', count: 16, cos: ['Microsoft Australia', 'Google', 'Amazon'], color: '#4F46E5', lng: 151.2073, lat: -33.8404 },
    { name: 'Pyrmont', count: 13, cos: ['Google Sydney', 'Atlassian', 'Canva'], color: '#0D9488', lng: 151.1949, lat: -33.8713 },
  ],
  Berlin: [
    { name: 'Mitte', count: 18, cos: ['Zalando', 'N26', 'Delivery Hero'], color: '#4F46E5', lng: 13.4050, lat: 52.5200 },
    { name: 'Prenzlauer Berg', count: 14, cos: ['Soundcloud', 'HelloFresh', 'Trivago'], color: '#0D9488', lng: 13.4321, lat: 52.5393 },
    { name: 'Kreuzberg', count: 11, cos: ['Zalando', 'ResearchGate', 'Wooga'], color: '#DC2626', lng: 13.4031, lat: 52.4988 },
  ],
};

const CITY_FRIENDS: Record<string, { name: string; init: string; color: string; lng: number; lat: number }[]> = {
  Atlanta: [
    { name: 'Aisha K.', init: 'AK', color: '#0D9488', lng: -84.3700, lat: 33.7750 },
    { name: 'Marcus T.', init: 'MT', color: '#0D9488', lng: -84.3860, lat: 33.7830 },
    { name: 'Priya S.', init: 'PS', color: '#7C3AED', lng: -84.3920, lat: 33.7780 },
  ],
  NYC: [{ name: 'Chris P.', init: 'CP', color: '#4F46E5', lng: -74.0050, lat: 40.7560 }],
  SF: [{ name: 'Maya J.', init: 'MJ', color: '#4F46E5', lng: -122.4050, lat: 37.7800 }],
  Seattle: [{ name: 'Kai N.', init: 'KN', color: '#4F46E5', lng: -122.3380, lat: 47.6270 }],
  Chicago: [], Austin: [], Boston: [], LA: [],
  London: [], Toronto: [], Dubai: [], Singapore: [], Tokyo: [], Sydney: [], Berlin: [],
};

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();

  const [mode, setMode] = useState<MapMode>('offices');
  const [selectedCity, setSelectedCity] = useState('Atlanta');
  const [selectedPod, setSelectedPod] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { rsvped, addRsvp } = useAppContext();
  const [showDropForm, setShowDropForm] = useState(false);
  const [hotspotName, setHotspotName] = useState('');
  const [droppedHotspots, setDroppedHotspots] = useState<{ name: string; coords: [number, number] }[]>([]);

  const allCityEvents = Object.values(CITY_EVENTS).flat();
  const activePodData = selectedPod ? CITY_PODS[selectedCity]?.find(p => p.name === selectedPod) : null;
  const activeEvent = allCityEvents.find(e => e.id === selectedEvent);
  const activeHotspot = hotspots.find(h => h.id === selectedHotspot);

  const closeAll = () => {
    setSelectedPod(null);
    setSelectedEvent(null);
    setSelectedHotspot(null);
    setShowDropForm(false);
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
      center: CITY_COORDS['Atlanta'],
      zoom: 11,
    });
    map.current.on('load', () => setMapReady(true));
    return () => { map.current?.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!mapReady || !map.current) return;
    clearMarkers();
    closeAll();

    const center = CITY_COORDS[selectedCity] || CITY_COORDS['Atlanta'];

    if (mode === 'globe') {
      (map.current as any).setProjection({ name: 'globe' });
      map.current.flyTo({ center: [20, 20], zoom: 1.8, duration: 1200 });
      Object.entries(CITY_COORDS).forEach(([city, coords]) => {
        const el = document.createElement('div');
        el.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer`;
        el.innerHTML = `
          <div style="width:${city === selectedCity ? '14' : '9'}px;height:${city === selectedCity ? '14' : '9'}px;border-radius:50%;background:${city === selectedCity ? '#22C55E' : '#4F46E5'};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>
          <div style="background:#fff;border-radius:50px;padding:1px 6px;font-size:9px;font-weight:700;color:#111;border:1px solid #E5E5E5;white-space:nowrap">${city}</div>`;
        el.onclick = () => { setSelectedCity(city); setMode('offices'); };
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat(coords).addTo(map.current!));
      });
      return;
    }

    (map.current as any).setProjection({ name: 'mercator' });
    map.current.flyTo({ center, zoom: 12, duration: 800 });

    if (mode === 'offices') {
      const cityPods = CITY_PODS[selectedCity] || [];
      cityPods.forEach(pod => {
        const el = document.createElement('div');
        el.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer`;
        el.innerHTML = `
          <div style="width:62px;height:62px;border-radius:50%;background:${pod.color};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
            <div style="font-size:18px;font-weight:800;line-height:1">${pod.count}</div>
            <div style="font-size:9px;opacity:0.8">interns</div>
          </div>
          <div style="background:#fff;border:1px solid #E5E5E5;border-radius:50px;padding:2px 10px;font-size:11px;font-weight:600;color:#111;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.08)">${pod.name}</div>`;
        el.onclick = () => { closeAll(); setSelectedPod(pod.name); map.current?.flyTo({ center: [pod.lng, pod.lat], zoom: 14, duration: 600 }); };
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat([pod.lng, pod.lat]).addTo(map.current!));
      });

      const friends = CITY_FRIENDS[selectedCity] || [];
      friends.forEach(f => {
        const el = document.createElement('div');
        el.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer`;
        el.innerHTML = `
          <div style="width:34px;height:34px;border-radius:50%;background:${f.color};border:2.5px solid #22C55E;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.15)">${f.init}</div>
          <div style="background:#fff;border-radius:50px;padding:1px 7px;font-size:9px;font-weight:600;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.1);white-space:nowrap">${f.name.split(' ')[0]}</div>`;
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat([f.lng, f.lat]).addTo(map.current!));
      });
    }

    if (mode === 'explore') {
      const cityEvents = CITY_EVENTS[selectedCity] || [];
      cityEvents.forEach(event => {
        const el = document.createElement('div');
        el.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer`;
        el.innerHTML = `
          <div style="width:44px;height:44px;border-radius:50%;background:#F59E0B;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 4px 12px rgba(245,158,11,0.4);font-size:20px">📅</div>
          <div style="background:#fff;border-radius:50px;padding:2px 8px;font-size:9px;font-weight:600;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.1);white-space:nowrap;max-width:90px;overflow:hidden;text-overflow:ellipsis">${event.company}</div>`;
        el.onclick = () => { closeAll(); setSelectedEvent(event.id); };
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat([event.lng, event.lat]).addTo(map.current!));
      });

      hotspots.forEach(spot => {
        const color = spot.rating >= 4.5 ? '#22C55E' : spot.rating >= 3.5 ? '#F59E0B' : '#EF4444';
        const el = document.createElement('div');
        el.style.cssText = `cursor:pointer`;
        el.innerHTML = `<div style="width:34px;height:34px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);font-size:16px">📍</div>`;
        el.onclick = () => { closeAll(); setSelectedHotspot(spot.id); };
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat([spot.lng, spot.lat]).addTo(map.current!));
      });

      droppedHotspots.forEach(hs => {
        const el = document.createElement('div');
        el.innerHTML = `<div style="width:34px;height:34px;border-radius:50%;background:#4F46E5;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(79,70,229,0.3);font-size:16px">⭐</div>`;
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat(hs.coords).addTo(map.current!));
      });
    }
  }, [mode, mapReady, selectedCity, droppedHotspots]);

  const handleRsvp = (eventId: string) => {
    addRsvp(eventId);
  };

  const handleDropHotspot = () => {
    if (!hotspotName.trim()) return;
    const center = CITY_COORDS[selectedCity];
    const coords: [number, number] = [
      center[0] + (Math.random() - 0.5) * 0.02,
      center[1] + (Math.random() - 0.5) * 0.02,
    ];
    setDroppedHotspots(prev => [...prev, { name: hotspotName, coords }]);
    setHotspotName('');
    setShowDropForm(false);
  };

  return (
    <AppLayout>
      <div style={{ position: 'relative', height: 'calc(100vh - 5rem)', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

        {/* Top controls */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '10px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
            <Search style={{ width: '15px', height: '15px', color: '#999', flexShrink: 0 }} />
            <input placeholder="Search company, location, interest..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: '#111', flex: 1, fontFamily: 'Inter, system-ui, sans-serif' }} />
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px', scrollbarWidth: 'none' as const }}>
            {Object.keys(CITY_COORDS).map(city => (
              <button key={city} onClick={() => { setSelectedCity(city); if (mode === 'globe') setMode('offices'); }}
                style={{ padding: '6px 14px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', background: selectedCity === city ? '#111' : 'rgba(255,255,255,0.95)', color: selectedCity === city ? '#fff' : '#666', whiteSpace: 'nowrap' as const, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', flexShrink: 0, transition: 'all 0.2s' }}>
                {selectedCity === city ? `📍 ${city}` : city}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.95)', borderRadius: '50px', padding: '3px', gap: '2px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
              {([{ key: 'offices', label: '🏢 Offices' }, { key: 'explore', label: '🗺 Explore' }, { key: 'globe', label: '🌍 Globe' }] as { key: MapMode; label: string }[]).map(({ key, label }) => (
                <button key={key} onClick={() => setMode(key)}
                  style={{ padding: '7px 16px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: mode === key ? '#111' : 'none', color: mode === key ? '#fff' : '#666', transition: 'all 0.2s', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location button */}
        <button onClick={() => map.current?.flyTo({ center: CITY_COORDS[selectedCity], zoom: 12, duration: 600 })}
          style={{ position: 'absolute', bottom: mode === 'explore' ? 84 : 24, right: 16, zIndex: 10, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
          <Crosshair style={{ width: '20px', height: '20px', color: '#111' }} />
        </button>

        {mode === 'explore' && (
          <button onClick={() => setShowDropForm(true)}
            style={{ position: 'absolute', bottom: 24, left: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
            <Plus style={{ width: '16px', height: '16px' }} />
            Drop a Hotspot
          </button>
        )}

        {/* Drop hotspot form */}
        <AnimatePresence>
          {showDropForm && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111' }}>Drop a Hotspot</div>
                <button onClick={() => setShowDropForm(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '6px' }}>Venue name</label>
                <input value={hotspotName} onChange={e => setHotspotName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleDropHotspot()}
                  placeholder="e.g. Piedmont Park, Krog Street..."
                  style={{ width: '100%', height: '44px', border: '1.5px solid #E5E5E5', borderRadius: '12px', padding: '0 14px', fontSize: '14px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }} />
              </div>
              <button onClick={handleDropHotspot}
                style={{ width: '100%', height: '46px', borderRadius: '12px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700' }}>
                Drop it 📍
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pod panel */}
        <AnimatePresence>
          {selectedPod && activePodData && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', maxHeight: '70%', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{selectedPod}</div>
                  <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>{activePodData.count} interns · {activePodData.cos.join(', ')}</div>
                </div>
                <button onClick={closeAll} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                {activePodData.cos.map(c => (
                  <span key={c} style={{ padding: '4px 12px', borderRadius: '50px', background: '#F5F5F5', fontSize: '12px', fontWeight: '600', color: '#111' }}>{c}</span>
                ))}
              </div>
              {pods.filter(p => p.name === selectedPod).flatMap(p => p.interns).map(intern => (
                <div key={intern.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', background: '#F9F9F9', marginBottom: '8px' }}>
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
                  <button onClick={() => navigate('/chats')} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0F0F0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle style={{ width: '15px', height: '15px', color: '#111' }} />
                  </button>
                </div>
              ))}
              <button onClick={() => navigate('/chats')}
                style={{ width: '100%', marginTop: '14px', height: '48px', borderRadius: '14px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700' }}>
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
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>{activeEvent.title}</div>
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
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
                👥 {activeEvent.rsvpCount + (rsvped.has(activeEvent.id) ? 1 : 0)} RSVPs
              </div>
              <button onClick={() => handleRsvp(activeEvent.id)}
                style={{ width: '100%', height: '48px', borderRadius: '14px', background: rsvped.has(activeEvent.id) ? '#F0FDF4' : '#F59E0B', color: rsvped.has(activeEvent.id) ? '#16A34A' : '#fff', border: rsvped.has(activeEvent.id) ? '1.5px solid #BBF7D0' : 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700', transition: 'all 0.2s' }}>
                {rsvped.has(activeEvent.id) ? '✓ RSVPd — See You There!' : 'RSVP →'}
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
                  <span style={{ fontSize: '11px', background: '#D1FAE5', color: '#065F46', borderRadius: '50px', padding: '2px 8px', fontWeight: '600' }}>✓ Verified</span>
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
              <button style={{ width: '100%', height: '46px', borderRadius: '14px', background: '#fff', color: '#111', border: '1.5px solid #E5E5E5', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
                Leave a Note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}