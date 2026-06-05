import AppSidebar from '@/components/AppSidebar';
import TopBar from '@/components/TopBar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, PenTool, Palette, Layout, Download, Shield, Zap, ArrowRight, CheckCircle, Layers, Eye, Image, Globe, Brain } from 'lucide-react';

const features = [
  { icon: PenTool, title: '47+ Handwriting Fonts', desc: 'From neat student print to messy scrawls, cursive elegance to marker bold — including Arabic, Urdu, Bengali, Chinese, Japanese, Korean, Thai, Devanagari scripts.' },
  { icon: Palette, title: 'Custom Ink & Paper', desc: 'Blue, black, red, green, purple, orange inks with smudge effects. Upload your own paper images as backgrounds.' },
  { icon: Layout, title: '21 Paper Layouts', desc: 'Ruled, dotted, grid, Cornell, music staff, blueprint, parchment, blackboard, legal pad, and more.' },
  { icon: Brain, title: 'AI Text Regeneration', desc: 'Rewrite and regenerate text with AI-powered suggestions to match your desired handwriting style and tone.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Write in Bangla, Arabic, Urdu, Japanese, Chinese, Thai, Hindi, and Latin scripts with native handwriting fonts.' },
  { icon: Image, title: 'Image Embedding', desc: 'Upload images and position them alongside text. Natural flow between handwritten content and visual elements.' },
  { icon: Download, title: 'Multi-Format Export', desc: 'Export as PDF, PNG (single or ZIP batch), and JPG. Select specific pages for targeted exports.' },
  { icon: Eye, title: 'Real-Time Live Preview', desc: 'See every change instantly with smooth zoom, auto-fit, and page-by-page navigation.' },
  { icon: Layers, title: 'Undo/Redo & Auto-Save', desc: 'Never lose work with auto-save to localStorage. 50-level undo/redo for worry-free editing.' },
  { icon: Shield, title: 'Privacy First', desc: 'All processing happens in your browser. No cloud storage of your documents. Your data stays yours.' },
  { icon: Zap, title: 'Instant Page Reflow', desc: 'Change page size, margins, or font and watch content automatically reflow across pages.' },
];

const workflow = [
  { step: '01', title: 'Type Your Text', desc: 'Enter or paste your content into the editor. Supports long documents with automatic page breaks.' },
  { step: '02', title: 'Pick a Handwriting Style', desc: 'Choose from 47+ realistic handwriting fonts across 6 categories — from neat print to cursive.' },
  { step: '03', title: 'Customize Everything', desc: 'Select ink color, paper layout, margins, and apply smudge effects for extra realism.' },
  { step: '04', title: 'Export & Download', desc: 'Preview your work in real-time and export as PDF or images in one click.' },
];

const stats = [
  { value: '47+', label: 'Handwriting Fonts' },
  { value: '21', label: 'Paper Layouts' },
  { value: '6', label: 'Ink Colors' },
  { value: '100%', label: 'Browser-Based' },
];

