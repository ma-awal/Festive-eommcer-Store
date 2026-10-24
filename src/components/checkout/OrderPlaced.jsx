import Image from "next/image";
import checkout from "@/data/checkout.json";
import site from "@/data/site.json";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function OrderPlaced({ order }) {
  const content = checkout.placed;

  return (
    <div className="mx-auto max-w-xl text-center py-4 sm:py-8">
      {/* সফলতার গোল্ডেন অ্যানিমেশন টিক চিহ্ন */}
      <span className="mx-auto flex h-20 w-20 animate-pop items-center justify-center rounded-full bg-gold shadow-glow">
        <svg
          viewBox="0 0 24 24"
          width="38"
          height="38"
          fill="none"
          stroke="#1D1710"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            strokeDasharray="60"
            className="animate-draw"
          />
        </svg>
      </span>

      <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-espresso">
        {content.title || "আপনার অর্ডারটি সফল হয়েছে!"}
      </h1>

      <p className="mt-3 text-base sm:text-lg text-espresso-600">
        {content.text ||
          "জাইরা-র সাথে কেনাকাটা করার জন্য আপনাকে আন্তরিক ধন্যবাদ।"}
      </p>

      <p className="mt-1 text-sm sm:text-base text-espresso-500">
        আপনার অর্ডার নম্বর:{" "}
        <strong className="text-espresso font-bold">#{order.id}</strong>
      </p>

      {/* আনুমানিক ডেলিভারি সময় বক্স */}
      <div className="mt-7 rounded-3xl border border-cream-200 bg-cream-100/70 px-6 py-5 shadow-soft">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-deep">
          সম্ভাব্য ডেলিভারি সময়
        </p>
        <p className="mt-1 text-xl sm:text-2xl font-bold text-espresso">
          {order.estimatedDelivery || site.shipping.estimate}
        </p>
      </div>

      {/* অ্যাকশন বাটনসমূহ */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/order" size="lg" className="sm:min-w-[220px]">
          অর্ডারের বিবরণ দেখুন
        </Button>
        <Button
          href="/shop"
          size="lg"
          variant="outline"
          className="sm:min-w-[200px]"
        >
          আরও কেনাকাটা করুন
        </Button>
      </div>

      {/* নিচের ব্যানার ছবি (ছবি না থাকলে সুন্দর প্লেসহোল্ডার দেখাবে, ক্র্যাশ করবে না) */}
      <div className="relative mx-auto mt-10 aspect-[4/3] max-w-md overflow-hidden rounded-[28px] border border-cream-200 bg-cream-50 shadow-soft">
        {content.image ? (
          <Image
            src={content.image}
            alt={content.imageAlt || "অর্ডার সফল"}
            fill
            sizes="(min-width: 640px) 448px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-espresso-400">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-dark mb-3 shadow-sm">
              <Icon name="package" size={28} strokeWidth={1.8} />
            </span>
            <p className="font-semibold text-espresso-700 text-base">
              আমরা আপনার পার্সেলটি প্রস্তুত করছি
            </p>
            <p className="mt-1 text-xs text-espresso-500">
              খুব শীঘ্রই ডেলিভারি প্রতিনিধির মাধ্যমে পাঠানো হবে
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
