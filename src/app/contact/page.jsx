import site from "@/data/site.json";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "যোগাযোগ",
  description:
    "পণ্য বা অর্ডার সংক্রান্ত যেকোনো তথ্য বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  const details = [
    {
      icon: "mail",
      label: "ইমেইল অ্যাড্রেস",
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: "phone",
      label: "ফোন / হটলাইন",
      value: site.contact.phone,
      href: `tel:${site.contact.phone.replace(/[^+\d]/g, "")}`,
    },
    { icon: "pin", label: "আমাদের ঠিকানা", value: site.contact.address },
    { icon: "clock", label: "সহায়তার সময়সূচি", value: site.contact.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="আমরা সহায়তায় প্রস্তুত"
        title="যোগাযোগ করুন"
        subtitle="পণ্য, সাইজ বা অর্ডার সংক্রান্ত যেকোনো প্রশ্ন বা প্রয়োজনে সরাসরি আমাদের সাথে যোগাযোগ করুন।"
      />
      <section className="py-10 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal variant="left">
            <ul className="space-y-3.5">
              {details.map((detail) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep shadow-sm">
                      <Icon name={detail.icon} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-espresso-400">
                        {detail.label}
                      </span>
                      <span className="block font-semibold text-espresso text-[15px] sm:text-base break-words">
                        {detail.value}
                      </span>
                    </span>
                  </>
                );
                const cls =
                  "flex items-center gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-4 shadow-soft";
                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className={`${cls} transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-lift`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal variant="right">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
