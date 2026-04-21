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
  'Miami': [-80.1918, 25.7617],
  'Dallas': [-96.7970, 32.7767],
  'Denver': [-104.9903, 39.7392],
  'DC': [-77.0369, 38.9072],
  'Houston': [-95.3698, 29.7604],
  'Minneapolis': [-93.2650, 44.9778],
  'Charlotte': [-80.8431, 35.2271],
  'Nashville': [-86.7816, 36.1627],
  'Phoenix': [-112.0740, 33.4484],
  'Raleigh': [-78.6382, 35.7796],
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
    { name: 'Midtown ATL', count: 18, cos: ['Deloitte', 'PwC', 'Accenture'], color: '#0D9488', lng: -84.3830, lat: 33.7866 },
    { name: 'Buckhead', count: 14, cos: ['Goldman Sachs', 'JPMorgan', 'Wells Fargo'], color: '#7C3AED', lng: -84.3798, lat: 33.8400 },
    { name: 'Perimeter Center', count: 12, cos: ['Cox Enterprises', 'NCR', 'Fiserv'], color: '#B45309', lng: -84.3450, lat: 33.9200 },
    { name: 'Tech Square (GT)', count: 24, cos: ['Google', 'Microsoft', 'Salesforce', 'Mailchimp'], color: '#0891B2', lng: -84.3963, lat: 33.7756 },
    { name: 'Hartsfield Area', count: 9, cos: ['Delta Air Lines', 'Chick-fil-A', 'UPS'], color: '#DC2626', lng: -84.4277, lat: 33.6407 },
    { name: 'Cumberland / Vinings', count: 13, cos: ['Home Depot HQ', 'Truist', 'Genuine Parts'], color: '#059669', lng: -84.4669, lat: 33.8673 },
    { name: 'Alpharetta', count: 10, cos: ['Microsoft', 'Salesforce', 'NCR Voyix', 'Verizon'], color: '#7C3AED', lng: -84.2941, lat: 34.0754 },
    { name: 'Downtown Atlanta', count: 16, cos: ['CNN', 'Coca-Cola HQ', 'SunTrust Park'], color: '#DC2626', lng: -84.3879, lat: 33.7490 },
    { name: 'Sandy Springs', count: 8, cos: ['UPS HQ', 'Newell Brands', 'IHG Hotels'], color: '#059669', lng: -84.3735, lat: 33.9240 },
  ],
  NYC: [
    { name: 'Hudson Yards', count: 38, cos: ['McKinsey', 'BCG', 'Bain', 'KKR', 'BlackRock'], color: '#4F46E5', lng: -74.0019, lat: 40.7540 },
    { name: 'Midtown East', count: 62, cos: ['Goldman Sachs', 'JPMorgan', 'Citi', 'Morgan Stanley', 'BlackRock'], color: '#DC2626', lng: -73.9680, lat: 40.7549 },
    { name: 'Financial District', count: 44, cos: ['Goldman Sachs HQ', 'NYSE', 'Deloitte', 'EY', 'PwC'], color: '#7C3AED', lng: -74.0112, lat: 40.7074 },
    { name: 'DUMBO / Brooklyn Tech', count: 26, cos: ['Meta', 'Amazon', 'Spotify', 'Etsy', 'Squarespace'], color: '#0D9488', lng: -73.9877, lat: 40.7033 },
    { name: 'Flatiron / Midtown South', count: 35, cos: ['Deloitte', 'KPMG', 'EY', 'Peloton', 'Squarespace'], color: '#B45309', lng: -73.9897, lat: 40.7411 },
    { name: 'Chelsea / Google NYC', count: 28, cos: ['Google NYC', 'Apple', 'IAC', 'Publicis'], color: '#0891B2', lng: -74.0014, lat: 40.7465 },
    { name: 'Times Square / Midtown', count: 31, cos: ['Viacom', 'Condé Nast', 'PwC', 'NASDAQ'], color: '#DC2626', lng: -73.9855, lat: 40.7580 },
    { name: 'Long Island City', count: 18, cos: ['JetBlue', 'Macy\'s HQ', 'Citibank Ops'], color: '#059669', lng: -73.9442, lat: 40.7447 },
    { name: 'Park Slope / Brooklyn', count: 14, cos: ['Etsy HQ', 'WeWork', 'Vice Media'], color: '#7C3AED', lng: -73.9799, lat: 40.6782 },
    { name: 'World Trade Center', count: 22, cos: ['American Express HQ', 'Spotify', 'Uber NYC', 'GroupM'], color: '#4F46E5', lng: -74.0134, lat: 40.7127 },
  ],
  SF: [
    { name: 'SoMa', count: 45, cos: ['Salesforce HQ', 'Airbnb HQ', 'Twitter/X', 'Dropbox', 'Lyft'], color: '#4F46E5', lng: -122.4016, lat: 37.7785 },
    { name: 'Mission District', count: 30, cos: ['Uber HQ', 'DoorDash HQ', 'Lyft', 'Pinterest'], color: '#0D9488', lng: -122.4194, lat: 37.7599 },
    { name: 'Financial District SF', count: 22, cos: ['Wells Fargo HQ', 'Visa HQ', 'Stripe', 'First Republic'], color: '#DC2626', lng: -122.4015, lat: 37.7946 },
    { name: 'Embarcadero / Pier', count: 38, cos: ['Gap HQ', 'Facebook SF', 'LinkedIn SF'], color: '#7C3AED', lng: -122.3971, lat: 37.7955 },
    { name: 'Palo Alto', count: 28, cos: ['Apple Corp', 'HP Inc HQ', 'VMware', 'IDEO', 'Palantir'], color: '#0891B2', lng: -122.1430, lat: 37.4419 },
    { name: 'Mountain View (Googleplex)', count: 42, cos: ['Google HQ', 'Mozilla HQ', 'Intuit HQ', 'Microsoft MTV'], color: '#059669', lng: -122.0841, lat: 37.3861 },
    { name: 'Menlo Park', count: 29, cos: ['Meta HQ', 'Andreessen Horowitz', 'Sequoia Capital'], color: '#B45309', lng: -122.1817, lat: 37.4529 },
    { name: 'South SF (Biotech)', count: 18, cos: ['Genentech HQ', 'Gilead Sciences', 'BioMarin'], color: '#7C3AED', lng: -122.4058, lat: 37.6547 },
    { name: 'Sunnyvale', count: 32, cos: ['Yahoo HQ', 'LinkedIn HQ', 'Juniper Networks', 'NetApp'], color: '#DC2626', lng: -122.0308, lat: 37.3688 },
    { name: 'Santa Clara', count: 36, cos: ['NVIDIA HQ', 'Intel HQ', 'Applied Materials', 'ServiceNow'], color: '#4F46E5', lng: -121.9552, lat: 37.3541 },
    { name: 'Cupertino', count: 40, cos: ['Apple HQ (Apple Park)', 'De Anza College Ops'], color: '#0891B2', lng: -122.0322, lat: 37.3230 },
    { name: 'San Jose Downtown', count: 20, cos: ['Adobe HQ', 'Cisco HQ', 'eBay HQ', 'PayPal HQ'], color: '#059669', lng: -121.8863, lat: 37.3382 },
    { name: 'Redwood City', count: 16, cos: ['Oracle HQ', 'Electronic Arts HQ', 'Box HQ'], color: '#B45309', lng: -122.2477, lat: 37.4848 },
  ],
  Chicago: [
    { name: 'The Loop', count: 34, cos: ['Deloitte', 'Accenture', 'United Airlines HQ', 'Boeing HQ'], color: '#4F46E5', lng: -87.6298, lat: 41.8827 },
    { name: 'River North', count: 26, cos: ['Morningstar HQ', 'Groupon HQ', 'Trading Firms'], color: '#DC2626', lng: -87.6344, lat: 41.8932 },
    { name: 'West Loop / Fulton Market', count: 22, cos: ['Google Chicago', 'McDonald\'s HQ', 'Grubhub HQ'], color: '#0D9488', lng: -87.6516, lat: 41.8836 },
    { name: 'Streeterville / Mag Mile', count: 14, cos: ['Abbott HQ', 'Aon HQ', 'Tribune Media'], color: '#B45309', lng: -87.6162, lat: 41.8942 },
    { name: 'Oak Brook', count: 11, cos: ['McDonald\'s World HQ', 'Ace Hardware', 'Inland Western'], color: '#059669', lng: -87.9484, lat: 41.8500 },
    { name: 'Deerfield / North Shore', count: 9, cos: ['Walgreens Boots HQ', 'Baxter International', 'Mondelez'], color: '#7C3AED', lng: -87.8406, lat: 42.1725 },
    { name: 'Schaumburg', count: 8, cos: ['Motorola Solutions HQ', 'Zurich NA HQ', 'Discover Financial'], color: '#0891B2', lng: -88.0834, lat: 42.0334 },
    { name: 'Downers Grove', count: 7, cos: ['Dover Corp HQ', 'Advocate Health', 'Midway Airlines'], color: '#DC2626', lng: -88.0112, lat: 41.8078 },
  ],
  Seattle: [
    { name: 'South Lake Union', count: 48, cos: ['Amazon HQ', 'Google Seattle', 'Facebook Seattle', 'Tableau'], color: '#4F46E5', lng: -122.3365, lat: 47.6254 },
    { name: 'Capitol Hill', count: 18, cos: ['Starbucks HQ', 'Nordstrom HQ', 'Alaska Airlines Ops'], color: '#0D9488', lng: -122.3148, lat: 47.6253 },
    { name: 'Redmond', count: 42, cos: ['Microsoft HQ', 'Nintendo of America HQ'], color: '#DC2626', lng: -122.1215, lat: 47.6740 },
    { name: 'Bellevue', count: 26, cos: ['T-Mobile HQ', 'Expedia HQ', 'Valve HQ', 'Concur'], color: '#7C3AED', lng: -122.2015, lat: 47.6101 },
    { name: 'Fremont / Ballard', count: 16, cos: ['Google Seattle HQ', 'Adobe Seattle', 'Tableau'], color: '#B45309', lng: -122.3500, lat: 47.6512 },
    { name: 'SODO', count: 13, cos: ['Starbucks Roastery', 'REI HQ', 'Alaska Airlines HQ'], color: '#059669', lng: -122.3301, lat: 47.5793 },
    { name: 'Issaquah / Sammamish', count: 10, cos: ['Costco HQ', 'Zillow HQ', 'Microsoft Ops'], color: '#0891B2', lng: -122.0326, lat: 47.5301 },
    { name: 'Bothell', count: 8, cos: ['Boeing Commercial HQ', 'Philips Healthcare', 'FLIR Systems'], color: '#DC2626', lng: -122.2048, lat: 47.7601 },
  ],
  Austin: [
    { name: 'Downtown Austin', count: 30, cos: ['Dell Technologies HQ', 'Apple Austin', 'Tesla Austin'], color: '#4F46E5', lng: -97.7431, lat: 30.2672 },
    { name: 'The Domain', count: 36, cos: ['Google Austin', 'Amazon Austin', 'Indeed HQ', 'HomeAway'], color: '#0D9488', lng: -97.7214, lat: 30.4012 },
    { name: 'East Austin / Mueller', count: 16, cos: ['Oracle Austin HQ', 'Bumble HQ', 'Indeed'], color: '#DC2626', lng: -97.7200, lat: 30.2630 },
    { name: 'Gigafactory / Del Valle', count: 22, cos: ['Tesla Gigafactory Texas', 'Samsung Austin Semiconductor'], color: '#7C3AED', lng: -97.6200, lat: 30.2200 },
    { name: 'Cedar Park / Round Rock', count: 14, cos: ['Apple Campus 2', 'Dell Round Rock', '3M Austin'], color: '#B45309', lng: -97.8203, lat: 30.5052 },
    { name: 'South Lamar / SoCo', count: 10, cos: ['Whole Foods HQ', 'Kendra Scott HQ', 'BigCommerce'], color: '#059669', lng: -97.7561, lat: 30.2441 },
    { name: 'North Austin / Parmer Lane', count: 12, cos: ['IBM Austin', 'NXP Semiconductors', 'Flextronics'], color: '#0891B2', lng: -97.7026, lat: 30.4300 },
  ],
  Boston: [
    { name: 'Back Bay / Copley', count: 24, cos: ['Fidelity HQ', 'State Street HQ', 'Liberty Mutual HQ'], color: '#DC2626', lng: -71.0845, lat: 42.3503 },
    { name: 'Kendall Square / Cambridge', count: 32, cos: ['Google Cambridge', 'MIT spinoffs', 'Sanofi', 'Biogen'], color: '#4F46E5', lng: -71.0892, lat: 42.3626 },
    { name: 'Seaport Innovation District', count: 18, cos: ['Raytheon Technologies', 'PTC HQ', 'WeWork Seaport'], color: '#0D9488', lng: -71.0444, lat: 42.3516 },
    { name: 'Longwood Medical Area', count: 14, cos: ['Vertex Pharma HQ', 'Moderna HQ', 'Biogen HQ'], color: '#7C3AED', lng: -71.1061, lat: 42.3368 },
    { name: 'Waltham / Route 128', count: 12, cos: ['TripAdvisor HQ', 'Constant Contact', 'Brandeis Ops'], color: '#B45309', lng: -71.2356, lat: 42.3765 },
    { name: 'Downtown Boston', count: 20, cos: ['Wayfair HQ', 'HubSpot HQ', 'DraftKings HQ'], color: '#059669', lng: -71.0589, lat: 42.3601 },
    { name: 'Burlington / Woburn', count: 10, cos: ['Nuance Communications', 'Kronos HQ', 'Lahey Health'], color: '#0891B2', lng: -71.1956, lat: 42.5048 },
  ],
  LA: [
    { name: 'Santa Monica / Venice', count: 32, cos: ['Snap HQ', 'Hulu', 'Activision Blizzard', 'Google Venice'], color: '#4F46E5', lng: -118.4912, lat: 34.0195 },
    { name: 'Downtown LA', count: 24, cos: ['KPMG', 'Deloitte LA', 'City National Bank HQ', 'Live Nation'], color: '#DC2626', lng: -118.2437, lat: 34.0522 },
    { name: 'Culver City', count: 20, cos: ['Apple TV+ HQ', 'Amazon Studios HQ', 'Sony Pictures HQ'], color: '#7C3AED', lng: -118.3965, lat: 34.0211 },
    { name: 'El Segundo / Hawthorne', count: 26, cos: ['SpaceX HQ', 'Northrop Grumman HQ', 'Raytheon LA'], color: '#0891B2', lng: -118.4165, lat: 33.9192 },
    { name: 'West Hollywood / WeHo', count: 18, cos: ['Riot Games HQ', 'Warner Music HQ', 'Netflix LA'], color: '#0D9488', lng: -118.3617, lat: 34.0900 },
    { name: 'Playa Vista', count: 24, cos: ['Google LA HQ', 'YouTube', 'Facebook LA', 'Microsoft LA'], color: '#B45309', lng: -118.4270, lat: 33.9775 },
    { name: 'Burbank / Studio City', count: 16, cos: ['Disney HQ', 'Warner Bros HQ', 'NBC Universal', 'Netflix Burbank'], color: '#059669', lng: -118.3089, lat: 34.1808 },
    { name: 'Century City / Westwood', count: 14, cos: ['CAA HQ', 'Fox Corp', 'WME', 'UTA'], color: '#DC2626', lng: -118.4165, lat: 34.0522 },
    { name: 'Manhattan Beach', count: 10, cos: ['Chevron LA', 'Skechers HQ', 'DraftKings LA'], color: '#7C3AED', lng: -118.4195, lat: 33.8847 },
  ],
  // New cities
  Miami: [
    { name: 'Brickell / Financial District', count: 24, cos: ['Citadel HQ', 'BlackRock Miami', 'JPMorgan Miami', 'Softbank LA'], color: '#4F46E5', lng: -80.1918, lat: 25.7617 },
    { name: 'Wynwood / Midtown', count: 18, cos: ['Microsoft Miami', 'Google Miami', 'Spotify Miami'], color: '#0D9488', lng: -80.1993, lat: 25.8026 },
    { name: 'Miami Beach / South Beach', count: 12, cos: ['WeWork', 'Twitter Miami', 'Founders Fund'], color: '#DC2626', lng: -80.1300, lat: 25.7907 },
    { name: 'Doral / Airport Area', count: 10, cos: ['Carnival Corp HQ', 'Lennar HQ', 'World Fuel Services'], color: '#7C3AED', lng: -80.3544, lat: 25.8154 },
  ],
  Dallas: [
    { name: 'Uptown / Victory Park', count: 28, cos: ['AT&T HQ', 'Goldman Sachs Dallas', 'JPMorgan Dallas'], color: '#4F46E5', lng: -96.8063, lat: 32.7948 },
    { name: 'Las Colinas / Irving', count: 22, cos: ['ExxonMobil HQ', 'Celanese HQ', 'Fluor HQ'], color: '#DC2626', lng: -97.0036, lat: 32.8776 },
    { name: 'Plano / North Dallas', count: 30, cos: ['Toyota NA HQ', 'JPMorgan Chase Ops', 'FedEx Ground HQ', 'Capital One Dallas'], color: '#0D9488', lng: -96.6989, lat: 33.0198 },
    { name: 'Frisco / Allen', count: 16, cos: ['Liberty Mutual Dallas', 'Keurig Dr Pepper HQ', 'Stonebriar'], color: '#7C3AED', lng: -96.8219, lat: 33.1507 },
    { name: 'Downtown Dallas', count: 20, cos: ['Bank of America Dallas', 'PwC Dallas', 'Deloitte Dallas', 'American Airlines HQ'], color: '#B45309', lng: -96.7970, lat: 32.7767 },
    { name: 'Fort Worth', count: 14, cos: ['American Airlines HQ (DFW)', 'BNSF Railway HQ', 'D.R. Horton HQ'], color: '#059669', lng: -97.3308, lat: 32.7555 },
  ],
  Denver: [
    { name: 'LoDo / Downtown Denver', count: 20, cos: ['Google Denver', 'Salesforce Denver', 'Arrow Electronics HQ'], color: '#4F46E5', lng: -104.9903, lat: 39.7392 },
    { name: 'RiNo / Five Points', count: 14, cos: ['Slack Denver', 'Workday Denver', 'SendGrid HQ'], color: '#0D9488', lng: -104.9719, lat: 39.7644 },
    { name: 'Tech Center / Greenwood Village', count: 18, cos: ['Oracle Denver', 'DISH Network HQ', 'Lockheed Martin Denver'], color: '#DC2626', lng: -104.8897, lat: 39.6128 },
    { name: 'Boulder', count: 16, cos: ['Google Boulder', 'Salesforce Boulder', 'Rally Software', 'Zayo Group HQ'], color: '#7C3AED', lng: -105.2705, lat: 40.0150 },
  ],
  DC: [
    { name: 'Downtown DC / K Street', count: 28, cos: ['Booz Allen Hamilton HQ', 'Deloitte DC', 'McKinsey DC', 'SAIC HQ'], color: '#4F46E5', lng: -77.0369, lat: 38.9072 },
    { name: 'Tysons Corner / McLean', count: 24, cos: ['Freddie Mac HQ', 'Capital One HQ', 'Leidos HQ', 'DXC Technology'], color: '#DC2626', lng: -77.2311, lat: 38.9187 },
    { name: 'Arlington / Rosslyn', count: 20, cos: ['Amazon HQ2', 'Boeing HQ', 'Nestle USA HQ', 'Lidl US HQ'], color: '#0D9488', lng: -77.0841, lat: 38.8816 },
    { name: 'Reston / Herndon', count: 16, cos: ['Leidos HQ', 'DXC Technology', 'Neustar HQ', 'Volkswagen Group of America'], color: '#7C3AED', lng: -77.3564, lat: 38.9687 },
    { name: 'Bethesda / Chevy Chase', count: 12, cos: ['Marriott HQ', 'Host Hotels HQ', 'Lockheed Martin Corp HQ'], color: '#B45309', lng: -77.1006, lat: 38.9807 },
  ],
  Houston: [
    { name: 'Energy Corridor', count: 24, cos: ['Shell USA HQ', 'BP America HQ', 'ConocoPhillips HQ', 'Sysco HQ'], color: '#4F46E5', lng: -95.6315, lat: 29.7826 },
    { name: 'Greenway Plaza / Galleria', count: 18, cos: ['Chevron Houston', 'Halliburton HQ', 'Baker Hughes HQ'], color: '#DC2626', lng: -95.4739, lat: 29.7375 },
    { name: 'Downtown Houston', count: 22, cos: ['JPMorgan Houston', 'Deloitte Houston', 'EY Houston', 'Waste Management HQ'], color: '#0D9488', lng: -95.3698, lat: 29.7604 },
    { name: 'The Woodlands', count: 14, cos: ['ExxonMobil HQ', 'Aon Houston', 'McKesson HQ'], color: '#7C3AED', lng: -95.5102, lat: 30.1658 },
  ],
  Minneapolis: [
    { name: 'Downtown Minneapolis', count: 22, cos: ['Target HQ', 'US Bank HQ', 'Wells Fargo Minneapolis', 'Ameriprise HQ'], color: '#4F46E5', lng: -93.2650, lat: 44.9778 },
    { name: 'Bloomington / Eden Prairie', count: 16, cos: ['Best Buy HQ', 'Toro Company HQ', 'General Mills HQ'], color: '#DC2626', lng: -93.3698, lat: 44.8408 },
    { name: 'St. Paul', count: 12, cos: ['3M HQ', 'Ecolab HQ', 'Securian Financial HQ'], color: '#0D9488', lng: -93.0900, lat: 44.9537 },
  ],
  Charlotte: [
    { name: 'Uptown Charlotte', count: 20, cos: ['Bank of America HQ', 'Wells Fargo Ops', 'Truist HQ', 'Lowe\'s HQ'], color: '#4F46E5', lng: -80.8431, lat: 35.2271 },
    { name: 'South End / Dilworth', count: 14, cos: ['Red Ventures HQ', 'LendingTree HQ', 'AvidXchange HQ'], color: '#0D9488', lng: -80.8568, lat: 35.2130 },
    { name: 'Ballantyne / South Charlotte', count: 12, cos: ['MetLife Charlotte', 'Synchrony', 'SPX Corporation HQ'], color: '#DC2626', lng: -80.8520, lat: 35.0527 },
  ],
  Nashville: [
    { name: 'Downtown Nashville', count: 18, cos: ['HCA Healthcare HQ', 'Dollar General HQ', 'Asurion HQ'], color: '#4F46E5', lng: -86.7816, lat: 36.1627 },
    { name: 'Brentwood / Cool Springs', count: 14, cos: ['Tractor Supply HQ', 'Genesco HQ', 'iHeart Media'], color: '#DC2626', lng: -86.7928, lat: 36.0331 },
    { name: 'Midtown / Music Row', count: 10, cos: ['Amazon Nashville', 'Deloitte Nashville', 'UBS Nashville'], color: '#0D9488', lng: -86.7984, lat: 36.1530 },
  ],
  Phoenix: [
    { name: 'Downtown Phoenix', count: 16, cos: ['Intel Phoenix', 'Banner Health HQ', 'Republic Services HQ'], color: '#4F46E5', lng: -112.0740, lat: 33.4484 },
    { name: 'Scottsdale / Old Town', count: 14, cos: ['GoDaddy HQ', 'Charles Schwab HQ', 'Discount Tire HQ'], color: '#DC2626', lng: -111.9261, lat: 33.4942 },
    { name: 'Tempe / Mesa', count: 12, cos: ['Apple Tempe', 'State Farm Phoenix HQ', 'Microchip Technology HQ'], color: '#0D9488', lng: -111.9400, lat: 33.4255 },
    { name: 'Chandler / Gilbert', count: 10, cos: ['Intel Chandler HQ', 'Wells Fargo Chandler Ops', 'PayPal Phoenix'], color: '#7C3AED', lng: -111.8413, lat: 33.3062 },
  ],
  Raleigh: [
    { name: 'Downtown Raleigh / Research Triangle', count: 18, cos: ['IBM RTP', 'Cisco RTP', 'Red Hat HQ', 'SAS Institute HQ'], color: '#4F46E5', lng: -78.6382, lat: 35.7796 },
    { name: 'Durham / Chapel Hill', count: 14, cos: ['Duke University Ops', 'Quintiles HQ', 'GlaxoSmithKline RTP'], color: '#DC2626', lng: -78.8986, lat: 35.9940 },
    { name: 'Cary / Morrisville', count: 12, cos: ['SAS Institute', 'Bandwidth HQ', 'Epic Games HQ'], color: '#0D9488', lng: -78.7811, lat: 35.7915 },
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
  Miami: [], Dallas: [], Denver: [], DC: [], Houston: [],
  Minneapolis: [], Charlotte: [], Nashville: [], Phoenix: [], Raleigh: [],
  London: [], Toronto: [], Dubai: [], Singapore: [], Tokyo: [], Sydney: [], Berlin: [],
};

