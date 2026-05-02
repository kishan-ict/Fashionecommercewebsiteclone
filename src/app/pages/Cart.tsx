import React from "react";
import { Link } from "react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const shipping = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-sm">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: "#FAF9F6" }}
          >
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2
            className="text-black mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 600,
            }}
          >
            Your Cart is Empty
          </h2>
          <p
            className="text-gray-500 text-sm mb-8 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Looks like you haven't added anything to your cart yet. Explore our curated collections and find something you love.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav
            className="flex items-center gap-2 text-xs tracking-wider uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: "#999" }}
          >
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">Shopping Cart</span>
          </nav>
          <h1
            className="text-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 600,
            }}
          >
            Shopping Cart
            <span
              className="ml-3 text-base text-gray-400 font-normal"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0">
            {/* Table Header */}
            <div
              className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b text-[11px] tracking-widest uppercase text-gray-400"
              style={{ borderColor: "#EFEFEF", fontFamily: "'Inter', sans-serif" }}
            >
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 py-6 border-b items-center"
                style={{ borderColor: "#EFEFEF" }}
              >
                {/* Product Info */}
                <div className="sm:col-span-6 flex gap-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-28 sm:w-20 sm:h-24 overflow-hidden bg-[#F8F6F3]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3
                        className="text-black text-sm mb-1 leading-snug hover:text-[#C9A96E] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                      >
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-[11px] text-gray-500 uppercase tracking-wider"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Size: {item.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div
                        className="w-3 h-3 rounded-full border border-gray-200"
                        style={{ background: item.colorHex }}
                      />
                      <span
                        className="text-[11px] text-gray-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {item.color}
                      </span>
                    </div>
                    {/* Mobile price */}
                    <p
                      className="sm:hidden text-sm font-semibold text-black"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden sm:flex sm:col-span-2 justify-center">
                  <span
                    className="text-sm text-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Quantity + Remove */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="w-8 h-8 flex items-center justify-center text-sm border-x border-gray-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  {/* Remove on mobile */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="sm:hidden text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Total + Remove */}
                <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-3">
                  <span
                    className="text-sm font-semibold text-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 border p-6"
              style={{ borderColor: "#EFEFEF" }}
            >
              <h3
                className="text-black mb-5 text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Order Summary
              </h3>

              {/* Promo Code */}
              <div className="mb-5">
                <div className="flex gap-0">
                  <div className="flex-1 flex items-center gap-2 border border-gray-200 px-3 py-2.5">
                    <Tag size={13} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <button
                    className="px-4 py-2.5 bg-black text-white text-[11px] tracking-widest uppercase font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Try code <span className="text-[#C9A96E] font-medium">HJ10</span> for 10% off
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="text-sm text-black font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Shipping
                  </span>
                  <span
                    className={`text-sm font-medium ${shipping === 0 ? "text-green-600" : "text-black"}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Add ₹{(999 - totalPrice).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
              </div>

              <div
                className="border-t pt-4 mb-6"
                style={{ borderColor: "#EFEFEF" }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm tracking-wider uppercase font-semibold text-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-xl font-bold text-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>

              {/* Trust Signals */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1 text-[10px] text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>🔒</span> Secure Checkout
                </div>
                <span className="text-gray-200">|</span>
                <div className="flex items-center gap-1 text-[10px] text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <Truck size={10} /> Free Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
