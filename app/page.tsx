"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

type Lang = "ar" | "en";

const copy = {
  ar: {
    brand: "وزير الحلو",
    switchLang: "اللغة",
    openMenu: "افتح القائمة",
    closeMenu: "إغلاق القائمة",
    nav: [
      ["products", "الأشهر"],
      ["menu", "المنيو"],
      ["story", "الحكاية"],
      ["reviews", "آراء الناس"],
      ["locations", "الفروع"]
    ],
    loaderSub: "جهز الملعقة",
    heroBadge: "حلو عربي حديث",
    heroTitle: "حلاوة عصرية بطابع فاخر",
    heroText:
      "كاسات لبنية غنية، قشطة طازجة، كراميل دافئ، وتفاصيل مصممة لتبدو شهية قبل أول ملعقة.",
    primaryCta: "اكتشف التوقيعات",
    secondaryCta: "شاهد التجربة",
    scroll: "انزل للحلاوة",
    stats: [
      ["٢٥+", "صنف متجدد"],
      ["٤٫٩", "تقييم الزبائن"],
      ["١٠٠٪", "قشطة طازجة"]
    ],
    featuredBadge: "الأكثر طلبا",
    featuredTitle: "أبطال المنيو",
    featuredText: "منتجات غنية ومصورة بعناية، تجمع بين طعم الحلو العربي وشكل تجاري معاصر.",
    add: "أضف للطلب",
    menuBadge: "منيو سريع",
    menuTitle: "اختار مزاجك",
    menuText: "فئات واضحة، صور قريبة، وتجربة تصفح سريعة بدون ضجيج بصري.",
    storyBadge: "ليش الناس بتحبه؟",
    storyTitle: "وصفة عربية بروح معاصرة",
    storyText:
      "وزير الحلو يجمع دفء الوصفات العربية مع تقديم حديث، تغليف أنيق، وطبقات قشطة وكراميل مصنوعة بعناية.",
    reviewsBadge: "كلام الناس",
    reviewsTitle: "آراء تتحول لطلبات",
    socialBadge: "جاهز للريلز",
    socialTitle: "لقطات شهية بلا مبالغة",
    locationsTitle: "قريب منك",
    locationsText: "فروع بتقدم نفس الطاقة: خدمة سريعة، تغليف ملفت، وطعم ثابت.",
    finalBadge: "حان وقت الحلو",
    finalTitle: "اختم يومك بحلو يستحق",
    finalCta: "زور أقرب فرع",
    footerText: "حلو عربي حديث، مصنوع للذوق، اللمة، والتجربة التي تبقى في الذاكرة."
  },
  en: {
    brand: "Wazeer ElHelw",
    switchLang: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    nav: [
      ["products", "Top Picks"],
      ["menu", "Menu"],
      ["story", "Story"],
      ["reviews", "Reviews"],
      ["locations", "Branches"]
    ],
    loaderSub: "Get the spoon ready",
    heroBadge: "Modern Arabic dessert",
    heroTitle: "Refined Sweetness With a Modern Pulse",
    heroText:
      "Rich dairy cups, fresh cream, warm caramel, and details designed to look irresistible before the first spoon.",
    primaryCta: "Explore signatures",
    secondaryCta: "View the experience",
    scroll: "Scroll for sweetness",
    stats: [
      ["25+", "Fresh items"],
      ["4.9", "Guest rating"],
      ["100%", "Fresh cream"]
    ],
    featuredBadge: "Most wanted",
    featuredTitle: "Menu Heroes",
    featuredText: "Rich, carefully photographed desserts that blend Arabic comfort with contemporary commercial polish.",
    add: "Add to order",
    menuBadge: "Fast menu",
    menuTitle: "Pick Your Mood",
    menuText: "Clear categories, close-up photography, and a fast browsing experience without visual noise.",
    storyBadge: "Why people love it",
    storyTitle: "Arabic Flavor With a Contemporary Spirit",
    storyText:
      "Wazeer ElHelw blends Arabic recipe warmth with modern presentation, elegant packaging, and carefully layered cream and caramel.",
    reviewsBadge: "Guest talk",
    reviewsTitle: "Reviews That Turn Into Orders",
    socialBadge: "Reels ready",
    socialTitle: "Craveable Shots, Calmly Styled",
    locationsTitle: "Near You",
    locationsText: "Branches with the same energy: fast service, bold packaging, and consistent flavor.",
    finalBadge: "Dessert time",
    finalTitle: "End the Day With Dessert Worth Remembering",
    finalCta: "Find a branch",
    footerText: "Modern Arabic dessert made for taste, gathering, and an experience that lingers."
  }
} as const;

