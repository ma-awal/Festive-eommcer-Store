"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import checkout from "@/data/checkout.json";
import site from "@/data/site.json";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/format";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import EmptyState from "@/components/ui/EmptyState";
import OrderSummary from "@/components/cart/OrderSummary";
import StepIndicator from "@/components/checkout/StepIndicator";
import OrderPlaced from "@/components/checkout/OrderPlaced";

const emptyShipping = Object.fromEntries(
  checkout.shippingFields.map((f) => [f.name, ""])
);
const emptyCard = { number: "", expiry: "", cvv: "" };

const fieldClass = (invalid) =>
  `mt-1.5 w-full rounded-2xl border bg-cream-50 px-4 py-3.5 text-espresso placeholder:text-espresso-400 transition focus:outline-none ${
    invalid
      ? "border-red-400 focus:border-red-500"
      : "border-cream-300 focus:border-gold"
  }`;

// বাংলা ফর্ম ভ্যালিডেশন
function validateShipping(values) {
  const errors = {};
  checkout.shippingFields.forEach((field) => {
    const value = (values[field.name] || "").trim();
    if (!value) {
      errors[field.name] = `${field.label} পূরণ করা আবশ্যক।`;
      return;
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "সঠিক ইমেইল অ্যাড্রেস লিখুন।";
    }
    if (field.type === "tel" && value.replace(/\D/g, "").length < 10) {
      errors[field.name] = "সঠিক মোবাইল নম্বর প্রদান করুন।";
    }
    if (field.name === "postalCode" && value.length < 2) {
      errors[field.name] = "সঠিক থানা বা পোস্ট কোড লিখুন।";
    }
  });
  return errors;
}

function validateCard(card) {
  const errors = {};
  const digits = card.number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19)
    errors.number = "সঠিক কার্ড নম্বর লিখুন।";

  const match = card.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    errors.expiry = "MM/YY ফরম্যাটে মেয়াদ লিখুন।";
  } else {
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    const now = new Date();
    const expired =
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1);
    if (month < 1 || month > 12 || expired)
      errors.expiry = "কার্ডটির মেয়াদ উত্তীর্ণ হয়ে গেছে।";
  }

  if (!/^\d{3,4}$/.test(card.cvv))
    errors.cvv = "৩ বা ৪ ডিজিটের সিভিভি (CVV) কোড দিন।";
  return errors;
}

