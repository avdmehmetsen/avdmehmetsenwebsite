"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, LexicalEditor, EditorState } from "lexical";
import ToolbarPlugin from "@/components/RichTextToolbar";

interface RichTextEditorProps {
  value: string; // fallback HTML (for display)
  onChange: (html: string) => void;
  placeholder?: string;
  /**
   * Optional: Persist & restore exact Lexical state to prevent style loss (e.g., text/background color).
   * Save this to DB alongside HTML. Use it when editing.
   */
  initialEditorStateJSON?: string | null;
  onStateChange?: (stateJSON: string) => void;
}

// Simple debounce hook for expensive HTML generation
function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay = 250
) {
  const fnRef = useMemo(() => fn, [fn]);
  const [timer, setTimer] = useState<number | null>(null);

  return useCallback(
    ((...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      const id = window.setTimeout(() => fnRef(...args), delay);
      setTimer(id);
    }) as T,
    [delay, fnRef, timer]
  );
}

// Plugin: load initial content
// 1) Prefer exact Lexical editorState JSON (lossless)
// 2) Fallback to HTML import (best-effort)
function InitialContentPlugin({
  html,
  stateJSON,
}: {
  html: string;
  stateJSON?: string | null;
}) {
  const [editor] = useLexicalComposerContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const timeoutId = window.setTimeout(() => {
      editor.update(() => {
        try {
          const root = $getRoot();
          root.clear();

          if (stateJSON) {
            // Lossless restore of all inline styles (color/background, etc.)
            const parsed = editor.parseEditorState(stateJSON);
            editor.setEditorState(parsed);
          } else if (html && html.trim()) {
            // Best-effort HTML import
            const parser = new DOMParser();
            const dom = parser.parseFromString(html, "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            root.append(...nodes);
          }

          setLoaded(true);
        } catch (err) {
          console.error("Error loading initial content:", err);
          setLoaded(true);
        }
      });
    }, 60);

    return () => clearTimeout(timeoutId);
  }, [editor, html, loaded, stateJSON]);

  return null;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "İçeriğinizi yazın...",
  initialEditorStateJSON = null,
  onStateChange,
}: RichTextEditorProps) {
  const initialConfig = {
    namespace: "RichTextEditor",
    theme: {
      paragraph: "mb-2",
      heading: {
        h2: "text-2xl font-bold mb-3 mt-6 text-slate-900",
        h3: "text-xl font-bold mb-2 mt-4 text-slate-900",
      },
      list: {
        ul: "list-disc list-inside mb-2",
        ol: "list-decimal list-inside mb-2",
        listitem: "mb-1",
      },
      link: "text-blue-600 hover:underline",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
      quote: "border-l-4 border-slate-300 pl-3 italic text-slate-700 my-3",
    },
    onError: (error: Error) => {
      console.error("Lexical Error:", error);
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
  } as const;

  const debouncedOnChange = useDebouncedCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        onChange(html);
        // Persist exact Lexical state as JSON alongside HTML
        const json = editor.getEditorState().toJSON();
        onStateChange?.(JSON.stringify(json));
      });
    },
    200
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-slate-300 rounded-lg bg-white overflow-hidden">
        <ToolbarPlugin />
        <div className="relative" dir="ltr">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[400px] max-h-[600px] overflow-y-auto px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-b-lg text-slate-900 lexical-editor"
                dir="ltr"
                style={{ direction: "ltr" }}
              />
            }
            placeholder={
              <div className="absolute top-3 left-4 text-slate-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <OnChangePlugin onChange={debouncedOnChange} />
        <InitialContentPlugin html={value} stateJSON={initialEditorStateJSON} />
      </div>
    </LexicalComposer>
  );
}
