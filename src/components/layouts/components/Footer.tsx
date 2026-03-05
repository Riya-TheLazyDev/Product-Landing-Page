export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="container-page grid grid-cols-4 gap-10 py-14 text-sm">
        <div>
          <h3 className="font-semibold text-lg mb-3">VELVETY</h3>
          <p>Opening hours</p>
          <p>Monday to Saturday</p>
          <p>10:30 am – 7 pm</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2">
            <li>Skincare</li>
            <li>Facial</li>
            <li>Soap</li>
            <li>Auto fragrances</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Help Desk</h4>
          <ul className="space-y-2">
            <li>Chat</li>
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Stores</h4>
          <ul className="space-y-2">
            <li>Manhattan</li>
            <li>Brooklyn</li>
            <li>Tokyo</li>
            <li>Paris</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
