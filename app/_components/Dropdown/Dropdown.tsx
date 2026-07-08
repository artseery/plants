"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

type Props = {
  items: Record<string, string>;
  selectedItemId?: string;
  isLoading?: boolean;
  title?: string;
};

export default function Dropdown({
  items,
  selectedItemId,
  isLoading,
  title,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = selectedItemId ? items[selectedItemId] : undefined;
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const showOptions = () => {
    setIsOptionsShown(true);
  };

  useEffect(() => {
    if (!isOptionsShown) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!dropdownRef.current || !(target instanceof Node)) return;

      if (!dropdownRef.current.contains(target)) {
        setIsOptionsShown(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOptionsShown]);

  return (
    <div ref={dropdownRef} className={styles["dropdown"]}>
      <div className={styles["dropdown-select"]} onClick={showOptions}>
        {selectedItem ? (
          <div className={styles["dropdown-selected"]}>{selectedItem}</div>
        ) : (
          <div className={styles["dropdown-selected"]}></div>
        )}
      </div>
      <div
        className={`${styles["dropdown-options"]}
          ${isOptionsShown ? styles["dropdown-options--shown"] : ""}`}
      >
        {Object.entries(items).map(([key, name]) => (
          <div key={key} className={styles["dropdown-option"]}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
