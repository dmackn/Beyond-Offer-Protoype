import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INTERESTS, CITIES, chatGroups } from '@/data/mockData';

const steps = ['Basic info', 'Internship', 'Interests', 'Your chats'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [chatToggles, setChatToggles] = useState<Record<string, boolean>>({
    c1: true, c2: true, c3: true, c4: true, c5: true,
  });
  const navigate = useNavigate();

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const previewChats = chatGroups.filter(c => ['c1', 'c2', 'c3', 'c4', 'c5'].includes(c.id));

  const inputStyle = {
    width: '100%', height: '52px', border: '1.5px solid #E5E5E5', borderRadius: '12px',
    padding: '0 16px', fontSize: '15px', color: '#111', background: '#fff',
    outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
  };

  const labelStyle = {
    fontSize: '13px', fontWeight: '600' as const, color: '#111',
    marginBottom: '8px', display: 'block', letterSpacing: '-0.1px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '430px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ padding: '16px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '17px', fontWeight: '800', color: '#111' }}>
          Beyond<span style={{ color: '#22C55E' }}>Offers</span>
        </span>
        <span style={{ fontSize: '13px', color: '#999', fontWeight: '500' }}>
          {step + 1} / {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '16px 24px 0', display: 'flex', gap: '6px' }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', background: i <= step ? '#111' : '#F0F0F0', transition: 'background 0.3s' }} />
        ))}
      </div>

      {/* Step label */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{steps[step]}</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >

            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #E0E0E0' }}>
                    <Camera style={{ width: '24px', height: '24px', color: '#999' }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input style={inputStyle} placeholder="Jordan Mitchell" />
                </div>
                <div>
                  <label style={labelStyle}>University</label>
                  <input style={inputStyle} placeholder="Search your university..." />
                </div>
                <div>
                  <label style={labelStyle}>Graduation year</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[2025, 2026, 2027, 2028].map(yr => (
                      <button
                        key={yr}
                        onClick={() => setSelectedYear(yr)}
                        style={{ flex: 1, height: '48px', borderRadius: '12px', border: `1.5px solid ${selectedYear === yr ? '#111' : '#E5E5E5'}`, background: selectedYear === yr ? '#111' : '#fff', color: selectedYear === yr ? '#fff' : '#111', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' }}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input style={inputStyle} placeholder="e.g. McKinsey, Google, Deloitte" />
                </div>
                <div>
                  <label style={labelStyle}>City</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                    {CITIES.map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        style={{ padding: '8px 16px', borderRadius: '50px', border: `1.5px solid ${selectedCity === city ? '#111' : '#E5E5E5'}`, background: selectedCity === city ? '#111' : '#fff', color: selectedCity === city ? '#fff' : '#111', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Office address <span style={{ color: '#999', fontWeight: '400' }}>(optional)</span></label>
                  <input style={inputStyle} placeholder="e.g. Ponce City Market, Atlanta" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Start date</label>
                    <input type="date" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>End date</label>
                    <input type="date" style={inputStyle} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '16px', lineHeight: '1.5' }}>Pick everything that fits — we'll match you with the right chats and people.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                  {INTERESTS.map(({ label, emoji }) => {
                    const selected = selectedInterests.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleInterest(label)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '50px', border: `1.5px solid ${selected ? '#111' : '#E5E5E5'}`, background: selected ? '#111' : '#fff', color: selected ? '#fff' : '#111', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}
                      >
                        <span style={{ fontSize: '15px' }}>{emoji}</span>
                        {label}
                        {selected && <Check style={{ width: '13px', height: '13px' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '16px', lineHeight: '1.5' }}>You're being added to these chats automatically. Toggle off any you want to skip.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {previewChats.map(chat => (
                    <div key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px', border: '1.5px solid #F0F0F0', background: '#fff' }}>
                      <span style={{ fontSize: '24px' }}>{chat.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{chat.name}</div>
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>~{chat.memberCount} members</div>
                      </div>
                      <button
                        onClick={() => setChatToggles(prev => ({ ...prev, [chat.id]: !prev[chat.id] }))}
                        style={{ width: '44px', height: '26px', borderRadius: '99px', background: chatToggles[chat.id] ? '#111' : '#E5E5E5', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                      >
                        <div style={{ position: 'absolute', top: '3px', left: chatToggles[chat.id] ? '21px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div style={{ padding: '12px 24px 44px', display: 'flex', gap: '10px' }}>
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{ height: '52px', padding: '0 20px', borderRadius: '14px', border: '1.5px solid #E5E5E5', background: '#fff', color: '#111', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
          </button>
        )}
        <button
          onClick={() => { if (step < 3) setStep(s => s + 1); else navigate('/map'); }}
          style={{ flex: 1, height: '52px', borderRadius: '14px', background: '#111', color: '#fff', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', letterSpacing: '-0.2px' }}
        >
          {step < 3 ? 'Continue' : 'Join & explore the map'}
          <ArrowRight style={{ width: '17px', height: '17px' }} />
        </button>
      </div>
    </div>
  );
}