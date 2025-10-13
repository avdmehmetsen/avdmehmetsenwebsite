"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
  ElementNode,
  $isElementNode,
} from "lexical";
import {
  $createHeadingNode,
  HeadingTagType,
  $isHeadingNode,
  $createQuoteNode,
  $isQuoteNode,
} from "@lexical/rich-text";
import { $createParagraphNode } from "lexical"; // modern export
import {
  $setBlocksType,
  $patchStyleText,
  $getSelectionStyleValueForProperty,
} from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  $isListNode,
} from "@lexical/list";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
  Pilcrow,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoreHorizontal,
  Droplet,
  PaintBucket,
} from "lucide-react";

// Optional: type for block state
type BlockType = "paragraph" | "h2" | "h3" | "ul" | "ol" | "quote";

type AlignType = Exclude<ElementFormatType, ""> | ""; // '', 'left', 'center', 'right', 'justify', etc.

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [align, setAlign] = useState<AlignType>("");
  const [textColor, setTextColor] = useState<string>("#111827"); // slate-900
  const [bgColor, setBgColor] = useState<string>("#00000000"); // transparent

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // inline formats
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // current style values (for color pickers)
      const currentColor = $getSelectionStyleValueForProperty(
        selection,
        "color",
        textColor
      );
      const currentBg = $getSelectionStyleValueForProperty(
        selection,
        "background-color",
        bgColor
      );
      if (currentColor) setTextColor(currentColor);
      if (currentBg) setBgColor(currentBg);

      // --- BLOK TESPİTİ (güvenli) ---
      const anchorNode = selection.anchor.getNode();

      let element: ElementNode | null = null;
      try {
        if (anchorNode && anchorNode.getKey && anchorNode.getKey() !== "root") {
          const baseEl = $isElementNode(anchorNode)
            ? anchorNode
            : anchorNode.getParent?.();

          // Bazı Lexical sürümlerinde TextNode'da getTopLevelElementOrThrow yok
          element =
            (baseEl?.getTopLevelElementOrThrow?.() as
              | ElementNode
              | undefined) ??
            (baseEl?.getTopLevelElement?.() as ElementNode | undefined) ??
            baseEl ??
            null;
        }
      } catch {
        element = null;
      }

      if (!element) {
        // Seçim kökte veya belirlenemeyen durumda
        setBlockType("paragraph");
        setAlign("");
        return;
      }

      // alignment of current element
      const fmt = (element.getFormatType?.() as AlignType) ?? "";
      setAlign(fmt);

      if ($isHeadingNode(element)) {
        const tag = element.getTag() as HeadingTagType;
        if (tag === "h2" || tag === "h3") {
          setBlockType(tag);
          return;
        }
      }

      if ($isListNode(element)) {
        setBlockType(element.getListType() === "bullet" ? "ul" : "ol");
        return;
      }

      if ($isQuoteNode(element)) {
        setBlockType("quote");
        return;
      }

      setBlockType("paragraph");
    }
  }, [bgColor, textColor]);

  useEffect(() => {
    const unsubUpdate = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateToolbar);
    });

    const unsubSelection = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(updateToolbar);
        return false; // allow other listeners to run
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      unsubUpdate();
      unsubSelection();
    };
  }, [editor, updateToolbar]);

  const setParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const setHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  const toggleQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (blockType === "quote") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      }
    });
  };

  const setAlignment = (value: AlignType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value || "left");
  };

  const applyTextColor = (value: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color: value });
      }
    });
  };

  const applyBgColor = (value: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { "background-color": value });
      }
    });
  };

  // Prevent focus loss when clicking toolbar
  const withNoBlur = (fn: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    fn();
  };

  // Better contrast for icons via text-slate-700, and active via bg-slate-300
  const btnClass = (active?: boolean) =>
    `p-2 rounded transition-colors text-slate-700 ${
      active ? "bg-slate-300" : "hover:bg-slate-200"
    }`;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-300 bg-slate-50 sticky top-0 z-10">
      {/* Row 1: Core formatting */}
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        )}
        className={btnClass()}
        title="Geri al (Ctrl/Cmd+Z)"
        aria-label="Geri al"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(REDO_COMMAND, undefined)
        )}
        className={btnClass()}
        title="Yinele (Ctrl/Cmd+Shift+Z)"
        aria-label="Yinele"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        )}
        className={btnClass(isBold)}
        title="Kalın (Ctrl/Cmd+B)"
        aria-label="Kalın"
        aria-pressed={isBold}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        )}
        className={btnClass(isItalic)}
        title="İtalik (Ctrl/Cmd+I)"
        aria-label="İtalik"
        aria-pressed={isItalic}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        )}
        className={btnClass(isUnderline)}
        title="Altı çizili (Ctrl/Cmd+U)"
        aria-label="Altı çizili"
        aria-pressed={isUnderline}
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onMouseDown={withNoBlur(() => setParagraph())}
        className={`px-3 py-2 rounded text-sm font-medium text-slate-700 ${
          blockType === "paragraph" ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="Paragraf"
        aria-label="Paragraf"
        aria-pressed={blockType === "paragraph"}
      >
        <span className="inline-flex items-center gap-2">
          <Pilcrow className="w-4 h-4" />P
        </span>
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() => setHeading("h2"))}
        className={`px-3 py-2 rounded text-sm font-bold text-slate-700 ${
          blockType === "h2" ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="Başlık (H2)"
        aria-label="Başlık (H2)"
        aria-pressed={blockType === "h2"}
      >
        H2
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() => setHeading("h3"))}
        className={`px-3 py-2 rounded text-sm font-bold text-slate-700 ${
          blockType === "h3" ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="Alt başlık (H3)"
        aria-label="Alt başlık (H3)"
        aria-pressed={blockType === "h3"}
      >
        H3
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Compact overflow menu for space saving */}
      <details className="relative group">
        <summary
          className={btnClass()}
          aria-label="Daha fazla"
          title="Daha fazla"
        >
          <MoreHorizontal className="w-4 h-4" />
        </summary>
        <div className="absolute mt-2 left-0 min-w-[220px] rounded-lg border border-slate-200 bg-white shadow-lg p-2 z-20 grid grid-cols-3 gap-1">
          {/* Quote */}
          <button
            type="button"
            onMouseDown={withNoBlur(toggleQuote)}
            className={btnClass(blockType === "quote")}
            title="Alıntı bloğu"
            aria-label="Alıntı bloğu"
            aria-pressed={blockType === "quote"}
          >
            <Quote className="w-4 h-4" />
          </button>

          {/* Align Left */}
          <button
            type="button"
            onMouseDown={withNoBlur(() => setAlignment("left"))}
            className={btnClass(align === "left" || align === "")}
            title="Sola hizala"
            aria-label="Sola hizala"
            aria-pressed={align === "left" || align === ""}
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          {/* Align Center */}
          <button
            type="button"
            onMouseDown={withNoBlur(() => setAlignment("center"))}
            className={btnClass(align === "center")}
            title="Ortala"
            aria-label="Ortala"
            aria-pressed={align === "center"}
          >
            <AlignCenter className="w-4 h-4" />
          </button>

          {/* Align Right */}
          <button
            type="button"
            onMouseDown={withNoBlur(() => setAlignment("right"))}
            className={btnClass(align === "right")}
            title="Sağa hizala"
            aria-label="Sağa hizala"
            aria-pressed={align === "right"}
          >
            <AlignRight className="w-4 h-4" />
          </button>

          {/* Text Color */}
          <label className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 col-span-3">
            <Droplet className="w-4 h-4 text-slate-700" />
            <span className="text-xs text-slate-600">Metin rengi</span>
            <input
              aria-label="Metin rengi"
              title="Metin rengi"
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                applyTextColor(e.target.value);
              }}
              className="ml-auto h-6 w-10 cursor-pointer border border-slate-200 rounded"
            />
          </label>

          {/* Background Color */}
          <label className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 col-span-3">
            <PaintBucket className="w-4 h-4 text-slate-700" />
            <span className="text-xs text-slate-600">Vurgu rengi</span>
            <input
              aria-label="Arkaplan rengi"
              title="Arkaplan rengi"
              type="color"
              value={bgColor}
              onChange={(e) => {
                setBgColor(e.target.value);
                applyBgColor(e.target.value);
              }}
              className="ml-auto h-6 w-10 cursor-pointer border border-slate-200 rounded"
            />
          </label>
        </div>
      </details>

      {/* Lists stay visible */}
      <div className="w-px h-6 bg-slate-300 mx-1" />
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        )}
        className={btnClass(blockType === "ul")}
        title="Madde işaretli liste"
        aria-label="Madde işaretli liste"
        aria-pressed={blockType === "ul"}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onMouseDown={withNoBlur(() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        )}
        className={btnClass(blockType === "ol")}
        title="Numaralı liste"
        aria-label="Numaralı liste"
        aria-pressed={blockType === "ol"}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="ml-auto text-xs text-slate-500 flex items-center px-2">
        <span className="hidden md:inline">
          💡 Metni seçip butonlara tıklayın
        </span>
      </div>
    </div>
  );
}
