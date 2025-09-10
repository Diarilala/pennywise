import { useEffect, useState } from "react"

const getCategories = async () => {
    
    try{
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo"
        const categories = await fetch('http://localhost:3000/api/categories?user_id=550e8400-e29b-41d4-a716-446655440000', {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        });
        const data = await categories.json();
        return data;
        
    } catch(err) {
        console.error(err);
    }
}

interface Category{
    category_id :  string,
    user_id : string,
    name : string,
    created_at : string
}
const NewExpenseForm = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [hour, setHour] = useState(new Date().toISOString().split('T')[1].slice(0,5));
    const [description, setDescription] = useState("");
    const [type, setType] = useState("one-time");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryId, setCategoryId] = useState("")

    useEffect(() => {
        (async () => {
            const data = await getCategories();
            setCategories(data);
            if (data && data.length > 0) {
                setCategoryId(data[0].category_id);
            }
        })()
    },[])

    useEffect(()=> {
        console.log(categoryId);
        
    }, [categoryId])

    const handleSubmit = () => {
        console.log(categoryId);
        
        const newExpense= {
            categoryId : categoryId,
            amount : amount,
            date : date+"T"+hour+":00.000Z",
            type: type,
            startDate: startDate,
            endDate: endDate,
            description: description,
        }
        try{
            console.log(newExpense);
            
            (async () => {
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNzU3MzY2NTQ1fQ.XBG6M9ge7k5Py87pJ3i7bEbkaNLI5N2-fBdGpXFubdo"
                await fetch(`http://localhost:3000/api/expense`, {
                    method: "POST",
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newExpense)
                }).then(response => {
                    console.log("rerwerewr" +response);
                    
                })
            })()

        } catch (err) {
            console.error(err);
            
        }
    }

    return (
        <div className="border-1 w-1/2 flex flex-col items-center p-4 gap-2">
            <p>Create a new Expense</p>
            <label htmlFor="description"> Description : 
                <input onChange={(e) => setDescription(e.target.value)} id="description" value={description} name="description" type="text" />
            </label>

            <label htmlFor="amount"> Amount : 
                <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" name="" id="amount" /> 
            </label>

            <label htmlFor="category"> categories 
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} name="" id="category">
                    <option value="" disabled>Choose a category</option>
                    {
                        categories.map(el => (
                            <option key={el.category_id} value={el.category_id}>{el.name}</option>
                        ))
                    }
                </select>
            </label>

            <label htmlFor="type"> Type : 
                <select name="" value={type}  onChange={(e) => setType(e.target.value)} id="type">
                    <option value="one-time">One time payment</option>
                    <option value="recurring" >Recurring payment</option>
                </select>
            </label>
            {
                type == "one-time" && (
                    <>
                        <div className="flex gap-4">
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                        <input type="time" name="" id="" value={hour} onChange={(e) => setHour(e.target.value)}/>

                        </div>
                    </>
                )
            }
            {
                type == "recurring" && (
                    <>
                    <div className="flex justify-center">
                        <div className="border-1 w-fit">
                            <input className="w-fit" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start date"/>
                            <input type="date" min={startDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End date" />
                        </div>
                        <div>
                            <input type="time" name="" value={hour} onChange={(e) => setHour(e.target.value)} id="" />
                        </div>
                    </div>
                    </>
                )
            }
            
            <button onClick={handleSubmit}>Create</button>
        </div>
    )
}

export default NewExpenseForm