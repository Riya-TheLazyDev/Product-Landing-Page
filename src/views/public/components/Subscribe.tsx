export default function Subscribe() {
  return (
    <section className="bg-foreground text-white py-12 md:py-10 px-4 md:px-0">
      <div className="container-page flex flex-col lg:flex-row md:p-12 items-center justify-between gap-8 md:gap-12 text-center lg:text-left">
        <h3 className="text-3xl md:text-4xl font-serif max-w-sm leading-tight">
          Subscribe to get 10% off on your first order
        </h3>

        <div className="flex flex-col sm:flex-row h-auto sm:h-12 w-full max-w-md gap-4 sm:gap-0">
          <input
            placeholder="Enter your email address"
            className="flex-1 px-6 py-3 sm:py-0 text-sm bg-transparent border border-white/40 focus:border-white outline-none transition-colors placeholder:text-white/40"
          />

          <button className="px-8 py-3 sm:py-0 text-xs font-semibold uppercase tracking-widest bg-white text-foreground hover:bg-white/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
