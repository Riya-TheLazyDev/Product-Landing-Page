export default function Subscribe() {
  return (
    <section className="bg-[#7a927c] text-white py-16">
      <div className="container-page flex justify-between items-center">
        <h3 className="text-3xl">Subscribe to get 10% off</h3>

        <div className="flex">
          <input
            placeholder="Enter email"
            className="px-4 py-2 text-black rounded-l-md"
          />

          <button className="btn-primary rounded-l-none">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
