import PageHeader from "@/components/ui/PageHeader";
import WishlistView from "@/components/shop/WishlistView";

export const metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <>
      <PageHeader eyebrow="পরবর্তীর জন্য সংরক্ষিত" title="পছন্দের তালিকা" />
      <div className="pt-8 sm:pt-12">
        <WishlistView />
      </div>
    </>
  );
}
