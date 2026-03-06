import { ArrowRight } from "lucide-react";

export interface BlogCardProps {
  id: string;
  title: string;
  publishedAt: string;
  author: string;
  image: string;
  content: string;
}

export default function BlogCard({
  title,
  publishedAt,
  author,
  image,
  content,
}: BlogCardProps) {
  return (
    <article className="flex flex-col group cursor-pointer">
      {/* image */}
      <div className="overflow-hidden mb-5">
        <img
          src={image}
          alt={title}
          className="aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* meta */}
      <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3 font-sans">
        {publishedAt} • {author}
      </p>

      {/* title */}
      <h3 className="text-xl font-serif font-medium mb-3 leading-tight group-hover:text-foreground/70 transition-colors">
        {title}
      </h3>

      {/* content */}
      <p className="text-sm text-foreground/60 mb-5 leading-relaxed line-clamp-2">
        {content}
      </p>

      {/* read more */}
      <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all underline underline-offset-4 decoration-border">
        Read more
        <ArrowRight size={14} />
      </button>
    </article>
  );
}
