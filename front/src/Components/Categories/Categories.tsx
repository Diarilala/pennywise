import { useEffect, useState } from "react";
import CategoryComponent from "./CategoryComponent.jsx";
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
    try{
            const res = await fetch("http://localhost:3000/api/category", {
            method: "POST",
            credentials: 'include',
            headers: {"Content-Type" :'application/json'},
            body: JSON.stringify({name: newCategory})
        })
        const data = await res.json();
        console.log(data); 
        await fetchCategories();
    } catch(err){

    }
  }

  useEffect(() => {
    console.log("categories:", categories);
  }, [categories]);

  return (
    <>
      <p>Category section</p>
      <ul>
        {categories.map((c) => (
          <CategoryComponent key={c.category_id} categoryId={c.category_id} userId = {c.user_id} name = {c.name}/>
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
          onClick={handleNewCategorySubmit}
        >
          create category
        </button>
      </div>
    </>
  );
};

export default Categories;