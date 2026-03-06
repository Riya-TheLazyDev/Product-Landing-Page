import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 text-sm">
      {/* MAIN GRID */}
      <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-border/40">
        {/* COL 1 */}
        <div className="flex flex-col items-center border-r border-b lg:border-b-0 border-border/40 px-8 text-center py-12">
          <h3 className="text-2xl font-serif mb-2 tracking-tight">VELVETY</h3>

          <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-8 font-sans">
            Facial & skincare
          </p>

          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-2">
            Opening hours
          </p>

          <p className="text-sm font-medium">Monday to Saturday:</p>
          <p className="text-sm font-medium mb-8 text-foreground/80">
            10:30 a.m. to 7 p.m.
          </p>

          <div className="flex gap-5 text-foreground/60">
            <Instagram
              size={18}
              className="hover:text-foreground cursor-pointer transition-colors"
            />
            <Twitter
              size={18}
              className="hover:text-foreground cursor-pointer transition-colors"
            />
            <Facebook
              size={18}
              className="hover:text-foreground cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* COL 2 */}
        <div className="border-r border-b sm:border-b-0 border-border/40 px-8 text-center py-12">
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">
            Shop
          </h4>

          <ul className="space-y-3 text-sm text-foreground/60">
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Skincare
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Facial
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Soap
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Candles
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Auto Fragrances
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Gifts
            </li>
          </ul>
        </div>

        {/* COL 3 */}
        <div className="border-r border-b lg:border-b-0 border-border/40 px-8 text-center py-12">
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">
            Help Desk
          </h4>

          <ul className="space-y-3 text-sm text-foreground/60">
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Chat
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Contact
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Policies
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Accessibility
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              My Account
            </li>
          </ul>
        </div>

        {/* COL 4 */}
        <div className="border-r border-border/40 px-8 text-center py-12">
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">
            Stores
          </h4>

          <ul className="space-y-3 text-sm text-foreground/60">
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Manhattan
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Brooklyn
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Tokyo
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Jakarta
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Paris
            </li>
            <li className="hover:text-foreground transition-colors cursor-pointer">
              Buenos Aires
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-border/40">
        <div className="container-page flex flex-col md:flex-row items-center justify-between py-8 md:py-6 gap-6 text-[10px] uppercase tracking-widest text-foreground/40 font-medium text-center md:text-left">
          <p>© Designed by DhuhaCreative. Powered by UI8.</p>

          <div className="flex gap-8">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Licenses
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
