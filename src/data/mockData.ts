export interface Intern {
  id: string;
  name: string;
  photo: string;
  university: string;
  gradYear: number;
  company: string;
  city: string;
  officeAddress: string;
  pod: string;
  interests: string[];
  startDate: string;
  endDate: string;
}

export interface Pod {
  id: string;
  name: string;
  companies: string[];
  internCount: number;
  interns: Intern[];
  lat: number;
  lng: number;
}

export interface SponsoredEvent {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  date: string;
  time: string;
  location: string;
  address: string;
  tags: string[];
  description: string;
  rsvpCount: number;
  isSponsored: boolean;
}

export interface Hotspot {
  id: string;
  name: string;
  address: string;
  rating: number;
  tags: string[];
  notes: { user: string; text: string; date: string }[];
  tagCount: number;
  lat: number;
  lng: number;
}

export interface ChatGroup {
  id: string;
  name: string;
  type: 'city' | 'company' | 'pod' | 'interest' | 'event';
  emoji: string;
  memberCount: number;
  description: string;
  lastMessage: { sender: string; text: string; time: string };
  unreadCount: number;
  joined: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderPhoto: string;
  text: string;
  time: string;
  isSelf: boolean;
  type?: 'text' | 'event-share' | 'hotspot-share';
  sharedData?: any;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
}

export interface FriendLocation {
  id: string;
  name: string;
  photo: string;
  city: string;
  company: string;
  lat: number;
  lng: number;
}

export interface EventStory {
  id: string;
  eventId: string;
  user: string;
  userInit: string;
  userColor: string;
  caption: string;
  emoji: string;
  time: string;
  expiresIn: string;
}

export interface WhoIsOut {
  id: string;
  name: string;
  init: string;
  color: string;
  venue: string;
  emoji: string;
  expiresIn: string;
  podName: string;
}

export const INTERESTS = [
  { label: 'Food & Restaurants', emoji: '🍔' },
  { label: 'Fitness & Gym', emoji: '🏋️' },
  { label: 'Sports & Pickup Games', emoji: '🏀' },
  { label: 'Live Music & Concerts', emoji: '🎶' },
  { label: 'Nightlife & Going Out', emoji: '🌃' },
  { label: 'Coffee & Studying', emoji: '☕' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'Travel & Day Trips', emoji: '🧳' },
  { label: 'Finance & Investing', emoji: '📈' },
  { label: 'Tech & Startups', emoji: '💻' },
  { label: 'Art & Culture', emoji: '🎨' },
  { label: 'Reading & Learning', emoji: '📚' },
];

export const CITIES = ['NYC', 'SF', 'Atlanta', 'Chicago', 'Seattle', 'Austin', 'Boston', 'LA', 'Other'];

