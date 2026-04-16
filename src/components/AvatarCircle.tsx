interface AvatarCircleProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const colors = [
  'from-primary to-secondary',
  'from-pink-500 to-rose-400',
  'from-amber-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-violet-500 to-purple-400',
  'from-cyan-500 to-blue-400',
];

export default function AvatarCircle({ name, size = 'md', className = '' }: AvatarCircleProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colorIndex = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;

  return (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-primary-foreground font-bold shrink-0 ${className}`}>
      {initials}
    </div>
  );
}
