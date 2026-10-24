import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function CategoryRow({ data }) {
  // ক্যাটাগরি ৪টি নাকি ৫টি তার ওপর ভিত্তি করে গ্রিড কলাম অটো-অ্যাডজাস্ট হবে
  const gridCols =
    categories.length === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className="py-10 sm:py-14">
      <Container>
        {/* ১. বাঁ পাশের মিসিং সেকশন হেডিং এবং ডান পাশের লিঙ্ক */}
        <Reveal
          variant="up"
          className="mb-6 sm:mb-8 flex items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
              আমাদের কালেকশন
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-3xl text-espresso font-display">
              {data?.title || "ক্যাটাগরি সমূহ"}
            </h2>
          </div>
          <Link
            href="/shop"
            className="group mb-1.5 flex items-center gap-2 text-sm sm:text-base font-semibold text-espresso transition-colors hover:text-gold-dark"
          >
            {data?.linkLabel || "সবগুলো দেখুন"}
            <Icon
              name="arrowRight"
              size={16}
              className="text-gold-dark transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        {/* ২. পুরো রো জুড়ে সাজানো হরাইজন্টাল কার্ড (বামে ছবি, ডানে টাইটেল) */}
        <ul className={`grid gap-4 sm:gap-5 lg:gap-6 w-full ${gridCols}`}>
          {categories.map((category, index) => (
            <li key={category.id} className="w-full">
              <Reveal variant="up" delay={index * 80} className="h-full">
                <Link
                  href={`/shop?category=${category.id}`}
                  className="group relative flex h-full items-center gap-3.5 sm:gap-4 rounded-3xl border border-cream-200/90 bg-cream-50 p-3 sm:p-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:bg-gold-soft/30 hover:shadow-lift"
                >
                  {/* বামে: মডেলের ছবি (মাথা কাটবে না, গোল্ডেন রিং সহ) */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl bg-cream-100 ring-2 ring-gold/20 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:ring-gold">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="96px"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-espresso-400">
                        <Icon name="package" size={26} />
                      </div>
                    )}
                  </div>

                  {/* ডানে: টাইটেল ও অ্যারো বাটন */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-espresso-400">
                      প্রিমিয়াম
                    </span>

                    <h3 className="mt-0.5 truncate text-lg sm:text-xl font-bold text-espresso transition-colors duration-300 group-hover:text-gold-dark">
                      {category.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-espresso-600 transition-colors group-hover:text-gold-dark">
                      <span>কালেকশন</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-soft text-espresso transition-all duration-300 group-hover:bg-gold group-hover:translate-x-1">
                        <Icon name="arrowRight" size={11} strokeWidth={2.8} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
