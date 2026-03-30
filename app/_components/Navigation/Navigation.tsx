import styles from "./Navigation.module.css";
import { NavigationItem } from "@/types/navigation";
import Link from "next/link";
import React from "react";

export default function Navigation({
  navigation,
}: {
  navigation: NavigationItem[];
}) {
  return (
    <div className={styles.navigation}>
      {navigation.map((item, key) => (
        <React.Fragment key={item.name}>
          {key !== 0 ? (
            <svg
              className={styles.chevron}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          ) : (
            ""
          )}
          <div className={styles.navigationItem}>
            {item.link ? (
              <Link className={styles.link} href={item.link}>
                {item.name}
              </Link>
            ) : (
              <span>{item.name}</span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
