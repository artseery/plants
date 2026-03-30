"use client";

import Image from "next/image";
import styles from "./NavigationBar.module.css";
import { useParams, usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { slug } = useParams();
  const isCategoriesList = pathname === "/";
  const isSpeciesList =
    pathname.startsWith("/categories") && segments.length === 2;
  return (
    <nav className={styles["navigation-bar"]}>
      <div className={styles["navigation-bar-content"]}>
        <div className={styles["navigation-bar-icon"]}>
          <Image src="/icon.png" alt="" fill />
        </div>
        {isSpeciesList && (
          <button className={styles["navigation-bar-button"]}>Добавить</button>
        )}
      </div>
    </nav>
  );
}
