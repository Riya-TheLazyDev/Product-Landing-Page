import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container-page flex items-center justify-between py-5">
        <h1 className="text-xl font-semibold text-green-900">VELVETY</h1>

        <nav className="flex gap-8 text-sm">
          <a href="#">Pages</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
        </nav>

        <div className="flex items-center gap-6 text-sm">
          <button>Login</button>
          <ShoppingCart size={18} />
        </div>
      </div>
    </header>
  );
}
