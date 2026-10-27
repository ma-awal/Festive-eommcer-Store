import PageHeader from "@/components/ui/PageHeader";
import ShopBrowser from "@/components/shop/ShopBrowser";

export const metadata = {
  title: "Shop",
  description: "Shop jewelry, bags, sunglasses, watches, hats and scarves.",
};

export default function ShopPage({ searchParams }) {
  const category =
    typeof searchParams?.category === "string" ? searchParams.category : "all";
  const query = typeof searchParams?.q === "string" ? searchParams.q : "";

  return (
    <>
      <PageHeader
        eyebrow="কালেকশন"
        title="সব পণ্য দেখুন"
        subtitle="ছোট ছোট অনুষঙ্গেই পূর্ণতা পায় আপনার প্রতিটি সাজ"
      />
      <ShopBrowser initialCategory={category} initialQuery={query} />
    </>
  );
}
