import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const STYLES = [
  { id: 'avataaars', label: 'Cartoon' },
  { id: 'micah', label: 'Minimal' },
  { id: 'adventurer', label: 'Adventure' },
  { id: 'lorelei', label: 'Illustrated' },
  { id: 'notionists', label: 'Notion' },
];

const SKIN_TONES = [
  { label: 'Light', value: 'f5cba7' },
  { label: 'Medium Light', value: 'e8a87c' },
  { label: 'Medium', value: 'c68642' },
  { label: 'Medium Dark', value: '8d5524' },
  { label: 'Dark', value: '3d1a08' },
];

const HAIR_COLORS = [
  { label: 'Black', value: '1a1a1a' },
  { label: 'Brown', value: '7B3F00' },
  { label: 'Blonde', value: 'C9A84C' },
  { label: 'Red', value: 'B22222' },
  { label: 'Grey', value: 'A8A8A8' },
  { label: 'Pink', value: 'C2185B' },
  { label: 'Blue', value: '1565C0' },
];

const BG_COLORS = [
  '#4F46E5', '#0D9488', '#DC2626', '#D97706',
  '#7C3AED', '#0891B2', '#059669', '#111111',
];

const PRESETS = [
  { id: 'consulting', label: 'Consulting', style: 'avataaars', hair: '1a1a1a', bg: '#111111' },
  { id: 'tech', label: 'Tech', style: 'micah', hair: '1a1a1a', bg: '#0891B2' },
  { id: 'finance', label: 'Finance', style: 'adventurer', hair: '1a1a1a', bg: '#4F46E5' },
  { id: 'creative', label: 'Creative', style: 'lorelei', hair: 'C2185B', bg: '#7C3AED' },
];

const ACCESSORIES = [
  { id: 'none', label: 'None', emoji: '✨' },
  { id: 'briefcase', label: 'Briefcase', emoji: '💼' },
  { id: 'headphones', label: 'Headphones', emoji: '🎧' },
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'laptop', label: 'Laptop', emoji: '💻' },
  { id: 'basketball', label: 'Basketball', emoji: '🏀' },
];

const TITLES = [
  { id: 'intern', label: 'Intern', emoji: '✨', bg: '#EEF2FF', color: '#4F46E5' },
  { id: 'return-intern', label: 'Return Intern', emoji: '🔁', bg: '#ECFDF5', color: '#059669' },
  { id: 'incoming-intern', label: 'Incoming Intern', emoji: '🚀', bg: '#EFF6FF', color: '#2563EB' },
  { id: 'recruiter', label: 'Recruiter', emoji: '🎯', bg: '#FFF7ED', color: '#EA580C' },
  { id: 'founder', label: 'Founder', emoji: '👑', bg: '#F5F3FF', color: '#7C3AED' },
  { id: 'mentor', label: 'Mentor', emoji: '🤝', bg: '#F0F9FF', color: '#0284C7' },
  { id: 'ceo', label: 'CEO', emoji: '💼', bg: '#F5F5F5', color: '#111111' },
  { id: 'open-to-work', label: 'Open to Work', emoji: '💚', bg: '#ECFDF5', color: '#16A34A' },
];

