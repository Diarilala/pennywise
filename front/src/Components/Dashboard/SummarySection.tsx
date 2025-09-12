import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader"
import ExpensePieChart from "./ExpensePieChart";
import ExpenseLineChart from "./ExpenseLineChart";

const SummarySection = () => {
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10));
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,7) + '-01');
    return (
        <div className="gap-12 w-full outline-1 rounded-2xl outline-gray-300 bg-gray-100 flex flex-col items-center p-5 drop-shadow-xl shadow-2xl shadow-gray-400">
                <div className="flex justify-around outline-gray-300 outline-1 p-3 rounded-xl w-1/2 bg-gray-50 shadow-xl shadow-gray-300">
                    <label htmlFor="start">Starting date: 
                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mx-4" type="date" name="start" id="start" />
                    </label>
                    <label htmlFor="end">Ending date: 
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mx-4" type="date" name="end" id="end" />
                    </label>
                </div>
                <DashboardHeader startDate={startDate} endDate={endDate} />
                <div className="flex gap-20">
                    <div className="pr-15">
                        <ExpensePieChart startDate={startDate} endDate={endDate} />

                    </div>
                    <div className="pl-15">
                        <ExpenseLineChart startDate={startDate} endDate={endDate} />

                    </div>
                </div>
                
        </div>
    )
}
export default SummarySection