"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import site from "@/data/site.json";
import { getCategory } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/context/StoreContext";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Stars from "@/components/ui/Stars";
import QtyStepper from "@/components/ui/QtyStepper";
import WishlistButton from "@/components/shop/WishlistButton";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addItem } = useStore();
  const [color, setColor] = useState(
    product.defaultColor || product.colors[0]?.name
  );
  const [qty, setQty] = useState(1);
  const category = getCategory(product.category);

  const add = () => addItem(product.id, { color, qty });
  const buyNow = () => {
    addItem(product.id, { color, qty, silent: true });
    router.push("/checkout");
  };

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        {/* ব্রেডক্রাম্ব / নেভিগেশন */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-espresso-500"
        >
          <Link
            href="/shop"
            className="transition-colors hover:text-gold-dark font-medium"
          >
            সকল কালেকশন
          </Link>
          <Icon name="chevronRight" size={14} />
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-gold-dark font-medium"
          >
            {category?.name || "কালেকশন"}
          </Link>
          <Icon name="chevronRight" size={14} />
          <span className="text-espresso font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* ১. প্রোডাক্ট ইমেজ ফ্রেম (মাথা কাটা বন্ধ করতে object-top ও aspect-[3/4] সেট করা) */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-[32px] border border-cream-200 bg-cream-100 shadow-soft lg:max-w-none">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                /* object-top এর কারণে মডেলদের মাথা ও গলার ডিজাইন পুরোপুরি দৃশ্যমান থাকবে */
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-espresso-400">
                <Icon
                  name="package"
                  size={56}
                  className="text-gold"
                  strokeWidth={1.5}
                />
                <p className="mt-3 font-semibold text-espresso-700">
                  পণ্যের ছবি শীঘ্রই আসছে
                </p>
              </div>
            )}
            <WishlistButton
              productId={product.id}
              productName={product.name}
              size="lg"
              className="absolute right-4 top-4 shadow-md"
            />
          </div>

          {/* ২. প্রোডাক্ট বিস্তারিত তথ্য */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
              {category?.name}
            </span>
            <h1 className="mt-2 text-3xl font-display leading-tight text-espresso sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* রিভিউ এবং রেটিং */}
            <div className="mt-3.5 flex items-center gap-3 text-sm text-espresso-500">
              <Stars rating={product.rating} size={17} />
              <span className="font-medium">
                {product.rating} ({product.reviews} টি কাস্টমার রিভিউ)
              </span>
            </div>

            {/* মূল্য */}
            <p className="mt-5 text-3xl sm:text-4xl font-bold text-espresso">
              {formatPrice(product.price)}
            </p>
            <p className="mt-3.5 max-w-lg leading-relaxed text-espresso-600 text-base sm:text-lg">
              {product.description}
            </p>

            {/* কালার ভেরিয়েন্ট */}
            {product.colors && product.colors.length > 0 && (
              <fieldset className="mt-6 border-t border-cream-200 pt-5">
                <legend className="text-sm font-semibold text-espresso">
                  উপলব্ধ রঙ:{" "}
                  <span className="font-normal text-espresso-600">{color}</span>
                </legend>
                <div
                  className="mt-3 flex gap-3"
                  role="radiogroup"
                  aria-label="রঙ নির্বাচন করুন"
                >
                  {product.colors.map((option) => (
                    <button
                      key={option.name}
                      type="button"
                      role="radio"
                      aria-checked={color === option.name}
                      aria-label={option.name}
                      onClick={() => setColor(option.name)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        color === option.name
                          ? "border-gold-dark scale-110 shadow-sm"
                          : "border-transparent hover:border-espresso/20"
                      }`}
                    >
                      <span
                        className="block h-7 w-7 rounded-full ring-1 ring-espresso/15 shadow-inner"
                        style={{ backgroundColor: option.hex }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* পরিমাণ (Quantity) নির্বাচন */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-espresso">
                পরিমাণ:
              </span>
              <QtyStepper value={qty} onChange={setQty} label={product.name} />
            </div>

            {/* অ্যাকশন বাটনসমূহ (ডেস্কটপ) */}
            <div className="mt-8 hidden gap-3.5 sm:flex">
              <Button
                type="button"
                size="lg"
                className="flex-1 shadow-soft"
                onClick={add}
              >
                <Icon name="cart" size={18} /> কার্টে যোগ করুন
              </Button>
              <Button
                type="button"
                size="lg"
                variant="dark"
                className="flex-1 shadow-soft"
                onClick={buyNow}
              >
                এখনই অর্ডার করুন
              </Button>
            </div>

            {/* গুরুত্বপূর্ণ বৈশিষ্ট্য ও নিশ্চয়তা */}
            <ul className="mt-8 grid gap-3 rounded-3xl border border-cream-200 bg-cream-100/70 p-5 text-sm sm:text-[15px] font-medium text-espresso-700">
              <li className="flex items-center gap-3">
                <Icon
                  name="truck"
                  size={20}
                  className="text-gold-deep shrink-0"
                />
                <span>
                  {formatPrice(site.shipping.freeOver)} টাকার অর্ডারে সারা দেশে
                  ফ্রি ডেলিভারি
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Icon
                  name="refresh"
                  size={20}
                  className="text-gold-deep shrink-0"
                />
                <span>পণ্য হাতে পেয়ে দেখে নেওয়ার ক্যাশ অন ডেলিভারি সুবিধা</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon
                  name="shield"
                  size={20}
                  className="text-gold-deep shrink-0"
                />
                <span>৭ দিনের সহজ সাইজ এক্সচেঞ্জ ও রিটার্ন গ্যারান্টি</span>
              </li>
            </ul>

            {/* অ্যাকর্ডিয়ন: পণ্যের বিবরণ ও ডেলিভারি পলিসি */}
            <div className="mt-6 divide-y divide-cream-200 border-y border-cream-200">
              <details className="group py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-espresso">
                  পণ্যের বিশেষ বিবরণ ও ফেব্রিক
                  <Icon
                    name="chevronDown"
                    size={18}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm sm:text-base text-espresso-600">
                  {product.details?.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-espresso">
                  ডেলিভারি এবং রিটার্ন পলিসি
                  <Icon
                    name="chevronDown"
                    size={18}
                    className="transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-espresso-600">
                  ডেলিভারি সময়সীমা {site.shipping.estimate}।{" "}
                  {formatPrice(site.shipping.freeOver)} টাকার অর্ডারে ডেলিভারি
                  চার্জ সম্পূর্ণ ফ্রি, অন্যথায় সারা দেশে ডেলিভারি ফি মাত্র{" "}
                  {formatPrice(site.shipping.fee)}। সাইজ বা রঙের কোনো সমস্যা হলে
                  পণ্য পাওয়ার ৭ দিনের মধ্যে যোগাযোগ করে সহজে এক্সচেঞ্জ করে নিতে
                  পারবেন।{" "}
                  <Link
                    href="/terms#returns"
                    className="font-semibold text-gold-dark underline"
                  >
                    রিটার্ন পলিসি পড়ুন
                  </Link>
                </p>
              </details>
            </div>
          </div>
        </div>
      </Container>

      {/* মোবাইলের জন্য নিচের ফিক্সড অ্যাকশন বার */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-cream-50/95 px-4 pt-3 backdrop-blur-xl sm:hidden shadow-lift"
        style={{
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-espresso-500 font-medium">সর্বমোট</p>
            <p className="text-xl font-bold leading-none text-espresso">
              {formatPrice(product.price * qty)}
            </p>
          </div>
          <Button type="button" size="lg" className="flex-1" onClick={add}>
            <Icon name="cart" size={18} /> কার্টে যোগ করুন
          </Button>
        </div>
      </div>
    </section>
  );
}
