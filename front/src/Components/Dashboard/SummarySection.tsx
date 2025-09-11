import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader"
import ExpensePieChart from "./ExpensePieChart";
import ExpenseLineChart from "./ExpenseLineChart";

const SummarySection = () => {
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10));
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,7) + '-01');
    return (
        <div className=" w-3/4 rounded-2xl bg-white flex flex-col items-center p-5 gap-5">
                <div className="border-1 p-3 rounded-xl">
                    <label htmlFor="start">Starting date: 
                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mx-4" type="date" name="start" id="start" />
                    </label>
                    <label htmlFor="end">Ending date: 
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mx-4" type="date" name="end" id="end" />
                    </label>
                </div>
                <DashboardHeader startDate={startDate} endDate={endDate} />
                <ExpensePieChart startDate={startDate} endDate={endDate} />
                <ExpenseLineChart startDate={startDate} endDate={endDate} />
        </div>
    )
}
export default SummarySection