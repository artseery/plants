import { prisma } from "@/lib/prisma";
import { Key } from "react";
import Image from "next/image";
import styles from "./CategoryList.module.css";
import Link from "next/link";
export default async function CategoryList() {
  const categories = await prisma.category.findMany();
  return (
    <section className={styles["category"]}>
      <ul className={styles["category-list"]}>
        {categories.map(
          (category: {
            id: Key;
            name: string;
            slug: string;
            imageUrl: string | null;
          }) => (
            <li key={category.id}>
              <Link
                className={styles["category-list-item"]}
                href={`/categories/${category.slug}`}
              >
                <Image
                  src={`/api/files/${category.imageUrl}`}
                  alt=""
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className={styles["category-list-item-background"]}></div>
                <p className={styles["category-list-item-name"]}>
                  {category.name}
                </p>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
