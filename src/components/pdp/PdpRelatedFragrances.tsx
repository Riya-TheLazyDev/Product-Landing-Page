"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export type PdpRelatedItem = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  subtitle: string;
};

type Props = {
  items: PdpRelatedItem[];
};

function getListVariants(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0 },
    show: reduced
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          opacity: 1,
          transition: {
            staggerChildren: 0.09,
            delayChildren: 0.12,
          },
        },
  };
}

function getCardVariants(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.2 }
        : { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const },
    },
  };
}

export default function PdpRelatedFragrances({ items }: Props) {
  const reduceMotion = useReducedMotion();
  const reduced = !!reduceMotion;

  if (items.length === 0) return null;

  const listVariants = getListVariants(reduced);
  const cardVariants = getCardVariants(reduced);

  return (
    <motion.section
      className="mt-28 md:mt-36 pt-20 md:pt-24 border-t border-white/[0.06]"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="mb-14 md:mb-16 max-w-3xl">
        <span className="subtitle-luxury mb-4 block">You May Also Like</span>
        <h2 className="title-luxury text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
          Explore More Fragrances
        </h2>
        <p className="text-editorial text-[10px] sm:text-xs uppercase tracking-[0.35em] mt-6 max-w-xl">
          Curated companions from the same lineage — each composition
          whispered for the collector who lingers.
        </p>
      </div>

      <motion.ul
        className="flex gap-5 md:gap-6 lg:gap-7 overflow-x-auto pb-3 md:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 list-none"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {items.map((item) => (
          <motion.li
            key={item.id.toString()}
            variants={cardVariants}
            className="w-[min(82vw,300px)] shrink-0 snap-center md:w-auto md:shrink md:snap-none"
          >
            <Link
              href={`/products/${item.id}`}
              className="group block h-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-[1.25rem]"
            >
              <article className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-[rgba(8,8,8,0.55)] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-[22px] transition-[transform,box-shadow,border-color] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:to-transparent group-hover:-translate-y-1.5 group-hover:border-primary/25 group-hover:shadow-[0_32px_90px_-36px_rgba(214,195,165,0.12),0_0_0_1px_rgba(214,195,165,0.06)]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <div className="absolute -inset-[40%] rounded-full bg-primary/[0.04] blur-3xl" />
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-[#070707]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-60" />
                  <Image
                    src={item.image || "/assets/product.jpeg"}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 767px) 82vw, (max-width: 1023px) 28vw, (max-width: 1279px) 18vw, 15vw"
                    className="object-contain p-7 transition-transform duration-[1.35s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity duration-[1s] group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                <div className="relative flex flex-1 flex-col gap-2 px-5 pb-6 pt-6 text-center md:px-6 md:pb-7 md:pt-7">
                  <p className="text-[8px] uppercase tracking-[0.42em] text-primary/90 font-semibold">
                    L&apos;Essence
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-light tracking-[0.02em] text-white transition-colors duration-700 group-hover:text-primary">
                    {item.name}
                  </h3>
                  <p className="text-[10px] leading-relaxed text-white/45 font-light tracking-wide line-clamp-2 min-h-[2.5rem]">
                    {item.subtitle}
                  </p>
                  <p className="mt-auto pt-3 text-[11px] font-medium tracking-[0.28em] text-white/80">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </article>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
