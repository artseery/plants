"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import styles from "./editor.module.css";

export default function Editor({ slug }: { slug?: string }) {
  type Category = { id: string; name: string };

  const editorRef = useRef<EditorJS>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const { default: EditorJS } = await import("@editorjs/editorjs");
      const { default: ImageTool } = await import("@editorjs/image");
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

  const load = async () => {
    try {
      const res = await fetch("/api/categories");
      const data: Category[] = await res.json();
      setCategories(data);
    } finally {
      console.log("done");
    }
  };

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <select name="category" defaultValue="" onFocus={load}>
        <option value="" disabled>
          Выберите категорию
        </option>
        {categories.map((category: Category) => (
          <option value={category.name} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input name="name" placeholder="Название" />
      <div id="editor" />
      <button type="submit">Save</button>
    </form>
  );
}
