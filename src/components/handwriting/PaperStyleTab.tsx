import { LayoutSelector } from './LayoutSelector';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Scissors, RotateCcw } from 'lucide-react';

interface PaperStyleTabProps {
  selectedLayoutId: string;
  selectedSizeId: string;
  showMargin: boolean;
  showPageNumbers: boolean;
  inkSmudge: boolean;
  globalMargins: { top: number; bottom: number; left: number; right: number };
  applyLayoutToAll: boolean;
  onLayoutChange: (id: string) => void;
  onSizeChange: (id: string) => void;
  onMarginChange: (v: boolean) => void;
  onPageNumbersChange: (v: boolean) => void;
  onInkSmudgeChange: (v: boolean) => void;
  onGlobalMarginsChange: (m: Partial<{ top: number; bottom: number; left: number; right: number }>) => void;
  onResetMargins: () => void;
  onApplyLayoutToAllChange: (v: boolean) => void;
  onStartMarginEdit: () => void;
  onStopMarginEdit: () => void;
}

export function PaperStyleTab({
  selectedLayoutId,
  selectedSizeId,
  showMargin,
  showPageNumbers,
  inkSmudge,
  globalMargins,
  applyLayoutToAll,
  onLayoutChange,
  onSizeChange,
  onMarginChange,
  onPageNumbersChange,
  onInkSmudgeChange,
  onGlobalMarginsChange,
  onResetMargins,
  onApplyLayoutToAllChange,
  onStartMarginEdit,
  onStopMarginEdit,
}: PaperStyleTabProps) {
  return (
    <div className="p-6 pt-4 space-y-10">
      <LayoutSelector
        selectedLayoutId={selectedLayoutId}
        selectedSizeId={selectedSizeId}
        showMargin={showMargin}
        showPageNumbers={showPageNumbers}
        inkSmudge={inkSmudge}
        isSizeChangeDisabled={true}
        onLayoutChange={onLayoutChange}
        onSizeChange={onSizeChange}
        onMarginChange={onMarginChange}
        onPageNumbersChange={onPageNumbersChange}
        onInkSmudgeChange={onInkSmudgeChange}
      />

      <div
        className="pt-6 border-t border-border/10"
        onMouseEnter={onStartMarginEdit}
        onMouseLeave={onStopMarginEdit}
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[9px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
            <Scissors className="h-3 w-3" /> Paper Architecture (mm)
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetMargins}
            className="h-6 px-2 text-[8px] font-black uppercase tracking-tighter opacity-40 hover:opacity-100 hover:bg-primary/5"
          >
            <RotateCcw className="h-2.5 w-2.5 mr-1" /> Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {[
            { label: 'Top', key: 'top' as const },
            { label: 'Bottom', key: 'bottom' as const },
            { label: 'Left', key: 'left' as const },
            { label: 'Right', key: 'right' as const }
          ].map((m) => (
            <div key={m.key} className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">{m.label}</span>
                <span className="text-[10px] font-black text-foreground tabular-nums">{globalMargins[m.key]}mm</span>
              </div>
              <Slider
                value={[globalMargins[m.key]]}
                onValueChange={(v) => onGlobalMarginsChange({ [m.key]: v[0] })}
                min={0}
                max={60}
                step={1}
                className="h-4"
              />
            </div>
          ))}
        </div>
      </div>

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
