import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { INTERESTS, CITIES } from '@/data/mockData';

type Step = 0 | 1 | 2 | 3;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setUserName } = useAppContext();

  const [step, setStep] = useState<Step>(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (label: string) => {
    setInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const handleFinish = () => {
    const fullName = `${firstName} ${lastName}`.trim() || 'You';
    setUserName(fullName);
    navigate('/avatar');
  };

  const canNext = [
    firstName.trim().length > 0,
    company.trim().length > 0,
    city.length > 0,
    interests.length >= 1,
  ][step];

  const steps = ['Who are you?', 'Where are you interning?', 'Which city?', 'What are you into?'];

  return (
    <div style={{
      minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '430px', margin: '0 auto',
    }}>
      {/* Progress bar */}
      <div style={{ height: '3px', background: '#F0F0F0' }}>
        <div style={{ height: '100%', background: '#111', width: `${((step + 1) / 4) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>

      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {step > 0 && (
          <button onClick={() => setStep((step - 1) as Step)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft style={{ width: '16px', height: '16px', color: '#111' }} />
          </button>
        )}
        <div>
          <div style={{ fontSize: '12px', color: '#bbb', fontWeight: '500' }}>Step {step + 1} of 4</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{steps[step]}</div>
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, padding: '28px 24px 24px', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">

          {/* Step 0 — Name */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>Let's get your profile set up so other interns can find you.</div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>First Name</label>
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Jordan"
                  autoFocus
                  style={{ width: '100%', height: '50px', border: '1.5px solid #E5E5E5', borderRadius: '14px', padding: '0 16px', fontSize: '16px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Last Name</label>
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Mitchell"
                  style={{ width: '100%', height: '50px', border: '1.5px solid #E5E5E5', borderRadius: '14px', padding: '0 16px', fontSize: '16px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', boxSizing: 'border-box' }}
                />
              </div>
            </motion.div>
          )}

          {/* Step 1 — Company */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>Where are you spending your summer?</div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Company</label>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Goldman Sachs, Google, McKinsey..."
                autoFocus
                style={{ width: '100%', height: '50px', border: '1.5px solid #E5E5E5', borderRadius: '14px', padding: '0 16px', fontSize: '16px', color: '#111', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif', boxSizing: 'border-box' }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {['McKinsey', 'Goldman Sachs', 'Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Deloitte', 'JPMorgan', 'BlackRock', 'Tesla', 'Nvidia', 'Stripe', 'Spotify'].map(c => (
                  <button key={c} onClick={() => setCompany(c)}
                    style={{ padding: '7px 14px', borderRadius: '50px', border: `1.5px solid ${company === c ? '#111' : '#E5E5E5'}`, background: company === c ? '#111' : '#fff', color: company === c ? '#fff' : '#666', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' }}>
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — City */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>Which city are you interning in?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Atlanta', 'NYC', 'SF', 'Chicago', 'Seattle', 'Austin', 'Boston', 'LA', 'Miami', 'Dallas', 'Denver', 'DC', 'Houston', 'Minneapolis', 'Charlotte', 'Nashville', 'Phoenix', 'Raleigh', 'Other'].map(c => (
                  <button key={c} onClick={() => setCity(c)}
                    style={{ padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${city === c ? '#111' : '#F0F0F0'}`, background: city === c ? '#111' : '#fff', color: city === c ? '#fff' : '#111', fontSize: '15px', fontWeight: city === c ? '700' : '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Interests */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>Pick at least one — we'll match you with people who vibe.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {INTERESTS.map(({ label, emoji }) => {
                  const selected = interests.includes(label);
                  return (
                    <button key={label} onClick={() => toggleInterest(label)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${selected ? '#111' : '#F0F0F0'}`, background: selected ? '#111' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                      <span style={{ fontSize: '22px' }}>{emoji}</span>
                      <span style={{ fontSize: '15px', fontWeight: selected ? '700' : '500', color: selected ? '#fff' : '#111' }}>{label}</span>
                      {selected && <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#fff' }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <div style={{ padding: '16px 24px 32px' }}>
        <button
          onClick={step < 3 ? () => setStep((step + 1) as Step) : handleFinish}
          disabled={!canNext}
          style={{
            width: '100%', height: '54px', borderRadius: '16px',
            background: canNext ? '#111' : '#E5E5E5',
            color: canNext ? '#fff' : '#999',
            border: 'none', cursor: canNext ? 'pointer' : 'not-allowed',
            fontSize: '16px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s',
          }}>
          {step < 3 ? 'Continue' : 'Pick your avatar →'}
          {step < 3 && <ArrowRight style={{ width: '18px', height: '18px' }} />}
        </button>
      </div>
    </div>
  );
}