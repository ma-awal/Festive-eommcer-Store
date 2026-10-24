"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import orderContent from "@/data/order.json";
import { useStore } from "@/context/StoreContext";
import { formatDate, formatPrice } from "@/lib/format";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import EmptyState from "@/components/ui/EmptyState";
import OrderSummary from "@/components/cart/OrderSummary";
import RateModal from "@/components/order/RateModal";

export default function OrderView() {
  const { hydrated, lastOrder, updateOrder } = useStore();
  const [rateOpen, setRateOpen] = useState(false);
  const closeRate = useCallback(() => setRateOpen(false), []);

  if (!hydrated) return <div className="min-h-[50vh]" aria-busy="true" />;

  // কোনো অর্ডার না থাকলে প্রদর্শিত খালি ভিউ
  if (!lastOrder) {
    return (
      <EmptyState
        icon="package"
        title="এখনও কোনো অর্ডার নেই"
        text="আপনি যখন কোনো পোশাক অর্ডার করবেন, তা এখানে দেখতে পাবেন এবং সরাসরি ট্র্যাক করতে পারবেন।"
        action={{ label: "কেনাকাটা শুরু করুন", href: "/shop" }}
      />
    );
  }

  const { shipping } = lastOrder;
  const rowClass =
    "flex w-full items-center gap-4 rounded-2xl border border-cream-200 bg-cream-50 p-4 text-left shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-lift";

  const helpContent = (item) => (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep shadow-sm">
        <Icon name={item.icon} size={20} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold text-espresso">{item.title}</span>
        <span className="block text-sm text-espresso-500">
          {item.action === "rate" && lastOrder.rating
            ? `আপনি ৫-এর মধ্যে ${lastOrder.rating} রেটিং দিয়েছেন`
            : item.text}
        </span>
      </span>
      <Icon
        name="chevronRight"
        size={18}
        className="text-espresso-400 shrink-0"
      />
    </>
  );

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-espresso">
          আপনার অর্ডার
        </h1>
        <p className="mt-2 text-sm sm:text-base text-espresso-600">
          অর্ডার নম্বর:{" "}
          <strong className="text-espresso font-bold">#{lastOrder.id}</strong> ·
          অর্ডারের তারিখ: {formatDate(lastOrder.placedAt)}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div className="space-y-6">
            {/* অর্ডারের পণ্য তালিকা */}
            <ul className="space-y-3.5">
              {lastOrder.items.map((item) => (
                <li
                  key={`${item.id}-${item.color}`}
                  className="flex gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-3 sm:p-4 shadow-soft"
                >
                  {/* থাম্বনেইল ইমেজ (মাথা কাটা বন্ধ ও ছবি না থাকলে ফলব্যাক) */}
                  <span className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 flex items-center justify-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <Icon
                        name="package"
                        size={24}
                        className="text-espresso-400"
                      />
                    )}
                  </span>

                  <div className="flex flex-col justify-center min-w-0">
                    <p className="font-semibold text-espresso text-base sm:text-lg truncate">
                      {item.name}
                    </p>
                    <p className="mt-1 text-base sm:text-lg font-bold text-espresso">
                      {formatPrice(item.price)}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-espresso-500">
                      রঙ:{" "}
                      <span className="font-medium text-espresso">
                        {item.color}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-espresso-500">
                      পরিমাণ:{" "}
                      <span className="font-medium text-espresso">
                        {item.qty} টি
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* অর্ডার ট্র্যাকিং বাটন */}
            <Button href="/track" size="lg" className="w-full shadow-glow">
              <Icon name="truck" size={20} /> অর্ডার ট্র্যাক করুন
            </Button>

            {/* সহায়তা ও রিভিউ অপশন */}
            <ul className="space-y-3">
              {orderContent.help.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} className={rowClass}>
                      {helpContent(item)}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRateOpen(true)}
                      className={rowClass}
                    >
                      {helpContent(item)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-5">
            {/* অর্ডার সামারি */}
            <OrderSummary
              lines={lastOrder.items}
              totals={lastOrder.totals}
              promo={lastOrder.promo}
              title="অর্ডার সামারি"
            />

            {/* ডেলিভারি ও পেমেন্ট বিস্তারিত */}
            <div className="rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-6">
              <h2 className="text-2xl font-display text-espresso">
                ডেলিভারির বিবরণ
              </h2>
              <address className="mt-3 text-sm sm:text-[15px] not-italic leading-relaxed text-espresso-600">
                <span className="block font-bold text-espresso">
                  {shipping.fullName}
                </span>
                <span className="block">{shipping.address}</span>
                <span className="block">
                  {shipping.city}{" "}
                  {shipping.postalCode ? `, ${shipping.postalCode}` : ""}
                </span>
                <span className="block font-medium mt-1">{shipping.phone}</span>
              </address>

              <div className="mt-5 border-t border-cream-200 pt-4 space-y-2 text-sm text-espresso-600">
                <p>
                  পেমেন্ট মাধ্যম:{" "}
                  <span className="font-bold text-espresso">
                    {lastOrder.payment}
                  </span>
                </p>
                <p>
                  সম্ভাব্য ডেলিভারি:{" "}
                  <span className="font-bold text-espresso">
                    {lastOrder.estimatedDelivery}
                  </span>
                </p>
              </div>
            </div>

            {/* ধন্যবাদ ব্যানার বা প্লেসহোল্ডার */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cream-200 bg-cream-100 shadow-soft flex items-center justify-center">
              {orderContent.thanksImage ? (
                <Image
                  src={orderContent.thanksImage}
                  alt={orderContent.thanksAlt || "ধন্যবাদ"}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="p-6 text-center text-espresso">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-deep mb-3 shadow-sm">
                    <Icon name="sparkle" size={26} />
                  </span>
                  <p className="font-display text-2xl font-normal text-espresso">
                    আমাদের সাথে থাকার জন্য ধন্যবাদ!
                  </p>
                  <p className="mt-1 text-sm text-espresso-600">
                    আপনার সুন্দর ও পরিপাটি সাজের বিশ্বস্ত ঠিকানা—জাইরা।
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {/* রেটিং দেওয়ার পপআপ মডাল */}
      <RateModal
        open={rateOpen}
        onClose={closeRate}
        initialRating={lastOrder.rating || 0}
        onSubmit={({ rating, review }) => updateOrder({ rating, review })}
      />
    </section>
  );
}
