import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Root() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Don't show footer on checkout
  const isCheckout = pathname === "/checkout";

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {!isCheckout && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
}
