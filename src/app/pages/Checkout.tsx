import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CheckCircle, Lock, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  paymentMethod: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[11px] tracking-widest uppercase text-black mb-1.5"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors bg-white";

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(`HJ${Date.now().toString().slice(-8)}`);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const shipping = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = "Valid phone required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.pincode.trim() || form.pincode.length !== 6) newErrors.pincode = "Valid 6-digit pincode";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ background: "#F0F7F0" }}>
            <CheckCircle size={40} style={{ color: "#7B9B6E" }} />
          </div>
          <h2
            className="text-black mb-2"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600 }}
          >
            Order Confirmed!
          </h2>
          <p
            className="text-gray-500 text-sm mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Thank you for shopping with H&amp;J
          </p>
          <p
            className="text-[#C9A96E] text-sm font-medium mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Order #{orderNumber}
          </p>
          <div className="bg-[#FAF9F6] p-5 mb-8 text-left space-y-2">
            <p className="text-[13px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              A confirmation email will be sent to <strong>{form.email || "your email"}</strong>
            </p>
            <p className="text-[13px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Expected delivery: <strong>4–7 business days</strong>
            </p>
            <p className="text-[13px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              For support: <a href="tel:9986998851" className="text-[#C9A96E]">9986998851</a> or{" "}
              <a href="mailto:kishanmpatil1@gmail.com" className="text-[#C9A96E]">kishanmpatil1@gmail.com</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="px-8 py-3.5 border border-black text-black text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-black text-white text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Checkout Header */}
      <div className="border-b py-5 px-4 sm:px-8" style={{ borderColor: "#EFEFEF" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span
              className="text-black"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              H<span style={{ color: "#C9A96E", fontStyle: "italic" }}>&amp;</span>J
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Lock size={12} />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* LEFT: FORM */}
          <form onSubmit={handleSubmit}>
            {/* Contact */}
            <div className="mb-8">
              <h2
                className="text-black mb-5 pb-3 border-b text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, borderColor: "#EFEFEF" }}
              >
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="First Name" required>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Priya"
                    className={`${inputClass} ${errors.firstName ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
                </FormField>
                <FormField label="Last Name" required>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Sharma"
                    className={`${inputClass} ${errors.lastName ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                </FormField>
                <FormField label="Email Address" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="priya@example.com"
                    className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                </FormField>
                <FormField label="Phone Number" required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                </FormField>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2
                className="text-black mb-5 pb-3 border-b text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, borderColor: "#EFEFEF" }}
              >
                Shipping Address
              </h2>
              <div className="space-y-4">
                <FormField label="Street Address" required>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="House No., Street, Area"
                    className={`${inputClass} ${errors.address ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.address && <p className="text-red-500 text-[10px] mt-1">{errors.address}</p>}
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="City" required>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Bengaluru"
                      className={`${inputClass} ${errors.city ? "border-red-400" : ""}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.city && <p className="text-red-500 text-[10px] mt-1">{errors.city}</p>}
                  </FormField>
                  <FormField label="State" required>
                    <select
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={`${inputClass} ${errors.state ? "border-red-400" : ""}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-[10px] mt-1">{errors.state}</p>}
                  </FormField>
                  <FormField label="Pincode" required>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="560001"
                      className={`${inputClass} ${errors.pincode ? "border-red-400" : ""}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.pincode && <p className="text-red-500 text-[10px] mt-1">{errors.pincode}</p>}
                  </FormField>
                  <FormField label="Country">
                    <input
                      type="text"
                      value={form.country}
                      readOnly
                      className={`${inputClass} bg-gray-50 text-gray-500`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2
                className="text-black mb-5 pb-3 border-b text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, borderColor: "#EFEFEF" }}
              >
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: "💵" },
                  { value: "upi", label: "UPI / GPay / PhonePe", desc: "Pay instantly via UPI", icon: "📱" },
                  { value: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: "💳" },
                  { value: "netbanking", label: "Net Banking", desc: "All major banks supported", icon: "🏦" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                      form.paymentMethod === method.value
                        ? "border-black bg-black/3"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={() => updateField("paymentMethod", method.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        form.paymentMethod === method.value ? "border-black" : "border-gray-300"
                      }`}
                    >
                      {form.paymentMethod === method.value && (
                        <div className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="text-lg">{method.icon}</span>
                    <div>
                      <p
                        className="text-[13px] font-medium text-black"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {method.label}
                      </p>
                      <p
                        className="text-[11px] text-gray-500"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {method.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Support */}
            <div
              className="p-4 mb-6 flex flex-col sm:flex-row gap-4"
              style={{ background: "#FAF9F6" }}
            >
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#C9A96E" }} />
                <span className="text-[12px] text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <strong>Need help?</strong>{" "}
                  <a href="tel:9986998851" className="text-[#C9A96E] hover:underline">9986998851</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#C9A96E" }} />
                <a
                  href="mailto:kishanmpatil1@gmail.com"
                  className="text-[12px] text-[#C9A96E] hover:underline"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  kishanmpatil1@gmail.com
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-sm tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Lock size={14} />
              Place Order — ₹{grandTotal.toLocaleString("en-IN")}
            </button>
          </form>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            {/* Mobile toggle */}
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="lg:hidden w-full flex items-center justify-between p-4 border mb-4"
              style={{ borderColor: "#EFEFEF" }}
            >
              <span className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Order Summary ({totalItems} items)
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
                {summaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            <div className={`${summaryOpen ? "block" : "hidden"} lg:block`}>
              <div className="border p-6" style={{ borderColor: "#EFEFEF" }}>
                <h3
                  className="text-black mb-5 text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                >
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-5 max-h-80 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-20 overflow-hidden bg-[#F8F6F3]">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[12px] text-black leading-snug mb-0.5"
                          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-[10px] text-gray-400 mb-1"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item.color} · Size {item.size}
                        </p>
                        <p
                          className="text-[12px] font-semibold text-black"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div
                  className="space-y-2.5 pt-4 mb-4 border-t"
                  style={{ borderColor: "#EFEFEF" }}
                >
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>Subtotal</span>
                    <span className="text-sm text-black" style={{ fontFamily: "'Inter', sans-serif" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>Shipping</span>
                    <span className={`text-sm font-medium ${shipping === 0 ? "text-green-600" : "text-black"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                </div>

                <div
                  className="flex justify-between items-center pt-4 border-t"
                  style={{ borderColor: "#EFEFEF" }}
                >
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Total</span>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
