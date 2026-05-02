import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Phone, Mail,
} from "lucide-react";
import { HJLogo } from "./HJLogo";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const navLinks = [
  { label: "Women", href: "/shop", dropdown: [] },
  {
    label: "Dresses",
    href: "/shop/dresses",
    dropdown: [
      { label: "All Dresses", href: "/shop/dresses" },
      { label: "Midi Dresses", href: "/shop/dresses" },
      { label: "Maxi Dresses", href: "/shop/dresses" },
      { label: "Party Gowns", href: "/shop/dresses" },
    ],
  },
  {
    label: "Tops",
    href: "/shop/tops",
    dropdown: [
      { label: "All Tops", href: "/shop/tops" },
      { label: "Crop Tops", href: "/shop/tops" },
      { label: "Blouses", href: "/shop/tops" },
      { label: "Shirts", href: "/shop/tops" },
    ],
  },
  {
    label: "Co-ord Sets",
    href: "/shop/coord-sets",
    dropdown: [
      { label: "All Sets", href: "/shop/coord-sets" },
      { label: "Linen Sets", href: "/shop/coord-sets" },
      { label: "Blazer Sets", href: "/shop/coord-sets" },
    ],
  },
  {
    label: "Ethnic",
    href: "/shop/ethnic",
    dropdown: [
      { label: "All Ethnic", href: "/shop/ethnic" },
      { label: "Kurta Sets", href: "/shop/ethnic" },
      { label: "Anarkali", href: "/shop/ethnic" },
      { label: "Salwar Kameez", href: "/shop/ethnic" },
    ],
  },
  { label: "Sale", href: "/shop", dropdown: [] },
];

export function Navbar() {
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const announcements = [
    "🚚 FREE SHIPPING on orders above ₹999",
    "✨ Use code HJ10 for extra 10% off your first order",
    "🌟 New Summer Collection now live — Shop Now!",
    "📦 Easy 30-day returns on all orders",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="relative overflow-hidden py-2.5 px-4 text-center"
        style={{ background: "#000000" }}
      >
        <div className="transition-all duration-500">
          <p
            className="text-white text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            {announcements[announcementIdx]}
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8E8" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile: Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-black hover:text-[#C9A96E] transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <HJLogo size="md" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown.length > 0 && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 text-[13px] tracking-widest uppercase transition-colors hover:text-[#C9A96E] py-2 ${
                      link.label === "Sale" ? "text-red-500 hover:text-red-600 font-semibold" : "text-black"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    {link.label}
                    {link.dropdown.length > 0 && (
                      <ChevronDown size={13} className="transition-transform" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown.length > 0 && activeDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-0 py-3 min-w-[180px] shadow-xl z-50 border border-gray-100"
                      style={{ background: "#FFFFFF" }}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-5 py-2 text-[12px] tracking-widest uppercase text-black hover:bg-[#F8F6F3] hover:text-[#C9A96E] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-black hover:text-[#C9A96E] transition-colors hidden sm:flex"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/shop"
                className="p-2 text-black hover:text-[#C9A96E] transition-colors relative hidden sm:flex"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] flex items-center justify-center font-bold"
                    style={{ background: "#C9A96E" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <button className="p-2 text-black hover:text-[#C9A96E] transition-colors hidden sm:flex">
                <User size={18} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 text-black hover:text-[#C9A96E] transition-colors relative flex"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] flex items-center justify-center font-bold"
                    style={{ background: "#000000" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white px-6 py-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 border-b-2 border-black pb-3">
                <Search size={20} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dresses, tops, co-ords..."
                  className="flex-1 text-lg outline-none text-black placeholder-gray-300 bg-transparent"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Dresses", "Tops", "Co-ord Sets", "Ethnic Wear", "Jumpsuits"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/shop/${tag.toLowerCase().replace(/ /g, "-")}`);
                      setSearchOpen(false);
                    }}
                    className="px-3 py-1.5 text-xs tracking-wider uppercase border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[300px] flex flex-col transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ background: "#FFFFFF" }}
        >
          {/* Drawer Header */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "#E8E8E8" }}
          >
            <HJLogo size="sm" />
            <button onClick={() => setMobileMenuOpen(false)} className="text-black">
              <X size={20} />
            </button>
          </div>

          {/* Search in mobile */}
          <div className="px-5 py-3 border-b" style={{ borderColor: "#E8E8E8" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                  setMobileMenuOpen(false);
                }
              }}
              className="flex items-center gap-2 bg-[#F5F5F5] px-3 py-2"
            >
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </form>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center justify-between py-3.5 border-b text-sm tracking-widest uppercase transition-colors hover:text-[#C9A96E] ${
                  link.label === "Sale" ? "text-red-500 font-semibold" : "text-black"
                }`}
                style={{ borderColor: "#F0F0F0", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="px-5 py-4 border-t space-y-2" style={{ borderColor: "#E8E8E8" }}>
            <a
              href="tel:9986998851"
              className="flex items-center gap-2 text-sm text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Phone size={14} className="text-[#C9A96E]" />
              9986998851
            </a>
            <a
              href="mailto:kishanmpatil1@gmail.com"
              className="flex items-center gap-2 text-sm text-gray-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Mail size={14} className="text-[#C9A96E]" />
              kishanmpatil1@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
