import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api/api";

function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className="category-btn"
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;