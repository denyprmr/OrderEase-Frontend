import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/api";

function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const normalized = category.toLowerCase();

    setActiveCategory(normalized);
    onSelectCategory(normalized);
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-container">
        {/* ✅ ALL BUTTON */}
        <button
          className={`category-btn ${activeCategory === "" ? "active" : ""}`}
          onClick={() => handleCategoryClick("")}
        >
          All
        </button>

        {/* ✅ CATEGORY LIST */}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat.toLowerCase() ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;