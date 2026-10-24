import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Star,
  Plus,
  Minus,
  Trash2,
  Check,
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
  Lock,
  Banknote,
  CircleCheck,
  TriangleAlert,
  Sparkles,
  Tag,
} from "lucide-react";

function HomeIcon({ size = 22, className = "", strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function SocialIcon({ path, size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const FACEBOOK =
  "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z";
const TIKTOK =
  "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z";
const YOUTUBE =
  "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3L10 15z";

function FacebookIcon(props) {
  return <SocialIcon path={FACEBOOK} {...props} />;
}
function TiktokIcon(props) {
  return <SocialIcon path={TIKTOK} {...props} />;
}
function YoutubeIcon(props) {
  return <SocialIcon path={YOUTUBE} {...props} />;
}

const icons = {
  search: Search,
  heart: Heart,
  user: User,
  cart: ShoppingBag,
  bag: ShoppingBag,
  menu: Menu,
  close: X,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  truck: Truck,
  shield: ShieldCheck,
  refresh: RefreshCw,
  support: Headphones,
  star: Star,
  plus: Plus,
  minus: Minus,
  trash: Trash2,
  check: Check,
  package: Package,
  pin: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  lock: Lock,
  cash: Banknote,
  success: CircleCheck,
  warning: TriangleAlert,
  sparkle: Sparkles,
  tag: Tag,
  home: HomeIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
};

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.8,
  fill,
}) {
  const Component = icons[name];
  if (!Component) return null;

  // সোশ্যাল আইকন ছাড়া সাধারণ আইকনগুলোতে জোরপূর্বক ভরাট বন্ধ রাখা হয়েছে
  const isSocial = ["facebook", "tiktok", "youtube"].includes(name);

  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      fill={isSocial ? "currentColor" : fill ? fill : "none"}
      stroke={isSocial ? "none" : "currentColor"}
      className={`shrink-0 ${
        fill === "currentColor" || isSocial ? "" : "fill-none"
      } ${className}`}
      aria-hidden="true"
    />
  );
}
