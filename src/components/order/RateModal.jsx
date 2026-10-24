"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export default function RateModal({
  open,
  onClose,
  initialRating = 0,
  onSubmit,
}) {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    setRating(initialRating);
    setReview("");
    setDone(false);
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, initialRating, onClose]);

  if (!open) return null;

  const submit = (event) => {
    event.preventDefault();
    if (!rating) return;
    onSubmit({ rating, review });
    setDone(true);
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="আপনার অর্ডারের রেটিং দিন"
    >
      <div
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md animate-sheet-in rounded-t-[32px] bg-cream-50 p-6 pb-8 shadow-lift sm:rounded-[32px]">
        {/* বন্ধ করার বাটন */}
        <button
          type="button"
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-espresso-500 hover:bg-gold-soft transition-colors"
        >
          <Icon name="close" size={18} />
        </button>

        {done ? (
          /* রেটিং সফলভাবে জমা হওয়ার পর প্রদর্শিত স্ক্রিন */
          <div className="py-6 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold shadow-glow">
              <Icon name="check" size={30} strokeWidth={3} />
            </span>
            <h2 className="mt-5 text-3xl font-display text-espresso">
              ধন্যবাদ!
            </h2>
            <p className="mt-2 text-espresso-600">
              আপনার মূল্যবান মতামত আমাদের পোশাক ও সেবার মান আরও উন্নত করতে
              সাহায্য করবে।
            </p>
            <Button
              type="button"
              className="mt-6 shadow-soft"
              onClick={onClose}
            >
              বন্ধ করুন
            </Button>
          </div>
        ) : (
          /* রেটিং ফর্ম */
          <form onSubmit={submit}>
            <h2 className="text-3xl font-display text-espresso">
              অর্ডারের রেটিং দিন
            </h2>
            <p className="mt-1 text-sm text-espresso-600">
              জাইরা-র সাথে আপনার অভিজ্ঞতা কেমন ছিল?
            </p>

            {/* ৫ তারকা রেটিং বাটন */}
            <div
              className="mt-5 flex gap-1"
              role="radiogroup"
              aria-label="রেটিং নির্বাচন করুন"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} স্টার`}
                  onClick={() => setRating(value)}
                  className="p-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <Icon
                    name="star"
                    size={36}
                    strokeWidth={1.5}
                    fill={value <= rating ? "#F2B01E" : "none"}
                    className={
                      value <= rating ? "text-gold" : "text-espresso/25"
                    }
                  />
                </button>
              ))}
            </div>

            {/* মতামত লেখার ঘর */}
            <label className="mt-5 block text-sm font-medium text-espresso">
              আপনার মতামত লিখুন (ঐচ্ছিক)
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="পোশাকের ফেব্রিক, সাইজ বা ডেলিভারি নিয়ে আপনার মতামত জানান..."
                rows={3}
                className="mt-1.5 w-full resize-none rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso-400 focus:border-gold focus:outline-none"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="mt-5 w-full shadow-glow"
              disabled={!rating}
            >
              রেটিং সাবমিট করুন
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
