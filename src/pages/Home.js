import React, { useState, lazy, Suspense, useMemo } from "react";
import { debounce } from "../utils/debounce";

// ✅ Keep above-the-fold components normal
import Hero from "../components/Hero";
import Features from "../components/Features";

// ✅ Lazy load below-the-fold components
const Testimonials = lazy(() => import("../components/Testimonials"));
const CTA = lazy(() => import("../components/CTA"));
const Categories = lazy(() => import("../components/Categories"));
const Products = lazy(() => import("../components/Products"));

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Proper debounce (stable function)
  const handleCategorySelect = useMemo(
    () =>
      debounce((category) => {
        setSelectedCategory(category);
      }, 300),
    []
  );

  return (
    <>
      {/* ✅ Fast loading components */}
      <Hero />
      <Features />

      {/* ✅ Lazy sections (separate Suspense for better UX) */}
      <Suspense fallback={<p>Loading...</p>}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <CTA />
      </Suspense>

      <Suspense fallback={<p>Loading categories...</p>}>
        <Categories onSelectCategory={handleCategorySelect} />
      </Suspense>

      <Suspense fallback={<p>Loading products...</p>}>
        <Products selectedCategory={selectedCategory} />
      </Suspense>
    </>
  );
}

export default Home;