export const interns: Intern[] = [
  { id: '1', name: 'Jordan M.', photo: '', university: 'Duke University', gradYear: 2026, company: 'McKinsey', city: 'Atlanta', officeAddress: 'Ponce City Market', pod: 'Ponce City Market', interests: ['Fitness & Gym', 'Food & Restaurants'], startDate: '2025-05-19', endDate: '2025-08-15' },
  { id: '2', name: 'Aisha K.', photo: '', university: 'Howard University', gradYear: 2026, company: 'BlackRock', city: 'Atlanta', officeAddress: 'Ponce City Market', pod: 'Ponce City Market', interests: ['Nightlife & Going Out', 'Finance & Investing'], startDate: '2025-06-02', endDate: '2025-08-22' },
  { id: '3', name: 'Marcus T.', photo: '', university: 'Georgia Tech', gradYear: 2027, company: 'Deloitte', city: 'Atlanta', officeAddress: 'Midtown ATL', pod: 'Midtown ATL', interests: ['Sports & Pickup Games', 'Gaming'], startDate: '2025-05-27', endDate: '2025-08-08' },
  { id: '4', name: 'Priya S.', photo: '', university: 'Stanford University', gradYear: 2026, company: 'Google', city: 'Atlanta', officeAddress: 'Ponce City Market', pod: 'Ponce City Market', interests: ['Tech & Startups', 'Coffee & Studying'], startDate: '2025-05-12', endDate: '2025-08-29' },
  { id: '5', name: 'Tyler R.', photo: '', university: 'Emory University', gradYear: 2025, company: 'Goldman Sachs', city: 'Atlanta', officeAddress: 'Buckhead', pod: 'Buckhead', interests: ['Finance & Investing', 'Nightlife & Going Out'], startDate: '2025-06-09', endDate: '2025-08-15' },
  { id: '6', name: 'Sofia L.', photo: '', university: 'UPenn', gradYear: 2026, company: 'PwC', city: 'Atlanta', officeAddress: 'Midtown ATL', pod: 'Midtown ATL', interests: ['Food & Restaurants', 'Art & Culture'], startDate: '2025-06-02', endDate: '2025-08-22' },
  { id: '7', name: 'David C.', photo: '', university: 'MIT', gradYear: 2027, company: 'Cox Enterprises', city: 'Atlanta', officeAddress: 'Perimeter', pod: 'Perimeter', interests: ['Tech & Startups', 'Gaming'], startDate: '2025-05-19', endDate: '2025-08-15' },
  { id: '8', name: 'Emma W.', photo: '', university: 'Yale', gradYear: 2026, company: 'NCR', city: 'Atlanta', officeAddress: 'Perimeter', pod: 'Perimeter', interests: ['Fitness & Gym', 'Travel & Day Trips'], startDate: '2025-06-16', endDate: '2025-09-05' },
  { id: '9', name: 'Chris P.', photo: '', university: 'Columbia', gradYear: 2026, company: 'McKinsey', city: 'NYC', officeAddress: 'Hudson Yards', pod: 'Hudson Yards', interests: ['Finance & Investing', 'Coffee & Studying'], startDate: '2025-05-12', endDate: '2025-08-08' },
  { id: '10', name: 'Maya J.', photo: '', university: 'Berkeley', gradYear: 2027, company: 'Google', city: 'SF', officeAddress: 'Googleplex', pod: 'Mountain View', interests: ['Tech & Startups', 'Food & Restaurants'], startDate: '2025-05-19', endDate: '2025-08-29' },
];

export const pods: Pod[] = [
  { id: 'p1', name: 'Ponce City Market', companies: ['McKinsey', 'Google', 'BlackRock'], internCount: 22, interns: interns.filter(i => i.pod === 'Ponce City Market'), lat: 33.7726, lng: -84.3655 },
  { id: 'p2', name: 'Midtown ATL', companies: ['Deloitte', 'PwC'], internCount: 11, interns: interns.filter(i => i.pod === 'Midtown ATL'), lat: 33.7866, lng: -84.3830 },
  { id: 'p3', name: 'Buckhead', companies: ['Goldman Sachs'], internCount: 7, interns: interns.filter(i => i.pod === 'Buckhead'), lat: 33.8400, lng: -84.3798 },
  { id: 'p4', name: 'Perimeter', companies: ['Cox Enterprises', 'NCR'], internCount: 9, interns: interns.filter(i => i.pod === 'Perimeter'), lat: 33.9200, lng: -84.3450 },
];

export const sponsoredEvents: SponsoredEvent[] = [
  { id: 'e1', title: 'Goldman Sachs Intern Mixer @ SkyLounge', company: 'Goldman Sachs', companyLogo: '', date: 'July 18', time: '7:00 PM', location: 'SkyLounge Rooftop', address: '123 Peachtree St, Atlanta, GA', tags: ['Networking', 'Rooftop', 'Free Drinks'], description: 'Join Goldman Sachs for an exclusive rooftop mixer. Meet fellow interns and full-time analysts in a relaxed setting with panoramic views of Midtown.', rsvpCount: 67, isSponsored: true },
  { id: 'e2', title: 'PrizePicks Game Night @ F1 Arcade', company: 'PrizePicks', companyLogo: '', date: 'July 25', time: '6:00 PM', location: 'F1 Arcade', address: '675 Ponce De Leon Ave, Atlanta, GA', tags: ['Social', 'Games', 'Free Food'], description: 'PrizePicks is hosting a game night at F1 Arcade. Racing simulators, arcade games, and a taco bar — all on them.', rsvpCount: 89, isSponsored: true },
  { id: 'e3', title: 'Deloitte Career Panel + Happy Hour', company: 'Deloitte', companyLogo: '', date: 'August 2', time: '5:30 PM', location: 'The Painted Pin', address: '737 Miami Cir NE, Atlanta, GA', tags: ['Recruiting', 'Networking', 'Happy Hour'], description: 'Hear from Deloitte partners about career paths in consulting. Followed by an open bar happy hour at The Painted Pin.', rsvpCount: 44, isSponsored: true },
  { id: 'e4', title: 'Startup Crawl — Atlanta Tech Village', company: 'Atlanta Tech Village', companyLogo: '', date: 'August 8', time: '4:00 PM', location: 'Atlanta Tech Village', address: '3423 Piedmont Rd, Atlanta, GA', tags: ['Tech', 'Startups', 'Networking'], description: 'Tour 5 high-growth startups in one afternoon. Pitch competitions, demos, and swag.', rsvpCount: 32, isSponsored: true },
];

