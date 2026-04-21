import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [splash, setSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 5000);
    return () => clearTimeout(t);
  }, []);

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {splash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              position: 'relative',
            }}
          >
            {/* soft background glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.18, scale: 1.25 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: '220px',
                height: '220px',
                borderRadius: '999px',
                background: 'radial-gradient(circle, #22C55E 0%, rgba(34,197,94,0) 70%)',
                filter: 'blur(18px)',
              }}
            />

            <motion.div
              initial={{ scale: 0.65, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -4, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '78px',
                  height: '78px',
                  background: '#000',
                  borderRadius: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.14)',
                }}
              >
                <span
                  style={{
                    fontSize: '30px',
                    fontWeight: '800',
                    color: '#fff',
                    letterSpacing: '-1px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  B<span style={{ color: '#22C55E' }}>O</span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#111',
                  letterSpacing: '-0.6px',
                }}
              >
                Beyond<span style={{ color: '#22C55E' }}>Offers</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
          >
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 28px 40px',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1
                  style={{
                    fontSize: '38px',
                    fontWeight: '800',
                    color: '#111',
                    lineHeight: '1.1',
                    letterSpacing: '-1px',
                    marginBottom: '14px',
                  }}
                >
                  Find your people
                  <br />
                  before day one.
                </h1>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#888',
                    lineHeight: '1.6',
                    marginBottom: '0',
                  }}
                >
                  Connect with interns at your office, in your city, and who share your vibe.
                </p>
              </motion.div>
            </div>

            <div
              style={{
                padding: '0 28px 52px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => navigate('/onboarding')}
                  style={{
                    width: '100%',
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    letterSpacing: '-0.2px',
                  }}
                >
                  Create your profile
                  <ArrowRight style={{ width: '18px', height: '18px' }} />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <button
                  onClick={() => navigate('/map')}
                  style={{
                    width: '100%',
                    background: 'none',
                    color: '#111',
                    border: '1.5px solid #E5E5E5',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Log in
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#bbb',
                  marginTop: '4px',
                }}
              >
                By continuing you agree to our Terms & Privacy Policy
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}