export default function BlogSection() {
  const blogs = [
    {
      title: "Daily skincare routine tips",
      image: "https://images.unsplash.com/photo-1556228724-4c63b8c8c0c4",
    },
    {
      title: "Achieving skin radiance naturally",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19",
    },
    {
      title: "Natural ingredients for skincare",
      image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07",
    },
  ];

  return (
    <section className="container-page py-20">
      <h2 className="text-3xl mb-10">Scented stories for every mood</h2>

      <div className="grid grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.title} className="card">
            <img src={blog.image} className="rounded-md mb-4" />

            <h3 className="font-medium">{blog.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