const products = [
  {
    ar: {
      name: "رز بالحليب فليكس",
      detail: "رز كريمي، قشطة خفيفة، كراميل، وفستق",
      tag: "ترند"
    },
    en: {
      name: "Rice Pudding Flex",
      detail: "Creamy rice, light ashta, caramel, and pistachio",
      tag: "Trending"
    },
    price: { ar: "٣٫٧٥ د.أ", en: "JD 3.75" },
    img: "/product-rice.png",
    color: "cyan"
  },
  {
    ar: {
      name: "قشطة كراش",
      detail: "كاسات قشطة باردة مع طبقات بسكويت وصوص",
      tag: "الأشهر"
    },
    en: {
      name: "Ashta Crush",
      detail: "Cold cream cups with biscuit layers and sauce",
      tag: "Best seller"
    },
    price: { ar: "٤٫٢٥ د.أ", en: "JD 4.25" },
    img: "/product-ashta.png",
    color: "pink"
  },
  {
    ar: {
      name: "ليالي الوزير",
      detail: "سميد ناعم، كريمة، مكسرات، ولمعة صوص",
      tag: "جديد"
    },
    en: {
      name: "Wazeer Nights",
      detail: "Soft semolina, cream, nuts, and a glossy sauce hit",
      tag: "New drop"
    },
    price: { ar: "٤٫٩٠ د.أ", en: "JD 4.90" },
    img: "/product-cairo.png",
    color: "yellow"
  }
];

const menu = [
  {
    ar: ["أرز بالحليب", "كريمي، بارد، ومليان طبقات"],
    en: ["Rice Pudding", "Creamy, cold, and fully layered"],
    icon: "01"
  },
  {
    ar: ["حلويات القشطة", "قشطة ناعمة وصوصات قوية"],
    en: ["Cream Desserts", "Soft cream and loud sauces"],
    icon: "02"
  },
  {
    ar: ["حلويات الحليب", "خفيفة، منعشة، وسريعة الاختفاء"],
    en: ["Milk Desserts", "Light, fresh, and gone fast"],
    icon: "03"
  },
  {
    ar: ["شرقي مودرن", "كنافة وبسبوسة بشكل جديد"],
    en: ["Modern Oriental", "Kunafa and basbousa with a twist"],
    icon: "04"
  },
  {
    ar: ["ابتكارات الموسم", "نكهات محدودة للصور واللمة"],
    en: ["Seasonal Drops", "Limited flavors for photos and groups"],
    icon: "05"
  }
];

const reviews = {
  ar: [
    ["سارة", "الكاسة شكلها رهيب والطعم أحلى من الصورة."],
    ["عمر", "أول محل حلو أحس فعلا معمول للسوشيال والطعم ثابت."],
    ["ليان", "القشطة خفيفة والكراميل قوي. طلبناه مرتين بنفس اليوم."]
  ],
  en: [
    ["Sara", "The cup looks wild and tastes even better than the photo."],
    ["Omar", "The first dessert place that feels social-first and still tastes real."],
    ["Layan", "The cream is light and the caramel hits hard. Ordered twice in one day."]
  ]
};

const socials = {
  ar: ["صبة كراميل", "ملعقة القشطة", "فتح البوكس", "لقطة اللمة"],
  en: ["Caramel pour", "Cream spoon", "Box reveal", "Group shot"]
};

const branches = {
  ar: [
    ["القاهرة", "أصل الحكاية والطعم الكبير"],
    ["عمّان", "فرع سريع بطابع شبابي"]
  ],
  en: [
    ["Cairo", "The origin of the big flavor"],
    ["Amman", "Fast branch with youthful energy"]
  ]
};

