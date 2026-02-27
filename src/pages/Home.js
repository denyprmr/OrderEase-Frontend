import React, { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Products from "../components/Products";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Categories from "../components/Categories";

function Home() {

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);   // 🔥 this will trigger UI update
  };

  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />

      <Categories onSelectCategory={handleCategorySelect} />

      <Products selectedCategory={selectedCategory} />

    </>
  );
}

export default Home;