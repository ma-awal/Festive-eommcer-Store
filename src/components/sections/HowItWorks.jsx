import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";

export default function HowItWorks({ data }) {
  if (!data || !data.steps || data.steps.length === 0) return null;

  const icons = ["search", "cart", "cash", "truck"];
  const stepNumbers = ["০১", "০২", "০৩", "০৪"];

  return (
    <section className="py-8 sm:py-12">
      <Container>
        {/* সেকশন হেডিং */}
        <Reveal variant="up" className="mb-8 sm:mb-12 text-center">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-deep">
            সহজ প্রক্রিয়া
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl  text-espresso font-display">
            {data.title || "কিভাবে অর্ডার করবেন"}
          </h2>
        </Reveal>

        {/* স্টেপসমূহ */}
        <ul className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-4 sm:gap-6">
          {data.steps.map((step, index) => {
            const isLast = index === data.steps.length - 1;

            return (
              <li
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* একদম চিকন, হালকা অপাসিটির স্থির ড্যাশ লাইন (কোনো লুপ নেই) */}
                {!isLast && (
                  <div className="pointer-events-none absolute top-7 left-[calc(50%+34px)] hidden w-[calc(100%-68px)] sm:block z-0">
                    <svg
                      className="w-full h-1"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 1"
                    >
                      <line
                        x1="0"
                        y1="0.5"
                        x2="100"
                        y2="0.5"
                        stroke="#C98A0B"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.25"
                      />
                    </svg>
                  </div>
                )}

                <Reveal
                  variant="up"
                  delay={index * 90}
                  className="flex flex-col items-center"
                >
                  {/* আইকন বক্স এবং স্টেপ নম্বর */}
                  <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-cream-50 border border-gold/30 shadow-soft transition-all duration-300 hover:scale-105 hover:border-gold">
                    <Icon
                      name={icons[index % icons.length]}
                      size={24}
                      strokeWidth={1.8}
                      className="text-espresso"
                    />

                    {/* গোল্ডেন স্টেপ কাউন্টার */}
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gold text-[10px] sm:text-[11px] font-bold text-espresso shadow-sm">
                      {stepNumbers[index] || index + 1}
                    </span>
                  </div>

                  {/* স্টেপ টাইটেল */}
                  <h3 className="mt-3.5 text-sm sm:text-base font-semibold text-espresso">
                    {step.title}
                  </h3>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
