"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import styles from "./editor.module.css";
import { Dropdown } from "primereact/dropdown";

export default function Editor({ slug }: { slug?: string }) {
  type Category = { id: string; name: string };

  const editorRef = useRef<EditorJS>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

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

  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const res = await fetch("/api/categories");
      const data: Category[] = await res.json();
      setCategories(data);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Dropdown
        loading={isLoadingCategories}
        onFocus={loadCategories}
        placeholder="Категория"
        options={categories}
        optionLabel="name"
        optionValue="id"
        value={category}
        className="w-full md:w-14rem"
        onChange={(e) => setCategory(e.value)}
      />
      <input name="name" placeholder="Название" />
      <div id="editor" />
      <button type="submit">Save</button>
    </form>
  );
}
