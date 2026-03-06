import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Star } from "lucide-react";

type Props = {
  name: string;
  price: number;
  ratings: number;
  image?: string;
};

export default function ProductCard({ name, price, image, ratings }: Props) {
  const fullStars = Math.floor(ratings);

  return (
    <Card className="border-none rounded-none shadow-none group cursor-pointer transition-all hover:bg-white/50 bg-transparent">
      {/* IMAGE AREA */}
      <CardContent className="p-4">
        <div className="aspect-[4/5] bg-secondary/50 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="bg-white w-full h-full" />
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex flex-col items-center gap-1 p-4 pt-0 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-medium">
          {name}
        </p>

        {/* PRICE + RATING ROW */}
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm font-semibold text-foreground">
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
                    i < fullStars ? "text-foreground" : "text-foreground/20"
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
  );
}