export const hotspots: Hotspot[] = [
  { id: 'h1', name: 'The Painted Pin', address: '737 Miami Cir NE, Atlanta, GA', rating: 4.6, tags: ['Good Vibes', 'Nightlife', 'Intern-Friendly'], notes: [{ user: 'Tyler R.', text: 'Best bowling alley vibes. Tuesday nights are quiet.', date: '2 days ago' }, { user: 'Aisha K.', text: 'Great cocktails and chill atmosphere.', date: '5 days ago' }], tagCount: 18, lat: 33.8140, lng: -84.3620 },
  { id: 'h2', name: 'Ponce City Market Rooftop', address: '675 Ponce De Leon Ave, Atlanta, GA', rating: 4.8, tags: ['Rooftop', 'Great Views', 'Food'], notes: [{ user: 'Priya S.', text: 'Sunset views are unreal. Go before 7pm.', date: '1 day ago' }, { user: 'Jordan M.', text: 'Mini golf up here is surprisingly fun.', date: '3 days ago' }], tagCount: 31, lat: 33.7726, lng: -84.3655 },
  { id: 'h3', name: 'Krog Street Market', address: '99 Krog St NE, Atlanta, GA', rating: 4.4, tags: ['Food', 'Casual', 'Cheap'], notes: [{ user: 'Marcus T.', text: "Gu's Dumplings is a must.", date: '4 days ago' }], tagCount: 12, lat: 33.7580, lng: -84.3630 },
  { id: 'h4', name: 'Piedmont Park', address: 'Piedmont Park, Atlanta, GA', rating: 4.7, tags: ['Running', 'Pickup Games', 'Free'], notes: [{ user: 'Emma W.', text: 'Morning runs here are perfect.', date: '1 day ago' }, { user: 'Marcus T.', text: 'Basketball courts by the lake are solid.', date: '2 days ago' }], tagCount: 24, lat: 33.7879, lng: -84.3732 },
];

