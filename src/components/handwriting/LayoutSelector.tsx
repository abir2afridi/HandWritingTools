import { PAGE_LAYOUTS } from '@/lib/handwriting/types';
import { cn } from '@/lib/utils';
import { Check, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRef } from 'react';

interface LayoutSelectorProps {
  selectedLayoutId: string;
  showMargin: boolean;
  showPageNumbers: boolean;
  inkSmudge: boolean;
  customPaperUrl: string;
  onLayoutChange: (id: string) => void;
  onMarginChange: (v: boolean) => void;
  onPageNumbersChange: (v: boolean) => void;
  onInkSmudgeChange: (v: boolean) => void;
  onCustomPaperUpload: (url: string) => void;
}

export function LayoutSelector({
  selectedLayoutId, showMargin, showPageNumbers, inkSmudge, customPaperUrl,
  onLayoutChange, onMarginChange, onPageNumbersChange, onInkSmudgeChange, onCustomPaperUpload,
}: LayoutSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomPaperSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onCustomPaperUpload(dataUrl);
      onLayoutChange('custom');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/svg+xml,image/avif"
        className="hidden"
        onChange={handleFileChange}
      />

      <div>
        <h3 className="font-display text-lg text-foreground mb-3">Paper Style</h3>
        <div className="grid grid-cols-2 gap-4">
          {PAGE_LAYOUTS.map((layout, idx) => {
            const isCustom = layout.id === 'custom';
            return (
              <button
                key={layout.id}
                onClick={() => isCustom ? handleCustomPaperSelect() : onLayoutChange(layout.id)}
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-xl border transition-all h-full",
                  selectedLayoutId === layout.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                    : "border-border hover:border-primary/40 bg-card hover:shadow-md"
                )}
              >
                <span className="absolute top-2 left-2 text-[9px] font-black text-muted-foreground/20 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className={cn(
                  "w-full aspect-[4/3] rounded-lg mb-3 shadow-inner border border-black/5 flex items-center justify-center overflow-hidden",
                  isCustom ? 'bg-muted/40' : '',
                  (!isCustom && (layout.paperClass.includes('bg-') || ['aged', 'blueprint', 'legal-pad', 'dark-grid', 'blackboard', 'parchment', 'realistic-white'].includes(layout.id))) ? '' : 'bg-paper-white',
                  !isCustom && layout.paperClass
                )}>
                  {isCustom ? (
                    customPaperUrl ? (
                      <img src={customPaperUrl} alt="Custom paper" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                        <Upload className="h-6 w-6" />
                        <span className="text-[9px] font-semibold">JPG, PNG, SVG, AVIF</span>
                      </div>
                    )
                  ) : null}
                </div>
                <span className="text-xs font-medium text-foreground">{layout.name}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{layout.description}</span>
                {selectedLayoutId === layout.id && (
                  <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg text-foreground">Options</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="margin" className="text-foreground">Show Margin</Label>
            <Switch id="margin" checked={showMargin} onCheckedChange={onMarginChange} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pagenum" className="text-foreground">Page Numbers</Label>
            <Switch id="pagenum" checked={showPageNumbers} onCheckedChange={onPageNumbersChange} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smudge" className="text-foreground">Ink Smudge Effect</Label>
            <Switch id="smudge" checked={inkSmudge} onCheckedChange={onInkSmudgeChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
