import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '@/components/AppLayout';
import { achievements, friendLocations } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userAvatar, userName } = useAppContext();

  const displayName = userName || 'Your Name';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const company = userAvatar?.company && userAvatar.company !== 'None' ? userAvatar.company : 'Summer Intern';

  return (
    <AppLayout>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '480px', margin: '0 auto', paddingBottom: '80px' }}>

        {/* Hero banner */}
        <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', padding: '32px 24px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>

            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {userAvatar ? (
                <>
                  <img
                    src={userAvatar.url}
                    alt={displayName}
                    style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', display: 'block' }}
                  />
                  {userAvatar.company !== 'None' && userAvatar.companyEmoji && (
                    <div style={{ position: 'absolute', bottom: 0, right: -2, width: '24px', height: '24px', borderRadius: '50%', background: userAvatar.companyColor, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                      {userAvatar.companyEmoji}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '700', color: '#fff', border: '3px solid rgba(255,255,255,0.4)' }}>
                  {initials}
                </div>
              )}
            </div>

            {/* Name + company */}
            <div style={{ flex: 1, paddingBottom: '4px' }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>{displayName}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '4px' }}>{company}</div>
              {userAvatar?.companyAttire && userAvatar.company !== 'None' && (
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{userAvatar.companyAttire}</div>
              )}
            </div>

            {/* Edit button */}
            <button
              onClick={() => navigate('/avatar')}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50px', padding: '7px 16px', fontSize: '12px', fontWeight: '600', color: '#fff', cursor: 'pointer', flexShrink: 0, alignSelf: 'flex-start' }}>
              Edit
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {[
              { value: '5', label: 'Chats' },
              { value: '2', label: 'RSVPs' },
              { value: '22', label: 'Pod' },
              { value: '4', label: 'Friends' },
            ].map(stat => (
              <div key={stat.label} style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px 0', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginTop: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Friends across cities */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Friends</div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {friendLocations.map(f => (
              <div key={f.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fff', border: '2px solid #E5E5E5' }}>
                  {f.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#111' }}>{f.name.split(' ')[0]}</div>
                <div style={{ fontSize: '10px', color: '#999' }}>{f.city}</div>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F5F5F5', border: '2px dashed #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', cursor: 'pointer' }}>
                +
              </div>
              <div style={{ fontSize: '11px', color: '#999' }}>Add</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Achievements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '14px', background: a.unlocked ? '#F0FDF4' : '#F9F9F9', border: `1px solid ${a.unlocked ? '#BBF7D0' : '#F0F0F0'}` }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: a.unlocked ? '#22C55E' : '#E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{a.title}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: a.unlocked ? '#22C55E' : '#999', flexShrink: 0 }}>
                      {a.unlocked ? '✓ Done' : `${a.progress}/${a.total}`}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: a.unlocked ? 0 : '6px' }}>{a.description}</div>
                  {!a.unlocked && (
                    <div style={{ height: '4px', background: '#E5E5E5', borderRadius: '2px' }}>
                      <div style={{ height: '4px', background: '#4F46E5', borderRadius: '2px', width: `${(a.progress / a.total) * 100}%`, transition: 'width 0.4s ease' }} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests (hardcoded for now, could pull from onboarding) */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Interests</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['🏋️ Fitness', '🍔 Food', '☕ Coffee', '💻 Tech', '📈 Finance', '🌃 Nightlife'].map(tag => (
              <span key={tag} style={{ padding: '6px 14px', borderRadius: '50px', background: '#EEF2FF', color: '#4F46E5', fontSize: '13px', fontWeight: '600' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Settings / actions */}
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Account</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: '🎨 Customize Avatar', action: () => navigate('/avatar') },
              { label: '🗺️ View on Map', action: () => navigate('/map') },
              { label: '💬 My Chats', action: () => navigate('/chats') },
              { label: '🎉 My Events', action: () => navigate('/events') },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid #F0F0F0', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#111', textAlign: 'left' }}>
                {item.label}
                <span style={{ color: '#ccc', fontSize: '18px' }}>›</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}