export const chatGroups: ChatGroup[] = [
  { id: 'c1', name: "Atlanta Interns Summer '25", type: 'city', emoji: '🏙️', memberCount: 148, description: 'All Atlanta interns — events, meetups, and good vibes', lastMessage: { sender: 'Jordan', text: "who's going to the Goldman thing Friday?", time: '2m ago' }, unreadCount: 5, joined: true },
  { id: 'c2', name: 'McKinsey Interns', type: 'company', emoji: '💼', memberCount: 23, description: 'McKinsey summer analyst cohort', lastMessage: { sender: 'Priya', text: 'anyone else need help with the Excel model?', time: '15m ago' }, unreadCount: 2, joined: true },
  { id: 'c3', name: 'Ponce City Market Pod', type: 'pod', emoji: '🏢', memberCount: 22, description: 'Interns working at Ponce City Market offices', lastMessage: { sender: 'Aisha', text: 'grabbing lunch in 10 if anyone wants to join', time: '1h ago' }, unreadCount: 0, joined: true },
  { id: 'c4', name: 'ATL Fitness', type: 'interest', emoji: '🏋️', memberCount: 41, description: 'Gym buddies, runners, and pickup game lovers', lastMessage: { sender: 'Marcus', text: 'morning run at Piedmont at 7am tomorrow', time: '3h ago' }, unreadCount: 1, joined: true },
  { id: 'c5', name: 'Atlanta Foodies', type: 'interest', emoji: '🍔', memberCount: 56, description: 'For Atlanta interns who love to eat out and explore the food scene', lastMessage: { sender: 'Sofia', text: 'Krog Street Market this weekend??', time: '30m ago' }, unreadCount: 3, joined: true },
  { id: 'c6', name: 'ATL Nightlife', type: 'interest', emoji: '🌃', memberCount: 38, description: 'Best bars, clubs, and late-night spots in ATL', lastMessage: { sender: 'Tyler', text: 'Painted Pin tonight?', time: '5h ago' }, unreadCount: 0, joined: false },
  { id: 'c7', name: 'ATL Tech & Startups', type: 'interest', emoji: '💻', memberCount: 29, description: 'Atlanta tech scene, side projects, and startup talk', lastMessage: { sender: 'David', text: 'anyone going to the startup crawl?', time: '1d ago' }, unreadCount: 0, joined: false },
  { id: 'c8', name: 'Goldman Sachs Happy Hour Chat', type: 'event', emoji: '⭐', memberCount: 67, description: 'Event chat for Goldman Sachs Intern Mixer', lastMessage: { sender: 'Tyler', text: 'see everyone there!', time: '6h ago' }, unreadCount: 0, joined: false },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', sender: 'Jordan M.', senderPhoto: '', text: "Hey everyone! Super excited for this summer 🎉", time: '10:30 AM', isSelf: false },
  { id: 'm2', sender: 'Aisha K.', senderPhoto: '', text: "Same! Just moved into my apartment yesterday. Anyone in Midtown?", time: '10:32 AM', isSelf: false },
  { id: 'm3', sender: 'You', senderPhoto: '', text: "I'm in Midtown! Just started at my place near Piedmont Park", time: '10:35 AM', isSelf: true },
  { id: 'm4', sender: 'Marcus T.', senderPhoto: '', text: "Yo who's trying to play basketball this weekend? Piedmont courts are fire 🏀", time: '10:40 AM', isSelf: false },
  { id: 'm5', sender: 'Priya S.', senderPhoto: '', text: "I'm down! What time were you thinking?", time: '10:42 AM', isSelf: false },
  { id: 'm6', sender: 'Jordan M.', senderPhoto: '', text: "who's going to the Goldman thing Friday? Heard it's gonna be on a rooftop", time: '11:15 AM', isSelf: false },
  { id: 'm7', sender: 'Tyler R.', senderPhoto: '', text: "I RSVPd already — it's at SkyLounge. Open bar 🍸", time: '11:18 AM', isSelf: false },
  { id: 'm8', sender: 'You', senderPhoto: '', text: "Count me in! Just RSVPd too", time: '11:20 AM', isSelf: true },
  { id: 'm9', sender: 'Sofia L.', senderPhoto: '', text: "Anyone tried Krog Street Market yet? The dumplings are incredible", time: '12:00 PM', isSelf: false },
  { id: 'm10', sender: 'Aisha K.', senderPhoto: '', text: "grabbing lunch in 10 if anyone wants to join 🍔", time: '12:30 PM', isSelf: false },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your profile', icon: '👋', progress: 1, total: 1, unlocked: true },
  { id: 'a2', title: 'Social Butterfly', description: 'Join 5 group chats', icon: '🦋', progress: 5, total: 5, unlocked: true },
  { id: 'a3', title: 'Explorer', description: 'Drop 3 hotspots', icon: '🗺️', progress: 1, total: 3, unlocked: false },
  { id: 'a4', title: 'Networker', description: 'RSVP to 3 events', icon: '🤝', progress: 2, total: 3, unlocked: false },
  { id: 'a5', title: 'Pod Leader', description: 'Send 50 messages in your pod chat', icon: '👑', progress: 23, total: 50, unlocked: false },
  { id: 'a6', title: 'Trailblazer', description: 'Visit 5 hotspots tagged by others', icon: '🔥', progress: 2, total: 5, unlocked: false },
  { id: 'a7', title: 'Event VIP', description: 'Attend 5 sponsored events', icon: '⭐', progress: 1, total: 5, unlocked: false },
  { id: 'a8', title: 'Globe Trotter', description: 'Add 10 friends from different cities', icon: '🌍', progress: 4, total: 10, unlocked: false },
];

