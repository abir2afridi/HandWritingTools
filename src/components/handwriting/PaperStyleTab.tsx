import { LayoutSelector } from './LayoutSelector';

interface PaperStyleTabProps {
  selectedLayoutId: string;
  showMargin: boolean;
  showPageNumbers: boolean;
  inkSmudge: boolean;
  customPaperUrl: string;
  applyLayoutToAll: boolean;
  onLayoutChange: (id: string) => void;
  onMarginChange: (v: boolean) => void;
  onPageNumbersChange: (v: boolean) => void;
  onInkSmudgeChange: (v: boolean) => void;
  onCustomPaperUpload: (url: string) => void;
  onApplyLayoutToAllChange: (v: boolean) => void;
}

export function PaperStyleTab({
  selectedLayoutId,
  showMargin,
  showPageNumbers,
  inkSmudge,
  customPaperUrl,
  applyLayoutToAll,
  onLayoutChange,
  onMarginChange,
  onPageNumbersChange,
  onInkSmudgeChange,
  onCustomPaperUpload,
  onApplyLayoutToAllChange,
}: PaperStyleTabProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-6 pt-4 pb-3 border-b border-border/10 bg-muted/30">
        <h3 className="font-display text-lg text-foreground leading-none mb-3">Paper Style</h3>
        <label className="flex items-center gap-2 cursor-pointer group/toggle">
          <input
            type="checkbox"
            className="accent-primary w-3 h-3 rounded-sm cursor-pointer"
            checked={applyLayoutToAll}
            onChange={(e) => onApplyLayoutToAllChange(e.target.checked)}
          />
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover/toggle:text-primary transition-colors">Apply to All Pages</span>
        </label>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-premium px-6 pb-6 pt-4">
        <LayoutSelector
          selectedLayoutId={selectedLayoutId}
          showMargin={showMargin}
          showPageNumbers={showPageNumbers}
          inkSmudge={inkSmudge}
          customPaperUrl={customPaperUrl}
          onLayoutChange={onLayoutChange}
          onMarginChange={onMarginChange}
          onPageNumbersChange={onPageNumbersChange}
          onInkSmudgeChange={onInkSmudgeChange}
          onCustomPaperUpload={onCustomPaperUpload}
        />
      </div>
    </div>
  );
}
