"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Star } from "lucide-react";
import TiltCard from "./TiltCard";

type Props = {
  name: string;
  price: number;
  ratings: number;
  image?: string;
};

export default function ProductCard({ name, price, image, ratings }: Props) {
  const fullStars = Math.floor(ratings);

  return (
    <TiltCard>
      <Card className="glass-card border-none rounded-2xl shadow-none group cursor-pointer transition-all h-full">
        {/* IMAGE AREA */}
        <CardContent className="p-4">
          <div className="aspect-[4/5] bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center overflow-hidden rounded-xl border border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 z-10" />
            {image ? (
              <div className="relative w-full h-full p-4 transition-all duration-700 group-hover:scale-110">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-400/20 to-purple-400/20 w-full h-full" />
            )}
          </div>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex flex-col items-center gap-1 p-4 pt-0 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/60 font-medium">
            {name}
          </p>

          {/* PRICE + RATING ROW */}
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </p>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 text-foreground/80">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    fill={i < fullStars ? "currentColor" : "none"}
                    className={
                      i < fullStars ? "text-primary" : "text-foreground/20"
                    }
                  />
                ))}
              </div>

              <span className="text-[10px] text-foreground/40 ml-1 font-medium">
                {ratings.toFixed(1)}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TiltCard>
  );
}

