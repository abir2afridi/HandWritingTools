export interface HandwritingStyle {
  id: string;
  name: string;
  fontClass: string;
  description: string;
  category: 'neat' | 'casual' | 'messy' | 'cursive' | 'artistic' | 'typed';
}

export interface InkColor {
  id: string;
  name: string;
  value: string;
  cssClass: string;
}

export interface PageLayout {
  id: string;
  name: string;
  paperClass: string;
  description: string;
}

export interface PageSize {
  id: string;
  name: string;
  width: number; // mm
  height: number; // mm
}

export interface ImageConfig {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextSection {
  id: string;
  content: string;
  type: 'handwritten' | 'typed';
  styleId: string;
  colorId: string;
  customColor?: string;
  isHeading?: boolean;
  headingLevel?: 1 | 2 | 3;
  imageUrl?: string;
  images?: ImageConfig[];
  customPaperUrl?: string;
}

export interface SlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  bgColor: string;
  textColor: string;
  layout: 'title' | 'content' | 'two-column' | 'image-left' | 'image-right' | 'blank';
  imageUrl?: string;
  notes?: string;
}

export interface PageConfig {
  id: string;
  sections: TextSection[];
  sizeId: string;
  layoutId: string;
  margins: { top: number, bottom: number, left: number, right: number };
  showMargin: boolean;
  showPageNumber: boolean;
  pageNumber: number;
  locked: boolean;
}

