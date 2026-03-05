type Props = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div className="card hover:shadow-md transition">
      <div className="aspect-square mb-4">
        <img src={image} className="rounded-lg object-cover w-full h-full" />
      </div>

      <h3 className="font-medium">{name}</h3>

      <p className="text-sm text-gray-500">${price}</p>
    </div>
  );
}
