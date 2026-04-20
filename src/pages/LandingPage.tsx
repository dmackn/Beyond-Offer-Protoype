import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [splash, setSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '430px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {splash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            >
              <div style={{ width: '72px', height: '72px', background: '#111', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '32px' }}>🌆</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>
                Beyond<span style={{ color: '#22C55E' }}>Offers</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
          >
            {/* Top area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 28px 40px' }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#22C55E', marginBottom: '12px', letterSpacing: '0.02em' }}>
                  Summer 2025
                </div>
                <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#111', lineHeight: '1.1', letterSpacing: '-1px', marginBottom: '14px' }}>
                  Find your people<br />before day one.
                </h1>
                <p style={{ fontSize: '16px', color: '#888', lineHeight: '1.6', marginBottom: '0' }}>
                  Connect with interns at your office, in your city, and who share your vibe.
                </p>
              </motion.div>
            </div>

            {/* Bottom area */}
            <div style={{ padding: '0 28px 52px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <button
                  onClick={() => navigate('/onboarding')}
                  style={{ width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: '14px', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', letterSpacing: '-0.2px' }}
                >
                  Create your profile
                  <ArrowRight style={{ width: '18px', height: '18px' }} />
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <button
                  onClick={() => navigate('/map')}
                  style={{ width: '100%', background: 'none', color: '#111', border: '1.5px solid #E5E5E5', borderRadius: '14px', padding: '16px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Log in
                </button>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ textAlign: 'center', fontSize: '12px', color: '#bbb', marginTop: '4px' }}>
                By continuing you agree to our Terms & Privacy Policy
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}