import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5D5C5] bg-[#3B3A2F] text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-serif text-xl font-light tracking-[0.15em] text-white"
            >
              DITTO
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Clinically-backed cycle supplements. 88% had reduced symptom
              severity.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Cycle Supplement
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Give 20%, Get 20%
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              About
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Quality &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Our Science
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Help
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} Muse Nutrition. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
