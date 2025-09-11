import { useEffect, useState } from "react";

type Category = {
  category_id: string;
  name: string;
  user_id: string;
  // add other fields if present
};

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/category", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.error("Failed to fetch categories:", res.status, await res.text());
          return;
        }
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data.categories ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("categories:", categories);
  }, [categories]);

  return (
    <>
      <p>Category section</p>
      <ul>
        {categories.map((c) => (
          <li key={c.category_id}>{c.name}</li>
        ))}
      </ul>
      <div>
        <label htmlFor="categoryName">
          Name:
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
            name="categoryName"
            id="categoryName"
          />
        </label>
        <button
          // onClick={handleNewCategorySubmit}
        >
          create category
        </button>
      </div>
    </>
  );
};

export default Categories;