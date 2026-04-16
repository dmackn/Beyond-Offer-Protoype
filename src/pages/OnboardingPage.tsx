import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { INTERESTS, CITIES, chatGroups } from '@/data/mockData';

const steps = ['Basic Info', 'Internship', 'Interests', 'Preview'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-border">
        <h1 className="text-lg font-extrabold text-gradient">BeyondOffer</h1>
        <span className="text-sm text-muted-foreground font-medium">Step {step + 1} of 4</span>
      </header>

      {/* Progress */}
      <div className="px-6 pt-4">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'gradient-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-foreground mt-3">{steps[step]}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input placeholder="Jordan Mitchell" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">University / School</label>
                  <Input placeholder="Search your university..." className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Graduation Year</label>
                  <div className="flex gap-3">
                    {[2025, 2026, 2027, 2028].map(yr => (
                      <button
                        key={yr}
                        className="flex-1 h-12 rounded-xl border border-border text-sm font-semibold hover:border-primary hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20"
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
                  <Input placeholder="e.g. McKinsey, Google, Chick-fil-A" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Office Location — City</label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map(city => (
                      <button
                        key={city}
                        className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Office Address / Building <span className="text-muted-foreground">(optional)</span></label>
                  <Input placeholder="e.g. Ponce City Market, Atlanta, GA" className="h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Start Date</label>
                    <Input type="date" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">End Date</label>
                    <Input type="date" className="h-12 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">Select all that interest you — we'll use these to match you with group chats and hotspots.</p>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map(({ label, emoji }) => {
                    const selected = selectedInterests.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleInterest(label)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                          selected
                            ? 'gradient-primary text-primary-foreground border-transparent shadow-md shadow-primary/20'
                            : 'bg-card border-border text-foreground hover:border-primary/40'
                        }`}
                      >
                        <span>{emoji}</span>
                        {label}
                        {selected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">These are the group chats you'll be auto-joined to. Toggle off any you'd prefer to skip.</p>
                <div className="space-y-3">
                  {previewChats.map(chat => (
                    <div
                      key={chat.id}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card"
                    >
                      <span className="text-2xl">{chat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">{chat.name}</div>
                        <div className="text-xs text-muted-foreground">~{chat.memberCount} members · {chat.description}</div>
                      </div>
                      <button
                        onClick={() => setChatToggles(prev => ({ ...prev, [chat.id]: !prev[chat.id] }))}
                        className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                          chatToggles[chat.id] ? 'gradient-primary' : 'bg-muted'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-all ${
                          chatToggles[chat.id] ? 'left-[22px]' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 pb-8 pt-4 flex gap-3">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep(s => s - 1)}
            className="h-12 rounded-xl px-6 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (step < 3) setStep(s => s + 1);
            else navigate('/map');
          }}
          className="flex-1 h-12 rounded-xl gradient-primary text-primary-foreground font-bold text-base"
        >
          {step < 3 ? (
            <>Next <ArrowRight className="w-4 h-4 ml-1" /></>
          ) : (
            <>Join & Explore the Map <ArrowRight className="w-4 h-4 ml-1" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