export const HANDWRITING_STYLES: HandwritingStyle[] = [
  { id: 'caveat', name: 'Neat Student', fontClass: 'font-handwriting-caveat', description: 'Clean, readable student writing', category: 'neat' },
  { id: 'kalam', name: 'Fast Exam Writing', fontClass: 'font-handwriting-kalam', description: 'Quick exam-style penmanship', category: 'casual' },
  { id: 'indie', name: 'Slightly Messy', fontClass: 'font-handwriting-indie', description: 'Casual, slightly irregular', category: 'messy' },
  { id: 'patrick', name: 'Male Style', fontClass: 'font-handwriting-patrick', description: 'Bold, straightforward strokes', category: 'casual' },
  { id: 'dancing', name: 'Female Style', fontClass: 'font-handwriting-dancing', description: 'Elegant, flowing letters', category: 'cursive' },
  { id: 'sacramento', name: 'Cursive Elegant', fontClass: 'font-handwriting-sacramento', description: 'Beautiful connected cursive', category: 'cursive' },
  { id: 'architects', name: 'School Notebook', fontClass: 'font-handwriting-architects', description: 'Typical school notebook style', category: 'neat' },
  { id: 'shadows', name: 'Relaxed Hand', fontClass: 'font-handwriting-shadows', description: 'Laid-back, natural feel', category: 'casual' },
  { id: 'homemade', name: 'Apple Pen', fontClass: 'font-handwriting-homemade', description: 'Careful, deliberate writing', category: 'neat' },
  { id: 'nothing', name: 'Quick Notes', fontClass: 'font-handwriting-nothing', description: 'Hasty note-taking style', category: 'messy' },
  { id: 'reenie', name: 'Hurried Scrawl', fontClass: 'font-handwriting-reenie', description: 'Fast, barely legible', category: 'messy' },
  { id: 'satisfy', name: 'Cursive Flow', fontClass: 'font-handwriting-satisfy', description: 'Smooth cursive writing', category: 'cursive' },
  { id: 'rock', name: 'Rough Block', fontClass: 'font-handwriting-rock', description: 'Heavy, blocky letters', category: 'artistic' },
  { id: 'just', name: 'Tall & Narrow', fontClass: 'font-handwriting-just', description: 'Tall, compressed characters', category: 'casual' },
  { id: 'permanent', name: 'Marker Style', fontClass: 'font-handwriting-permanent', description: 'Bold marker writing', category: 'artistic' },
  { id: 'gloria', name: 'Cheerful Hand', fontClass: 'font-handwriting-gloria', description: 'Happy, rounded letters', category: 'neat' },
  { id: 'amatic', name: 'Thin & Tall', fontClass: 'font-handwriting-amatic', description: 'Narrow, condensed handwriting', category: 'artistic' },
  { id: 'coming', name: 'Fountain Pen', fontClass: 'font-handwriting-coming', description: 'Classic fountain pen feel', category: 'neat' },
  { id: 'covered', name: 'Old Letter', fontClass: 'font-handwriting-covered', description: 'Vintage letter style', category: 'cursive' },
  { id: 'crafty', name: 'Crafty Girl', fontClass: 'font-handwriting-crafty', description: 'Cute decorative hand', category: 'artistic' },
  { id: 'gochi', name: 'Notebook Doodle', fontClass: 'font-handwriting-gochi', description: 'Fun notebook scrawl', category: 'messy' },
  { id: 'handlee', name: 'Teacher Notes', fontClass: 'font-handwriting-handlee', description: 'Teacher-style annotations', category: 'neat' },
  { id: 'league', name: 'Script Formal', fontClass: 'font-handwriting-league', description: 'Formal calligraphic script', category: 'cursive' },
  { id: 'bad', name: 'Bad Handwriting', fontClass: 'font-handwriting-bad', description: 'Intentionally messy style', category: 'messy' },
  // NEW FONTS FROM 10015.IO
  { id: 'schoolbell', name: 'Schoolbell', fontClass: 'font-handwriting-schoolbell', description: 'Child-like casual print', category: 'casual' },
  { id: 'cedarville', name: 'Cedarville Cursive', fontClass: 'font-handwriting-cedarville', description: 'Natural cursive handwriting', category: 'cursive' },
  { id: 'atma', name: 'Atma', fontClass: 'font-handwriting-atma', description: 'Friendly rounded letters (Bengali)', category: 'casual' },
  { id: 'kamran', name: 'Kamran Normal', fontClass: 'font-handwriting-kamran', description: 'Arabic handwriting style', category: 'artistic' },
  { id: 'alqalam', name: 'AlQalam Taj Nastaleeq', fontClass: 'font-handwriting-alqalam', description: 'Urdu Nastaleeq calligraphy', category: 'artistic' },
  { id: 'noto-nastaliq', name: 'Noto Nastaliq Urdu', fontClass: 'font-handwriting-noto-nastaliq', description: 'Clean Urdu Nastaleeq script', category: 'artistic' },
  { id: 'nanum-pen', name: 'Nanum Pen Script', fontClass: 'font-handwriting-nanum-pen', description: 'Korean pen handwriting', category: 'neat' },
  { id: 'klee', name: 'Klee One', fontClass: 'font-handwriting-klee', description: 'Japanese pencil handwriting', category: 'neat' },
  { id: 'mashan', name: 'Ma Shan Zheng', fontClass: 'font-handwriting-mashan', description: 'Chinese brush calligraphy', category: 'artistic' },
  { id: 'itim', name: 'Itim', fontClass: 'font-handwriting-itim', description: 'Casual rounded script (Thai)', category: 'casual' },
  { id: 'mansalva', name: 'Mansalva', fontClass: 'font-handwriting-mansalva', description: 'Rough messy marker style', category: 'messy' },
  { id: 'mali', name: 'Mali', fontClass: 'font-handwriting-mali', description: 'Casual handwriting (Thai)', category: 'casual' },
  { id: 'pangolin', name: 'Pangolin', fontClass: 'font-handwriting-pangolin', description: 'Neat informal script', category: 'neat' },
  { id: 'pacifico', name: 'Pacifico', fontClass: 'font-handwriting-pacifico', description: 'Bold brush script', category: 'cursive' },
  { id: 'comic-neue', name: 'Comic Neue', fontClass: 'font-handwriting-comic-neue', description: 'Comic-style casual writing', category: 'casual' },
  { id: 'swanky', name: 'Swanky and Moo Moo', fontClass: 'font-handwriting-swanky', description: 'Thick playful letters', category: 'messy' },
  { id: 'sunshiney', name: 'Sunshiney', fontClass: 'font-handwriting-sunshiney', description: 'Bouncy cheerful script', category: 'casual' },
  { id: 'meddon', name: 'Meddon', fontClass: 'font-handwriting-meddon', description: 'Vintage italic penmanship', category: 'cursive' },
  { id: 'fondamento', name: 'Fondamento', fontClass: 'font-handwriting-fondamento', description: 'Elegant calligraphic italic', category: 'cursive' },
  { id: 'ibm-arabic', name: 'IBM Plex Sans Arabic', fontClass: 'font-handwriting-ibm-arabic', description: 'Modern Arabic sans-serif', category: 'artistic' },
  { id: 'noto-arabic', name: 'Noto Sans Arabic', fontClass: 'font-handwriting-noto-arabic', description: 'Clean Arabic sans-serif', category: 'artistic' },
  { id: 'dekko', name: 'Dekko', fontClass: 'font-handwriting-dekko', description: 'Handwritten Devanagari script', category: 'neat' },
  { id: 'dawning', name: 'Dawning of a New Day', fontClass: 'font-handwriting-dawning', description: 'Light calligraphic cursive', category: 'cursive' },
  // TYPED FONTS
  { id: 'inter', name: 'Inter (Standard)', fontClass: 'font-sans', description: 'Clean modern sans-serif', category: 'typed' },
  { id: 'roboto', name: 'Roboto Pro', fontClass: 'font-serif', description: 'Professional serif font', category: 'typed' },
  { id: 'mono', name: 'JetBrains Mono', fontClass: 'font-mono', description: 'Clean developer monospace', category: 'typed' },
  { id: 'times', name: 'Times Roman', fontClass: 'font-serif', description: 'Classic editorial style', category: 'typed' },
  { id: 'space-grotesk', name: 'Space Grotesk', fontClass: 'font-handwriting-space-grotesk', description: 'Modern geometric sans-serif', category: 'typed' },
  { id: 'manrope', name: 'Manrope', fontClass: 'font-handwriting-manrope', description: 'Clean rounded sans-serif', category: 'typed' },
];

