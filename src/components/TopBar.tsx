import { motion } from 'framer-motion';
import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/handwriting/ThemeToggle';

function useLiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const h12 = now.getHours() % 12 || 12;
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return { h12, mm, ss, ampm, dateStr };
}

export default function TopBar() {
  const navigate = useNavigate();
  const { h12, mm, ss, ampm, dateStr } = useLiveClock();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="h-14 border-b border-border bg-background px-6 flex items-center justify-between shrink-0"
    >
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search presentations, templates..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted rounded-lg border-0 outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Clock */}
        <div className="flex items-center gap-1 text-sm font-mono select-none">
          <span className="font-semibold text-foreground">{h12}:{mm}</span>
          <span className="font-bold text-red-500">{ss}</span>
          <span className="text-xs font-semibold text-muted-foreground ml-0.5">{ampm}</span>
          <span className="text-xs text-muted-foreground/60 ml-2 hidden sm:inline">{dateStr}</span>
        </div>

        <div className="h-4 w-[1px] bg-border" />

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="w-4 h-4" />
        </Button>
        <ThemeToggle />
        <Button variant="hero" size="sm" onClick={() => navigate('/create')} className="gap-1.5">
          <Plus className="w-4 h-4" />
          New Deck
        </Button>
        <div className="w-8 h-8 rounded-full bg-hero-gradient flex items-center justify-center text-xs font-bold text-primary-foreground ml-2">
          U
        </div>
      </div>
    </motion.header>
  );
}
