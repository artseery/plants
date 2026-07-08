import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navigation from "@/app/_components/Navigation/Navigation";
import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  params: Promise<{ species: string; category: string }>;
};

export default async function Page({ params }: Props) {
  const { species } = await params;
  const foundSpecies = await prisma.species.findUnique({
    where: {
      slug: species,
    },
    include: {
      category: true,
    },
  });
  if (!foundSpecies) {
    notFound();
  }

  const navigation = [
    { name: "Категории", link: "/" },
    {
      name: foundSpecies.category.name,
      link: `/categories/${foundSpecies.category.slug}`,
    },
    {
      name: foundSpecies.name,
      link: `/categories/${foundSpecies.category.slug}/${foundSpecies.slug}`,
    },
  ];

  return (
    <section className="container">
      <Navigation navigation={navigation} />
      <div className={styles["species"]}>
        <p className={styles["species-title"]}>{foundSpecies.name}</p>
        { foundSpecies.imageUrl &&
        <div className={styles["species-image"]}>
          <Image src={`/api/files/${foundSpecies.imageUrl}`} alt={foundSpecies.name} objectFit="contain" fill/>
        </div>
        }
        <div className={styles['species-article']}>
          { foundSpecies.article }
        </div>
      </div>
    </section>
  );
}
