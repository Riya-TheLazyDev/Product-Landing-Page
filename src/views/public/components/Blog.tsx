import BlogCard from "../../../components/common/BlogCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

export default function BlogSection() {
  const blogs = [
    {
      id: "1",
      title: "Daily skincare routine tips",
      publishedAt: "February 22, 2024",
      author: "Ethan Brooks",
      image: "https://images.unsplash.com/photo-1556228724-4c63b8c8c0c4",
      content:
        "Expert advice for daily skincare routines to maintain healthy, glowing skin.",
    },
    {
      id: "2",
      title: "Achieving skin radiance naturally",
      publishedAt: "March 27, 2024",
      author: "Lily Thompson",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19",
      content:
        "Natural methods to achieve a radiant complexion without harsh chemicals.",
    },
    {
      id: "3",
      title: "Natural ingredients for skincare",
      publishedAt: "April 30, 2024",
      author: "Oliver Davis",
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07",
      content:
        "Explore the benefits of natural ingredients in your skincare products.",
    },
    {
      id: "4",
      title: "Essential oils for skincare",
      publishedAt: "June 5, 2024",
      author: "Ava Bennett",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
      content:
        "Explore the use of essential oils in skincare for various benefits.",
    },
  ];

  return (
    <section className="container-page py-16 md:py-24 bg-background">
      {/* header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-3 font-sans">
            Blogs
          </p>

          <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
            Scented stories for every mood
          </h2>
        </div>

        <div className="flex gap-3 ml-auto md:ml-0">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-10 h-10 border-foreground/20 hover:bg-foreground hover:text-white transition-all"
          >
            <ArrowLeft size={16} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-10 h-10 border-foreground/20 hover:bg-foreground hover:text-white transition-all"
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      {/* footer button */}
      <Button
        variant="outline"
        className="rounded-full px-8 py-2 h-auto text-[11px] font-bold uppercase tracking-[0.2em] flex gap-2 border-foreground/20 hover:bg-foreground hover:text-white transition-all"
      >
        View more articles
        <ArrowRight size={14} />
      </Button>
    </section>
  );
}
