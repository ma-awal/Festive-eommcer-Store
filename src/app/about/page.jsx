import Image from "next/image";
import about from "@/data/about.json";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export const metadata = {
  title: "আমাদের সম্পর্কে",
  description:
    "জাইরা - খাঁটি দেশীয় ঐতিহ্যের পাঞ্জাবি, শাড়ি এবং আধুনিক ফ্যাশনের অনন্য ঠিকানা।",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="আমাদের গল্প"
        title={about.title}
        subtitle={about.subtitle}
      />

      {/* ব্র্যান্ডের গল্প এবং ছবি */}
      <section className="py-12 sm:py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <div className="relative aspect-[4/4] w-full overflow-hidden rounded-[28px] border border-cream-200 bg-cream-100 shadow-lift">
              {about.image ? (
                <Image
                  src={about.image}
                  alt={about.imageAlt || "আমাদের কালেকশন"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-espresso-400">
                  <Icon
                    name="package"
                    size={48}
                    className="text-gold"
                    strokeWidth={1.5}
                  />
                  <p className="mt-3 font-semibold text-espresso-700">
                    আমাদের সম্পর্কে ছবি যুক্ত করুন
                  </p>
                  <span className="mt-1 text-xs text-espresso-400">
                    সাইজ: ৮০০ × ৬০০ px
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal
            variant="right"
            className="space-y-5 text-base sm:text-lg leading-relaxed text-espresso-600"
          >
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ব্র্যান্ডের মূল বৈশিষ্ট্য ও মূল্যবোধ */}
      <section className="pb-12 sm:pb-16">
        <Container>
          <Reveal variant="up">
            <h2 className="text-center font-display text-3xl    text-espresso">
              {about.valuesTitle}
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => (
              <li key={value.title}>
                <Reveal
                  variant="up"
                  delay={index * 100}
                  className="h-full rounded-3xl border border-cream-200 bg-cream-50 p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-deep shadow-sm">
                    <Icon name={value.icon} size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-bold text-espresso">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-espresso-500 leading-relaxed">
                    {value.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* নিচের ১৪৪০px কল-টু-অ্যাকশন ব্যানার */}
      <section className="px-3 pb-8 sm:px-5 lg:px-8">
        <Reveal variant="zoom">
          <div className="mx-auto max-w-[1440px] rounded-[32px] bg-gradient-to-br from-[#FFEBA6] via-[#FFDF82] to-[#FDD053] px-6 py-12 text-center sm:rounded-[36px] sm:py-16 shadow-soft">
            <h2 className="mx-auto max-w-2xl font-display text-3xl   text-espresso font-normal">
              {about.cta.title}
            </h2>
            <div className="mt-7">
              <Button
                href={about.cta.href}
                variant="dark"
                size="lg"
                className="shadow-soft"
              >
                {about.cta.label}
                <Icon name="arrowRight" size={18} className="text-gold" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
