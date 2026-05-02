import React from "react";
import { createBrowserRouter } from "react-router";
import { Link } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "6rem",
            fontWeight: 700,
            color: "#C9A96E",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <p
          className="text-black mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 600 }}
        >
          Page Not Found
        </p>
        <p
          className="text-gray-500 text-sm mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3.5 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors inline-block"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "shop/:category", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
