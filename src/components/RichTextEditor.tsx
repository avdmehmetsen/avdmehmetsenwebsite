"use client";

import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes } from "@lexical/html";
import {
  $getRoot,
  LexicalEditor,
  EditorState,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import ToolbarPlugin from "@/components/RichTextToolbar";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// Plugin to load initial HTML content - Simplified version
function InitialContentPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!html || html.trim() === "" || loaded) return;

    // Wait for editor to be ready
    const timeoutId = setTimeout(() => {
      editor.update(() => {
        try {
          // Strip HTML tags and get plain text for initial load
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          const plainText = tempDiv.textContent || tempDiv.innerText || "";

          if (plainText.trim()) {
            const root = $getRoot();
            root.clear();

            // Create a simple paragraph with the text
            const paragraph = $createParagraphNode();
            const textNode = $createTextNode(
              plainText.substring(0, 500) +
                (plainText.length > 500 ? "..." : "")
            );
            paragraph.append(textNode);
            root.append(paragraph);
          }

          setLoaded(true);
        } catch (error) {
          console.error("Error loading initial content:", error);
          setLoaded(true);
        }
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [editor, html, loaded]);

  return null;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "İçeriğinizi yazın...",
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
    },
    onError: (error: Error) => {
      console.error("Lexical Error:", error);
    },
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode],
  };

  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor);
      onChange(html);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-slate-300 rounded-lg bg-white overflow-hidden">
        <ToolbarPlugin />
        <div className="relative" dir="ltr">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[400px] max-h-[600px] overflow-y-auto px-4 py-3 focus:outline-none text-slate-900 lexical-editor"
                dir="ltr"
                style={{ direction: "ltr" }}
              />
            }
            placeholder={
              <div className="absolute top-3 left-4 text-slate-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={() => (
              <div className="text-red-600 p-4">
                Bir hata oluştu. Lütfen sayfayı yenileyin.
              </div>
            )}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={handleChange} />
        <InitialContentPlugin html={value} />
      </div>
    </LexicalComposer>
  );
}
