import { useEffect, useState } from "react";
import { CategoryComponent } from "./CategoryComponent";

type Category = {
  category_id: string;
  name: string;
  user_id: string;
};

const Categories = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNewCategorySubmit = async () => {
    if (!newCategory.trim()) {
      alert("The new category name cannot be empty");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ name: newCategory })
      });
      await res.json();
      setNewCategory("");
      await fetchCategories();
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [categories.length]);

  return (
    <div className="absolute inset-0 max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleNewCategorySubmit();
        }}
        className="flex items-center gap-3 mb-8"
      >
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          name="categoryName"
          id="categoryName"
          placeholder="New category name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-500 text-white rounded-md font-semibold hover:bg-amber-600 transition"
        >
          Create
        </button>
      </form>
      <ul className="space-y-3">
        {categories.map((c) => (
          <li key={c.category_id}>
            <CategoryComponent
              onDelete={fetchCategories}
              categoryId={c.category_id}
              userId={c.user_id}
              name={c.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;