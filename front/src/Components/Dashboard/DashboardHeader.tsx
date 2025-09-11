import { useState } from "react"

const DashboardHeader = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    

    return <div className="bg-amber-200 w-[98%] flex justify-evenly">
        <div className="w-1/4 border-1 p-3 rounded-2xl">Income</div>
        <div className="w-1/4 border-1 p-3 rounded-2xl">Expense</div>
        <div className="w-1/4 border-1 p-3 rounded-2xl">Remaining</div>
    </div>
}

export default DashboardHeader