import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";

export default function Hero({ data }) {
  const delay = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-cream-50 via-[#FEF1D6] to-[#FCE2A0] py-8 sm:py-14 lg:py-20">
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-80 w-80 animate-float rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-80 w-80 animate-float rounded-full bg-gold/20 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col justify-center">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-espresso-700 shadow-sm backdrop-blur sm:text-sm animate-fade-up"
              style={delay(100)}
            >
              <Icon name="sparkle" size={14} className="text-gold-dark" />
              {data.eyebrow}
            </span>

            <h1 className="mt-5 text-4xl leading-[1.15] text-espresso sm:text-6xl lg:text-[4.5rem]">
              {data.titleLines.map((line, index) => (
                <span
                  key={line}
                  className="block animate-fade-up"
                  style={delay(220 + index * 140)}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-5 max-w-lg animate-fade-up text-base leading-relaxed text-espresso-600 sm:text-lg"
              style={delay(560)}
            >
              {data.description}
            </p>

            <div
              className="mt-8 flex flex-wrap gap-4 animate-fade-up"
              style={delay(700)}
            >
              <Button href={data.cta.href} size="lg">
                {data.cta.label}
                <Icon name="arrowRight" size={18} />
              </Button>
            </div>
          </div>

          {/* Image Placeholder Container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] w-full overflow-hidden rounded-[32px] border border-amber-200/60 bg-cream-100 shadow-lift">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.imageAlt || "Hero Banner"}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-espresso-400">
                <Icon
                  name="package"
                  size={48}
                  className="text-gold opacity-80"
                  strokeWidth={1.5}
                />
                <p className="mt-3 font-semibold text-espresso-600">
                  পাঞ্জাবি ও শাড়ির ব্যানার ছবি যুক্ত করুন
                </p>
                <span className="mt-1 text-xs text-espresso-400">
                  সাইজ: 1200 × 900 px রিকমেন্ডেড
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
