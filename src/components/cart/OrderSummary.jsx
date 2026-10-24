import Image from "next/image";
import { formatPrice } from "@/lib/format";
import Icon from "@/components/ui/Icon";

/** চেকআউট এবং অর্ডার পেজে প্রদর্শিত পণ্যের বিবরণ ও মোট মূল্যের সারাংশ */
export default function OrderSummary({
  lines,
  totals,
  title = "অর্ডার সামারি",
  promo,
}) {
  return (
    <div className="rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-soft sm:p-6">
      <h2 className="text-2xl font-display text-espresso">{title}</h2>

      <ul className="mt-4 divide-y divide-cream-200">
        {lines.map((line) => (
          <li
            key={line.key || `${line.id}-${line.color}`}
            className="flex items-center gap-3 py-3"
          >
            {/* থাম্বনেইল ইমেজ (ছবি ফাঁকা থাকলে ক্র্যাশ করবে না) */}
            <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl border border-cream-200 bg-cream-100 shadow-sm flex items-center justify-center">
              {line.image ? (
                <Image
                  src={line.image}
                  alt={line.name || "পণ্য"}
                  fill
                  sizes="48px"
                  className="object-cover object-top"
                />
              ) : (
                <Icon name="package" size={20} className="text-espresso-400" />
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-espresso">
                {line.name}
              </span>
              <span className="block text-xs text-espresso-500 mt-0.5">
                রঙ: {line.color} · পরিমাণ: {line.qty} টি
              </span>
            </span>

            <span className="text-sm font-bold text-espresso">
              {formatPrice(line.price * line.qty)}
            </span>
          </li>
        ))}
      </ul>

      {/* খরচের বিস্তারিত হিসাব */}
      <dl className="mt-3 space-y-2.5 border-t border-cream-200 pt-4 text-[15px]">
        <div className="flex justify-between text-espresso-600">
          <dt>সাবটোটাল</dt>
          <dd className="font-bold text-espresso">
            {formatPrice(totals.subtotal)}
          </dd>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <dt>ডিসকাউন্ট{promo ? ` (${promo})` : ""}</dt>
            <dd>-{formatPrice(totals.discount)}</dd>
          </div>
        )}

        <div className="flex justify-between text-espresso-600">
          <dt>ডেলিভারি চার্জ</dt>
          <dd className="font-bold text-espresso">
            {totals.shipping === 0 ? (
              <span className="text-emerald-700 font-bold">ফ্রি</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </dd>
        </div>

        <div className="flex justify-between border-t border-cream-200 pt-3 text-lg font-bold text-espresso">
          <dt>সর্বমোট মূল্য</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