function Field({ field, value, error, onChange }) {
  return (
    <label
      className={`block text-sm font-medium text-espresso ${
        field.span === 2 ? "sm:col-span-2" : ""
      }`}
    >
      {field.label}
      <input
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${field.name}-error` : undefined}
        className={fieldClass(error)}
      />
      {error && (
        <span
          id={`${field.name}-error`}
          className="mt-1 block text-xs font-normal text-red-700"
        >
          {error}
        </span>
      )}
    </label>
  );
}

export default function CheckoutFlow() {
  const { hydrated, lines, totals, promo, placeOrder } = useStore();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(emptyShipping);
  const [shippingErrors, setShippingErrors] = useState({});
  // বাংলাদেশে ক্যাশ অন ডেলিভারি সর্বাধিক জনপ্রিয় হওয়ায় এটি ডিফল্ট রাখা হয়েছে
  const [method, setMethod] = useState("cod");
  const [card, setCard] = useState(emptyCard);
  const [cardErrors, setCardErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending
  const [apiError, setApiError] = useState("");
  const [placed, setPlaced] = useState(null);
  const topRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const methodLabel = useMemo(
    () => checkout.paymentMethods.find((m) => m.id === method)?.label,
    [method]
  );

  if (!hydrated && !placed)
    return <div className="min-h-[50vh]" aria-busy="true" />;

  if (!placed && lines.length === 0) {
    return (
      <EmptyState
        icon="bag"
        title="চেকআউট করার মতো কোনো পণ্য নেই"
        text="আপনার কার্ট বর্তমানে খালি। আপনার পছন্দের পাঞ্জাবি বা শাড়ি কার্টে যোগ করুন।"
        action={{ label: "কেনাকাটা শুরু করুন", href: "/shop" }}
      />
    );
  }

  const updateShipping = (event) => {
    const { name, value } = event.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    setShippingErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const goToPayment = (event) => {
    event.preventDefault();
    const errors = validateShipping(shipping);
    setShippingErrors(errors);
    if (Object.keys(errors).length === 0) setStep(2);
  };

  const updateCard = (event) => {
    const { name, value } = event.target;
    let next = value;
    if (name === "number") {
      next = value
        .replace(/\D/g, "")
        .slice(0, 19)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      next =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    } else if (name === "cvv") {
      next = value.replace(/\D/g, "").slice(0, 4);
    }
    setCard((prev) => ({ ...prev, [name]: next }));
    setCardErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const confirmPayment = async (event) => {
    event.preventDefault();
    setApiError("");

    if (method === "card") {
      const errors = validateCard(card);
      setCardErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: shipping,
          payment: methodLabel,
          items: lines.map((l) => ({
            id: l.id,
            name: l.name,
            price: l.price,
            qty: l.qty,
            color: l.color,
          })),
          totals,
        }),
      });
      if (!response.ok) throw new Error("Order failed");
      const data = await response.json();

      const order = {
        id: data.orderId,
        placedAt: new Date().toISOString(),
        estimatedDelivery: site.shipping.estimate,
        items: lines.map((l) => ({
          id: l.id,
          slug: l.slug,
          name: l.name,
          price: l.price,
          qty: l.qty,
          color: l.color,
          image: l.image,
        })),
        totals,
        promo,
        shipping,
        payment: methodLabel,
      };
      placeOrder(order);
      setPlaced(order);
      setStep(3);
    } catch (error) {
      setApiError(
        "দুঃখিত, আপনার অর্ডারটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="pb-12 pt-6 sm:pt-10">
      <Container>
        <div ref={topRef} className="scroll-mt-28" />

        {step === 3 && placed ? (
          <OrderPlaced order={placed} />
        ) : (
          <>
            <div className="flex items-center gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  aria-label="ঠিকানা ধাপে ফিরে যান"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 transition hover:bg-gold-soft"
                >
                  <Icon name="arrowLeft" size={18} />
                </button>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-espresso">
                {step === 1 ? "চেকআউট" : "পেমেন্ট মাধ্যম"}
              </h1>
            </div>

            <div className="mt-6 max-w-2xl">
              <StepIndicator steps={checkout.steps} current={step} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
              <div>
                {/* ধাপ ১: ডেলিভারি ঠিকানা ফর্ম */}
                {step === 1 && (
                  <form
                    onSubmit={goToPayment}
                    noValidate
                    className="animate-fade-up space-y-6"
                  >
                    <h2 className="text-2xl font-display text-espresso">
                      ডেলিভারির ঠিকানা ও তথ্য
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {checkout.shippingFields.map((field) => (
                        <Field
                          key={field.name}
                          field={field}
                          value={shipping[field.name]}
                          error={shippingErrors[field.name]}
                          onChange={updateShipping}
                        />
                      ))}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto sm:min-w-[280px]"
                    >
                      পেমেন্ট ধাপে যান
                      <Icon name="arrowRight" size={18} />
                    </Button>
                  </form>
                )}

                {/* ধাপ ২: পেমেন্ট মেথড নির্বাচন */}
                {step === 2 && (
                  <form
                    onSubmit={confirmPayment}
                    noValidate
                    className="animate-fade-up space-y-5"
                  >
                    <fieldset>
                      <legend className="sr-only">
                        পেমেন্ট মাধ্যম বেছে নিন
                      </legend>
                      <div className="space-y-3" role="radiogroup">
                        {checkout.paymentMethods.map((option) => {
                          const selected = method === option.id;
                          return (
                            <label
                              key={option.id}
                              className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-4 transition-all duration-300 ${
                                selected
                                  ? "border-gold bg-gold-soft/60 shadow-soft"
                                  : "border-cream-200 bg-cream-50 hover:border-gold/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={option.id}
                                checked={selected}
                                onChange={() => setMethod(option.id)}
                                className="sr-only"
                              />
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                                  selected
                                    ? "border-gold-dark"
                                    : "border-espresso/25"
                                }`}
                                aria-hidden="true"
                              >
                                {selected && (
                                  <span className="h-3 w-3 rounded-full bg-gold-dark" />
                                )}
                              </span>
                              <span className="flex-1 font-semibold text-espresso">
                                {option.label}
                              </span>
                              {option.badges && (
                                <span className="flex gap-1">
                                  {option.badges.map((badge) => (
                                    <span
                                      key={badge}
                                      className="rounded bg-white px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-espresso-600 ring-1 ring-cream-300"
                                    >
                                      {badge}
                                    </span>
                                  ))}
                                </span>
                              )}
                              {option.badge && (
                                <span className="rounded-lg bg-white px-2 py-0.5 text-xs font-bold text-espresso-700 ring-1 ring-cream-300">
                                  {option.badge}
                                </span>
                              )}
                              {option.icon && (
                                <Icon
                                  name={option.icon}
                                  size={22}
                                  className="text-espresso-500"
                                />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* কার্ড পেমেন্টের ইনপুট ফিল্ড (যদি কার্ড সিলেক্ট করা হয়) */}
                    {method === "card" ? (
                      <div className="grid animate-fade-up gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-espresso sm:col-span-2">
                          কার্ড নম্বর
                          <input
                            name="number"
                            value={card.number}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="1234 5678 9012 3456"
                            aria-invalid={Boolean(cardErrors.number)}
                            className={fieldClass(cardErrors.number)}
                          />
                          {cardErrors.number && (
                            <span className="mt-1 block text-xs font-normal text-red-700">
                              {cardErrors.number}
                            </span>
                          )}
                        </label>
                        <label className="block text-sm font-medium text-espresso">
                          মেয়াদ (MM/YY)
                          <input
                            name="expiry"
                            value={card.expiry}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                            aria-invalid={Boolean(cardErrors.expiry)}
                            className={fieldClass(cardErrors.expiry)}
                          />
                          {cardErrors.expiry && (
                            <span className="mt-1 block text-xs font-normal text-red-700">
                              {cardErrors.expiry}
                            </span>
                          )}
                        </label>
                        <label className="block text-sm font-medium text-espresso">
                          সিভিভি (CVV)
                          <input
                            name="cvv"
                            value={card.cvv}
                            onChange={updateCard}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder="123"
                            aria-invalid={Boolean(cardErrors.cvv)}
                            className={fieldClass(cardErrors.cvv)}
                          />
                          {cardErrors.cvv && (
                            <span className="mt-1 block text-xs font-normal text-red-700">
                              {cardErrors.cvv}
                            </span>
                          )}
                        </label>
                      </div>
                    ) : (
                      <div className="animate-fade-up rounded-2xl border border-cream-200 bg-cream-100/70 px-4 py-4 text-sm text-espresso-700">
                        {method === "cod" ? (
                          <p className="flex items-center gap-2">
                            <Icon
                              name="truck"
                              size={18}
                              className="text-gold-deep shrink-0"
                            />
                            <span>
                              পণ্য হাতে পেয়ে দেখে ডেলিভারি প্রতিনিধিকে মোট{" "}
                              <strong>{formatPrice(totals.total)}</strong> টাকা
                              ক্যাশ পরিশোধ করুন।
                            </span>
                          </p>
                        ) : (
                          <p>
                            নিচে নিশ্চিত বাটনে ক্লিক করে{" "}
                            <strong>{methodLabel}</strong> এর মাধ্যমে আপনার
                            অর্ডারটি সফলভাবে সম্পন্ন করুন।
                          </p>
                        )}
                      </div>
                    )}

                    {apiError && (
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-2xl bg-red-50 p-3 text-sm text-red-700"
                      >
                        <Icon
                          name="warning"
                          size={16}
                          className="mt-0.5 shrink-0"
                        />{" "}
                        {apiError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto sm:min-w-[280px]"
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? "অর্ডার প্রসেস হচ্ছে..."
                        : `অর্ডার নিশ্চিত করুন · ${formatPrice(totals.total)}`}
                    </Button>
                    <p className="flex items-center gap-2 text-xs text-espresso-500">
                      <Icon name="lock" size={13} /> আপনার পেমেন্টের তথ্য
                      সম্পূর্ণ সুরক্ষিত ও এনক্রিপ্টেড।
                    </p>
                  </form>
                )}
              </div>

              {/* ডান পাশের অর্ডার সামারি */}
              <aside className="h-fit space-y-3 lg:sticky lg:top-28">
                <OrderSummary
                  lines={lines}
                  totals={totals}
                  promo={promo}
                  title="অর্ডার সামারি"
                />
                <Link
                  href="/cart"
                  className="block text-center text-sm font-semibold text-espresso-600 underline underline-offset-4 hover:text-gold-dark"
                >
                  কার্ট পরিবর্তন করুন
                </Link>
              </aside>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
