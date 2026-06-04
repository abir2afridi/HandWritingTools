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
    <div className="p-6 pt-4 space-y-6">
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

      <div className="flex items-center justify-between pt-5 mt-4 border-t border-border/10">
        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors group/toggle">
          <input
            type="checkbox"
            className="accent-primary w-3.5 h-3.5 rounded-sm cursor-pointer"
            checked={applyLayoutToAll}
            onChange={(e) => onApplyLayoutToAllChange(e.target.checked)}
          />
          <span className="group-hover/toggle:text-primary transition-colors">Apply to All Pages</span>
        </label>
      </div>
    </div>
  );
}
