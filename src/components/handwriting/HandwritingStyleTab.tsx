import { StyleSelector } from './StyleSelector';

interface HandwritingStyleTabProps {
  globalStyleId: string;
  globalColorId: string;
  onStyleChange: (id: string) => void;
  onColorChange: (id: string) => void;
  applyStyleToAll: boolean;
  onApplyStyleToAllChange: (v: boolean) => void;
}

export function HandwritingStyleTab({
  globalStyleId,
  globalColorId,
  onStyleChange,
  onColorChange,
  applyStyleToAll,
  onApplyStyleToAllChange,
}: HandwritingStyleTabProps) {
  return (
    <div className="p-6 pt-4 space-y-6">
      <StyleSelector
        selectedStyleId={globalStyleId}
        selectedColorId={globalColorId}
        onStyleChange={onStyleChange}
        onColorChange={onColorChange}
      />
      <div className="flex items-center justify-between pt-5 mt-6 border-t border-border/10">
        <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors group/toggle">
          <input
            type="checkbox"
            className="accent-primary w-3.5 h-3.5 rounded-sm cursor-pointer"
            checked={applyStyleToAll}
            onChange={(e) => onApplyStyleToAllChange(e.target.checked)}
          />
          <span className="group-hover/toggle:text-primary transition-colors">Apply to All Pages</span>
        </label>
      </div>
    </div>
  );
}
