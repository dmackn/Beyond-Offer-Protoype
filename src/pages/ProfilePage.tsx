import { motion } from 'framer-motion';
import { Settings, LogOut, MapPin, Globe, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { achievements, friendLocations } from '@/data/mockData';

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-6 pt-6 pb-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <AvatarCircle name="You User" size="xl" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Your Profile</h2>
            <p className="text-sm text-muted-foreground">McKinsey · Atlanta, GA</p>
            <p className="text-xs text-muted-foreground">Duke University · Class of 2026</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { val: '5', label: 'Chats' },
            { val: '2', label: 'Events' },
            { val: '4', label: 'Friends' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center p-3 rounded-2xl bg-muted/50">
              <div className="text-xl font-black text-gradient">{val}</div>
              <div className="text-xs text-muted-foreground font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Friends Around the World */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">Friends Around the World</h3>
          </div>
          <div className="space-y-2">
            {friendLocations.map((friend, i) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <AvatarCircle name={friend.name} size="md" />
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{friend.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {friend.city} · {friend.company}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-online" />
              </motion.div>
            ))}
            <button className="w-full py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              + Add a Friend
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="font-bold text-sm text-foreground mb-3">🏆 Achievements</h3>
          <div className="space-y-3">
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-2xl border ${ach.unlocked ? 'border-achievement/30 bg-achievement/5' : 'border-border bg-card'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ach.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{ach.title}</span>
                      {ach.unlocked && <span className="text-[10px] px-2 py-0.5 rounded-full bg-achievement/20 text-achievement font-bold">Unlocked!</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">{ach.description}</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-2.5">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{ach.progress}/{ach.total}</span>
                    <span>{Math.round((ach.progress / ach.total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(ach.progress / ach.total) * 100}%` }}
                      transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                      className={`h-full rounded-full ${ach.unlocked ? 'gradient-gold' : 'gradient-primary'}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-sm text-foreground">Settings</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left">
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="font-medium text-sm text-destructive">Log Out</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
