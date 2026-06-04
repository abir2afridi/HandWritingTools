import { create } from 'zustand';
import { PageConfig, TextSection } from './types';

interface Snapshot {
  pages: PageConfig[];
  globalStyleId: string;
  globalColorId: string;
  globalSizeId: string;
  globalLayoutId: string;
  showMargin: boolean;
  showPageNumbers: boolean;
  globalMargins: { top: number, bottom: number, left: number, right: number };
  customPaperUrl: string;
  customPaperOpacity: number;
}

interface AppState {
  pages: PageConfig[];
  currentPageIndex: number;
  globalStyleId: string;
  globalColorId: string;
  globalSizeId: string;
  globalLayoutId: string;
  showMargin: boolean;
  showPageNumbers: boolean;
  inkSmudge: boolean;
  globalMargins: { top: number, bottom: number, left: number, right: number };
  customPaperUrl: string;
  customPaperOpacity: number;
  notes: Array<{ 
    id: string, 
    title: string, 
    lastModified: number, 
    pages: PageConfig[], 
    sizeId: string, 
    margins?: { top: number, bottom: number, left: number, right: number } 
  }>;
  activeNoteId: string | null;
  
  past: Snapshot[];
  future: Snapshot[];
  
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  updateSectionGlobally: (updates: Partial<TextSection>) => void;
  
  setGlobalMargins: (m: Partial<{ top: number, bottom: number, left: number, right: number }>, applyToAll?: boolean) => void;

  setCurrentPage: (index: number) => void;
  setGlobalStyle: (id: string, applyToAll?: boolean) => void;
  setGlobalColor: (id: string, applyToAll?: boolean) => void;
  setGlobalSize: (id: string, applyToAll?: boolean) => void;
  setGlobalLayout: (id: string, applyToAll?: boolean) => void;
  setShowMargin: (v: boolean, applyToAll?: boolean) => void;
  setShowPageNumbers: (v: boolean, applyToAll?: boolean) => void;
  setInkSmudge: (v: boolean) => void;
  setCustomPaperUrl: (url: string) => void;
  setCustomPaperOpacity: (opacity: number) => void;
  setPages: (pages: PageConfig[]) => void;
  updatePage: (index: number, page: Partial<PageConfig>) => void;
  addPage: () => void;
  removePage: (index: number) => void;
  removeAllPages: () => void;
  updateSection: (pageIndex: number, sectionIndex: number, section: Partial<TextSection>) => void;
  addSection: (pageIndex: number) => void;
  removeSection: (pageIndex: number, sectionIndex: number) => void;
  setText: (text: string) => void;
  rebalancePages: () => void;
  
  // Note Management
  createNote: (sizeId: string, title: string) => void;
  loadNote: (id: string) => void;
  deleteNote: (id: string) => void;
  renameNote: (id: string, title: string) => void;
  persistActiveNote: () => void;
}

const getPageDimensions = (sizeId: string) => {
  switch (sizeId) {
    case 'a5': return { w: 148, h: 210 };
    case 'a4': return { w: 210, h: 297 };
    case 'a3': return { w: 297, h: 420 };
    case 'letter': return { w: 216, h: 279 };
    case 'legal': return { w: 216, h: 356 };
    case 'b5': return { w: 176, h: 250 };
    case 'postcard': return { w: 148, h: 105 };
    default: return { w: 210, h: 297 };
  }
};

const getLineLimit = (sizeId: string, margins: { top: number, bottom: number }): number => {
  const { h } = getPageDimensions(sizeId);
  const effectiveHeight = h - margins.top - margins.bottom;
  let buffer = 1;
  const lineHeightMm = 12.8;
  if (sizeId === 'a5') buffer = 1;
  return Math.max(1, Math.floor((effectiveHeight - buffer) / lineHeightMm));
};

const getCharsPerLine = (sizeId: string, margins: { left: number, right: number }): number => {
  const { w } = getPageDimensions(sizeId);
  const effectiveWidth = w - margins.left - margins.right;
  // charWidthMm tuned to match Caveat/handwriting font at 18px (~7.5px/char = 3.0mm)
  // Slightly conservative (3.2mm) to account for variable character widths and prevent CSS overflow-wrap
  let charWidthMm = 3.2;
  let widthBuffer = 4;
  if (sizeId === 'a5') {
    charWidthMm = 3.1;
    widthBuffer = 2;
  }
  return Math.max(10, Math.floor((effectiveWidth - widthBuffer) / charWidthMm));
};

