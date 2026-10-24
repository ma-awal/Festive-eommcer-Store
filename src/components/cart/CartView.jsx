"use client";

import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import EmptyState from "@/components/ui/EmptyState";
import QtyStepper from "@/components/ui/QtyStepper";
import PromoCodeForm from "@/components/cart/PromoCodeForm";

export default function CartView() {
  const {
    hydrated,
    lines,
    itemCount,
    subtotal,
    totals,
    setQty,
    removeLine,
    promo,
  } = useStore();

  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  // কার্ট খালি থাকলে প্রদর্শিত স্ক্রিন
  if (lines.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="আপনার শপিং কার্ট খালি"
        text="আপনার পছন্দের পাঞ্জাবি, শাড়ি বা অন্য যেকোনো পোশাক কার্টে যোগ করে অর্ডার শুরু করুন।"
        action={{ label: "কালেকশন দেখুন", href: "/shop" }}
      />
    );
  }

  const remaining = Math.max(0, site.shipping.freeOver - subtotal);
  const progress = Math.min(100, (subtotal / site.shipping.freeOver) * 100);

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <div className="flex items-end justify-between border-b border-cream-200 pb-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-espresso">
            শপিং কার্ট{" "}
            <span className="text-espresso-400 text-2xl sm:text-3xl font-sans">
              ({itemCount} টি পণ্য)
            </span>
          </h1>
          <Link
            href="/shop"
            className="hidden text-sm sm:text-base font-semibold text-espresso underline underline-offset-4 hover:text-gold-dark sm:block"
          >
            আরও কেনাকাটা করুন
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div>
            {/* ফ্রি শিপিং প্রগ্রেস বার */}
            <div className="rounded-3xl border border-gold/30 bg-gold-soft/60 px-5 py-4 text-sm shadow-sm">
              {remaining > 0 ? (
                <p className="text-espresso">
                  ফ্রি ডেলিভারির জন্য আরও{" "}
                  <strong>{formatPrice(remaining)}</strong> টাকার পণ্য যোগ করুন।
                </p>
              ) : (
                <p className="flex items-center gap-2 font-bold text-gold-deep">
                  <Icon name="truck" size={18} /> অভিনন্দন! আপনি ফ্রি ডেলিভারি
                  পাচ্ছেন!
                </p>
              )}
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/80 shadow-inner">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* কার্ট আইটেম লিস্ট */}
            <ul className="mt-5 space-y-3.5">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-3 sm:p-4 shadow-soft transition-all duration-300 hover:border-gold/50"
                >
                  {/* প্রোডাক্ট ইমেজ (মাথা কাটা প্রতিরোধ ও ফলব্যাক সহ) */}
                  <Link
                    href={`/product/${line.slug}`}
                    className="relative h-28 w-24 sm:h-32 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 shadow-sm"
                  >
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="112px"
                        className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-espresso-400">
                        <Icon name="package" size={26} />
                      </div>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${line.slug}`}
                          className="block truncate font-semibold text-espresso hover:text-gold-dark text-base sm:text-lg"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-xs sm:text-sm text-espresso-500">
                          রঙ:{" "}
                          <span className="font-medium text-espresso">
                            {line.color}
                          </span>
                        </p>
                        <p className="mt-1 font-bold text-espresso text-base sm:text-lg">
                          {formatPrice(line.price)}
                        </p>
                      </div>

                      {/* পণ্য রিমুভ বাটন */}
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`${line.name} কার্ট থেকে মুছুন`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-espresso-400 transition-colors hover:bg-red-50 hover:text-red-700"
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-cream-200/80">
                      <QtyStepper
                        value={line.qty}
                        onChange={(next) => setQty(line.key, next)}
                        label={line.name}
                      />
                      <p className="font-bold text-espresso text-base sm:text-lg">
                        {formatPrice(line.price * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ডান পাশের অর্ডার সামারি ও চেকআউট বাটন */}
          <aside className="h-fit space-y-5 rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-7 lg:sticky lg:top-28">
            <PromoCodeForm />

            <dl className="space-y-3.5 border-t border-cream-200 pt-5 text-sm sm:text-base">
              <div className="flex justify-between text-espresso-600">
                <dt>সাবটোটাল</dt>
                <dd className="font-bold text-espresso">
                  {formatPrice(totals.subtotal)}
                </dd>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <dt>ডিসকাউন্ট ({promo})</dt>
                  <dd>-{formatPrice(totals.discount)}</dd>
                </div>
              )}

              <div className="flex justify-between text-espresso-600">
                <dt>ডেলিভারি চার্জ</dt>
                <dd className="font-bold text-espresso">
                  {totals.shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">ফ্রি</span>
                  ) : (
                    formatPrice(totals.shipping)
                  )}
                </dd>
              </div>

              <div className="flex justify-between border-t border-cream-200 pt-4 text-xl font-bold text-espresso">
                <dt>সর্বমোট মূল্য</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>

            <Button href="/checkout" size="lg" className="w-full shadow-glow">
              অর্ডার করতে এগিয়ে যান
              <Icon name="arrowRight" size={18} />
            </Button>

            <Link
              href="/shop"
              className="block text-center text-sm font-semibold text-espresso-600 underline underline-offset-4 hover:text-gold-dark"
            >
              আরও কেনাকাটা করুন
            </Link>

            <p className="flex items-center justify-center gap-2 text-xs text-espresso-500 font-medium">
              <Icon name="lock" size={13} /> ১০০% নিরাপদ চেকআউট
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
