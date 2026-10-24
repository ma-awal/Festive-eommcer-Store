"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

const initial = { name: "", email: "", message: "" };

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3.5 text-espresso placeholder:text-espresso-400 focus:border-gold focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("failed");
      setForm(initial);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-cream-200 bg-cream-50 p-10 text-center shadow-soft">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold">
          <Icon name="check" size={30} strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-3xl font-display text-espresso">
          বার্তা পাঠানো হয়েছে
        </h2>
        <p className="mt-2 text-espresso-500">
          আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমরা খুব শীঘ্রই আপনার সাথে
          যোগাযোগ করব।
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          আরেকটি বার্তা পাঠান
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-3xl border border-cream-200 bg-cream-50 p-6 shadow-soft sm:p-8"
    >
      <h2 className="text-3xl font-display text-espresso">
        আমাদের বার্তা পাঠান
      </h2>

      <label className="block text-sm font-medium text-espresso">
        আপনার নাম
        <input
          name="name"
          placeholder="আপনার পূর্ণ নাম লিখুন"
          value={form.name}
          onChange={update}
          required
          autoComplete="name"
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium text-espresso">
        ইমেইল অ্যাড্রেস
        <input
          name="email"
          type="email"
          placeholder="example@mail.com"
          value={form.email}
          onChange={update}
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium text-espresso">
        আপনার বার্তা
        <textarea
          name="message"
          placeholder="পণ্য, অর্ডার বা যেকোনো বিষয়ে আপনার বার্তাটি লিখুন..."
          value={form.message}
          onChange={update}
          required
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-700">
          <Icon name="warning" size={16} /> দুঃখিত, কোনো সমস্যা হয়েছে। অনুগ্রহ
          করে আবার চেষ্টা করুন।
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
      </Button>
    </form>
  );
}
