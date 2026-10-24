import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function AdBanner({ data }) {
  return (
    <section className="w-full py-6 sm:py-10">
      <Container>
        <Reveal variant="up">
          {/* সর্বোচ্চ ৪৫০px উচ্চতা এবং সেন্টারে অ্যালাইন করা বক্স */}
          <div className="relative isolate flex min-h-[300px] sm:min-h-[360px] max-h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-r from-[#17110A] via-[#2D1F12] to-[#17110A] px-6 py-10 text-center text-cream shadow-lift sm:px-12 border border-gold/15">
            {/* ব্যাকগ্রাউন্ড সফট গ্রেডিয়েন্ট গ্লো লাইট ইফেক্ট */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-gold/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 right-1/4 -z-10 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />

            {/* ছোট ব্যাজ */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold backdrop-blur-md sm:text-sm">
              <Icon name="truck" size={17} strokeWidth={2.2} />
              <span>{data?.badge || "ক্যাশ অন ডেলিভারি"}</span>
            </div>

            {/* মেইন হাইলাইট টেক্সট */}
            <h2 className="mt-4 max-w-2xl font-display text-3xl   font-normal leading-tight text-white">
              {data?.title || "সারা দেশে ক্যাশ অন ডেলিভারি"}
            </h2>

            {/* সংক্ষিপ্ত সাবটেক্সট */}
            <p className="mt-3 max-w-lg text-sm sm:text-base text-cream/75 leading-relaxed">
              {data?.description ||
                "কোনো প্রকার অগ্রিম পেমেন্ট ছাড়াই অর্ডার করুন ঘরে বসে। পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা।"}
            </p>

            {/* CTA বাটন */}
            <div className="mt-6 sm:mt-8">
              <Button
                href={data?.ctaHref || "/shop"}
                size="lg"
                className="shadow-glow"
              >
                {data?.ctaLabel || "কালেকশন থেকে অর্ডার করুন"}
                <Icon name="arrowRight" size={18} />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
