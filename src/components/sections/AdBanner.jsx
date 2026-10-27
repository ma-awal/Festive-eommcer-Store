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
          <div className="relative isolate flex min-h-[300px] max-h-[450px] w-full flex-col items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-cream-50 via-[#FEF1D6] to-[#FCE2A0] px-6 py-10 text-center text-espresso sm:min-h-[360px] sm:px-12">
            {/* হিরো সেকশনের মতো একই গোল্ড ব্লার সার্কেল */}
            <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 animate-float rounded-full bg-gold/20 blur-3xl" />

            {/* ছোট ব্যাজ */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold-deep backdrop-blur-md sm:text-sm">
              <Icon name="truck" size={17} strokeWidth={2.2} />
              <span>{data?.badge || "ক্যাশ অন ডেলিভারি"}</span>
            </div>

            {/* মেইন হাইলাইট টেক্সট */}
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-normal leading-tight text-espresso sm:text-4xl">
              {data?.title || "সারা দেশে ক্যাশ অন ডেলিভারি"}
            </h2>

            {/* সংক্ষিপ্ত সাবটেক্সট */}
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-espresso-500 sm:text-base">
              {data?.description ||
                "কোনো প্রকার অগ্রিম পেমেন্ট ছাড়াই অর্ডার করুন ঘরে বসে। পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা।"}
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
