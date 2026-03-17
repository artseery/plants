import CategoryList from "@/app/_components/CategoryList/CategoryList";
import styles from "./page.module.css";
export default async function Page() {
  return (
    <main className={styles.main}>
      <CategoryList />
    </main>
  );
}
