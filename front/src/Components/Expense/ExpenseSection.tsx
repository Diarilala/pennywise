import { useEffect, useState } from "react";
import ExpenseRendering from "./ExpenseRendering";
import { Link } from "react-router-dom";
import SideBar from "../Dashboard/SideBar";

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
        <div className="flex justify-start   inset-0   items-start">
            <div className="sticky top-0 h-screen flex p-5">
             <SideBar />
             </div>
            <div className="gap-12 w-full overflow-y-scroll outline-1 rounded-2xl outline-gray-300 bg-gray-100 flex flex-col items-center p-5 drop-shadow-xl shadow-2xl shadow-gray-400">
                <div className="flex flex-col gap-11 shadow-lg shadow-gray-400 p-5 rounded-2xl">
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
            
        </div>
    )

}
export default ExpenseSection;