"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () =>
          $createHeadingNode("p" as HeadingTagType)
        );
      }
    });
  };

  const formatHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-300 bg-slate-50">
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-slate-200 transition-colors"
        title="Geri al"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-slate-200 transition-colors"
        title="Yinele"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`p-2 rounded transition-colors ${
          isBold ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="Kalın"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`p-2 rounded transition-colors ${
          isItalic ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="İtalik"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`p-2 rounded transition-colors ${
          isUnderline ? "bg-slate-300" : "hover:bg-slate-200"
        }`}
        title="Altı çizili"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Headings */}
      <button
        type="button"
        onClick={() => formatHeading("h2")}
        className="px-3 py-2 rounded hover:bg-slate-200 transition-colors text-sm font-bold"
        title="Alt başlık"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading("h3")}
        className="px-3 py-2 rounded hover:bg-slate-200 transition-colors text-sm font-bold"
        title="Alt başlık (küçük)"
      >
        H3
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Lists */}
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        className="p-2 rounded hover:bg-slate-200 transition-colors"
        title="Madde işaretli liste"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        className="p-2 rounded hover:bg-slate-200 transition-colors"
        title="Numaralı liste"
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
