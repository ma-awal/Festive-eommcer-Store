"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import tracking from "@/data/tracking.json";
import { useStore } from "@/context/StoreContext";
import { formatDateTime } from "@/lib/format";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import EmptyState from "@/components/ui/EmptyState";

const HOUR = 3600 * 1000;

export default function TrackView() {
  const { hydrated, lastOrder } = useStore();
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const stages = useMemo(() => {
    if (!lastOrder) return [];
    const start = new Date(lastOrder.placedAt).getTime();
    return tracking.stages.map((stage) => ({
      ...stage,
      time: new Date(start + (stage.offsetHours * HOUR) / tracking.timeScale),
    }));
  }, [lastOrder]);

  if (!hydrated || now === null)
    return <div className="min-h-[50vh]" aria-busy="true" />;

  // কোনো অর্ডার না থাকলে প্রদর্শিত স্ক্রিন
  if (!lastOrder) {
    return (
      <EmptyState
        icon="package"
        title="ট্র্যাক করার মতো কোনো অর্ডার নেই"
        text="একটি অর্ডার সম্পন্ন করুন, এরপর আপনি এখানে সেটির ডেলিভারির অবস্থান সরাসরি ট্র্যাক করতে পারবেন।"
        action={{ label: "কেনাকাটা শুরু করুন", href: "/shop" }}
      />
    );
  }

  const reachedCount = stages.filter((s) => s.time.getTime() <= now).length;
  const currentIndex = Math.max(0, reachedCount - 1);
  const current = stages[currentIndex];
  const delivered = currentIndex === stages.length - 1;
  const deliveryTime = stages[stages.length - 1].time.getTime();
  const hoursLeft = Math.max(0, (deliveryTime - now) / HOUR);
  const daysLeft = Math.ceil(hoursLeft / 24);

  // বাংলায় ডেলিভারির আনুমানিক সময়
  let arrival = `${daysLeft} দিনের মধ্যে ডেলিভারি হবে`;
  if (delivered)
    arrival = `ডেলিভারি সম্পন্ন: ${formatDateTime(
      stages[stages.length - 1].time
    )}`;
  else if (hoursLeft <= 12) arrival = "আজকের মধ্যেই ডেলিভারি হবে";

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <div className="flex items-center gap-3">
          <Link
            href="/order"
            aria-label="অর্ডারে ফিরে যান"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 transition hover:bg-gold-soft"
          >
            <Icon name="arrowLeft" size={18} />
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-espresso">
            অর্ডার ট্র্যাক করুন
          </h1>
        </div>

        <p className="mt-2 text-sm sm:text-base text-espresso-600">
          অর্ডার নম্বর:{" "}
          <strong className="text-espresso font-bold">#{lastOrder.id}</strong>
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* স্টেপ টাইমলাইন */}
          <ol className="rounded-3xl border border-cream-200 bg-cream-50 p-6 shadow-soft sm:p-8">
            {stages.map((stage, index) => {
              const done = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const last = index === stages.length - 1;

              return (
                <li
                  key={stage.id}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {/* কানেক্টিং লাইন */}
                  {!last && (
                    <span
                      className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 transition-colors duration-500 ${
                        index < currentIndex ? "bg-gold" : "bg-cream-200"
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  {/* স্ট্যাটাস বাবল */}
                  <span
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      done
                        ? "bg-gold text-espresso shadow-sm"
                        : "border-2 border-cream-300 bg-cream-50"
                    } ${isCurrent && !delivered ? "ring-4 ring-gold/30" : ""}`}
                  >
                    {done && <Icon name="check" size={16} strokeWidth={3} />}
                  </span>

                  <div className="pt-0.5 min-w-0">
                    <p
                      className={`font-semibold text-base ${
                        done ? "text-espresso" : "text-espresso-400"
                      }`}
                    >
                      {stage.label}
                    </p>
                    <p className="text-xs sm:text-sm text-espresso-500 mt-0.5">
                      {formatDateTime(stage.time)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ট্র্যাকিং ম্যাপ ও প্রগ্রেস কার্ড */}
          <div className="h-fit overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-soft">
            <div className="relative aspect-[5/2] bg-cream-100 flex items-center justify-center overflow-hidden">
              {tracking.mapImage ? (
                <Image
                  src={tracking.mapImage}
                  alt={tracking.mapAlt || "ডেলিভারি রুট ম্যাপ"}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-espresso-400">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold-deep mb-2 shadow-sm">
                    <Icon name="pin" size={24} />
                  </span>
                  <p className="text-xs font-semibold text-espresso-600">
                    ডেলিভারি লোকেশন ও রুট
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-display text-2xl text-espresso font-normal">
                {current.message}
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-gold-deep">
                {arrival}
              </p>

              {/* ডেলিভারি প্রগ্রেস বার */}
              {!delivered && (
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-700 ease-out shadow-sm"
                    style={{
                      width: `${(currentIndex / (stages.length - 1)) * 100}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
