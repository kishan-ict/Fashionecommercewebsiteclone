import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import { Filter, ChevronDown, ChevronUp, X, SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const PRICE_OPTIONS = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,000", min: 2000, max: 3000 },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4" style={{ borderColor: "#EFEFEF" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span
          className="text-black text-[12px] tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          {title}
        </span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function Shop() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [sortOpen, setSortOpen] = useState(false);

  const activeCategory = category || "all";
  const categoryName =
    activeCategory === "all"
      ? "All Women"
      : categories.find((c) => c.id === activeCategory)?.name || activeCategory;

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedPrice(null);
  };

  const filtered = useMemo(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    if (selectedPrice) {
      result = result.filter(
        (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
      );
    }

    switch (sortBy) {
      case "price_asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      case "reviews":
        return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
      case "newest":
        return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return result;
    }
  }, [activeCategory, searchQuery, selectedSizes, selectedPrice, sortBy]);

  const hasFilters = selectedSizes.length > 0 || selectedPrice !== null;

  const FiltersContent = () => (
    <div>
      {/* Category Filter */}
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === "all" ? "/shop" : `/shop/${cat.id}`}
              className={`flex items-center justify-between py-1 text-[13px] transition-colors ${
                activeCategory === cat.id
                  ? "text-[#C9A96E] font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>{cat.name}</span>
              <span className="text-gray-400 text-xs">
                ({products.filter((p) => cat.id === "all" || p.category === cat.id).length})
              </span>
            </Link>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price Range">
        <div className="space-y-2">
          {PRICE_OPTIONS.map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div
                className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedPrice?.min === opt.min && selectedPrice?.max === opt.max
                    ? "border-[#C9A96E] bg-[#C9A96E]"
                    : "border-gray-300 group-hover:border-gray-500"
                }`}
                onClick={() =>
                  setSelectedPrice(
                    selectedPrice?.min === opt.min && selectedPrice?.max === opt.max
                      ? null
                      : { min: opt.min, max: opt.max }
                  )
                }
              >
                {selectedPrice?.min === opt.min && selectedPrice?.max === opt.max && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="text-[13px] text-gray-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 border text-[12px] tracking-wider transition-all font-medium ${
                selectedSizes.includes(size)
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="mt-4 w-full py-2.5 border border-black text-black text-[12px] tracking-widest uppercase hover:bg-black hover:text-white transition-all"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div
        className="py-10 text-center border-b"
        style={{ background: "#FAF9F6", borderColor: "#EFEFEF" }}
      >
        <nav
          className="flex items-center justify-center gap-2 text-xs tracking-wider uppercase mb-3"
          style={{ fontFamily: "'Inter', sans-serif", color: "#999" }}
        >
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          {activeCategory !== "all" ? (
            <>
              <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-black">{categoryName}</span>
            </>
          ) : (
            <span className="text-black">Shop</span>
          )}
        </nav>
        <h1
          className="text-black"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 600,
          }}
        >
          {searchQuery ? `Search: "${searchQuery}"` : categoryName}
        </h1>
        <p
          className="text-gray-500 mt-2 text-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {filtered.length} {filtered.length === 1 ? "style" : "styles"} found
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-black text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Filter size={13} />
            Filters {hasFilters && `(${(selectedSizes.length > 0 ? 1 : 0) + (selectedPrice ? 1 : 0)})`}
          </button>

          {/* Active Filter Tags */}
          <div className="flex-1 flex flex-wrap gap-2 hidden lg:flex">
            {selectedSizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center gap-1 px-2.5 py-1 border text-[11px] uppercase tracking-wider"
                style={{ borderColor: "#C9A96E", color: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
              >
                {size}
                <button onClick={() => toggleSize(size)}>
                  <X size={10} />
                </button>
              </span>
            ))}
            {selectedPrice && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 border text-[11px]"
                style={{ borderColor: "#C9A96E", color: "#C9A96E", fontFamily: "'Inter', sans-serif" }}
              >
                {PRICE_OPTIONS.find((o) => o.min === selectedPrice.min)?.label}
                <button onClick={() => setSelectedPrice(null)}>
                  <X size={10} />
                </button>
              </span>
            )}
          </div>

          {/* Sort + Grid toggle */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Grid cols */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 ${gridCols === 3 ? "text-black" : "text-gray-300"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 ${gridCols === 2 ? "text-black" : "text-gray-300"}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-xs tracking-wider uppercase text-black hover:border-black transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <SlidersHorizontal size={13} />
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                <ChevronDown size={12} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-xl z-20 min-w-[200px]">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[12px] tracking-wide hover:bg-[#FAF9F6] transition-colors ${
                        sortBy === opt.value ? "text-[#C9A96E] font-semibold" : "text-gray-700"
                      }`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar — Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-xs tracking-widest uppercase text-gray-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Filter By
                </span>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[11px] text-[#C9A96E] hover:underline"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p
                  className="text-gray-400 text-lg mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  No products found
                </p>
                <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-black text-white text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 md:gap-5 ${
                  gridCols === 3
                    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-2"
                }`}
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Filters
              </span>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-2">
              <FiltersContent />
            </div>
            <div className="px-5 py-4 border-t">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-black text-white text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Apply Filters ({filtered.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