export const friendLocations: FriendLocation[] = [
  { id: 'f1', name: 'Chris P.', photo: '', city: 'NYC', company: 'McKinsey', lat: 40.7580, lng: -73.9855 },
  { id: 'f2', name: 'Maya J.', photo: '', city: 'SF', company: 'Google', lat: 37.4220, lng: -122.0841 },
  { id: 'f3', name: 'Alex K.', photo: '', city: 'Chicago', company: 'BCG', lat: 41.8827, lng: -87.6233 },
  { id: 'f4', name: 'Zara H.', photo: '', city: 'Seattle', company: 'Amazon', lat: 47.6062, lng: -122.3321 },
  { id: 'f5', name: 'Kai N.', photo: '', city: 'Austin', company: 'Meta', lat: 30.2672, lng: -97.7431 },
];

export const eventStories: EventStory[] = [
  { id: 's1', eventId: 'e1', user: 'Tyler R.', userInit: 'TR', userColor: '#7C3AED', caption: 'Rooftop views are insane right now 🌆', emoji: '🌆', time: '8:42 PM', expiresIn: '3h left' },
  { id: 's2', eventId: 'e1', user: 'Aisha K.', userInit: 'AK', userColor: '#0D9488', caption: 'Free drinks + good people = perfect Friday', emoji: '🍸', time: '8:55 PM', expiresIn: '3h left' },
  { id: 's3', eventId: 'e1', user: 'Jordan M.', userInit: 'JM', userColor: '#4F46E5', caption: 'Just met someone from my hometown here lol', emoji: '😂', time: '9:10 PM', expiresIn: '2h left' },
  { id: 's4', eventId: 'e2', user: 'Marcus T.', userInit: 'MT', userColor: '#0D9488', caption: 'F1 simulator is no joke 🏎️', emoji: '🏎️', time: '6:30 PM', expiresIn: '18h left' },
  { id: 's5', eventId: 'e2', user: 'Priya S.', userInit: 'PS', userColor: '#4F46E5', caption: 'Taco bar is incredible, highly recommend', emoji: '🌮', time: '7:00 PM', expiresIn: '17h left' },
];

export const whoIsOut: WhoIsOut[] = [
  { id: 'w1', name: 'Aisha K.', init: 'AK', color: '#0D9488', venue: 'The Painted Pin', emoji: '🎳', expiresIn: '2h left', podName: 'Ponce City Market' },
  { id: 'w2', name: 'Tyler R.', init: 'TR', color: '#7C3AED', venue: 'SkyLounge Rooftop', emoji: '🍸', expiresIn: '1h left', podName: 'Buckhead' },
  { id: 'w3', name: 'Marcus T.', init: 'MT', color: '#0D9488', venue: 'Piedmont Park', emoji: '🏀', expiresIn: '45m left', podName: 'Midtown ATL' },
  { id: 'w4', name: 'Sofia L.', init: 'SL', color: '#D97706', venue: 'Krog Street Market', emoji: '🍜', expiresIn: '3h left', podName: 'Midtown ATL' },
];

export interface CityEvent {
  id: string;
  title: string;
  company: string;
  date: string;
  time: string;
  location: string;
  tags: string[];
  description: string;
  rsvpCount: number;
  lng: number;
  lat: number;
}