interface SearchResult {
  id: string;
  name: string;
  address: string;
  lng: number;
  lat: number;
}

interface DroppedHotspot {
  name: string;
  coords: [number, number];
  live: boolean;
  time: string;
  vibes: string[];
  note: string;
  attire: string;
  groupChat: boolean;
  chatId?: string;
}

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const [mode, setMode] = useState<MapMode>('offices');
  const [selectedCity, setSelectedCity] = useState('Atlanta');
  const [selectedPod, setSelectedPod] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [selectedDropped, setSelectedDropped] = useState<DroppedHotspot | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { rsvped, addRsvp, addHotspotChat } = useAppContext();

  // Drop hotspot form state
  const [showDropForm, setShowDropForm] = useState(false);
  const [hotspotName, setHotspotName] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SearchResult | null>(null);
  const [hotspotVibes, setHotspotVibes] = useState<string[]>([]);
  const [hotspotLive, setHotspotLive] = useState(true);
  const [hotspotTime, setHotspotTime] = useState('');
  const [hotspotNote, setHotspotNote] = useState('');
  const [hotspotAttire, setHotspotAttire] = useState('');
  const [hotspotGroupChat, setHotspotGroupChat] = useState(false);
  const [droppedHotspots, setDroppedHotspots] = useState<DroppedHotspot[]>([]);

  const allCityEvents = Object.values(CITY_EVENTS).flat();
  const activePodData = selectedPod ? CITY_PODS[selectedCity]?.find(p => p.name === selectedPod) : null;
  const activeEvent = allCityEvents.find(e => e.id === selectedEvent);
  const activeHotspot = hotspots.find(h => h.id === selectedHotspot);

  const resetDropForm = () => {
    setHotspotName('');
    setSelectedPlace(null);
    setSearchResults([]);
    setHotspotVibes([]);
    setHotspotLive(true);
    setHotspotTime('');
    setHotspotNote('');
    setHotspotAttire('');
    setHotspotGroupChat(false);
  };

  const closeAll = () => {
    setSelectedPod(null);
    setSelectedEvent(null);
    setSelectedHotspot(null);
    setSelectedDropped(null);
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
        el.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer`;
        el.innerHTML = `
          <div style="position:relative;width:38px;height:38px;border-radius:50%;background:${hs.live ? '#22C55E' : '#4F46E5'};display:flex;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-size:16px">
            ${hs.live ? '🟢' : '⭐'}
            ${hs.live ? '<div style="position:absolute;top:-1px;right:-1px;width:11px;height:11px;border-radius:50%;background:#22C55E;border:2px solid #fff"></div>' : ''}
          </div>
          <div style="background:#fff;border-radius:50px;padding:1px 7px;font-size:9px;font-weight:600;color:#111;box-shadow:0 1px 4px rgba(0,0,0,0.1);white-space:nowrap;max-width:80px;overflow:hidden;text-overflow:ellipsis">${hs.name}</div>`;
        el.onclick = () => { closeAll(); setSelectedDropped(hs); };
        markersRef.current.push(new mapboxgl.Marker({ element: el }).setLngLat(hs.coords).addTo(map.current!));
      });
    }
  }, [mode, mapReady, selectedCity, droppedHotspots]);

  const searchPlaces = async (query: string) => {
    if (!query.trim() || query.length < 3) { setSearchResults([]); return; }
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      const center = CITY_COORDS[selectedCity];
      const proximity = `${center[0]},${center[1]}`;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&proximity=${proximity}&limit=5&types=poi,address,place`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setSearchResults(data.features.map((f: any) => ({
          id: f.id,
          name: f.text,
          address: f.place_name,
          lng: f.center[0],
          lat: f.center[1],
        })));
      } catch (e) {
        console.error('Geocoding error', e);
      }
    }, 300);
  };

  const selectPlace = (place: SearchResult) => {
    setSelectedPlace(place);
    setHotspotName(place.name);
    setSearchResults([]);
    map.current?.flyTo({ center: [place.lng, place.lat], zoom: 15, duration: 600 });
  };

  const handleRsvp = (eventId: string) => addRsvp(eventId);

  const handleDropHotspot = () => {
    if (!selectedPlace) return;
    const hotspotId = `hotspot-${Date.now()}`;
    const newHotspot: DroppedHotspot = {
      name: selectedPlace.name,
      coords: [selectedPlace.lng, selectedPlace.lat],
      live: hotspotLive,
      time: hotspotTime,
      vibes: hotspotVibes,
      note: hotspotNote,
      attire: hotspotAttire,
      groupChat: hotspotGroupChat,
      chatId: hotspotId,
    };
    setDroppedHotspots(prev => [...prev, newHotspot]);

    if (hotspotGroupChat) {
      addHotspotChat({
        id: hotspotId,
        name: `${selectedPlace.name} Hangout`,
        emoji: hotspotLive ? '🟢' : '📍',
        members: 1,
        last: hotspotNote || `${hotspotLive ? 'Happening now' : 'Tonight' + (hotspotTime ? ' at ' + hotspotTime : '')}`,
        time: 'now',
        unread: 0,
        joined: true,
        msgs: [
          { s: 'System', t: `📍 Welcome to the ${selectedPlace.name} hangout chat!`, self: false, time: 'now' },
          ...(hotspotNote ? [{ s: 'You', t: hotspotNote, self: true, time: 'now' }] : []),
        ],
      });
    }

    resetDropForm();
    setShowDropForm(false);
  };

  const toggleVibe = (tag: string) => {
    setHotspotVibes(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
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
          <button onClick={() => { resetDropForm(); setShowDropForm(true); }}
            style={{ position: 'absolute', bottom: 24, left: 16, zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 18px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
            <Plus style={{ width: '16px', height: '16px' }} />
            Drop a Hotspot
          </button>
        )}

        {/* Drop hotspot form */}
        <AnimatePresence>
          {showDropForm && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', maxHeight: '88%', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111' }}>Drop a Hotspot</div>
                <button onClick={() => { setShowDropForm(false); resetDropForm(); }}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>

              {/* Place search */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '6px' }}>📍 Place</label>
                <input value={hotspotName}
                  onChange={e => { setHotspotName(e.target.value); setSelectedPlace(null); searchPlaces(e.target.value); }}
                  placeholder="e.g. Piedmont Park, Lenox Mall, Krog Street..."
                  style={{ width: '100%', height: '44px', border: '1.5px solid #E5E5E5', borderRadius: '12px', padding: '0 14px', fontSize: '14px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
                  autoFocus />
              </div>

              {searchResults.length > 0 && (
                <div style={{ border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
                  {searchResults.map((result, i) => (
                    <button key={result.id} onClick={() => selectPlace(result)}
                      style={{ width: '100%', padding: '11px 14px', background: '#fff', border: 'none', borderBottom: i < searchResults.length - 1 ? '1px solid #F5F5F5' : 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>📍</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{result.name}</div>
                        <div style={{ fontSize: '11px', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.address}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedPlace && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>✓</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#16A34A' }}>{selectedPlace.name}</div>
                    <div style={{ fontSize: '11px', color: '#16A34A', opacity: 0.8 }}>{selectedPlace.address}</div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '8px' }}>🔴 Status</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setHotspotLive(true)}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid', borderColor: hotspotLive ? '#22C55E' : '#E5E5E5', background: hotspotLive ? '#F0FDF4' : '#fff', color: hotspotLive ? '#16A34A' : '#666', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}>
                    🟢 Happening now
                  </button>
                  <button onClick={() => setHotspotLive(false)}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid', borderColor: !hotspotLive ? '#111' : '#E5E5E5', background: !hotspotLive ? '#F5F5F5' : '#fff', color: !hotspotLive ? '#111' : '#666', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}>
                    📅 Later tonight
                  </button>
                </div>
              </div>

              {/* Time picker — only if later */}
              {!hotspotLive && (
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '6px' }}>🕐 What time?</label>
                  <input type="time" value={hotspotTime} onChange={e => setHotspotTime(e.target.value)}
                    style={{ width: '100%', height: '44px', border: '1.5px solid #E5E5E5', borderRadius: '12px', padding: '0 14px', fontSize: '14px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }} />
                </div>
              )}

              {/* Vibe tags */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '8px' }}>✨ Vibe</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['🍔 Food', '🍸 Drinks', '🎵 Music', '🏋️ Fitness', '☕ Coffee', '🌿 Outdoors', '🎮 Gaming', '🛍️ Shopping', '🌃 Nightlife', '🎨 Art'].map(tag => (
                    <button key={tag} onClick={() => toggleVibe(tag)}
                      style={{ padding: '6px 12px', borderRadius: '50px', border: '1.5px solid', borderColor: hotspotVibes.includes(tag) ? '#111' : '#E5E5E5', background: hotspotVibes.includes(tag) ? '#111' : '#fff', color: hotspotVibes.includes(tag) ? '#fff' : '#666', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attire */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '6px' }}>
                  👗 Attire <span style={{ fontWeight: '400', color: '#999' }}>(optional)</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {['Casual', 'Business casual', 'Dressed up', 'Activewear', 'Swimwear', 'Costume'].map(a => (
                    <button key={a} onClick={() => setHotspotAttire(hotspotAttire === a ? '' : a)}
                      style={{ padding: '6px 12px', borderRadius: '50px', border: '1.5px solid', borderColor: hotspotAttire === a ? '#111' : '#E5E5E5', background: hotspotAttire === a ? '#111' : '#fff', color: hotspotAttire === a ? '#fff' : '#666', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
                      {a}
                    </button>
                  ))}
                </div>
                <input value={hotspotAttire} onChange={e => setHotspotAttire(e.target.value)}
                  placeholder="Or type your own... e.g. Bowling shoes, all black..."
                  style={{ width: '100%', height: '40px', border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '0 12px', fontSize: '13px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }} />
              </div>

              {/* Note */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#111', display: 'block', marginBottom: '6px' }}>
                  💬 Note <span style={{ fontWeight: '400', color: '#999' }}>(optional)</span>
                </label>
                <textarea value={hotspotNote} onChange={e => setHotspotNote(e.target.value)}
                  placeholder="e.g. Super chill vibe, come through after work, free entry before 10..."
                  rows={2}
                  style={{ width: '100%', border: '1.5px solid #E5E5E5', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', resize: 'none', lineHeight: '1.5' }} />
              </div>

              {/* Group chat toggle */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F9F9F9', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setHotspotGroupChat(p => !p)}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>💬 Create a group chat</div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Let people who join see a group chat</div>
                </div>
                <div style={{ width: '44px', height: '26px', borderRadius: '50px', background: hotspotGroupChat ? '#111' : '#E5E5E5', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '3px', left: hotspotGroupChat ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>

              <button onClick={handleDropHotspot} disabled={!selectedPlace}
                style={{ width: '100%', height: '48px', borderRadius: '12px', background: selectedPlace ? '#111' : '#E5E5E5', color: selectedPlace ? '#fff' : '#999', border: 'none', cursor: selectedPlace ? 'pointer' : 'not-allowed', fontSize: '15px', fontWeight: '700', transition: 'all 0.2s' }}>
                {selectedPlace ? `${hotspotLive ? '🟢 Drop Live —' : '📅 Drop —'} ${selectedPlace.name}` : 'Search for a place first'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropped hotspot detail panel */}
        <AnimatePresence>
          {selectedDropped && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40, background: '#fff', borderRadius: '20px 20px 0 0', padding: '20px', maxHeight: '70%', overflowY: 'auto', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {selectedDropped.live
                      ? <span style={{ fontSize: '11px', fontWeight: '700', color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '50px', padding: '2px 8px' }}>🟢 Live now</span>
                      : <span style={{ fontSize: '11px', fontWeight: '700', color: '#666', background: '#F5F5F5', borderRadius: '50px', padding: '2px 8px' }}>📅 {selectedDropped.time || 'Tonight'}</span>
                    }
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{selectedDropped.name}</div>
                </div>
                <button onClick={() => setSelectedDropped(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X style={{ width: '16px', height: '16px', color: '#111' }} />
                </button>
              </div>

              {selectedDropped.vibes.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {selectedDropped.vibes.map(v => (
                    <span key={v} style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '50px', background: '#F5F5F5', color: '#111', fontWeight: '500' }}>{v}</span>
                  ))}
                </div>
              )}

              {selectedDropped.attire && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FEF3C7', borderRadius: '10px', padding: '10px 12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px' }}>👗</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Attire</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{selectedDropped.attire}</div>
                  </div>
                </div>
              )}

              {selectedDropped.note && (
                <div style={{ background: '#F9F9F9', borderRadius: '10px', padding: '10px 12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px' }}>Note from host</div>
                  <div style={{ fontSize: '13px', color: '#111', lineHeight: '1.5' }}>{selectedDropped.note}</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  style={{ flex: 1, height: '46px', borderRadius: '12px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>
                  ✓ I'm going
                </button>
                {selectedDropped.groupChat && (
                  <button onClick={() => { setSelectedDropped(null); navigate('/chats'); }}
                    style={{ flex: 1, height: '46px', borderRadius: '12px', background: '#EEF2FF', color: '#4F46E5', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <MessageCircle style={{ width: '16px', height: '16px' }} /> Join Chat
                  </button>
                )}
              </div>
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