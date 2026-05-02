import React, { useState } from "react";
import { Link } from "react-router";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[1] || product.sizes[0],
      color: product.colors[0],
      colorHex: product.colorHexes[0],
    });
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={11}
        className={i < Math.floor(rating) ? "fill-[#C9A96E] text-[#C9A96E]" : "fill-gray-200 text-gray-200"}
      />
    ));
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block relative bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#F8F6F3] aspect-[3/4]">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              className="px-2.5 py-1 text-white text-[10px] tracking-widest uppercase font-semibold"
              style={{ background: "#000000", fontFamily: "'Inter', sans-serif" }}
            >
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span
              className="px-2.5 py-1 text-white text-[10px] tracking-wider uppercase font-semibold"
              style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
            >
              -{product.discount}%
            </span>
          )}
          {product.isBestseller && (
            <span
              className="px-2.5 py-1 text-white text-[10px] tracking-wider uppercase font-semibold"
              style={{ background: "#7B5E3A", fontFamily: "'Inter', sans-serif" }}
            >
              BEST
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <Heart
              size={14}
              className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </button>
          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <Eye size={14} className="text-gray-600" />
          </Link>
        </div>

        {/* Quick Add Button */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-300"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 flex items-center justify-center gap-2 text-white text-xs tracking-widest uppercase font-semibold transition-colors"
            style={{
              background: quickAdded ? "#7B9B6E" : "#000000",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <ShoppingBag size={13} />
            {quickAdded ? "ADDED!" : "QUICK ADD"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1 px-0.5">
        {/* Color Swatches */}
        {product.colorHexes.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.colorHexes.slice(0, 4).map((hex, idx) => (
              <div
                key={idx}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ background: hex }}
                title={product.colors[idx]}
              />
            ))}
            {product.colorHexes.length > 4 && (
              <span className="text-[10px] text-gray-500">+{product.colorHexes.length - 4}</span>
            )}
          </div>
        )}

        {/* Name */}
        <h3
          className="text-sm text-black mb-1 leading-snug line-clamp-2 group-hover:text-[#C9A96E] transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span
            className="text-[11px] text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-semibold text-black"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span
            className="text-xs text-gray-400 line-through"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
          >
            ({product.discount}% OFF)
          </span>
        </div>
      </div>
    </Link>
  );
}
