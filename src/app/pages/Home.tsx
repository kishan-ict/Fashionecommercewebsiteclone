import React, { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { getFeaturedProducts, getBestsellers } from "../data/products";

const heroImg = "https://images.unsplash.com/photo-1637690048998-1e41c61c254d?w=1400&q=80";
const collectionImg = "https://images.unsplash.com/photo-1769981271695-bb3d766ee419?w=1200&q=80";
const ethnicImg = "https://images.unsplash.com/photo-1761393382562-8ad78afa1179?w=700&q=80";
const coordImg = "https://images.unsplash.com/photo-1763559019748-a68819927eda?w=700&q=80";
const partyImg = "https://images.unsplash.com/photo-1765229277058-177cd0dead2c?w=700&q=80";
const floralImg = "https://images.unsplash.com/photo-1578404449256-0de908ee34ca?w=700&q=80";
const jumpImg = "https://images.unsplash.com/photo-1590400516695-36708d3f964a?w=700&q=80";

const categories = [
  { id: "dresses", label: "Dresses", image: floralImg, count: 4 },
  { id: "tops", label: "Tops", image: "https://images.unsplash.com/photo-1711188054272-732954c4c54b?w=500&q=80", count: 3 },
  { id: "coord-sets", label: "Co-ord Sets", image: coordImg, count: 3 },
  { id: "ethnic", label: "Ethnic Wear", image: ethnicImg, count: 3 },
  { id: "jumpsuits", label: "Jumpsuits", image: jumpImg, count: 2 },
];

function SectionTitle({ tag, title, subtitle }: { tag?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      {tag && (
        <span
          className="inline-block text-[11px] tracking-[0.35em] uppercase mb-3"
          style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {tag}
        </span>
      )}
      <h2
        className="text-black mb-3"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 600,
          letterSpacing: "0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-gray-500 max-w-xl mx-auto text-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center mt-4 gap-3">
        <div className="h-px w-12 bg-gray-200" />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A96E" }} />
        <div className="h-px w-12 bg-gray-200" />
      </div>
    </div>
  );
}

export default function Home() {
  const newArrivals = getFeaturedProducts();
  const bestsellers = getBestsellers();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="H&J Fashion Collection"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[90vh] py-24">
          <div className="max-w-xl">
            <span
              className="inline-block text-[11px] tracking-[0.45em] uppercase mb-4 px-4 py-2"
              style={{
                color: "#C9A96E",
                border: "1px solid rgba(201,169,110,0.5)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                background: "rgba(0,0,0,0.2)",
              }}
            >
              New Summer Collection 2024
            </span>

            <h1
              className="text-white mb-6 leading-[1.1]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: 700,
              }}
            >
              Where Style Meets
              <span style={{ color: "#C9A96E", display: "block" }}>Elegance</span>
            </h1>

            <p
              className="text-gray-200 mb-8 text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Discover our curated collection of premium women's fashion — from
              contemporary dresses to exquisite ethnic wear, crafted for the
              modern woman.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 text-black text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-all"
                style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop/dresses"
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm tracking-widest uppercase font-semibold border hover:bg-white hover:text-black transition-all"
                style={{ borderColor: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-px h-8 bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/60" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div
        className="py-3 overflow-hidden"
        style={{ background: "#C9A96E" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 20s linear infinite",
          }}
        >
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-white text-[11px] tracking-[0.35em] uppercase mx-8"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                FREE SHIPPING ABOVE ₹999 &nbsp;✦&nbsp; EASY 30-DAY RETURNS &nbsp;✦&nbsp; NEW ARRIVALS EVERY WEEK &nbsp;✦&nbsp; USE CODE HJ10 FOR 10% OFF
              </span>
            ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="Explore"
            title="Shop by Category"
            subtitle="From casual everyday looks to glamorous evening wear — find your perfect style"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop/${cat.id}`}
                className="group relative overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)",
                    }}
                  />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white text-sm tracking-wider uppercase mb-0.5"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className="text-gray-300 text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cat.count} Styles
                  </p>
                  <div
                    className="mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "#C9A96E" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-16 lg:py-24" style={{ background: "#FAF9F6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle
              tag="Just In"
              title="New Arrivals"
              subtitle="The latest additions to our curated collection"
            />
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-1 text-xs tracking-widest uppercase text-black hover:text-[#C9A96E] transition-colors mb-2"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-black text-black text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View All New Arrivals <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SPLIT PROMO BANNER */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel */}
          <div className="relative overflow-hidden" style={{ minHeight: "450px" }}>
            <ImageWithFallback
              src={partyImg}
              alt="Evening Collection"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
            <div className="relative z-10 flex flex-col justify-end h-full p-10" style={{ minHeight: "450px" }}>
              <span
                className="inline-block text-[10px] tracking-[0.4em] uppercase mb-2"
                style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                New Collection
              </span>
              <h3
                className="text-white mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Evening
                <br />
                Glamour
              </h3>
              <Link
                to="/shop/dresses"
                className="inline-flex items-center gap-1 text-white text-[11px] tracking-widest uppercase border-b pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors w-fit"
                style={{ borderColor: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Shop Dresses <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right panel */}
          <div className="relative overflow-hidden" style={{ minHeight: "450px" }}>
            <ImageWithFallback
              src={ethnicImg}
              alt="Ethnic Collection"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
            <div className="relative z-10 flex flex-col justify-end h-full p-10" style={{ minHeight: "450px" }}>
              <span
                className="inline-block text-[10px] tracking-[0.4em] uppercase mb-2"
                style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Festive Edit
              </span>
              <h3
                className="text-white mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Ethnic
                <br />
                Heritage
              </h3>
              <Link
                to="/shop/ethnic"
                className="inline-flex items-center gap-1 text-white text-[11px] tracking-widest uppercase border-b pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-colors w-fit"
                style={{ borderColor: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                Shop Ethnic <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="Customer Favourites"
            title="Our Bestsellers"
            subtitle="Loved by thousands of women across India"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* WIDE PROMO BANNER */}
      <section className="relative overflow-hidden py-0" style={{ minHeight: "380px" }}>
        <ImageWithFallback
          src={collectionImg}
          alt="H&J Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <div
          className="relative z-10 flex flex-col items-start justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          style={{ minHeight: "380px" }}
        >
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={16} style={{ color: "#C9A96E" }} />
              <span
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Exclusive Sale
              </span>
            </div>
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Up to <span style={{ color: "#C9A96E" }}>50% Off</span>
              <br />
              on Select Styles
            </h2>
            <p
              className="text-gray-300 mb-8 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Limited time offer on our most-loved pieces. Don't miss out on these premium styles at incredible prices.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 text-black text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-all"
              style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
            >
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SHOP WITH US */}
      <section className="py-16 lg:py-20" style={{ background: "#FAF9F6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="Our Promise" title="Why Choose H&J" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "✦",
                title: "Premium Quality",
                desc: "Every piece is crafted from carefully selected fabrics that offer both comfort and style.",
              },
              {
                icon: "⟢",
                title: "Exclusive Designs",
                desc: "Our in-house design team creates unique pieces you won't find anywhere else.",
              },
              {
                icon: "⬡",
                title: "Sustainable Fashion",
                desc: "We're committed to ethical manufacturing and eco-friendly packaging.",
              },
              {
                icon: "◈",
                title: "Perfect Fit",
                desc: "Detailed size guides and easy returns ensure you always get the perfect fit.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full border-2 group-hover:scale-110 transition-transform"
                  style={{ borderColor: "#C9A96E", background: "white" }}
                >
                  <span className="text-xl" style={{ color: "#C9A96E" }}>
                    {item.icon}
                  </span>
                </div>
                <h3
                  className="text-black mb-2 text-sm tracking-wider uppercase"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-500 text-[13px] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM LOOKBOOK */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tag="@hj_fashion"
            title="Follow Our Lookbook"
            subtitle="Tag us @hj_fashion for a chance to be featured"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1">
            {[
              floralImg, coordImg, partyImg, ethnicImg,
              jumpImg, collectionImg,
            ].map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden group relative cursor-pointer">
                <ImageWithFallback
                  src={img}
                  alt={`Instagram post ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <span className="text-white text-xl">♥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