export const INK_COLORS: InkColor[] = [
  { id: 'blue', name: 'Blue Ink', value: '#1a5276', cssClass: 'text-ink-blue' },
  { id: 'black', name: 'Black Ink', value: '#1c2526', cssClass: 'text-ink-black' },
  { id: 'red', name: 'Red Ink', value: '#922b21', cssClass: 'text-ink-red' },
  { id: 'green', name: 'Green Ink', value: '#1e6e3e', cssClass: '' },
  { id: 'purple', name: 'Purple Ink', value: '#6c3483', cssClass: '' },
  { id: 'orange', name: 'Orange Ink', value: '#c75000', cssClass: '' },
];

export const PAGE_LAYOUTS: PageLayout[] = [
  { id: 'plain', name: 'Plain White', paperClass: 'bg-paper-white', description: 'Clean white paper' },
  { id: 'realistic-white', name: 'Realistic White', paperClass: 'paper-realistic-white', description: 'Premium tactile cotton paper' },
  { id: 'ruled', name: 'Ruled Lines', paperClass: 'paper-ruled bg-paper-white', description: 'Horizontal lines like a notebook' },
  { id: 'college', name: 'College Ruled', paperClass: 'paper-college bg-paper-white', description: 'Narrow-spaced ruled lines' },
  { id: 'cream-ruled', name: 'Cream Lined', paperClass: 'paper-ruled bg-paper-cream', description: 'Warm cream lined paper' },
  { id: 'cornell', name: 'Cornell Notes', paperClass: 'paper-cornell bg-paper-white', description: 'Cornell system notebook' },
  { id: 'dotted', name: 'Dotted Grid', paperClass: 'paper-dotted bg-paper-white', description: 'Dot grid pattern' },
  { id: 'grid', name: 'Square Grid', paperClass: 'paper-grid bg-paper-white', description: 'Square grid lines' },
  { id: 'hex-grid', name: 'Hex Grid', paperClass: 'paper-hex-grid bg-paper-white', description: 'Hexagonal chemistry grid' },
  { id: 'music', name: 'Music Sheet', paperClass: 'paper-music bg-paper-white', description: 'Staff paper for musical notation' },
  { id: 'aged', name: 'Aged Paper', paperClass: 'paper-aged', description: 'Vintage yellowed paper' },
  { id: 'parchment', name: 'Vintage Parchment', paperClass: 'paper-parchment', description: 'Antique textured parchment' },
  { id: 'blueprint', name: 'Blueprint', paperClass: 'paper-blueprint', description: 'Engineering blueprint style' },
  { id: 'legal-pad', name: 'Legal Pad', paperClass: 'paper-legal', description: 'Yellow legal pad' },
  { id: 'dark-grid', name: 'Graphite Grid', paperClass: 'paper-dark-grid', description: 'Premium dark slate grid' },
  { id: 'blackboard', name: 'Blackboard', paperClass: 'paper-blackboard', description: 'Classroom green blackboard' },
  { id: 'custom', name: 'Upload Custom Paper', paperClass: 'paper-custom', description: 'Upload your own paper image' },
];

export const PAGE_SIZES: PageSize[] = [
  { id: 'a4', name: 'A4', width: 210, height: 297 },
  { id: 'a5', name: 'A5', width: 148, height: 210 },
  { id: 'a3', name: 'A3', width: 297, height: 420 },
  { id: 'letter', name: 'Letter', width: 216, height: 279 },
  { id: 'legal', name: 'Legal', width: 216, height: 356 },
  { id: 'b5', name: 'B5', width: 176, height: 250 },
  { id: 'postcard', name: 'Postcard', width: 148, height: 105 },
];
