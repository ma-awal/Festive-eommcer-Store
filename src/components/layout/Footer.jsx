import Link from "next/link";
import site from "@/data/site.json";
import { categories } from "@/lib/products";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";

function LeafDecoration() {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      stroke="#F2B01E"
      strokeWidth="1.4"
      strokeLinecap="round"
      className="pointer-events-none absolute bottom-0 right-2 h-24 w-32 opacity-80 sm:right-6 sm:h-28 sm:w-40"
      aria-hidden="true"
    >
      <path d="M20 118c30-6 60-40 70-90 30 18 40 50 20 80-18 20-60 22-90 10z" />
      <path d="M20 118c30-20 50-50 70-90" />
      <path d="M95 118c10-30 40-50 62-52-2 30-20 50-62 52z" />
      <path d="M95 118c20-22 36-38 62-52" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    /* ব্যাকগ্রাউন্ড কালার এখন স্ক্রিনের ফুল-উইডথ (Edge-to-Edge) জুড়ে থাকবে */
    <footer className="relative w-full overflow-hidden bg-night text-cream pb-24 pt-14 lg:pb-8 lg:pt-16">
      {/* ভেতরের উপাদানগুলো ১৪৪০px কন্টেইনারে সমানভাবে এলাইন থাকবে */}
      <Container className="relative z-10 grid gap-10 pb-12 sm:pb-14 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.3fr] lg:gap-8">
        <div className="lg:pr-8">
          <Logo tone="light" size="lg" />
          <p className="mt-5 max-w-sm leading-relaxed text-cream/70 text-sm sm:text-base">
            {site.tagline}
          </p>
          <ul className="mt-6 flex gap-3">
            {site.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-espresso"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:contents">
          <div className="lg:border-l lg:border-white/10 lg:pl-8">
            <h3 className="font-sans text-base font-semibold text-white">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="mt-4 space-y-3">
              {site.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-4">
            <h3 className="font-sans text-base font-semibold text-white">
              ক্যাটাগরি
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/shop?category=${category.id}`}
                    className="text-sm text-cream/70 transition hover:text-gold"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:pl-8">
          <h3 className="font-sans text-base font-semibold text-white">
            {site.newsletter.title}
          </h3>
          <p className="mb-5 mt-3 max-w-sm text-sm text-cream/70">
            {site.newsletter.text}
          </p>
          <NewsletterForm />
        </div>
      </Container>

      <LeafDecoration />

      {/* নিচের কপিরাইট ও লিগ্যাল লিঙ্ক বার */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <ul className="flex items-center gap-6 sm:mr-28">
            {site.legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