const wrapTextByWords = (text: string, charsPerLine: number): string[] => {
  const paragraphs = text.split('\n');
  const wrappedLines: string[] = [];

  for (const paragraph of paragraphs) {
    if (paragraph.length === 0) {
      wrappedLines.push('');
      continue;
    }

    const words = paragraph.split(' ');
    let currentLine = '';

    for (const word of words) {
      if (word.length === 0) continue;
      
      if (currentLine === '') {
        currentLine = word;
      } else if (currentLine.length + 1 + word.length <= charsPerLine) {
        currentLine += ' ' + word;
      } else {
        wrappedLines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine !== '') {
      wrappedLines.push(currentLine);
    }
  }

  return wrappedLines;
};

const createDefaultSection = (styleId: string, colorId: string): TextSection => ({
  id: crypto.randomUUID(),
  content: '',
  type: 'handwritten',
  styleId,
  colorId,
});

const createDefaultPage = (
  pageNumber: number, 
  styleId: string, 
  colorId: string, 
  sizeId: string, 
  layoutId: string,
  margins: { top: number, bottom: number, left: number, right: number }
): PageConfig => ({
  id: crypto.randomUUID(),
  sections: [createDefaultSection(styleId, colorId)],
  sizeId,
  layoutId,
  margins,
  showMargin: true,
  showPageNumber: true,
  pageNumber,
  locked: false,
});

const STORAGE_KEY = 'handwriting-notes';

const loadNotesFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

const getSnapshot = (state: AppState) => ({
  pages: JSON.parse(JSON.stringify(state.pages)),
  globalStyleId: state.globalStyleId,
  globalColorId: state.globalColorId,
  globalSizeId: state.globalSizeId,
  globalLayoutId: state.globalLayoutId,
  showMargin: state.showMargin,
  showPageNumbers: state.showPageNumbers,
  globalMargins: { ...state.globalMargins },
  customPaperUrl: state.customPaperUrl,
  customPaperOpacity: state.customPaperOpacity,
});

export const useAppStore = create<AppState>((set, get) => ({
  pages: [],
  currentPageIndex: 0,
  globalStyleId: 'caveat',
  globalColorId: 'blue',
  globalSizeId: 'a4',
  globalLayoutId: 'ruled',
  showMargin: true,
  showPageNumbers: true,
  inkSmudge: false,
  customPaperUrl: '',
  customPaperOpacity: 100,
  globalMargins: { top: 20, bottom: 20, left: 20, right: 20 },
  notes: loadNotesFromStorage(),
  activeNoteId: null,
  past: [],
  future: [],

  saveHistory: () => {
    const snapshot = getSnapshot(get());
    set((state) => ({
      past: [...state.past.slice(-50), snapshot],
      future: []
    }));
  },

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    const current = getSnapshot(state);
    return {
      ...previous,
      past: newPast,
      future: [current, ...state.future]
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    const current = getSnapshot(state);
    return {
      ...next,
      past: [...state.past, current],
      future: newFuture
    };
  }),

  setGlobalMargins: (m, applyToAll = true) => {
    get().saveHistory();
    set((state) => {
      const newMargins = { ...state.globalMargins, ...m };
      return { 
        globalMargins: applyToAll ? newMargins : state.globalMargins,
        pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? { ...p, margins: { ...(p.margins || state.globalMargins), ...m } } : p)
      };
    });
  },

  setCurrentPage: (index) => set({ currentPageIndex: index }),
  
  setGlobalStyle: (id, applyToAll = true) => {
    get().saveHistory();
    set((state) => ({
      globalStyleId: applyToAll ? id : state.globalStyleId,
      pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? {
        ...p,
        sections: p.sections.map(s => ({ ...s, styleId: id })),
      } : p),
    }));
  },

  setGlobalColor: (id, applyToAll = true) => {
    get().saveHistory();
    set((state) => ({
      globalColorId: applyToAll ? id : state.globalColorId,
      pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? {
        ...p,
        sections: p.sections.map(s => ({ ...s, colorId: id })),
      } : p),
    }));
  },

  setGlobalSize: (id, applyToAll = true) => {
    get().saveHistory();
    set((state) => {
      const sizeId = applyToAll ? id : state.globalSizeId;
      const pages = JSON.parse(JSON.stringify(state.pages));
      
      // Update sizes on pages
      pages.forEach((p: PageConfig, idx: number) => {
        if (applyToAll || idx === state.currentPageIndex) {
          p.sizeId = sizeId;
        }
      });
      
      // Now, flow text across pages starting from page 0
      let currentPage = 0;
      while (currentPage < pages.length) {
        const page = pages[currentPage];
        const limit = getLineLimit(page.sizeId, page.margins || state.globalMargins);
        const charsPerLine = getCharsPerLine(page.sizeId, page.margins || state.globalMargins);
        
        let linesUsed = 0;
        let sIdx = 0;
        
        while (sIdx < page.sections.length) {
          const section = page.sections[sIdx];
          if (section.isHeading || !section.content) {
            sIdx++;
            continue;
          }
          
          const wrappedLines = wrapTextByWords(section.content, charsPerLine);
          const availableLines = Math.max(0, limit - linesUsed);
          
          if (wrappedLines.length > availableLines) {
            // Split the section content
            const mainContentLines = wrappedLines.slice(0, availableLines);
            const overflowLines = wrappedLines.slice(availableLines);
            
            section.content = mainContentLines.join('\n');
            const overflowText = overflowLines.join('\n');
            
            // Flow overflow to the next page
            if (currentPage < pages.length - 1) {
              const nextFirstSection = pages[currentPage + 1].sections[0];
              nextFirstSection.content = overflowText + (nextFirstSection.content ? '\n' + nextFirstSection.content : '');
            } else {
              const newPage = createDefaultPage(
                pages.length + 1,
                state.globalStyleId,
                state.globalColorId,
                page.sizeId,
                state.globalLayoutId,
                state.globalMargins
              );
              newPage.sections[0].content = overflowText;
              pages.push(newPage);
            }
          }
          
          // Re-wrap to see how many lines this section actually uses now
          const activeLines = wrapTextByWords(section.content, charsPerLine).length;
          linesUsed += activeLines;
          sIdx++;
        }
        
        currentPage++;
      }
      
      // Clean up empty pages at the end (except the first page)
      let lastIdx = pages.length - 1;
      while (lastIdx > 0) {
        const p = pages[lastIdx];
        const hasContent = p.sections.some((s: TextSection) => 
          (s.content && s.content.trim().length > 0) || 
          (s.images && s.images.length > 0) || 
          s.imageUrl
        );
        if (!hasContent) {
          pages.pop();
          lastIdx--;
        } else {
          break;
        }
      }
      
      // Update page numbers
      pages.forEach((p: PageConfig, idx: number) => {
        p.pageNumber = idx + 1;
      });
      
      return { 
        globalSizeId: applyToAll ? id : state.globalSizeId, 
        pages, 
        currentPageIndex: Math.min(state.currentPageIndex, pages.length - 1) 
      };
    });
  },

  setGlobalLayout: (id, applyToAll = true) => {
    get().saveHistory();
    set((state) => ({ 
      globalLayoutId: applyToAll ? id : state.globalLayoutId,
      showMargin: id === 'plain' ? false : (applyToAll ? state.showMargin : state.showMargin),
      pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? ({ 
        ...p, 
        layoutId: id,
        showMargin: id === 'plain' ? false : (applyToAll ? p.showMargin : p.showMargin)
      }) : p)
    }));
  },

  setShowMargin: (v, applyToAll = true) => {
    get().saveHistory();
    set((state) => ({ 
      showMargin: applyToAll ? v : state.showMargin,
      pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? ({ ...p, showMargin: v }) : p)
    }));
  },

  setShowPageNumbers: (v, applyToAll = true) => {
    get().saveHistory();
    set((state) => ({ 
      showPageNumbers: applyToAll ? v : state.showPageNumbers,
      pages: state.pages.map((p, i) => (applyToAll || i === state.currentPageIndex) ? ({ ...p, showPageNumber: v }) : p)
    }));
  },

  setInkSmudge: (v) => set({ inkSmudge: v }),

  setCustomPaperUrl: (url) => set({ customPaperUrl: url }),

  setCustomPaperOpacity: (opacity) => set({ customPaperOpacity: opacity }),

  setPages: (pages) => {
    get().saveHistory();
    set({ pages });
  },

  updatePage: (index, partial) => {
    get().saveHistory();
    set((state) => {
      const pages = [...state.pages];
      pages[index] = { ...pages[index], ...partial };
      return { pages };
    });
  },

  addPage: () => {
    get().saveHistory();
    set((state) => {
      const newPage = createDefaultPage(
        state.pages.length + 1,
        state.globalStyleId,
        state.globalColorId,
        state.globalSizeId,
        state.globalLayoutId,
        state.globalMargins
      );
      return { pages: [...state.pages, newPage] };
    });
  },

  removePage: (index) => {
    get().saveHistory();
    set((state) => {
      if (state.pages.length <= 1) return state;
      const pages = state.pages.filter((_, i) => i !== index).map((p, i) => ({ ...p, pageNumber: i + 1 }));
      return { pages, currentPageIndex: Math.min(state.currentPageIndex, pages.length - 1) };
    });
  },

  removeAllPages: () => {
    get().saveHistory();
    set((state) => {
      const page = createDefaultPage(1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
      return { pages: [page], currentPageIndex: 0 };
    });
  },

  updateSection: (pageIndex, sectionIndex, partial) => {
    if ('type' in partial || 'styleId' in partial || 'colorId' in partial || 'images' in partial || 'imageUrl' in partial) {
      get().saveHistory();
    }
    set((state) => {
      const pages = JSON.parse(JSON.stringify(state.pages));
      if (!pages[pageIndex] || !pages[pageIndex].sections[sectionIndex]) return state;
      pages[pageIndex].sections[sectionIndex] = { ...pages[pageIndex].sections[sectionIndex], ...partial };

      // --- FORWARD SPLIT: push overflow to next pages ---
      let currentPage = pageIndex;
      let currentSection = sectionIndex;
      let didSplit = false;
      while (true) {
        const section = pages[currentPage].sections[currentSection];
        if (section.isHeading || !section.content.length) break;
        const limit = getLineLimit(pages[currentPage].sizeId, pages[currentPage].margins || state.globalMargins);
        const charsPerLine = getCharsPerLine(pages[currentPage].sizeId, pages[currentPage].margins || state.globalMargins);

        const wrappedLines = wrapTextByWords(section.content, charsPerLine);
        let linesBefore = 0;
        for (let i = 0; i < currentSection; i++) {
          const prevS = pages[currentPage].sections[i];
          if (prevS.content) linesBefore += wrapTextByWords(prevS.content, charsPerLine).length;
        }

        const availableLines = Math.max(0, limit - linesBefore);
        if (wrappedLines.length > availableLines) {
          const mainContentLines = wrappedLines.slice(0, availableLines);
          const overflowLines = wrappedLines.slice(availableLines);
          pages[currentPage].sections[currentSection].content = mainContentLines.join('\n');
          const overflowText = overflowLines.join('\n');
          didSplit = true;
          if (currentPage < pages.length - 1) {
            const nextFirstSection = pages[currentPage + 1].sections[0];
            pages[currentPage + 1].sections[0].content = overflowText + (nextFirstSection.content ? '\n' + nextFirstSection.content : '');
            currentPage++;
            currentSection = 0;
          } else {
            const newPage = createDefaultPage(pages.length + 1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
            newPage.sections[0].content = overflowText;
            pages.push(newPage);
            currentPage++;
            currentSection = 0;
          }
        } else {
          break;
        }
      }

      // --- BACKWARD PULL: fill space from subsequent pages ---
      // When content is removed/reduced, pull forward from later pages to fill gaps
      if ('content' in partial) {
        for (let pullPage = pageIndex; pullPage < pages.length - 1; pullPage++) {
          const pg = pages[pullPage];
          const pg_limit = getLineLimit(pg.sizeId, pg.margins || state.globalMargins);
          const pg_chars = getCharsPerLine(pg.sizeId, pg.margins || state.globalMargins);

          // Count total lines currently on this page
          let usedLines = 0;
          for (const s of pg.sections) {
            if (s.content) usedLines += wrapTextByWords(s.content, pg_chars).length;
          }

          const spaceLeft = pg_limit - usedLines;
          if (spaceLeft <= 0) break; // This page is full, stop pulling

          const nextPg = pages[pullPage + 1];
          if (!nextPg) break;
          const nextSection = nextPg.sections[0];
          if (!nextSection || nextSection.isHeading || !nextSection.content) continue;

          const nextWrapped = wrapTextByWords(nextSection.content, pg_chars);
          if (nextWrapped.length === 0) continue;

          const linesToPull = Math.min(spaceLeft, nextWrapped.length);
          const pulled = nextWrapped.slice(0, linesToPull);
          const remaining = nextWrapped.slice(linesToPull);

          // Append pulled content to the last non-heading section of current page
          const lastSection = pg.sections[pg.sections.length - 1];
          if (lastSection && !lastSection.isHeading) {
            lastSection.content = (lastSection.content ? lastSection.content + '\n' : '') + pulled.join('\n');
            nextSection.content = remaining.join('\n');
          }
        }

        // Remove pages that are now empty (keep at least page 1)
        const cleaned = pages.filter((p: PageConfig, i: number) =>
          i === 0 ||
          p.sections.some((s: TextSection) => (s.content && s.content.trim().length > 0) || (s.images && s.images.length > 0) || s.imageUrl)
        );
        cleaned.forEach((p: PageConfig, i: number) => { p.pageNumber = i + 1; });
        return {
          pages: cleaned,
          currentPageIndex: Math.min(state.currentPageIndex, cleaned.length - 1)
        };
      }

      return { pages, currentPageIndex: didSplit ? pages.length - 1 : state.currentPageIndex };
    });
  },

  updateSectionGlobally: (partial) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(p => ({
        ...p,
        sections: p.sections.map(s => ({ ...s, ...partial }))
      }))
    }));
  },

  addSection: (pageIndex) => {
    get().saveHistory();
    set((state) => {
      const pages = [...state.pages];
      const newSection = createDefaultSection(state.globalStyleId, state.globalColorId);
      pages[pageIndex] = { ...pages[pageIndex], sections: [...pages[pageIndex].sections, newSection] };
      return { pages };
    });
  },

  removeSection: (pageIndex, sectionIndex) => {
    get().saveHistory();
    set((state) => {
      const pages = [...state.pages];
      if (pages[pageIndex].sections.length <= 1) return state;
      pages[pageIndex] = {
        ...pages[pageIndex],
        sections: pages[pageIndex].sections.filter((_, i) => i !== sectionIndex),
      };
      return { pages };
    });
  },

  setText: (text) => {
    get().saveHistory();
    set((state) => {
      const limit = getLineLimit(state.globalSizeId, state.globalMargins);
      const charsPerLine = getCharsPerLine(state.globalSizeId, state.globalMargins);
      const wrappedLines = wrapTextByWords(text, charsPerLine);
      const pages: PageConfig[] = [];
      let currentPageLines: string[] = [];
      for (const line of wrappedLines) {
        if (currentPageLines.length >= limit) {
          const page = createDefaultPage(pages.length + 1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
          page.sections[0].content = currentPageLines.join('\n');
          pages.push(page);
          currentPageLines = [line];
        } else {
          currentPageLines.push(line);
        }
      }
      if (currentPageLines.length > 0 || pages.length === 0) {
        const page = createDefaultPage(pages.length + 1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
        page.sections[0].content = currentPageLines.join('\n');
        pages.push(page);
      }
      return { pages, currentPageIndex: 0 };
    });
  },

  rebalancePages: () => {
    get().saveHistory();
    set((state) => {
      const allText = state.pages.flatMap(p => p.sections.map(s => s.content)).join('\n');
      const limit = getLineLimit(state.globalSizeId, state.globalMargins);
      const charsPerLine = getCharsPerLine(state.globalSizeId, state.globalMargins);
      const wrappedLines = wrapTextByWords(allText, charsPerLine);
      const newPages: PageConfig[] = [];
      let currentPageLines: string[] = [];
      for (const line of wrappedLines) {
        if (currentPageLines.length >= limit) {
          const page = createDefaultPage(newPages.length + 1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
          page.sections[0].content = currentPageLines.join('\n');
          newPages.push(page);
          currentPageLines = [line];
        } else {
          currentPageLines.push(line);
        }
      }
      if (currentPageLines.length > 0 || newPages.length === 0) {
        const page = createDefaultPage(newPages.length + 1, state.globalStyleId, state.globalColorId, state.globalSizeId, state.globalLayoutId, state.globalMargins);
        page.sections[0].content = currentPageLines.join('\n');
        newPages.push(page);
      }
      return { pages: newPages, currentPageIndex: 0 };
    });
  },

  persistActiveNote: () => {
    const { activeNoteId, pages, notes, globalSizeId } = get();
    if (!activeNoteId) return;
    const updatedNotes = notes.map(n => n.id === activeNoteId ? { ...n, pages, sizeId: globalSizeId, lastModified: Date.now() } : n);
    set({ notes: updatedNotes });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  },

  createNote: (sizeId, title) => set((state) => {
    const newNote = {
      id: crypto.randomUUID(),
      title,
      sizeId,
      lastModified: Date.now(),
      pages: [createDefaultPage(1, state.globalStyleId, state.globalColorId, sizeId, state.globalLayoutId, state.globalMargins)]
    };
    const updatedNotes = [newNote, ...state.notes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    return {
      notes: updatedNotes,
      activeNoteId: newNote.id,
      pages: newNote.pages,
      globalSizeId: sizeId,
      currentPageIndex: 0,
      past: [],
      future: []
    };
  }),

  loadNote: (id) => set((state) => {
    const note = state.notes.find(n => n.id === id);
    if (!note) return state;

    // Auto-rebalance on load: re-flow all content with current parameters
    // This fixes old notes that were stored with different charWidth/lineLimit params
    const sizeId = note.sizeId;
    const margins = state.globalMargins;
    const limit = getLineLimit(sizeId, margins);
    const charsPerLine = getCharsPerLine(sizeId, margins);

    // Collect all text from all sections across all pages
    const allText = note.pages
      .flatMap(p => p.sections.map(s => s.content || ''))
      .join('\n');
    // Remove consecutive blank lines (more than 2 blank lines → trim to 2)
    const cleanedText = allText.replace(/\n{3,}/g, '\n\n');
    const wrappedLines = wrapTextByWords(cleanedText, charsPerLine);

    const rebalancedPages: PageConfig[] = [];
    let currentPageLines: string[] = [];
    for (const line of wrappedLines) {
      if (currentPageLines.length >= limit) {
        const page = createDefaultPage(
          rebalancedPages.length + 1,
          state.globalStyleId,
          state.globalColorId,
          sizeId,
          state.globalLayoutId,
          margins
        );
        page.sections[0].content = currentPageLines.join('\n');
        rebalancedPages.push(page);
        currentPageLines = [line];
      } else {
        currentPageLines.push(line);
      }
    }
    if (currentPageLines.length > 0 || rebalancedPages.length === 0) {
      const page = createDefaultPage(
        rebalancedPages.length + 1,
        state.globalStyleId,
        state.globalColorId,
        sizeId,
        state.globalLayoutId,
        margins
      );
      page.sections[0].content = currentPageLines.join('\n');
      rebalancedPages.push(page);
    }

    return {
      activeNoteId: id,
      pages: rebalancedPages,
      globalSizeId: sizeId,
      currentPageIndex: 0,
      past: [],
      future: []
    };
  }),

  deleteNote: (id) => set((state) => {
    const updatedNotes = state.notes.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    return {
      notes: updatedNotes,
      activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
      pages: state.activeNoteId === id ? [] : state.pages
    };
  }),

  renameNote: (id, title) => set((state) => {
    const updatedNotes = state.notes.map(n => n.id === id ? { ...n, title } : n);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    return { notes: updatedNotes };
  }),
}));
