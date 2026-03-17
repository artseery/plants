import Image from "next/image";
import styles from "./NavigationBar.module.css";

export default async function NavigationBar() {
  return (
    <nav className={styles["navigation-bar"]}>
      <div className={styles["navigation-bar-icon"]}>
        <Image src="/icon.png" alt="" fill />
      </div>
    </nav>
  );
}
