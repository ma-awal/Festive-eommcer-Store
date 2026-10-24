"use client";

import { useState } from "react";
import site from "@/data/site.json";
import { useStore } from "@/context/StoreContext";
import Icon from "@/components/ui/Icon";

export default function PromoCodeForm() {
  const { promo, applyPromo, clearPromo } = useStore();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, message }

  // প্রমো কোড অ্যাপ্লাই করা থাকলে প্রদর্শিত ভিউ
  if (promo) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-gold/40 bg-gold-soft/80 px-4 py-3 text-sm shadow-sm">
        <span className="flex items-center gap-2 font-bold text-gold-deep">
          <Icon name="tag" size={16} /> {promo} কোডটি সফলভাবে যুক্ত হয়েছে
        </span>
        <button
          type="button"
          onClick={clearPromo}
          className="font-semibold text-espresso-600 underline hover:text-red-700 transition-colors"
        >
          মুছে ফেলুন
        </button>
      </div>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    if (!code.trim()) return;
    const result = applyPromo(code);
    setFeedback(result);
    if (result.ok) setCode("");
  };

  const defaultPlaceholder = site.promoCodes?.[0]?.code
    ? `যেমন: ${site.promoCodes[0].code}`
    : "প্রমো কোড লিখুন";

  return (
    <form onSubmit={submit}>
      <label
        htmlFor="promo-code"
        className="text-sm font-semibold text-espresso"
      >
        ডিসকাউন্ট বা প্রমো কোড
      </label>

      <div className="mt-2 flex gap-2">
        <input
          id="promo-code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setFeedback(null);
          }}
          placeholder={defaultPlaceholder}
          autoCapitalize="characters"
          className="min-w-0 flex-1 rounded-full border border-cream-300 bg-cream-50 px-4 py-3 text-sm uppercase placeholder:normal-case placeholder:text-espresso-400 focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-espresso px-5 text-sm font-semibold text-cream transition hover:bg-espresso-700 active:scale-95 shadow-sm"
        >
          প্রয়োগ করুন
        </button>
      </div>

      {/* সাকসেস বা এরর মেসেজ (স্বয়ংক্রিয় বাংলা ফিডব্যাক) */}
      {feedback && (
        <p
          className={`mt-2 text-sm font-medium ${
            feedback.ok ? "text-emerald-700" : "text-red-700"
          }`}
          role="status"
        >
          {feedback.ok
            ? `প্রমো কোডটি সফলভাবে প্রয়োগ করা হয়েছে!`
            : feedback.message === "That code is not valid."
            ? "এই প্রমো কোডটি সঠিক নয় বা মেয়াদ শেষ হয়েছে।"
            : feedback.message}
        </p>
      )}
    </form>
  );
}
