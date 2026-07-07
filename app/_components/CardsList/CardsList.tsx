import Image from "next/image";
import styles from "./CardsList.module.css";
import Link from "next/link";
import type { CardItem } from "./types";

type Props = {
  items: CardItem[];
  urlBuilder: (slug: string) => string;
}

export default function CardsList({ items, urlBuilder }: Props) {
  return (
    <section className={`${styles["items"]} container`}>
      <ul className={`${styles["items-list"]}`}>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              className={styles["items-list-item"]}
              href={`${urlBuilder(item.slug)}`}
            >
              <Image
                src={`/api/files/${item.imageUrl}`}
                alt=""
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className={styles["items-list-item-background"]}></div>
              <p className={styles["items-list-item-name"]}>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