const COMPANIES = [
  { name: 'None', color: 'transparent', textColor: '#111', emoji: '', attire: '' },
  { name: 'McKinsey', color: '#003366', textColor: '#fff', emoji: '💼', attire: 'Suit & Tie' },
  { name: 'Goldman Sachs', color: '#003865', textColor: '#7BAFD4', emoji: '🏦', attire: 'Business Formal' },
  { name: 'Google', color: '#4285F4', textColor: '#fff', emoji: '🎨', attire: 'Casual Hoodie' },
  { name: 'Meta', color: '#0082FB', textColor: '#fff', emoji: '👕', attire: 'Company Tee' },
  { name: 'Amazon', color: '#FF9900', textColor: '#111', emoji: '📦', attire: 'Vest + Badge' },
  { name: 'Apple', color: '#555555', textColor: '#fff', emoji: '🍎', attire: 'Clean Minimal' },
  { name: 'Microsoft', color: '#00A4EF', textColor: '#fff', emoji: '🪟', attire: 'Smart Casual' },
  { name: 'Deloitte', color: '#86BC25', textColor: '#fff', emoji: '📊', attire: 'Business Casual' },
  { name: 'JPMorgan', color: '#003087', textColor: '#fff', emoji: '🏛️', attire: 'Suit & Tie' },
  { name: 'BlackRock', color: '#000000', textColor: '#fff', emoji: '⚫', attire: 'Formal' },
  { name: 'Tesla', color: '#CC0000', textColor: '#fff', emoji: '⚡', attire: 'Tee + Badge' },
  { name: 'Nvidia', color: '#76B900', textColor: '#fff', emoji: '🎮', attire: 'Tech Casual' },
  { name: 'Stripe', color: '#6772E5', textColor: '#fff', emoji: '💳', attire: 'Startup Casual' },
  { name: 'Spotify', color: '#1DB954', textColor: '#fff', emoji: '🎵', attire: 'Casual' },
  { name: 'Delta', color: '#003366', textColor: '#fff', emoji: '✈️', attire: 'Uniform' },
  { name: 'Chick-fil-A', color: '#E4002B', textColor: '#fff', emoji: '🐔', attire: 'Red Polo' },
];

const CLOSET_ITEMS = [
  {
    id: 'bo-hoodie',
    name: 'Beyond Offers Hoodie',
    subtitle: 'Core Collection',
    emoji: '🧥',
    badge: 'BO Exclusive',
    color: '#111111',
  },
  {
    id: 'open-to-work-tee',
    name: 'Open for Work Tee',
    subtitle: 'Summer Drop',
    emoji: '💼',
    badge: '120 credits',
    color: '#4F46E5',
  },
  {
    id: 'home-depot-helmet',
    name: 'Home Depot Helmet',
    subtitle: 'Verified Only',
    emoji: '⛑️',
    badge: 'Exclusive',
    color: '#F97316',
  },
  {
    id: 'google-hoodie',
    name: 'Google Hoodie',
    subtitle: 'Company Collection',
    emoji: '🎨',
    badge: 'Unlocked',
    color: '#4285F4',
  },
  {
    id: 'goldman-quarterzip',
    name: 'Goldman Quarter Zip',
    subtitle: 'Finance Drop',
    emoji: '🏦',
    badge: 'Verified Only',
    color: '#003865',
  },
  {
    id: 'mckinsey-case-kit',
    name: 'McKinsey Case Kit',
    subtitle: 'Consulting Drop',
    emoji: '📘',
    badge: 'Unlocked',
    color: '#003366',
  },
  {
    id: 'bo-cap',
    name: 'BO Founder Cap',
    subtitle: 'Limited Drop',
    emoji: '🧢',
    badge: '80 credits',
    color: '#111111',
  },
  {
    id: 'networking-jacket',
    name: 'Networking Jacket',
    subtitle: 'Night Event Edit',
    emoji: '✨',
    badge: 'Unlocked',
    color: '#7C3AED',
  },
];