function MotionSection({
  children,
  className = "",
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 52, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const t = copy[lang];

  const nav = useMemo(() => t.nav, [t.nav]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    gsap.to(".ambient-float", {
      y: -22,
      x: 14,
      rotate: 7,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.22
    });
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews[lang].length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [lang]);

  const nextReview = () =>
    setActiveReview((current) => (current + 1) % reviews[lang].length);
  const prevReview = () =>
    setActiveReview((current) => (current - 1 + reviews[lang].length) % reviews[lang].length);
  const itemNumber = (index: number) =>
    lang === "ar" ? ["٠١", "٠٢", "٠٣", "٠٤", "٠٥"][index] : `0${index + 1}`;

  return (
    <main className="site-shell">
      {loading && (
        <motion.div className="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
          <div className="loader-bubble">{t.brand}</div>
          <span>{t.loaderSub}</span>
        </motion.div>
      )}

      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="pattern-grid" />
      <div className="float-field" aria-hidden="true">
        <span className="shape shape-cyan ambient-float" />
        <span className="shape shape-pink ambient-float" />
        <span className="shape shape-yellow ambient-float" />
        <span className="shape shape-purple ambient-float" />
        <span className="sticker sticker-one ambient-float">{lang === "ar" ? "طازج" : "Fresh"}</span>
        <span className="sticker sticker-two ambient-float">{lang === "ar" ? "كريمي" : "Creamy"}</span>
      </div>

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label={t.brand}>
          {t.brand}
        </a>
        <nav className="desktop-nav" aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
          {nav.map(([href, label]) => (
            <a key={href} href={`#${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
            {t.switchLang}
          </button>
          <button className="icon-btn" onClick={() => setMenuOpen(true)} aria-label={t.openMenu}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <motion.aside
          className="mobile-menu"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button className="icon-btn close" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu}>
            <X size={24} />
          </button>
          <div className="mobile-brand">{t.brand}</div>
          {nav.map(([href, label]) => (
            <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </motion.aside>
      )}

      <section id="top" className="hero">
        <motion.div className="hero-copy" style={{ y: heroY }}>
          <motion.span className="eyebrow pill" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <TrendingUp size={20} />
            {t.heroBadge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
          >
            {t.heroTitle}
          </motion.h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="magnetic primary" href="#products">
              <ShoppingBag size={22} />
              {t.primaryCta}
            </a>
            <a className="magnetic secondary" href="#social">
              <Play size={22} />
              {t.secondaryCta}
            </a>
          </div>
          <div className="counter-strip">
            {t.stats.map(([number, label]) => (
              <motion.div
                className="counter-card"
                key={label}
                whileHover={{ y: -8, rotate: lang === "ar" ? -2 : 2 }}
              >
                <strong>{number}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-product"
          initial={{ opacity: 0, scale: 0.88, rotate: lang === "ar" ? 5 : -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image src="/hero-dessert.png" alt="" fill priority sizes="(max-width: 768px) 92vw, 48vw" />
          <div className="hero-ring" />
          <span className="hero-badge badge-top ambient-float">
            <Zap size={18} />
            {lang === "ar" ? "قوام غني" : "Rich texture"}
          </span>
          <span className="hero-badge badge-bottom ambient-float">
            <Heart size={18} />
            {lang === "ar" ? "تفاصيل شهية" : "Craveable detail"}
          </span>
        </motion.div>

        <div className="scroll-cue">
          <span />
          {t.scroll}
        </div>
      </section>

      <MotionSection id="products" className="featured-section">
        <div className="section-head loud">
          <span className="eyebrow pill">
            <Flame size={19} />
            {t.featuredBadge}
          </span>
          <h2>{t.featuredTitle}</h2>
          <p>{t.featuredText}</p>
        </div>
        <div className="product-stage">
          {products.map((product, index) => (
            <motion.article
              className={`product-card ${product.color}`}
              key={product.en.name}
              whileHover={{ y: -16, rotate: index === 1 ? 1.5 : -1.5 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="product-tag">{product[lang].tag}</div>
              <div className="product-image">
                <Image src={product.img} alt="" fill sizes="(max-width: 768px) 88vw, 30vw" />
              </div>
              <div className="product-copy">
                <span>{itemNumber(index)}</span>
                <h3>{product[lang].name}</h3>
                <p>{product[lang].detail}</p>
                <div className="product-foot">
                  <strong>{product.price[lang]}</strong>
                  <button>{t.add}</button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="menu" className="menu-section">
        <div className="section-head">
          <span className="eyebrow pill">
            <Sparkles size={19} />
            {t.menuBadge}
          </span>
          <h2>{t.menuTitle}</h2>
          <p>{t.menuText}</p>
        </div>
        <div className="menu-rail" dir={lang === "ar" ? "rtl" : "ltr"}>
          {menu.map((item, index) => (
            <motion.article className="menu-tile" key={item.en[0]} whileHover={{ scale: 1.04, y: -8 }}>
              <div className="menu-icon">{itemNumber(index)}</div>
              <span>{itemNumber(index)}</span>
              <h3>{item[lang][0]}</h3>
              <p>{item[lang][1]}</p>
            </motion.article>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="story" className="story-section">
        <div className="story-copy">
          <span className="eyebrow pill">
            <MessageCircle size={19} />
            {t.storyBadge}
          </span>
          <h2>{t.storyTitle}</h2>
          <p>{t.storyText}</p>
          <div className="story-bullets">
            {(lang === "ar"
              ? ["قشطة طازجة", "تغليف أنيق", "نكهات موسمية", "خدمة سريعة"]
              : ["Fresh cream", "Elegant packs", "Seasonal drops", "Fast service"]
            ).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="story-visual">
          <Image src="/story-kitchen.png" alt="" fill sizes="(max-width: 768px) 92vw, 42vw" />
          <div className="story-pop">{lang === "ar" ? "من البيت إلى التايملاين" : "From home to timeline"}</div>
        </div>
      </MotionSection>

      <MotionSection id="reviews" className="reviews-section">
        <div className="section-head compact">
          <span className="eyebrow pill">
            <Star size={19} />
            {t.reviewsBadge}
          </span>
          <h2>{t.reviewsTitle}</h2>
        </div>
        <div className="review-slider">
          <button onClick={prevReview} aria-label={lang === "ar" ? "الرأي السابق" : "Previous review"}>
            {lang === "ar" ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <motion.article
            className="review-card"
            key={`${lang}-${activeReview}`}
            initial={{ opacity: 0, y: 20, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={22} fill="currentColor" />)}</div>
            <p>{reviews[lang][activeReview][1]}</p>
            <strong>{reviews[lang][activeReview][0]}</strong>
          </motion.article>
          <button onClick={nextReview} aria-label={lang === "ar" ? "الرأي التالي" : "Next review"}>
            {lang === "ar" ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </MotionSection>

      <MotionSection id="social" className="social-section">
        <div className="section-head">
          <span className="eyebrow pill">
            <Instagram size={19} />
            {t.socialBadge}
          </span>
          <h2>{t.socialTitle}</h2>
        </div>
        <div className="social-grid">
          {socials[lang].map((item, index) => (
            <motion.article className="reel" key={item} whileHover={{ y: -12, scale: 1.025 }}>
              <Image src={`/social-${index + 1}.png`} alt="" fill sizes="(max-width: 768px) 45vw, 22vw" />
              <div className="play-dot">
                <Play size={18} fill="currentColor" />
              </div>
              <span>{item}</span>
            </motion.article>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="locations" className="location-section">
        <div className="map-surface">
          <div className="map-path" />
          {branches[lang].map(([city], index) => (
            <span className={`pin pin-${index}`} key={city}>
              <MapPin size={22} />
              {city}
            </span>
          ))}
        </div>
        <div className="branch-stack">
          <h2>{t.locationsTitle}</h2>
          <p>{t.locationsText}</p>
          {branches[lang].map(([city, detail]) => (
            <article className="branch-card" key={city}>
              <strong>{city}</strong>
              <span>{detail}</span>
            </article>
          ))}
        </div>
      </MotionSection>

      <section className="final-cta">
        <Image src="/final-table.png" alt="" fill sizes="100vw" />
        <div className="final-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow pill">{t.finalBadge}</span>
          <h2>{t.finalTitle}</h2>
          <a className="magnetic primary" href="#locations">
            <MapPin size={22} />
            {t.finalCta}
          </a>
        </motion.div>
      </section>

      <footer className="footer">
        <strong>{t.brand}</strong>
        <span>{t.footerText}</span>
      </footer>
    </main>
  );
}
