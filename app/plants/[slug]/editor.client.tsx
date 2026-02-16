"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

export default function Editor({ slug }: { slug?: string }) {
  const editorRef = useRef<EditorJS>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { default: EditorJS } = await import("@editorjs/editorjs");
      const { default: ImageTool } = await import("@editorjs/image");

      if (!mounted) return;

      editorRef.current = new EditorJS({
        holder: "editor",
        tools: {
          header: Header,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload",
              },
              field: "file",
            },
          },
        },
      });
    })();

    return () => {
      mounted = false;
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  const handleSave = async () => {
    const outputData = await editorRef.current?.save();
    await fetch(`/api/plants/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: outputData }),
    });
  };

  return (
    <div className="editor">
      <div id="editor" />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
