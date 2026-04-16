import { motion } from 'framer-motion';
import { ArrowRight, MapPin, MessageCircle, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-gradient">BeyondOffer</span>
          </h1>
          <Button onClick={() => navigate('/onboarding')} size="sm" className="gradient-primary text-primary-foreground font-semibold rounded-full px-6">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Built for summer interns
            </div>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
              Your city.<br />
              <span className="text-gradient">Your people.</span><br />
              Your summer.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Moving to a new city for your internship? BeyondOffer connects you with other interns nearby — find your pod, join the conversation, and make this the best summer yet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/onboarding')}
                size="lg"
                className="gradient-primary text-primary-foreground font-bold rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
              >
                Join the Community
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/map')}
                className="rounded-full px-8 h-12 text-base font-semibold border-border"
              >
                Explore the Map
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Community Map', desc: 'See intern pods at every office. Find who works nearby and explore hotspots other interns love.', color: 'bg-primary/10 text-primary' },
              { icon: MessageCircle, title: 'Group Chats', desc: 'Auto-join chats for your city, company, and interests. Coordinate dinner, gym sessions, and weekend plans.', color: 'bg-secondary/10 text-secondary' },
              { icon: Users, title: 'Sponsored Events', desc: 'Companies host mixers, game nights, and panels just for interns. RSVP and connect with talent.', color: 'bg-sponsored/10 text-sponsored' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { val: '2,400+', label: 'Interns Connected' },
            { val: '8 Cities', label: 'And Growing' },
            { val: '150+', label: 'Companies' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-gradient">{val}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2025 BeyondOffer. Built for interns, by interns.
      </footer>
    </div>
  );
}