const RANDOM_SEEDS = [
  'Intern King',
  'Intern Queen',
  'Pod MVP',
  'Case Cracker',
  'Spreadsheet Wizard',
  'Deck Builder',
  'Coffee Runner',
  'Offer Collector',
  'Open To Work',
  'Return Offer Energy',
  'City Explorer',
  'Happy Hour Hero',
  'Summer Analyst',
  'Tech Bro Summer',
  'Finance Fit',
  'Creative Mode',
  'Consulting Core',
  'Map Legend',
  'Beyond Goat',
  'Slack Ghost',
  'Night Shift Intern',
  'Airport Outfit',
  'First Day Fit',
  'Rooftop Energy',
  'Intern Season',
  'Offer Accepted',
  'Ponce Pod',
  'Midtown Meetup',
  'Day One Ready',
  'Office Crush',
  'Pod Captain',
  'Case Interviewer',
  'Excel Warrior',
  'Coffee Chat Pro',
  'LinkedIn Lunatic',
  'Resume Demon',
  'Summer Associate',
  'Analyst Era',
  'Badge Holder',
  'Carry On Coder',
  'Late To Standup',
  'Swag Collector',
  'Consulting Cutie',
  'Wall Street Mode',
  'Product Managerish',
  'Campus Recruiter Bait',
  'Networking Ninja',
  'Return Offer Loading',
  'Intern In Motion',
  'Map Main Character',
  'City Hopper',
  'Lanyard Legend',
  'Slide Deck Athlete',
  'Work Hard Brunch Hard',
  'Early Start Energy',
  'Friday Mixer',
  'Main Character Intern',
  'Desk Plant Owner',
  'AirPods and Ambition',
  'Calendar Blocker',
  'Case Study Survivor',
  'Group Chat Carrier',
  'Lunch Linker',
  'Offer Letter Aura',
  'Laptop Lifestyle',
  'Pod Princess',
  'Pod President',
  'Intern Elite',
  'The Networking One',
  'Career Closet Icon',
  'Rising Return Offer',
  'BO Founder Energy',
  'Spreadsheet Sweetheart',
  'Suit and Sneakers',
  'Airport to Office',
  'Coffee Badge Combo',
  'Summer in Session',
  'Presentation Mode',
  'Built Different Intern',
  'Unlocked Collection',
];

function buildUrl(style: string, seed: string, skinColor: string, hairColor: string, bg: string) {
  const base = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
  const params: string[] = [];

  if (['avataaars', 'adventurer', 'lorelei'].includes(style)) {
    params.push(`skinColor=${skinColor}`, `hairColor=${hairColor}`);
  } else if (style === 'micah') {
    params.push(`baseColor=${skinColor}`);
  }

  params.push(`backgroundColor=${bg.replace('#', '')}`, 'backgroundType=solid');
  return base + '&' + params.join('&');
}

function getRandomSeedName() {
  return RANDOM_SEEDS[Math.floor(Math.random() * RANDOM_SEEDS.length)];
}

