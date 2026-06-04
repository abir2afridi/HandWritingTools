import { useAppStore } from '@/lib/handwriting/store';
import { HANDWRITING_STYLES, INK_COLORS } from '@/lib/handwriting/types';
import { cn } from '@/lib/utils';
import { Plus, Trash2, Type, PenTool, Heading1, Heading2, Heading3, List, ListOrdered, Upload, Move, Maximize2, Palette, Sparkles, Loader2, Wand2, Settings, Languages, Check, ClipboardPaste } from 'lucide-react';
import { refineTextWithAI, isUsingCustomKey, setCustomAPIKey, switchToDefaultKey, switchToCustomKey, getCustomKey } from '@/lib/handwriting/aiHelper';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionEditorProps {
  pageIndex: number;
  page: PageConfig;
}

function FormatButton({ icon: Icon, label, onClick, active }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void; active?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "p-1.5 rounded transition-colors",
            active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">{label}</TooltipContent>
    </Tooltip>
  );
}

export function SectionEditor({ pageIndex, page }: SectionEditorProps) {
  const { updateSection, addSection, removeSection, setGlobalStyle, setGlobalColor, globalColorId } = useAppStore();
  const [applyToAll, setApplyToAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const diagramInputRef = useRef<HTMLInputElement>(null);
  const activeImageSection = useRef<number>(0);
  const [editingImageIdx, setEditingImageIdx] = useState<{ sIdx: number; imgIdx: number } | null>(null);
  const [isGeneratingId, setIsGeneratingId] = useState<number | null>(null);
  const [showAISettings, setShowAISettings] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(getCustomKey());
  const [usingCustom, setUsingCustom] = useState(isUsingCustomKey());

  const handleAIAssist = async (sIdx: number, sectionContent: string, instruction: string) => {
    if (!sectionContent.trim()) return;
    setIsGeneratingId(sIdx);
    
    // Auto-enable apply to all if user is doing AI refinement and it's a global task? No, let user decide.
    
    try {
      const improved = await refineTextWithAI({
        content: sectionContent,
        instruction,
      });
      
      if (improved) {
        if (applyToAll) {
          useAppStore.getState().updateSectionGlobally({ content: improved });
        } else {
          updateSection(pageIndex, sIdx, { content: improved });
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert(error instanceof Error ? error.message : "AI refinement failed. Please try again.");
    } finally {
      setIsGeneratingId(null);
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, sIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateSection(pageIndex, sIdx, { imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [pageIndex, updateSection]);

  const handleDiagramUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, sIdx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const section = page.sections[sIdx];
      const existing = section.images || [];
      const newImg = {
        url: reader.result as string,
        x: 10,
        y: 10,
        width: 200,
        height: 150,
      };
      updateSection(pageIndex, sIdx, { images: [...existing, newImg] });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [pageIndex, updateSection, page]);

  if (!page) return null;

  const insertFormatting = (sIdx: number, prefix: string) => {
    const section = page.sections[sIdx];
    const newContent = section.content + prefix;
    updateSection(pageIndex, sIdx, { content: newContent });
  };

  const updateImage = (sIdx: number, imgIdx: number, updates: Partial<{ x: number; y: number; width: number; height: number }>) => {
    const section = page.sections[sIdx];
    const images = [...(section.images || [])];
    images[imgIdx] = { ...images[imgIdx], ...updates };
    updateSection(pageIndex, sIdx, { images });
  };

  const removeImage = (sIdx: number, imgIdx: number) => {
    const section = page.sections[sIdx];
    const images = (section.images || []).filter((_, i) => i !== imgIdx);
    updateSection(pageIndex, sIdx, { images });
    setEditingImageIdx(null);
  };

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {page.sections.filter(s => s.imageUrl || (s.images && s.images.length > 0)).map((section, sIdx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border bg-card p-3 space-y-2 shadow-sm hover:shadow-md transition-shadow"
           >

            {/* Inline image preview */}
            {section.imageUrl && (
              <div className="relative group">
                <img
                  src={section.imageUrl}
                  alt="Uploaded"
                  className="max-h-40 rounded-lg border object-contain"
                />
                <button
                  onClick={() => updateSection(pageIndex, sIdx, { imageUrl: undefined })}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Positionable diagrams */}
            {section.images && section.images.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">Diagrams ({section.images.length})</span>
                <div className="flex gap-2 flex-wrap">
                  {section.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative group">
                      <img
                        src={img.url}
                        alt={`Diagram ${imgIdx + 1}`}
                        className={cn(
                          "h-20 rounded-lg border object-cover cursor-pointer transition-all",
                          editingImageIdx?.sIdx === sIdx && editingImageIdx?.imgIdx === imgIdx
                            ? "ring-2 ring-primary"
                            : "hover:ring-1 hover:ring-primary/50"
                        )}
                        onClick={() => setEditingImageIdx(
                          editingImageIdx?.sIdx === sIdx && editingImageIdx?.imgIdx === imgIdx
                            ? null
                            : { sIdx, imgIdx }
                        )}
                      />
                      <button
                        onClick={() => removeImage(sIdx, imgIdx)}
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Image position/size editor */}
                {editingImageIdx && editingImageIdx.sIdx === sIdx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-muted/50 rounded-lg border p-3 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                      <Maximize2 className="h-3.5 w-3.5" />
                      Diagram {editingImageIdx.imgIdx + 1} — Position & Size
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">X Position</Label>
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={section.images![editingImageIdx.imgIdx].x}
                              onChange={(e) => updateImage(sIdx, editingImageIdx.imgIdx, { x: Number(e.target.value) })}
                              className="w-10 h-5 bg-transparent border-none text-[10px] text-right font-mono focus:ring-0 p-0"
                            />
                            <button 
                              onClick={() => updateImage(sIdx, editingImageIdx.imgIdx, { x: 100 })}
                              className="text-[9px] bg-primary/5 hover:bg-primary/10 px-1 rounded transition-colors"
                            >
                              Center
                            </button>
                          </div>
                        </div>
                        <Slider
                          value={[section.images![editingImageIdx.imgIdx].x]}
                          onValueChange={([v]) => {
                            if (applyToAll) {
                              useAppStore.getState().updateSectionGlobally({ 
                                images: section.images?.map((img, i) => i === editingImageIdx.imgIdx ? { ...img, x: v } : img) 
                              });
                            } else {
                              updateImage(sIdx, editingImageIdx.imgIdx, { x: v });
                            }
                          }}
                          min={0} max={600} step={1}
                          className="mt-1"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Y Position</Label>
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={section.images![editingImageIdx.imgIdx].y}
                              onChange={(e) => updateImage(sIdx, editingImageIdx.imgIdx, { y: Number(e.target.value) })}
                              className="w-10 h-5 bg-transparent border-none text-[10px] text-right font-mono focus:ring-0 p-0"
                            />
                            <button 
                              onClick={() => updateImage(sIdx, editingImageIdx.imgIdx, { y: 250 })}
                              className="text-[9px] bg-primary/5 hover:bg-primary/10 px-1 rounded transition-colors"
                            >
                              Center
                            </button>
                          </div>
                        </div>
                        <Slider
                          value={[section.images![editingImageIdx.imgIdx].y]}
                          onValueChange={([v]) => {
                            if (applyToAll) {
                              useAppStore.getState().updateSectionGlobally({ 
                                images: section.images?.map((img, i) => i === editingImageIdx.imgIdx ? { ...img, y: v } : img) 
                              });
                            } else {
                              updateImage(sIdx, editingImageIdx.imgIdx, { y: v });
                            }
                          }}
                          min={0} max={900} step={1}
                          className="mt-1"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Width</Label>
                          <input 
                            type="number" 
                            value={section.images![editingImageIdx.imgIdx].width}
                            onChange={(e) => updateImage(sIdx, editingImageIdx.imgIdx, { width: Number(e.target.value) })}
                            className="w-10 h-5 bg-transparent border-none text-[10px] text-right font-mono focus:ring-0 p-0"
                          />
                        </div>
                        <Slider
                          value={[section.images![editingImageIdx.imgIdx].width]}
                          onValueChange={([v]) => {
                            if (applyToAll) {
                              useAppStore.getState().updateSectionGlobally({ 
                                images: section.images?.map((img, i) => i === editingImageIdx.imgIdx ? { ...img, width: v } : img) 
                              });
                            } else {
                              updateImage(sIdx, editingImageIdx.imgIdx, { width: v });
                            }
                          }}
                          min={20} max={800} step={1}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">Height</Label>
                        <Slider
                          value={[section.images![editingImageIdx.imgIdx].height]}
                          onValueChange={([v]) => {
                            if (applyToAll) {
                              useAppStore.getState().updateSectionGlobally({ 
                                images: section.images?.map((img, i) => i === editingImageIdx.imgIdx ? { ...img, height: v } : img) 
                              });
                            } else {
                              updateImage(sIdx, editingImageIdx.imgIdx, { height: v });
                            }
                          }}
                          min={50} max={900} step={1}
                          className="mt-1"
                        />
                        <span className="text-[10px] text-muted-foreground">{section.images![editingImageIdx.imgIdx].height}px</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            </motion.div>
        ))}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageUpload(e, activeImageSection.current)}
      />
      <input
        ref={diagramInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleDiagramUpload(e, activeImageSection.current)}
      />

    </div>
  );
}
