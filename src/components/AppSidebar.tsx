import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, PenTool as WriterIcon, ChevronLeft, PanelLeft, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
];

const writerItems = [
  { icon: WriterIcon, label: 'Handwriting Editor', path: '/editor-handwriting' },
];

export default function AppSidebar({ className, hideMobileButton }: { className?: string; hideMobileButton?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (!e.matches) setIsMobileOpen(false);
    };
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center shrink-0 h-[73px]">
        <div className="flex items-center gap-2 overflow-hidden w-full">
          <img src="https://img.icons8.com/?size=120&id=bqkw0UxbroZv&format=png" alt="" className="w-9 h-9 shrink-0" />
          {!isMobile && (
            <motion.span
              animate={{ opacity: isExpanded ? 1 : 0 }}
              className="font-display font-bold text-sm text-foreground truncate"
            >
              Text to Handwriting
            </motion.span>
          )}
          {isMobile && (
            <span className="font-display font-bold text-sm text-foreground truncate flex-1">
              Text to Handwriting
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
        {/* Main Nav */}
        <nav className="p-3 space-y-1 mt-2">
          {(isExpanded || isMobile) && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap mb-1"
            >
              Slide Maker
            </motion.p>
          )}
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { navigate(item.path); if (isMobile) setIsMobileOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {!isMobile && (
                <motion.span
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {isMobile && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-5 py-2">
          <div className="h-px bg-border/60" />
        </div>

        {/* Handwriting Nav */}
        <nav className="p-3 space-y-1">
          {(isExpanded || isMobile) && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap mb-1"
            >
              Handwriting Wizard
            </motion.p>
          )}
          {writerItems.map((item) => (
            <button
              key={item.label}
              onClick={() => { navigate(item.path); if (isMobile) setIsMobileOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {!isMobile && (
                <motion.span
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {isMobile && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-5 py-2">
          <div className="h-px bg-border/60" />
        </div>

        <div className="flex-1" />

        {/* Platform */}
        <nav className="p-3 space-y-1">
          {(isExpanded || isMobile) && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap mb-1"
            >
              Platform
            </motion.p>
          )}
          <button
            onClick={() => { navigate('/about'); if (isMobile) setIsMobileOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden",
              location.pathname === '/about'
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Info className="w-4.5 h-4.5 shrink-0" />
            {!isMobile && (
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0 }}
                className="whitespace-nowrap"
              >
                About
              </motion.span>
            )}
            {isMobile && (
              <span className="whitespace-nowrap">About</span>
            )}
          </button>
        </nav>

        <div className="px-5 py-2">
          <div className="h-px bg-border/60" />
        </div>


      </div>

      {/* Bottom toggle button (desktop only) */}
      {!isMobile && (
        <div className="shrink-0 border-t border-border p-3 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", !isExpanded && "rotate-180")} />
            <motion.span
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap overflow-hidden"
            >
              Collapse
            </motion.span>
          </button>
        </div>
      )}
    </>
  );

  if (isMobile) {
      return (
        <>
          {/* Floating hamburger trigger */}
          {!hideMobileButton && (
            <button
              onClick={() => setIsMobileOpen(true)}
              className={cn(
                "fixed top-14 left-3 z-40 w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-border shadow-sm lg:hidden",
                isMobileOpen && "hidden"
              )}
            >
              <PanelLeft className="w-4 h-4 text-foreground" />
            </button>
          )}

        {/* Backdrop */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Drawer */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col bg-surface border-r border-border shadow-xl lg:hidden transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 220 : 68 }}
      className={cn("h-screen border-r border-border bg-surface flex flex-col shrink-0 overflow-hidden relative z-50 shadow-sm group/sidebar", className)}
    >
      {sidebarContent}
    </motion.aside>
  );
}