export const CITY_EVENTS: Record<string, CityEvent[]> = {
  Atlanta: [
    { id: 'atl1', title: 'Goldman Sachs Intern Mixer @ SkyLounge', company: 'Goldman Sachs', date: 'July 18', time: '7:00 PM', location: 'SkyLounge Rooftop, Midtown', tags: ['Networking', 'Rooftop', 'Free Drinks'], description: 'Exclusive rooftop mixer with panoramic Midtown views.', rsvpCount: 67, lng: -84.3860, lat: 33.7866 },
    { id: 'atl2', title: 'PrizePicks Game Night @ F1 Arcade', company: 'PrizePicks', date: 'July 25', time: '6:00 PM', location: 'F1 Arcade, Ponce City Market', tags: ['Social', 'Games', 'Free Food'], description: 'Racing simulators, arcade games, and a taco bar.', rsvpCount: 89, lng: -84.3655, lat: 33.7726 },
    { id: 'atl3', title: 'Deloitte Career Panel + Happy Hour', company: 'Deloitte', date: 'Aug 2', time: '5:30 PM', location: 'The Painted Pin, Buckhead', tags: ['Recruiting', 'Networking'], description: 'Hear from Deloitte partners. Followed by open bar.', rsvpCount: 44, lng: -84.3798, lat: 33.8400 },
    { id: 'atl4', title: 'Chick-fil-A HQ Tour + Lunch', company: 'Chick-fil-A', date: 'Aug 8', time: '12:00 PM', location: 'Chick-fil-A HQ, College Park', tags: ['Food', 'Office Tour'], description: 'Exclusive HQ tour and free lunch for Atlanta interns.', rsvpCount: 112, lng: -84.4277, lat: 33.6407 },
  ],
  NYC: [
    { id: 'nyc1', title: 'JPMorgan Intern Rooftop Mixer', company: 'JPMorgan', date: 'July 20', time: '7:00 PM', location: '230 Fifth Rooftop Bar', tags: ['Networking', 'Rooftop', 'Finance'], description: 'NYC summer intern mixer with Empire State Building views.', rsvpCount: 120, lng: -73.9897, lat: 40.7441 },
    { id: 'nyc2', title: 'Spotify Office Tour + Live Set', company: 'Spotify', date: 'July 28', time: '5:00 PM', location: 'Spotify NYC HQ, 4 World Trade', tags: ['Music', 'Tech', 'Networking'], description: 'Tour the Spotify office and catch a live set.', rsvpCount: 78, lng: -74.0112, lat: 40.7127 },
    { id: 'nyc3', title: 'BlackRock Investment Summit', company: 'BlackRock', date: 'Aug 3', time: '4:00 PM', location: 'BlackRock HQ, 55 E 52nd St', tags: ['Finance', 'Investing', 'Panel'], description: 'Investment panels and networking with BlackRock analysts.', rsvpCount: 55, lng: -73.9762, lat: 40.7580 },
    { id: 'nyc4', title: 'McKinsey x BCG Intern Social', company: 'McKinsey', date: 'Aug 10', time: '7:00 PM', location: 'The Top of the Standard', tags: ['Consulting', 'Networking', 'Rooftop'], description: 'Cross-firm intern social on one of NYC\'s best rooftops.', rsvpCount: 94, lng: -74.0075, lat: 40.7412 },
  ],
  SF: [
    { id: 'sf1', title: 'Uber Engineering Intern Demo Day', company: 'Uber', date: 'July 22', time: '3:00 PM', location: 'Uber HQ, 1515 3rd St', tags: ['Tech', 'Demo Day'], description: 'Showcase your intern project to Uber engineers.', rsvpCount: 88, lng: -122.3882, lat: 37.7694 },
    { id: 'sf2', title: 'Airbnb Intern Summer Party', company: 'Airbnb', date: 'July 26', time: '6:00 PM', location: 'Airbnb HQ, 888 Brannan St', tags: ['Social', 'Free Food', 'Networking'], description: 'Summer intern bash at Airbnb\'s iconic HQ.', rsvpCount: 145, lng: -122.4016, lat: 37.7703 },
    { id: 'sf3', title: 'Stripe Payments Summit', company: 'Stripe', date: 'Aug 1', time: '4:00 PM', location: 'Stripe HQ, South San Francisco', tags: ['Fintech', 'Tech'], description: 'Deep dive into the future of payments.', rsvpCount: 62, lng: -122.4058, lat: 37.6547 },
    { id: 'sf4', title: 'Google Intern Day @ Googleplex', company: 'Google', date: 'Aug 5', time: '10:00 AM', location: 'Googleplex, Mountain View', tags: ['Tech', 'Campus Tour'], description: 'Full day at the Googleplex with tours and talks.', rsvpCount: 201, lng: -122.0841, lat: 37.3861 },
  ],
  Chicago: [
    { id: 'chi1', title: 'Accenture Intern Happy Hour', company: 'Accenture', date: 'July 24', time: '6:00 PM', location: "Cindy's Rooftop, The Loop", tags: ['Consulting', 'Rooftop'], description: 'Happy hour with Millennium Park views.', rsvpCount: 55, lng: -87.6246, lat: 41.8858 },
    { id: 'chi2', title: 'Morningstar Investing Panel', company: 'Morningstar', date: 'Aug 1', time: '5:00 PM', location: 'Morningstar HQ', tags: ['Finance', 'Investing'], description: 'Learn about investment research from Morningstar analysts.', rsvpCount: 38, lng: -87.6344, lat: 41.8832 },
    { id: 'chi3', title: "McDonald's Intern HQ Tour", company: "McDonald's", date: 'Aug 7', time: '11:00 AM', location: "McDonald's Global HQ, West Loop", tags: ['Food', 'Office Tour'], description: "Exclusive tour of McDonald's global HQ.", rsvpCount: 73, lng: -87.6516, lat: 41.8836 },
  ],
  Austin: [
    { id: 'aus1', title: 'Dell Technologies Intern BBQ', company: 'Dell', date: 'July 26', time: '5:00 PM', location: 'Barton Creek Greenbelt', tags: ['Social', 'BBQ', 'Outdoors'], description: 'Texas-style BBQ with live music.', rsvpCount: 88, lng: -97.7956, lat: 30.2353 },
    { id: 'aus2', title: 'Apple Austin Intern Mixer', company: 'Apple', date: 'July 31', time: '6:30 PM', location: 'Apple Tower Theatre, 6th St', tags: ['Tech', 'Networking'], description: "Intern mixer at Apple's stunning Austin flagship.", rsvpCount: 134, lng: -97.7431, lat: 30.2672 },
    { id: 'aus3', title: 'Tesla Gigafactory Tour', company: 'Tesla', date: 'Aug 4', time: '10:00 AM', location: 'Tesla Gigafactory Texas', tags: ['Engineering', 'Tour', 'EV'], description: 'Rare intern access to the Gigafactory floor.', rsvpCount: 45, lng: -97.6200, lat: 30.2200 },
  ],
  Boston: [
    { id: 'bos1', title: 'Fidelity Investments Intern Night', company: 'Fidelity', date: 'July 30', time: '6:30 PM', location: 'Prudential Center, Back Bay', tags: ['Finance', 'Networking'], description: 'Meet other finance interns across Boston firms.', rsvpCount: 67, lng: -71.0845, lat: 42.3471 },
    { id: 'bos2', title: 'HubSpot Intern Growth Summit', company: 'HubSpot', date: 'Aug 3', time: '4:00 PM', location: 'HubSpot HQ, 25 First St Cambridge', tags: ['Marketing', 'Tech'], description: 'Marketing and growth panels with HubSpot leaders.', rsvpCount: 52, lng: -71.0892, lat: 42.3626 },
    { id: 'bos3', title: 'Moderna Biotech Intern Symposium', company: 'Moderna', date: 'Aug 9', time: '3:00 PM', location: 'Moderna HQ, Kendall Square', tags: ['Biotech', 'Science'], description: 'Behind-the-scenes look at mRNA research.', rsvpCount: 41, lng: -71.0892, lat: 42.3626 },
  ],
  Seattle: [
    { id: 'sea1', title: 'Amazon Intern Summit', company: 'Amazon', date: 'Aug 1', time: '4:00 PM', location: 'Amazon HQ, South Lake Union', tags: ['Tech', 'Networking', 'Summit'], description: 'The biggest intern event of the Seattle summer.', rsvpCount: 218, lng: -122.3365, lat: 47.6254 },
    { id: 'sea2', title: 'Microsoft Intern Hackathon', company: 'Microsoft', date: 'July 27', time: '9:00 AM', location: 'Microsoft Redmond Campus', tags: ['Hackathon', 'Tech', 'Prizes'], description: '24-hour hackathon with $10k in prizes.', rsvpCount: 156, lng: -122.1215, lat: 47.6740 },
    { id: 'sea3', title: 'Starbucks Reserve Roastery Tour', company: 'Starbucks', date: 'Aug 6', time: '10:00 AM', location: 'Starbucks Reserve Roastery, Capitol Hill', tags: ['Coffee', 'Tour', 'Social'], description: 'Behind-the-scenes tour of the iconic Reserve Roastery.', rsvpCount: 89, lng: -122.3148, lat: 47.6253 },
  ],
  LA: [
    { id: 'la1', title: 'Snap Intern Beach Day', company: 'Snap', date: 'July 27', time: '12:00 PM', location: 'Santa Monica Beach', tags: ['Social', 'Beach', 'Free Food'], description: 'Beach day with the Snap intern cohort.', rsvpCount: 145, lng: -118.4912, lat: 34.0195 },
    { id: 'la2', title: 'Netflix Intern Screening Night', company: 'Netflix', date: 'Aug 2', time: '7:00 PM', location: 'Netflix HQ, 5808 Sunset Blvd', tags: ['Entertainment', 'Social', 'Exclusive'], description: 'Private screening of an unreleased Netflix original.', rsvpCount: 98, lng: -118.3210, lat: 34.0980 },
    { id: 'la3', title: 'SpaceX Rocket Launch Viewing', company: 'SpaceX', date: 'Aug 8', time: '6:00 AM', location: 'SpaceX HQ, Hawthorne', tags: ['Engineering', 'Space', 'Exclusive'], description: 'Watch a live rocket launch with SpaceX engineers.', rsvpCount: 67, lng: -118.3280, lat: 33.9208 },
    { id: 'la4', title: 'Riot Games Intern Game Night', company: 'Riot Games', date: 'July 30', time: '5:00 PM', location: 'Riot Games HQ, West LA', tags: ['Gaming', 'Social', 'Free Food'], description: 'Play unreleased titles and meet the dev team.', rsvpCount: 189, lng: -118.4165, lat: 34.0378 },
  ],
  London: [
    { id: 'lon1', title: 'Goldman Sachs London Intern Mixer', company: 'Goldman Sachs', date: 'July 21', time: '7:00 PM', location: 'Aqua Shard, London Bridge', tags: ['Finance', 'Networking', 'Rooftop'], description: 'Networking drinks with stunning Thames views.', rsvpCount: 88, lng: -0.0865, lat: 51.5045 },
    { id: 'lon2', title: 'Google London Intern Day', company: 'Google', date: 'Aug 4', time: '10:00 AM', location: 'Google UK HQ, Shoreditch', tags: ['Tech', 'Campus Tour'], description: "Full day at Google's London campus.", rsvpCount: 112, lng: -0.0774, lat: 51.5224 },
  ],
  Toronto: [
    { id: 'tor1', title: 'Shopify Intern Build Day', company: 'Shopify', date: 'July 29', time: '9:00 AM', location: 'Shopify Toronto HQ', tags: ['Tech', 'Hackathon'], description: "Build something amazing at Shopify's Toronto office.", rsvpCount: 76, lng: -79.3930, lat: 43.6596 },
  ],
  Dubai: [
    { id: 'dxb1', title: 'DIFC Intern Finance Summit', company: 'Goldman Sachs', date: 'July 23', time: '6:00 PM', location: 'DIFC Gate Village', tags: ['Finance', 'Networking'], description: "Intern networking at Dubai's premier financial district.", rsvpCount: 55, lng: 55.2796, lat: 25.2084 },
  ],
  Singapore: [
    { id: 'sgp1', title: 'Grab Intern Tech Summit', company: 'Grab', date: 'July 25', time: '4:00 PM', location: 'Grab HQ, One-North', tags: ['Tech', 'Startup'], description: "Meet the team behind Southeast Asia's super app.", rsvpCount: 94, lng: 103.7877, lat: 1.2993 },
  ],
  Tokyo: [
    { id: 'tyo1', title: 'Goldman Sachs Japan Intern Event', company: 'Goldman Sachs Japan', date: 'July 30', time: '6:30 PM', location: 'Roppongi Hills, Tokyo', tags: ['Finance', 'Networking'], description: 'Networking event for finance interns in Tokyo.', rsvpCount: 48, lng: 139.7317, lat: 35.6627 },
  ],
  Sydney: [
    { id: 'syd1', title: 'Atlassian Intern Day', company: 'Atlassian', date: 'Aug 3', time: '2:00 PM', location: 'Atlassian HQ, Sydney CBD', tags: ['Tech', 'Startup'], description: "Spend a day at Atlassian's Sydney headquarters.", rsvpCount: 62, lng: 151.2093, lat: -33.8688 },
  ],
  Berlin: [
    { id: 'ber1', title: 'Zalando Intern Tech Meetup', company: 'Zalando', date: 'July 31', time: '6:00 PM', location: 'Zalando HQ, Mitte', tags: ['Tech', 'Fashion'], description: "Meet interns from across Berlin's tech scene.", rsvpCount: 71, lng: 13.4050, lat: 52.5200 },
  ],
};