import React, { useState } from "react";
import { Link } from "react-router";
import {
  Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter,
  CreditCard, Truck, RotateCcw, Shield,
} from "lucide-react";
import { HJLogo } from "./HJLogo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ background: "#0A0A0A", color: "#FFFFFF" }}>
      {/* Trust Badges */}
      <div
        className="border-b"
        style={{ borderColor: "#1E1E1E" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: CreditCard, title: "Pay on Delivery", desc: "Available across India" },
            ].map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)" }}
                >
                  <badge.icon size={18} style={{ color: "#C9A96E" }} />
                </div>
                <div>
                  <p
                    className="text-white text-sm"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                  >
                    {badge.title}
                  </p>
                  <p
                    className="text-gray-400 text-[11px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="border-b"
        style={{ borderColor: "#1E1E1E", background: "rgba(201,169,110,0.05)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <h3
            className="text-white mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            Join the H&amp;J Inner Circle
          </h3>
          <p
            className="text-gray-400 mb-6 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Subscribe for exclusive offers, new arrivals &amp; styling inspiration
          </p>
          {subscribed ? (
            <p
              className="text-sm"
              style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
            >
              ✓ Thank you for subscribing! Check your inbox for a welcome gift.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex justify-center gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-[#C9A96E]"
                style={{ fontFamily: "'Inter', sans-serif" }}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 text-xs tracking-widest uppercase font-semibold text-black transition-colors hover:opacity-90"
                style={{ background: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <div className="mb-5">
              <HJLogo variant="light" size="md" />
            </div>
            <p
              className="text-gray-400 text-[13px] leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              H&amp;J is your premium destination for contemporary women's fashion. We curate collections that celebrate the modern woman — bold, elegant, and effortlessly stylish.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:border-[#C9A96E] hover:text-[#C9A96E]"
                  style={{ borderColor: "#333333", color: "#888888" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white mb-5 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "New Arrivals", href: "/shop" },
                { label: "Dresses", href: "/shop/dresses" },
                { label: "Tops", href: "/shop/tops" },
                { label: "Co-ord Sets", href: "/shop/coord-sets" },
                { label: "Ethnic Wear", href: "/shop/ethnic" },
                { label: "Jumpsuits", href: "/shop/jumpsuits" },
                { label: "Sale", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-[13px] hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4
              className="text-white mb-5 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/contact" },
                { label: "Contact Us", href: "/contact" },
                { label: "Size Guide", href: "/shop" },
                { label: "Track Order", href: "/contact" },
                { label: "Returns & Exchanges", href: "/contact" },
                { label: "Shipping Policy", href: "/contact" },
                { label: "Privacy Policy", href: "/contact" },
                { label: "Terms & Conditions", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-[13px] hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-white mb-5 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A96E" }} />
                <div>
                  <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Phone</p>
                  <a
                    href="tel:9986998851"
                    className="text-white text-[13px] hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    +91 9986998851
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A96E" }} />
                <div>
                  <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Email</p>
                  <a
                    href="mailto:kishanmpatil1@gmail.com"
                    className="text-white text-[13px] hover:text-[#C9A96E] transition-colors break-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    kishanmpatil1@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#C9A96E" }} />
                <div>
                  <p className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>Address</p>
                  <p
                    className="text-white text-[13px]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    H&amp;J Fashion House<br />
                    MG Road, Bengaluru<br />
                    Karnataka - 560001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: "#1E1E1E" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-gray-500 text-[12px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © 2024 H&amp;J Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {/* Payment method icons */}
            {["VISA", "MC", "UPI", "EMI"].map((method) => (
              <span
                key={method}
                className="px-2 py-1 border text-[10px] font-semibold text-gray-500"
                style={{ borderColor: "#2A2A2A", fontFamily: "'Inter', sans-serif" }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
