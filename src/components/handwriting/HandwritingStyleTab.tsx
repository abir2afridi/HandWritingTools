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
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-6 pt-4 pb-3 border-b border-border/10 bg-[#fafafa] space-y-2">
        <h3 className="font-display text-lg text-foreground leading-none">Handwriting Style</h3>
        <label className="flex items-center gap-2 cursor-pointer group/toggle">
          <input
            type="checkbox"
            className="accent-primary w-3 h-3 rounded-sm cursor-pointer"
            checked={applyStyleToAll}
            onChange={(e) => onApplyStyleToAllChange(e.target.checked)}
          />
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover/toggle:text-primary transition-colors">Apply to All Pages</span>
        </label>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
        <StyleSelector
          selectedStyleId={globalStyleId}
          selectedColorId={globalColorId}
          onStyleChange={onStyleChange}
          onColorChange={onColorChange}
          hideColor
          hideTitle
        />
      </div>
    </div>
  );
}
