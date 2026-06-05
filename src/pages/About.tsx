import AppSidebar from '@/components/AppSidebar';
import TopBar from '@/components/TopBar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, PenTool, FileText, Palette, Layout, Download, Shield, Zap, ArrowRight, CheckCircle, Layers, Eye, Image, Globe, Brain } from 'lucide-react';

const features = [
  { icon: PenTool, title: '47+ Handwriting Fonts', desc: 'From neat student print to messy scrawls, cursive elegance to marker bold — including Arabic, Urdu, Bengali, Chinese, Japanese, Korean, Thai, Devanagari scripts.' },
  { icon: Palette, title: 'Custom Ink & Paper', desc: 'Blue, black, red, green, purple, orange inks with smudge effects. Upload your own paper images as backgrounds.' },
  { icon: Layout, title: '21 Paper Layouts', desc: 'Ruled, dotted, grid, Cornell, music staff, blueprint, parchment, blackboard, legal pad, and more.' },
  { icon: FileText, title: 'Slide Maker & Presentations', desc: 'AI-powered slide creation with drag-and-drop editing, 7+ presentation layouts, real-time collaboration.' },
  { icon: Brain, title: 'Gemini AI Integration', desc: 'Smart text regeneration, AI-powered content generation, and intelligent formatting suggestions powered by Gemini 2.0 Flash.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Write in Bangla, Arabic, Urdu, Japanese, Chinese, Thai, Hindi, and Latin scripts with native handwriting fonts.' },
  { icon: Image, title: 'Image & Diagram Embedding', desc: 'Upload images and positionable diagrams alongside text. Natural flow between handwritten and typed sections.' },
  { icon: Download, title: 'Multi-Format Export', desc: 'Export as PDF, PNG (single or ZIP batch), JPG, and PPTX. Select specific pages for targeted exports.' },
  { icon: Eye, title: 'Real-Time Live Preview', desc: 'See every change instantly with smooth zoom, auto-fit, and page-by-page navigation.' },
  { icon: Layers, title: 'Undo/Redo & Auto-Save', desc: 'Never lose work with auto-save to localStorage. 50-level undo/redo for worry-free editing.' },
  { icon: Shield, title: 'Privacy First', desc: 'Your API key stays local. All processing happens in your browser. No cloud storage of your documents.' },
  { icon: Zap, title: 'Instant Page Reflow', desc: 'Change page size, margins, or font and watch content automatically reflow across pages.' },
];

const workflow = [
  { step: '01', title: 'Choose Your Tool', desc: 'Select between the Handwriting Wizard for document creation or the Slide Maker for presentations.' },
  { step: '02', title: 'Write or Generate', desc: 'Type your content, paste from clipboard, or use AI-assisted text generation.' },
  { step: '03', title: 'Style & Customize', desc: 'Pick from 47+ handwriting styles, 6 ink colors, 21 paper layouts. Apply globally or per-section.' },
  { step: '04', title: 'Preview & Export', desc: 'Review your work in real-time, select pages, and export as PDF, PNG, or ZIP in one click.' },
];

const stats = [
  { value: '47+', label: 'Handwriting Fonts' },
  { value: '21', label: 'Paper Layouts' },
  { value: '5', label: 'Export Formats' },
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
                    About DeckAI
                  </motion.div>
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 leading-[1.1] tracking-tight">
                    AI-Powered Document{' '}
                    <span className="text-primary">Creation Platform</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    DeckAI combines realistic handwriting generation with professional slide creation — 
                    powered by AI and built entirely in your browser.
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button asChild size="lg" className="font-semibold text-base px-8 h-12 shadow-lg shadow-primary/25">
                      <Link to="/editor-handwriting">
                        <PenTool className="h-5 w-5 mr-2" />
                        Try Handwriting Wizard
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-semibold text-base px-8 h-12">
                      <Link to="/create">
                        <FileText className="h-5 w-5 mr-2" />
                        Create Slides
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
                    DeckAI was built to bridge the gap between digital convenience and the authentic feel of 
                    handwritten documents. Whether you're a student creating assignments, a teacher preparing 
                    materials, or a professional crafting presentations — we give you the tools to create 
                    stunning, realistic documents that look handcrafted.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* What We Do */}
            <section className="bg-muted/30 py-20 md:py-28">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Two Tools, One Platform</h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">Handwriting Wizard for documents. Slide Maker for presentations.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl border p-8 hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                      <PenTool className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-3">Handwriting Wizard</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Transform typed text into realistic handwritten documents. Choose from 47+ handwriting 
                      fonts, customize ink colors, select paper layouts, and export as PDF or images. 
                      Perfect for assignments, letters, notes, and creative projects.
                    </p>
                    <ul className="space-y-2">
                      {['47+ handwriting fonts across 6 categories', '21 paper layouts with custom uploads', 'Multi-format export (PDF, PNG, ZIP)', 'Auto-save with 50-level undo/redo'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl border p-8 hover:shadow-xl transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mb-5 group-hover:from-accent/30 group-hover:to-primary/20 transition-all">
                      <FileText className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-display text-xl text-foreground mb-3">Slide Maker</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Create professional presentations with AI-powered text generation. 
                      Drag-and-drop slide editing, multiple layouts, real-time collaboration, 
                      and export to PDF or PPTX.
                    </p>
                    <ul className="space-y-2">
                      {['8 presentation layouts and 4 themes', 'Drag-and-drop slide reordering', 'Real-time collaborative editing', 'Export to PDF, PPTX, and more'].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
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
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">Comprehensive tools for document and presentation creation</p>
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
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">How DeckAI Works</h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">Simple workflow from creation to export</p>
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
                    DeckAI runs entirely in your browser. Your documents, API keys, and uploaded images 
                    stay on your device — stored only in localStorage. We don't upload your content to any 
                    server. AI text regeneration uses the Gemini API directly from your browser using your 
                    own API key, or our managed proxy key.
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
                  { q: 'Is DeckAI free to use?', a: 'Yes, DeckAI is completely free to use. You can create handwritten documents and presentations without any cost. The AI text generation uses a shared API key or your own Gemini API key.' },
                  { q: 'Do I need an internet connection?', a: 'Yes, an internet connection is required for loading fonts from Google Fonts and for AI text generation features. The core editing functionality may work offline for previously loaded assets.' },
                  { q: 'Where are my documents saved?', a: 'All documents are saved locally in your browser\'s localStorage. Nothing is uploaded to any server. You can export your work as PDF or images for permanent storage.' },
                  { q: 'Can I use my own handwriting font?', a: 'Currently DeckAI offers 47+ professionally designed handwriting fonts. Custom font upload is not supported, but you can upload custom paper backgrounds for your pages.' },
                  { q: 'What export formats are supported?', a: 'You can export as PDF, PNG (individual or ZIP batch), JPG, and PPTX. The Handwriting Wizard supports PDF and image exports, while Slide Maker supports PDF and PPTX.' },
                  { q: 'Can I collaborate with others?', a: 'The Slide Maker supports real-time collaborative editing with presence indicators. The Handwriting Wizard is currently single-user focused.' },
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
                  <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Start Creating Today</h2>
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
                <p>DeckAI — AI-Powered Document & Presentation Creation Platform. Built with React, TypeScript, and love.</p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
