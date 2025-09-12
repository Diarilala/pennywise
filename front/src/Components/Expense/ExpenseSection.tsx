import { useEffect, useState } from "react";
import ExpenseRendering from "./ExpenseRendering";
import { Link } from "react-router-dom";

type Category = {
  category_id: string;
  name: string;
  user_id: string;
};

const ExpenseSection = () => {

    const [categories, setCategories] = useState<Category[]>();
    const [currentCategory, setCurrentCategory] = useState('')


    useEffect(() => {
        (async () => {
            const data = await fetch('http://localhost:3000/api/category/', {
                method: "GET",
                credentials: 'include'
            }
            );
            const dataa = await data.json()
            setCategories(dataa);
        })()
    },[])

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-20">
                <p className="text-5xl">Expenses</p>
            <button className="bg-amber-500 p-2 rounded-2xl">
                <Link to="create">
                New expense
                </Link>
                </button>
                <select value={currentCategory} onChange={(e)=>setCurrentCategory(e.target.value)} name="" id="">
                    <option value="">All</option>
                    {
                        categories?.map((cat) => (
                            <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                        ))
                    }
                </select>
                <Link to={'/dashboard'}>Come back to the dashboard</Link>
            <ExpenseRendering targetCategory={currentCategory}/>
            </div>
            
        </div>
    )

}
export default ExpenseSection;