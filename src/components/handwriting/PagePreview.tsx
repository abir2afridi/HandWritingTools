import React, { memo, forwardRef } from 'react';
import { PageConfig, HANDWRITING_STYLES, INK_COLORS, PAGE_LAYOUTS, PAGE_SIZES } from '@/lib/handwriting/types';
import { HandwritingRenderer } from './HandwritingRenderer';
import { cn } from '@/lib/utils';

interface PagePreviewProps {
  page: PageConfig;
  showMargin: boolean;
  showPageNumber: boolean;
  inkSmudge: boolean;
  customPaperUrl?: string;
  customPaperOpacity?: number;
  scale?: number;
  showGuidelines?: boolean;
  onImageUpdate?: (sectionId: string, imageIndex: number, updates: { x: number, y: number }) => void;
  previewColor?: string;
}

export const PagePreview = memo(forwardRef<HTMLDivElement, PagePreviewProps>(
  ({ page, showMargin, showPageNumber, inkSmudge, customPaperUrl, customPaperOpacity = 100, scale = 1, showGuidelines = false, onImageUpdate, previewColor }, ref) => {
    const layout = PAGE_LAYOUTS.find(l => l.id === page.layoutId) || PAGE_LAYOUTS[0];
    const size = PAGE_SIZES.find(s => s.id === page.sizeId) || PAGE_SIZES[0];

    const margins = page.margins || { top: 20, bottom: 20, left: 20, right: 20 };
    const widthPx = size.width * 2.5;
    const heightPx = size.height * 2.5;

    const isCustom = page.layoutId === 'custom';
    const hasPaperImage = !!layout.paperImage;
    const bgImage = isCustom && customPaperUrl ? customPaperUrl : layout.paperImage;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-sm",
          !isCustom && layout.paperClass,
          showMargin && "paper-margin"
        )}
        style={{
          width: widthPx * scale,
          height: heightPx * scale,
          paddingTop: `${margins.top * 2.5 * scale}px`,
          paddingBottom: `${margins.bottom * 2.5 * scale}px`,
          paddingLeft: `${margins.left * 2.5 * scale}px`,
          paddingRight: `${margins.right * 2.5 * scale}px`,
          fontSize: `${14 * scale}px`,
          lineHeight: `${32 * scale}px`,
          contain: 'layout style',
        }}
      >
        {bgImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: (isCustom ? customPaperOpacity : 100) / 100,
            }}
          />
        )}
        {page.sections.map((section) => {
          const color = INK_COLORS.find(c => c.id === section.colorId);
          const colorValue = section.colorId?.startsWith('#') ? section.colorId : section.customColor || color?.value || '#1c2526';

          return (
            <div key={section.id}>
              {/* Image in section */}
              {section.imageUrl && (
                <div style={{ padding: `${4 * scale}px 0` }}>
                  <img
                    src={section.imageUrl}
                    alt="Diagram"
                    style={{
                      maxWidth: '100%',
                      maxHeight: `${120 * scale}px`,
                      objectFit: 'contain',
                      borderRadius: `${4 * scale}px`,
                    }}
                  />
                </div>
              )}

              {/* Positionable Diagrams - DRAGGABLE */}
              {section.images?.map((img, imgIdx) => {
                let startX = 0, startY = 0;
                return (
                  <div
                    key={`${section.id}-${imgIdx}`}
                    className="absolute cursor-move active:cursor-grabbing hover:ring-2 hover:ring-primary/40 rounded-sm transition-shadow group"
                    style={{
                      left: img.x * scale,
                      top: img.y * scale,
                      width: img.width * scale,
                      height: img.height * scale,
                      zIndex: 50,
                    }}
                    onMouseDown={(e) => {
                      startX = e.clientX;
                      startY = e.clientY;
                      const onMove = (ev: MouseEvent) => {
                        const dx = ev.clientX - startX;
                        const dy = ev.clientY - startY;
                        (e.target as HTMLElement).style.left = `${img.x * scale + dx}px`;
                        (e.target as HTMLElement).style.top = `${img.y * scale + dy}px`;
                      };
                      const onUp = (ev: MouseEvent) => {
                        document.removeEventListener('mousemove', onMove);
                        document.removeEventListener('mouseup', onUp);
                        if (onImageUpdate) {
                          onImageUpdate(section.id, imgIdx, {
                            x: img.x + (ev.clientX - startX) / scale,
                            y: img.y + (ev.clientY - startY) / scale,
                          });
                        }
                      };
                      document.addEventListener('mousemove', onMove);
                      document.addEventListener('mouseup', onUp);
                    }}
                  >
                    <img
                      src={img.url}
                      alt={`Diagram ${imgIdx + 1}`}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                      Drag to move
                    </div>
                  </div>
                );
              })}

              {section.type === 'typed' ? (
                <div
                  className="font-body"
                  style={{
                    color: colorValue,
                    fontSize: section.isHeading ? `${(section.headingLevel === 1 ? 22 : section.headingLevel === 2 ? 18 : 16) * scale}px` : undefined,
                    fontWeight: section.isHeading ? 700 : 400,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {section.content || '\u00A0'}
                </div>
              ) : (
                <HandwritingRenderer
                  section={section}
                  scale={scale}
                  inkSmudge={inkSmudge}
                  previewColor={previewColor}
                />
              )}
            </div>
          );
        })}

        {showGuidelines && (
          <div 
            className="absolute inset-x-0 inset-y-0 pointer-events-none z-[100]"
            style={{
              paddingTop: `${margins.top * 2.5 * scale}px`,
              paddingBottom: `${margins.bottom * 2.5 * scale}px`,
              paddingLeft: `${margins.left * 2.5 * scale}px`,
              paddingRight: `${margins.right * 2.5 * scale}px`,
            }}
          >
            <div className="w-full h-full border-2 border-dashed border-primary/20 rounded-sm relative">
               <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
               <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
               <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
               <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary/40" />
            </div>
          </div>
        )}

        {showPageNumber && (
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-muted-foreground font-body"
            style={{ fontSize: `${11 * scale}px` }}
          >
            {page.pageNumber}
          </div>
        )}
      </div>
    );
  }
));

PagePreview.displayName = 'PagePreview';
