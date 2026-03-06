import { Leaf, Sparkles, Droplet } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: Leaf,
      title: "100% Organic",
      desc: "We craft skincare using the most exquisite ingredients from the plant, earth and mineral realms",
    },
    {
      icon: Sparkles,
      title: "Fits your skin",
      desc: "It's all natural and processed based on traditional knowledge with modern technology",
    },
    {
      icon: Droplet,
      title: "Easy to use",
      desc: "Packed with a unique design as well as useful that can help you perform routine skin care",
    },
  ];

  return (
    <section className="bg-foreground text-white py-10 md:py-12 px-4 md:px-0">
      <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex flex-col items-center text-center px-10 relative"
            >
              <Icon size={32} strokeWidth={1.5} className="mb-6 opacity-80" />

              <h3 className="text-xl font-serif font-medium mb-3 tracking-wide">
                {item.title}
              </h3>

              <p className="text-sm opacity-70 leading-relaxed max-w-[240px]">
                {item.desc}
              </p>

              {/* Short divider - only on md+ */}
              {index !== items.length - 1 && (
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/20" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
