import { useState } from 'react';
import { X, Camera, Send } from 'lucide-react';
import { EventStory, eventStories } from '@/data/mockData';

interface Props {
  eventId: string;
  eventTitle: string;
  isLive: boolean;
  onClose: () => void;
}

export default function EventStories({ eventId, eventTitle, isLive, onClose }: Props) {
  const stories = eventStories.filter(s => s.eventId === eventId);
  const [activeIdx, setActiveIdx] = useState(0);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const active = stories[activeIdx];

  const handleSubmit = () => {
    if (!note.trim()) return;
    setSubmitted(true);
    setNote('');
    setTimeout(() => setSubmitted(false), 2000);
  };

  if (!isLive || stories.length === 0) return (
    <div style={{ padding: '32px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>📸</div>
      <div style={{ fontSize: '15px', fontWeight: '600', color: '#111', marginBottom: '6px' }}>No stories yet</div>
      <div style={{ fontSize: '13px', color: '#999' }}>Stories will appear here once the event goes live</div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Story viewer */}
      <div style={{ position: 'relative', background: '#111', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>

        {/* Progress bars */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', gap: '4px', zIndex: 10 }}>
          {stories.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '2px', borderRadius: '2px', background: i < activeIdx ? '#fff' : i === activeIdx ? '#22C55E' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>

        {/* Story content */}
        <div style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 16px 16px' }}>
          {/* Big emoji */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <div style={{ fontSize: '80px', lineHeight: 1 }}>{active.emoji}</div>
          </div>

          {/* Caption + user */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: active.userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#fff', border: '2px solid rgba(255,255,255,0.3)' }}>
                {active.userInit}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{active.user}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{active.time}</span>
            </div>
            <div style={{ fontSize: '15px', color: '#fff', fontWeight: '500', lineHeight: '1.4' }}>{active.caption}</div>
          </div>
        </div>

        {/* Tap zones */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setActiveIdx(i => Math.max(0, i - 1))} />
          <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setActiveIdx(i => Math.min(stories.length - 1, i + 1))} />
        </div>

        {/* Expires badge */}
        <div style={{ position: 'absolute', top: '24px', right: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '50px', padding: '3px 8px', fontSize: '10px', color: '#fff', fontWeight: '600', zIndex: 10 }}>
          {active.expiresIn}
        </div>
      </div>

      {/* Story thumbnails */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
        {stories.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px', background: s.userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: `2px solid ${i === activeIdx ? '#111' : 'transparent'}`, cursor: 'pointer' }}
          >
            {s.emoji}
          </button>
        ))}
      </div>

      {/* Add your moment */}
      <div style={{ background: '#F8F8F8', borderRadius: '14px', padding: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Camera style={{ width: '14px', height: '14px' }} />
          Add your moment
        </div>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '8px', fontSize: '14px', color: '#22C55E', fontWeight: '600' }}>Posted! ✓</div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Share a moment from the event..."
              style={{ flex: 1, height: '40px', border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '0 12px', fontSize: '14px', color: '#111', background: '#fff', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
            />
            <button
              onClick={handleSubmit}
              style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#111', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send style={{ width: '16px', height: '16px', color: '#fff' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}