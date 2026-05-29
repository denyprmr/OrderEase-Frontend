import React, {
  lazy,
  Suspense,
  useMemo,
} from "react";

import { useDispatch } from "react-redux";

import { debounce } from "../utils/debounce";

import { setSelectedCategory } from "../redux/slices/productSlice";



// ✅ Above-the-fold components
import Hero from "../components/Hero";
import Features from "../components/Features";



// ✅ Lazy loaded sections
const Testimonials = lazy(() =>
  import("../components/Testimonials")
);

const CTA = lazy(() =>
  import("../components/CTA")
);

const Categories = lazy(() =>
  import("../components/Categories")
);

const Products = lazy(() =>
  import("../components/Products")
);



function Home() {
  const dispatch = useDispatch();



  // ✅ Debounced category handler
  const handleCategorySelect = useMemo(
    () =>
      debounce((category) => {
        dispatch(setSelectedCategory(category));
      }, 300),

    [dispatch]
  );



  return (
    <>
      {/* HERO */}
      <Hero />



      {/* FEATURES */}
      <Features />



      {/* TESTIMONIALS */}
      <Suspense fallback={<p>Loading...</p>}>
        <Testimonials />
      </Suspense>



      {/* CTA */}
      <Suspense fallback={<p>Loading...</p>}>
        <CTA />
      </Suspense>



      {/* CATEGORIES */}
      <Suspense
        fallback={<p>Loading categories...</p>}
      >
        <Categories
          onSelectCategory={
            handleCategorySelect
          }
        />
      </Suspense>



      {/* PRODUCTS */}
      <Suspense
        fallback={<p>Loading products...</p>}
      >
        <Products />
      </Suspense>
    </>
  );
}

export default Home;