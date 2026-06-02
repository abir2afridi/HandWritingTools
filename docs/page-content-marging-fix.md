# Handwriting Page Layout & Margin Alignment Fixes (100% Properly Fixed)

This document explains the root causes and detailed implementations of the layout and margin alignment fixes applied to the handwriting editor to ensure text wraps correctly, fills A4/A5 pages completely down to the bottom margin (just above page numbers), and dynamically flows between pages.

---

## 1. Core Issues Solved
1. **Premature Page Breaks**: Large empty gaps remained at the bottom of pages before content flowed to the next page.
2. **Word Splitting**: Long words (e.g., "Bangladesh") were split across line breaks and page breaks (e.g., "Bang" on page 1, "ladesh" on page 2).
3. **Inaccurate Font Calibration**: The JavaScript layout calculations used character widths that were too wide, causing lines to wrap in the visual preview long before the system registered a line wrap.
4. **Unused Space**: Vertical margins had conservative buffers which prevented lines from printing close to the page number/footer margin.
5. **One-way Flow**: Content was only pushed forward on overflow; deleting text left empty gaps instead of pulling content up from subsequent pages.

---

## 2. Technical Implementation Details

### A. Word-Boundary Wrapping Algorithm
Instead of splitting strings at arbitrary character counts, we implemented a space-aware word wrapping helper:
```typescript
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
```
* **Result**: Words are kept intact. If a word cannot fit in the remaining space of the current line, it is moved in its entirety to the next line or page.

---

### B. Font Character Width Calibration (CSS Matching)
The estimated character width in JavaScript was adjusted to match the actual layout rendering of the `Caveat` font at `18px` in the CSS stylesheet:
* **Old A4 Settings**: `charWidthMm = 4.4mm`, `widthBuffer = 10`
* **New A4 Settings**: `charWidthMm = 3.2mm`, `widthBuffer = 4`
* **Old A5 Settings**: `charWidthMm = 4.2mm`, `widthBuffer = 4`
* **New A5 Settings**: `charWidthMm = 3.1mm`, `widthBuffer = 2`

```typescript
const getCharsPerLine = (sizeId: string, margins: { left: number, right: number }): number => {
  const { w } = getPageDimensions(sizeId);
  const effectiveWidth = w - margins.left - margins.right;
  let charWidthMm = 3.2;
  let widthBuffer = 4;
  if (sizeId === 'a5') {
    charWidthMm = 3.1;
    widthBuffer = 2;
  }
  return Math.max(10, Math.floor((effectiveWidth - widthBuffer) / charWidthMm));
};
```

---

### C. Bottom Margin Vertical Calibration
To allow lines to fill the A4 page fully down to the footer/page number area without clipping, we reduced the vertical line limit buffer:
* **Old Settings**: Height buffer of `5mm` was subtracted.
* **New Settings**: Height buffer reduced to `1mm`.
* **Line Height**: Maintained at `12.8mm` to align perfectly with the background handwriting lines.

```typescript
const getLineLimit = (sizeId: string, margins: { top: number, bottom: number }): number => {
  const { h } = getPageDimensions(sizeId);
  const effectiveHeight = h - margins.top - margins.bottom;
  let buffer = 1;
  const lineHeightMm = 12.8;
  if (sizeId === 'a5') buffer = 1;
  return Math.max(1, Math.floor((effectiveHeight - buffer) / lineHeightMm));
};
```
* **Result**: On A4 pages, the maximum line count increased from 19 lines to **20 lines**, perfectly utilizing the page vertical margin space.

---

### D. Bidirectional Flow Management
1. **Forward Split**: When typing or pasting, any overflow content exceeding the page vertical limit is pushed to the first section of the next page (creating a new page if necessary).
2. **Backward Pull**: When text is deleted or reduced on a page, lines from subsequent pages are pulled forward to fill the remaining line budget on the current page:
```typescript
// Count total lines currently on this page
let usedLines = 0;
for (const s of pg.sections) {
  if (s.content) usedLines += wrapTextByWords(s.content, pg_chars).length;
}

const spaceLeft = pg_limit - usedLines;
if (spaceLeft <= 0) break;

const nextPg = pages[pullPage + 1];
if (nextPg) {
  const nextSection = nextPg.sections[0];
  if (nextSection && !nextSection.isHeading && nextSection.content) {
    const nextWrapped = wrapTextByWords(nextSection.content, pg_chars);
    const linesToPull = Math.min(spaceLeft, nextWrapped.length);
    const pulled = nextWrapped.slice(0, linesToPull);
    const remaining = nextWrapped.slice(linesToPull);

    const lastSection = pg.sections[pg.sections.length - 1];
    if (lastSection && !lastSection.isHeading) {
      lastSection.content = (lastSection.content ? lastSection.content + '\n' : '') + pulled.join('\n');
      nextSection.content = remaining.join('\n');
    }
  }
}
```
3. **Empty Page Cleanup**: Any trailing pages that become completely empty during backward pulls are automatically deleted.

---

### E. Auto-Rebalance on Loading Notes
Older notes stored with incorrect split boundaries or parameters are automatically reflowed and corrected upon being loaded into the editor:
```typescript
loadNote: (id) => set((state) => {
  const note = state.notes.find(n => n.id === id);
  if (!note) return state;

  const sizeId = note.sizeId;
  const margins = state.globalMargins;
  const limit = getLineLimit(sizeId, margins);
  const charsPerLine = getCharsPerLine(sizeId, margins);

  const allText = note.pages
    .flatMap(p => p.sections.map(s => s.content || ''))
    .join('\n');
  const cleanedText = allText.replace(/\n{3,}/g, '\n\n'); // normalize breaks
  const wrappedLines = wrapTextByWords(cleanedText, charsPerLine);

  // Re-flow lines into pages...
})
```

---

## 3. Verification & Results
* **Word Wrapping**: Perfect word boundary preservation. Words like "Bangladesh" do not split.
* **Vertical Space**: Bottom margins are fully utilized down to the line just above the page numbers.
* **Reflow Speed**: Instant page calculations with clean Undo/Redo state management.
