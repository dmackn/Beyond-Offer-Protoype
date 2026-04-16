import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EVENT_TAGS = ['Networking', 'Free Food', 'Free Drinks', 'Recruiting', 'Social', 'Games', 'Tech', 'Panel', 'Rooftop', 'Happy Hour'];

export default function AdminEventsPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-verified/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-verified" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Event Submitted!</h2>
          <p className="text-sm text-muted-foreground mb-6">Your event will appear on the map after review.</p>
          <Button onClick={() => navigate('/events')} className="gradient-primary text-primary-foreground rounded-full px-8">
            View Events
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-6 h-14 border-b border-border">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-bold text-foreground">Submit a Sponsored Event</h1>
      </header>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Event Title</label>
          <Input placeholder="e.g. Goldman Sachs Networking Happy Hour" className="h-12 rounded-xl" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
          <Input placeholder="e.g. Goldman Sachs" className="h-12 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
            <Input type="date" className="h-12 rounded-xl" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Time</label>
            <Input type="time" className="h-12 rounded-xl" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Location Address</label>
          <Input placeholder="e.g. 123 Peachtree St, Atlanta, GA" className="h-12 rounded-xl" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
          <Textarea placeholder="Tell interns what to expect..." className="min-h-[100px] rounded-xl" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Event Tags</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TAGS.map(tag => {
              const sel = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(prev => sel ? prev.filter(t => t !== tag) : [...prev, tag])}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    sel ? 'gradient-gold text-primary-foreground border-transparent' : 'border-border text-foreground hover:border-sponsored'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Contact Email</label>
          <Input type="email" placeholder="events@company.com" className="h-12 rounded-xl" />
        </div>

        <Button
          onClick={() => setSubmitted(true)}
          className="w-full h-12 rounded-xl gradient-gold text-primary-foreground font-bold text-base"
        >
          Submit Event for Review
        </Button>
      </div>
    </div>
  );
}
