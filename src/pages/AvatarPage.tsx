import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useNavigate } from 'react-router-dom';

export default function AvatarPage() {
  const navigate = useNavigate();

  const handleAvatarExported = (url: string) => {
    localStorage.setItem('avatarUrl', url);
    navigate('/map');
  };

  return (
    <div style={{ width: '100%', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '17px', fontWeight: '800', color: '#111' }}>
          Beyond<span style={{ color: '#22C55E' }}>Offers</span>
        </span>
        <span style={{ fontSize: '13px', color: '#999' }}>Create your avatar</span>
      </div>
      <AvatarCreator
        subdomain="beyondoffers"
        style={{ width: '100%', height: 'calc(100vh - 57px)', border: 'none' }}
        onAvatarExported={(event) => handleAvatarExported(event.data.url)}
      />
    </div>
  );
}