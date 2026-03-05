import ProductCard from "./ProductCard";
import { products } from "../../../mock/product";

export default function ProductSection() {
  return (
    <section className="container-page py-20">
      <h2 className="text-4xl font-semibold text-center mb-12">
        Elegance Awaits You
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
