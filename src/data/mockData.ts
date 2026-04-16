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
  { id: 'h3', name: 'Krog Street Market', address: '99 Krog St NE, Atlanta, GA', rating: 4.4, tags: ['Food', 'Casual', 'Cheap'], notes: [{ user: 'Marcus T.', text: 'Gu\'s Dumplings is a must.', date: '4 days ago' }], tagCount: 12, lat: 33.7580, lng: -84.3630 },
  { id: 'h4', name: 'Piedmont Park', address: 'Piedmont Park, Atlanta, GA', rating: 4.7, tags: ['Running', 'Pickup Games', 'Free'], notes: [{ user: 'Emma W.', text: 'Morning runs here are perfect.', date: '1 day ago' }, { user: 'Marcus T.', text: 'Basketball courts by the lake are solid.', date: '2 days ago' }], tagCount: 24, lat: 33.7879, lng: -84.3732 },
];

export const chatGroups: ChatGroup[] = [
  { id: 'c1', name: 'Atlanta Interns Summer \'25', type: 'city', emoji: '🏙️', memberCount: 148, description: 'All Atlanta interns — events, meetups, and good vibes', lastMessage: { sender: 'Jordan', text: "who's going to the Goldman thing Friday?", time: '2m ago' }, unreadCount: 5, joined: true },
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
