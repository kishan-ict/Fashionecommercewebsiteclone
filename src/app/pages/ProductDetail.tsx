import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  Heart, ShoppingBag, Truck, RotateCcw, Shield, Share2,
  Star, ChevronDown, ChevronUp, Minus, Plus, ArrowLeft,
} from "lucide-react";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: "#EFEFEF" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span
          className="text-black text-[12px] tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {title}
        </span>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div
          className="pb-5 text-[13px] text-gray-600 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Product not found
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-black text-white text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: product.colors[selectedColor],
        colorHex: product.colorHexes[selectedColor],
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors[selectedColor],
      colorHex: product.colorHexes[selectedColor],
    });
    navigate("/checkout");
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-[#C9A96E] text-[#C9A96E]" : "fill-gray-200 text-gray-200"}
      />
    ));

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs tracking-wider uppercase mb-8" style={{ fontFamily: "'Inter', sans-serif", color: "#999" }}>
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <Link
            to={`/shop/${product.category}`}
            className="hover:text-black transition-colors capitalize"
          >
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-black line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* IMAGE GALLERY */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative overflow-hidden bg-[#F8F6F3] aspect-[3/4]">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.isNew && (
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 text-white text-[10px] tracking-widest uppercase font-semibold"
                  style={{ background: "#000000", fontFamily: "'Inter', sans-serif" }}
                >
                  NEW
                </div>
              )}
              {product.discount > 0 && (
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 text-white text-[10px] tracking-widest uppercase font-semibold"
                  style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
                >
                  -{product.discount}%
                </div>
              )}

              {/* Mobile thumbnail dots */}
              <div className="sm:hidden absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-full transition-all ${
                      selectedImage === idx ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="lg:pt-2">
            {/* Category */}
            <Link
              to={`/shop/${product.category}`}
              className="inline-block text-[11px] tracking-widest uppercase mb-3 transition-colors hover:text-[#C9A96E]"
              style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              {product.category.replace("-", " ")}
            </Link>

            {/* Name */}
            <h1
              className="text-black mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.25,
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
              <span
                className="text-[13px] text-gray-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-2xl font-bold text-black"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span
                className="text-base text-gray-400 line-through"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              <span
                className="px-2.5 py-1 text-white text-[11px] tracking-wider font-semibold"
                style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
              >
                {product.discount}% OFF
              </span>
            </div>

            <p
              className="text-[13px] text-gray-500 mb-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Inclusive of all taxes. Free shipping above ₹999.
            </p>

            <div className="h-px bg-gray-100 my-5" />

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[12px] tracking-widest uppercase text-black"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  Color: <span className="font-normal text-gray-600">{product.colors[selectedColor]}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colorHexes.map((hex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-7 h-7 rounded-full transition-all ${
                      selectedColor === idx ? "ring-2 ring-offset-2 ring-black scale-110" : "hover:scale-105"
                    }`}
                    style={{
                      background: hex,
                      border: hex === "#FFFFFF" || hex === "#FFFFF0" ? "1px solid #DDD" : "none",
                    }}
                    title={product.colors[idx]}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[12px] tracking-widest uppercase ${sizeError ? "text-red-500" : "text-black"}`}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  {sizeError ? "Please select a size" : "Size"}
                </span>
                <button
                  className="text-[11px] tracking-wider underline text-gray-500 hover:text-black"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`w-12 h-12 border text-[13px] transition-all font-medium ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : sizeError
                        ? "border-red-300 text-red-400"
                        : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-[12px] tracking-widest uppercase text-black"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Qty
              </span>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-12 h-10 flex items-center justify-center text-sm border-x border-gray-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-semibold transition-all"
                style={{
                  background: addedToCart ? "#7B9B6E" : "#000000",
                  color: "#FFFFFF",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <ShoppingBag size={16} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 border flex items-center justify-center transition-all hover:bg-gray-50 ${
                  wishlisted ? "border-red-300" : "border-gray-300 hover:border-black"
                }`}
              >
                <Heart
                  size={18}
                  className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 border-2 border-black text-black text-sm tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Buy Now
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, text: "Free Delivery above ₹999" },
                { icon: RotateCcw, text: "Easy 30-Day Returns" },
                { icon: Shield, text: "Secure Payment" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-1.5 p-3 text-center border"
                  style={{ borderColor: "#F0F0F0" }}
                >
                  <Icon size={16} className="text-[#C9A96E]" />
                  <span
                    className="text-[10px] text-gray-500 leading-snug"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Product Details Accordion */}
            <div>
              <AccordionItem title="Product Description" defaultOpen={true}>
                <p>{product.description}</p>
              </AccordionItem>
              <AccordionItem title="Product Details">
                <ul className="space-y-2">
                  <li><span className="font-medium text-black">Fabric:</span> {product.fabric}</li>
                  <li><span className="font-medium text-black">Fit:</span> {product.fit}</li>
                  <li><span className="font-medium text-black">Occasion:</span> {product.occasion}</li>
                  <li><span className="font-medium text-black">Available Sizes:</span> {product.sizes.join(", ")}</li>
                  <li><span className="font-medium text-black">Available Colors:</span> {product.colors.join(", ")}</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Care Instructions">
                <ul className="space-y-1">
                  <li>• {product.careInstructions}</li>
                  <li>• Do not bleach</li>
                  <li>• Store in a cool, dry place</li>
                  <li>• Iron on low heat if needed</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                <ul className="space-y-1">
                  <li>• Free shipping on orders above ₹999</li>
                  <li>• Standard delivery: 4-7 business days</li>
                  <li>• Express delivery: 2-3 business days (additional charges)</li>
                  <li>• Easy 30-day returns on all orders</li>
                  <li>• Contact us at kishanmpatil1@gmail.com or +91 9986998851</li>
                </ul>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t" style={{ borderColor: "#EFEFEF" }}>
            <h2
              className="text-center text-black mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 600,
              }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
