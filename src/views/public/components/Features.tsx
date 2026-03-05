export default function Features() {
  const items = [
    { title: "100% Organic", desc: "Natural ingredients" },
    { title: "Fits your skin", desc: "Perfect skincare balance" },
    { title: "Easy to use", desc: "Designed for daily routine" },
  ];

  return (
    <section className="bg-[#7a927c] text-white py-16">
      <div className="container-page grid grid-cols-3 gap-10 text-center">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm opacity-90">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