export default function About() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="relative">

            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
              <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="container relative z-10 py-24 md:py-32 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-3xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20"
                  >
                    <Sparkles className="h-4 w-4" />
                    Text to Handwriting
                  </motion.div>
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 leading-[1.1] tracking-tight">
                    Turn Your Text Into{' '}
                    <span className="text-primary">Realistic Handwriting</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Create stunning handwritten assignments with multiple styles, custom ink colors, 
                    notebook layouts, and export to PDF — all in seconds.
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button asChild size="lg" className="font-semibold text-base px-8 h-12 shadow-lg shadow-primary/25">
                      <Link to="/editor-handwriting">
                        <PenTool className="h-5 w-5 mr-2" />
                        Start Writing Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center justify-center gap-8 md:gap-14 mt-16"
                >
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                      <span className="text-3xl font-display text-foreground">{s.value}</span>
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Mission */}
            <section className="container py-20 md:py-28">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We bridge the gap between digital convenience and the authentic feel of 
                    handwritten documents. Whether you're a student submitting assignments, a teacher 
                    preparing materials, or anyone who needs realistic handwriting — we give you the 
                    tools to create stunning, handcrafted documents in seconds.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Features */}
            <section className="container py-20 md:py-28">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Everything You Need</h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">Complete toolkit for realistic handwriting creation</p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="bg-card rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-4 group-hover:from-primary/25 group-hover:to-accent/25 transition-all">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="bg-muted/30 py-20 md:py-28">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">How It Works</h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">Simple workflow from text to handwriting</p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {workflow.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="relative bg-card rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <span className="text-5xl font-display text-primary/10 absolute top-4 right-4 group-hover:text-primary/20 transition-colors">{step.step}</span>
                      <h3 className="font-display text-lg text-foreground mb-2 mt-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="container py-20 md:py-28">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Built With Modern Technology</h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">100% browser-based — your data never leaves your device</p>
              </motion.div>
              <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'React 18', desc: 'UI Framework' },
                  { name: 'TypeScript', desc: 'Type Safety' },
                  { name: 'Vite 5', desc: 'Build Tool' },
                  { name: 'Tailwind CSS', desc: 'Styling' },
                  { name: 'Framer Motion', desc: 'Animations' },
                  { name: 'Zustand', desc: 'State Management' },
                  { name: 'Gemini AI', desc: 'Text Generation' },
                  { name: 'html2canvas', desc: 'Page Rendering' },
                  { name: 'jsPDF / JSZip', desc: 'Export Engine' },
                ].map((tech) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl border p-4 text-center hover:border-primary/30 transition-all"
                  >
                    <p className="font-display font-bold text-sm text-foreground">{tech.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Privacy */}
            <section className="bg-muted/30 py-16 md:py-20">
              <div className="container max-w-3xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">Your Privacy Matters</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Everything runs entirely in your browser. Your documents, uploaded images, 
                    and API keys stay on your device — stored only in localStorage. We don't upload 
                    your content to any server. AI text regeneration uses the Gemini API directly 
                    from your browser using your own API key.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* FAQ */}
            <section className="container py-20 md:py-28">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Frequently Asked Questions</h2>
              </motion.div>
              <div className="max-w-2xl mx-auto space-y-4">
                {[
                  { q: 'Is it free to use?', a: 'Yes, it is completely free to use. You can create handwritten documents without any cost. AI text generation uses your own Gemini API key or our shared proxy key.' },
                  { q: 'Do I need an internet connection?', a: 'Yes, an internet connection is required for loading fonts from Google Fonts and for AI text generation features. The core editing functionality may work offline for previously loaded assets.' },
                  { q: 'Where are my documents saved?', a: 'All documents are saved locally in your browser\'s localStorage. Nothing is uploaded to any server. You can export your work as PDF or images for permanent storage.' },
                  { q: 'Can I use my own handwriting font?', a: 'We offer 47+ professionally designed handwriting fonts across 6 categories. Custom font upload is not currently supported, but you can upload custom paper backgrounds.' },
                  { q: 'What export formats are supported?', a: 'You can export as PDF, PNG (individual or ZIP batch), and JPG. Select specific pages for targeted exports.' },
                  { q: 'Is there a limit on document length?', a: 'No, you can create documents of any length. Content automatically flows across pages with intelligent page breaks.' },
                ].map((faq, i) => (
                  <motion.details
                    key={faq.q}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="group bg-card rounded-xl border border-border/60 p-5 cursor-pointer"
                  >
                    <summary className="flex items-center justify-between font-display font-semibold text-foreground list-none">
                      {faq.q}
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform text-lg">▾</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="container py-20 md:py-28 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-2xl" />
                <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border p-12">
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Start Writing Today</h2>
                  <p className="text-muted-foreground text-lg mb-8">No sign-up required. No data uploads. Just create.</p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button asChild size="lg" className="font-semibold text-base px-10 h-12 shadow-lg shadow-primary/25">
                      <Link to="/editor-handwriting">
                        <PenTool className="h-5 w-5 mr-2" />
                        Get Started Free
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8">
              <div className="container text-center text-sm text-muted-foreground">
                <p>Text to Handwriting — Create realistic handwritten documents online. Built with React, TypeScript, and love.</p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
