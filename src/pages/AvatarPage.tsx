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

  const avatarUrl = buildUrl(style, seed, skin, hair, bg);
  const hasCompany = company.name !== 'None';

  const handleSave = () => {
    setUserAvatar({
      url: avatarUrl,
      style,
      seed,
      company: company.name,
      companyColor: company.color,
      companyEmoji: company.emoji,
      companyAttire: company.attire,
    });
    setSaved(true);
    setTimeout(() => navigate('/map'), 1200);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#fff', display: 'flex',
      flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif',
      maxWidth: '430px', margin: '0 auto',
    }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>
            {userName ? `Hey ${userName.split(' ')[0]}, pick your avatar` : 'Your Avatar'}
          </div>
          <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>This is how you'll show up on the map</div>
        </div>
        <button onClick={() => navigate('/map')}
          style={{ background: 'none', border: 'none', fontSize: '13px', color: '#999', cursor: 'pointer' }}>
          Skip
        </button>
      </div>

      {/* Avatar preview */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 12px' }}>
        <div style={{ position: 'relative', width: '160px', height: '160px' }}>
          <div style={{
            width: '160px', height: '160px', borderRadius: '50%', background: bg, overflow: 'hidden',
            boxShadow: hasCompany ? `0 8px 32px ${company.color}55` : `0 8px 32px ${bg}55`,
            border: hasCompany ? `4px solid ${company.color}` : '4px solid #fff',
          }}>
            <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} key={avatarUrl} />
          </div>
          {hasCompany && (
            <div style={{
              position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
              background: company.color, borderRadius: '50px', padding: '3px 10px',
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)', border: '2px solid #fff', whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: company.textColor }}>{company.name}</span>
            </div>
          )}
          {hasCompany && (
            <div style={{
              position: 'absolute', top: 4, right: -4, width: '36px', height: '36px', borderRadius: '50%',
              background: company.color, border: '2px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}>
              {company.emoji}
            </div>
          )}
        </div>
        {userName && (
          <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: '700', color: '#111' }}>{userName}</div>
        )}
        {hasCompany && (
          <div style={{
            marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px',
            background: `${company.color}15`, borderRadius: '50px', padding: '5px 14px',
            border: `1px solid ${company.color}30`,
          }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: company.color }}>
              {company.emoji} {company.name} · {company.attire}
            </span>
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
        {/* Seed */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input value={seed} onChange={e => setSeed(e.target.value)}
            placeholder="Type anything to change look..."
            style={{ flex: 1, height: '40px', border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '0 12px', fontSize: '13px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }} />
          <button onClick={() => setSeed(Math.random().toString(36).slice(2, 10))}
            style={{ height: '40px', padding: '0 14px', borderRadius: '10px', background: '#F5F5F5', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#111', whiteSpace: 'nowrap' }}>
            🎲 Random
          </button>
        </div>

        {/* Style */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Style</div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {STYLES.map(s => (
              <button key={s.id} onClick={() => setStyle(s.id)}
                style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '12px', border: `2px solid ${style === s.id ? '#111' : '#F0F0F0'}`, background: style === s.id ? '#111' : '#fff', cursor: 'pointer' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: bg }}>
                  <img src={buildUrl(s.id, seed, skin, hair, bg)} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: style === s.id ? '#fff' : '#666', whiteSpace: 'nowrap' }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skin tone */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Skin Tone</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {SKIN_TONES.map(s => (
              <button key={s.value} onClick={() => setSkin(s.value)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: `#${s.value}`, border: `3px solid ${skin === s.value ? '#111' : 'transparent'}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Hair */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Hair Color</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {HAIR_COLORS.map(h => (
              <button key={h.value} onClick={() => setHair(h.value)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: `#${h.value}`, border: `3px solid ${hair === h.value ? '#111' : 'transparent'}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Background */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Background</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {BG_COLORS.map(c => (
              <button key={c} onClick={() => setBg(c)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: c, border: `3px solid ${bg === c ? '#111' : 'transparent'}`, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>

        {/* Company gear */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Company Gear</div>
          <div style={{ fontSize: '11px', color: '#bbb', marginBottom: '10px' }}>Shows your company badge on your avatar</div>
          <button onClick={() => setCompany(COMPANIES[0])}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', border: 'none', background: company.name === 'None' ? '#F5F5F5' : '#fff', cursor: 'pointer', textAlign: 'left', outline: company.name === 'None' ? '2px solid #111' : '1px solid #F0F0F0', marginBottom: '6px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🚫</div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>No company gear</span>
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {COMPANIES.slice(1).map(c => (
              <button key={c.name} onClick={() => setCompany(c)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '12px', border: 'none', background: company.name === c.name ? c.color : '#F9F9F9', cursor: 'pointer', textAlign: 'left', outline: company.name === c.name ? `2px solid ${c.color}` : 'none', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '18px' }}>{c.emoji}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: company.name === c.name ? c.textColor : '#111' }}>{c.name}</div>
                  <div style={{ fontSize: '10px', color: company.name === c.name ? `${c.textColor}99` : '#999' }}>{c.attire}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave}
          style={{ width: '100%', height: '52px', borderRadius: '14px', background: saved ? '#22C55E' : '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
          {saved ? '✓ Looking good!' : <>Save & go to map <ArrowRight style={{ width: '18px', height: '18px' }} /></>}
        </button>
      </div>
    </div>
  );
}