export default function AvatarPage() {
  const navigate = useNavigate();
  const { setUserAvatar, userName } = useAppContext();

  const [style, setStyle] = useState('avataaars');
  const [seed, setSeed] = useState(userName || 'BeyondOffers');
  const [skin, setSkin] = useState('f5cba7');
  const [hair, setHair] = useState('1a1a1a');
  const [bg, setBg] = useState('#4F46E5');
  const [company, setCompany] = useState(COMPANIES[0]);
  const [saved, setSaved] = useState(false);
  const [preset, setPreset] = useState('');
  const [accessory, setAccessory] = useState('none');
  const [equippedItemId, setEquippedItemId] = useState('bo-hoodie');
  const [titleId, setTitleId] = useState('intern');

  const avatarUrl = buildUrl(style, seed, skin, hair, bg);
  const hasCompany = company.name !== 'None';
  const selectedAccessory = ACCESSORIES.find((a) => a.id === accessory);
  const selectedItem = CLOSET_ITEMS.find((item) => item.id === equippedItemId);
  const selectedTitle = TITLES.find((title) => title.id === titleId) || TITLES[0];
  const isCollectionUnlocked = true;

  const applyPreset = (presetId: string) => {
    const selectedPreset = PRESETS.find((p) => p.id === presetId);
    if (!selectedPreset) return;

    setPreset(presetId);
    setStyle(selectedPreset.style);
    setHair(selectedPreset.hair);
    setBg(selectedPreset.bg);
  };

  const handleSave = () => {
    setUserAvatar({
      url: avatarUrl,
      style,
      seed,
      company: company.name,
      companyColor: company.color,
      companyEmoji: company.emoji,
      companyAttire: company.attire,
      preset,
      accessory,
      accessoryEmoji: selectedAccessory?.emoji || '',
      companyUnlocked: isCollectionUnlocked,
      equippedItemId,
      equippedItemName: selectedItem?.name || '',
      equippedItemEmoji: selectedItem?.emoji || '',
      titleId,
      titleLabel: selectedTitle.label,
      titleEmoji: selectedTitle.emoji,
      titleBg: selectedTitle.bg,
      titleColor: selectedTitle.color,
    });
    setSaved(true);
    setTimeout(() => navigate('/map'), 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        maxWidth: '430px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          padding: '20px 24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#111',
              letterSpacing: '-0.5px',
            }}
          >
            {userName ? `Hey ${userName.split(' ')[0]}, build your avatar` : 'Build Your Avatar'}
          </div>
          <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>
            This is how you’ll show up on the map and in chats
          </div>
        </div>

        <button
          onClick={() => navigate('/map')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: '#999',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>

      <div style={{ padding: '16px 24px 0' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '10px',
          }}
        >
          Career Closet
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CLOSET_ITEMS.map((item) => {
            const isSelected = equippedItemId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setEquippedItemId(item.id)}
                style={{
                  flexShrink: 0,
                  width: '148px',
                  borderRadius: '18px',
                  border: isSelected ? `2px solid ${item.color}` : '1px solid #EFEFEF',
                  background: '#fff',
                  padding: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 8px 20px ${item.color}22` : '0 4px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    marginBottom: '10px',
                  }}
                >
                  {item.emoji}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#111',
                    lineHeight: 1.25,
                    marginBottom: '4px',
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: '11px',
                    color: '#888',
                    marginBottom: '8px',
                  }}
                >
                  {item.subtitle}
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    borderRadius: '999px',
                    background: isSelected ? `${item.color}15` : '#F6F6F6',
                    color: isSelected ? item.color : '#666',
                    fontSize: '10px',
                    fontWeight: '700',
                  }}
                >
                  {isSelected ? 'Equipped' : item.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '14px 24px 0' }}>
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '14px',
            padding: '12px 14px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#047857', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Company Collection
          </div>
          <div style={{ marginTop: '4px', fontSize: '15px', fontWeight: '800', color: '#065F46' }}>
            ✓ Unlocked
          </div>
          <div style={{ marginTop: '2px', fontSize: '12px', color: '#047857' }}>
            Demo mode — all company gear is available for the prototype
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 12px' }}>
        <div style={{ position: 'relative', width: '170px', height: '170px' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: hasCompany
                ? `radial-gradient(circle, ${company.color}22 0%, transparent 70%)`
                : `radial-gradient(circle, ${bg}22 0%, transparent 70%)`,
              filter: 'blur(8px)',
            }}
          />

          <div
            style={{
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              background: bg,
              overflow: 'hidden',
              boxShadow: hasCompany ? `0 14px 40px ${company.color}40` : `0 14px 40px ${bg}35`,
              border: hasCompany ? `4px solid ${company.color}` : '4px solid #fff',
              position: 'relative',
            }}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              key={avatarUrl}
            />
          </div>

          {hasCompany && (
            <div
              style={{
                position: 'absolute',
                bottom: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                background: company.color,
                borderRadius: '50px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                border: '2px solid #fff',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '800', color: company.textColor }}>
                {company.name}
              </span>
            </div>
          )}

          {hasCompany && (
            <div
              style={{
                position: 'absolute',
                top: 6,
                right: -2,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: company.color,
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
              }}
            >
              {company.emoji}
            </div>
          )}

          {accessory !== 'none' && selectedAccessory && (
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: -2,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid #E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              }}
            >
              {selectedAccessory.emoji}
            </div>
          )}

          {selectedItem && (
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                right: -4,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: selectedItem.color,
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
              }}
            >
              {selectedItem.emoji}
            </div>
          )}
        </div>

        {userName && (
          <div style={{ marginTop: '12px', fontSize: '17px', fontWeight: '700', color: '#111' }}>
            {userName}
          </div>
        )}

        <div
          style={{
            marginTop: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: selectedTitle.bg,
            border: `1px solid ${selectedTitle.color}22`,
          }}
        >
          <span style={{ fontSize: '12px' }}>{selectedTitle.emoji}</span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: selectedTitle.color }}>
            {selectedTitle.label}
          </span>
        </div>

        {hasCompany && (
          <div
            style={{
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: `${company.color}15`,
              borderRadius: '50px',
              padding: '6px 14px',
              border: `1px solid ${company.color}30`,
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: '600', color: company.color }}>
              {company.emoji} {company.name} · {company.attire}
            </span>
          </div>
        )}

        {accessory !== 'none' && selectedAccessory && (
          <div
            style={{
              marginTop: '8px',
              background: '#F8F8F8',
              borderRadius: '50px',
              padding: '5px 12px',
              border: '1px solid #ECECEC',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#555' }}>
              {selectedAccessory.emoji} {selectedAccessory.label}
            </span>
          </div>
        )}
 
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px' }}>
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Type anything to change your look..."
            style={{
              flex: 1,
              height: '42px',
              border: '1.5px solid #E5E5E5',
              borderRadius: '10px',
              padding: '0 12px',
              fontSize: '13px',
              color: '#111',
              outline: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          />
          <button
            onClick={() => setSeed(getRandomSeedName())}
            style={{
              height: '42px',
              padding: '0 14px',
              borderRadius: '10px',
              background: '#F5F5F5',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: '#111',
              whiteSpace: 'nowrap',
            }}
          >
            🎲 Random
          </button>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Title
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {TITLES.map((title) => {
              const isSelected = titleId === title.id;

              return (
                <button
                  key={title.id}
                  onClick={() => setTitleId(title.id)}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 12px',
                    borderRadius: '999px',
                    border: isSelected ? `1.5px solid ${title.color}` : '1px solid #EAEAEA',
                    background: isSelected ? title.bg : '#fff',
                    color: isSelected ? title.color : '#111',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '13px' }}>{title.emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>{title.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Presets
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                style={{
                  flexShrink: 0,
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: `1.5px solid ${preset === p.id ? '#111' : '#EAEAEA'}`,
                  background: preset === p.id ? '#111' : '#fff',
                  color: preset === p.id ? '#fff' : '#111',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Style
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${style === s.id ? '#111' : '#F0F0F0'}`,
                  background: style === s.id ? '#111' : '#fff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: bg }}>
                  <img
                    src={buildUrl(s.id, seed, skin, hair, bg)}
                    alt={s.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: style === s.id ? '#fff' : '#666',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Skin Tone
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            {SKIN_TONES.map((s) => (
              <button
                key={s.value}
                onClick={() => setSkin(s.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: `#${s.value}`,
                  border: `3px solid ${skin === s.value ? '#111' : 'transparent'}`,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Hair Color
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {HAIR_COLORS.map((h) => (
              <button
                key={h.value}
                onClick={() => setHair(h.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: `#${h.value}`,
                  border: `3px solid ${hair === h.value ? '#111' : 'transparent'}`,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Background
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {BG_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setBg(c)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: c,
                  border: `3px solid ${bg === c ? '#111' : 'transparent'}`,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '22px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            Accessory
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {ACCESSORIES.map((item) => (
              <button
                key={item.id}
                onClick={() => setAccessory(item.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: `2px solid ${accessory === item.id ? '#111' : '#F0F0F0'}`,
                  background: accessory === item.id ? '#111' : '#fff',
                  color: accessory === item.id ? '#fff' : '#111',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.emoji}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '4px',
            }}
          >
            Company Collection
          </div>

          <div style={{ fontSize: '11px', color: '#bbb', marginBottom: '10px' }}>
            Exclusive company gear is unlocked for this prototype
          </div>

          <button
            onClick={() => setCompany(COMPANIES[0])}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '12px',
              border: 'none',
              background: company.name === 'None' ? '#F5F5F5' : '#fff',
              cursor: 'pointer',
              textAlign: 'left',
              outline: company.name === 'None' ? '2px solid #111' : '1px solid #F0F0F0',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
              🚫
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>
              No company gear
            </span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {COMPANIES.slice(1).map((c) => (
              <button
                key={c.name}
                onClick={() => setCompany(c)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: company.name === c.name ? c.color : '#F9F9F9',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: company.name === c.name ? `2px solid ${c.color}` : 'none',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: '18px' }}>{c.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: company.name === c.name ? c.textColor : '#111',
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: company.name === c.name ? `${c.textColor}99` : '#999',
                    }}
                  >
                    {c.attire}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '14px',
            background: saved ? '#22C55E' : '#111',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          {saved ? (
            '✓ Looking good!'
          ) : (
            <>
              Save & go to map <ArrowRight style={{ width: '18px', height: '18px' }} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}