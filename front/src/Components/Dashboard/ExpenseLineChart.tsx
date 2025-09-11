import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ExpenseLineChartProps {
    startDate: string;
    endDate: string;
}

interface ExpenseProp {
    expense_id: string;
    user_id: string;
    category_id: string;
    amount: number;
    type: string;
    date: string;
    start_date: string;
    end_date: string;
    description: string;
}

function getDateArray(start: string, end: string): string[] {
    const arr = [];
    let dt = new Date(start);
    const endDt = new Date(end);
    while (dt <= endDt) {
        arr.push(dt.toISOString().slice(0, 10));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ startDate, endDate }) => {
    const [expenses, setExpenses] = useState<ExpenseProp[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);

    const fetchExpense = async () => {
        const startingDate = startDate + "T00:00:00.000Z";
        const endingDate = endDate + "T00:00:00.000Z";
        const expenses_raw = await fetch(`http://localhost:3000/api/expense/?start=${startingDate}&end=${endingDate}`, {
            method: "GET",
            credentials: 'include'
        });
        const expenses_data = await expenses_raw.json();
        setExpenses(expenses_data);

        
        const dateArr = getDateArray(startDate, endDate);

        
        const sums = dateArr.map(date => {
            return expenses_data
                .filter((expense: ExpenseProp) => expense.date.slice(0, 10) === date)
                .reduce((acc: number, curr: ExpenseProp) => acc + Number(curr.amount), 0);
        });

        setLabels(dateArr);
        setValues(sums);
    };

    useEffect(() => {
        fetchExpense();
    }, [startDate, endDate]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses per Day',
                data: values,
                fill: false,
                borderColor: '#36A2EB',
                backgroundColor: '#36A2EB',
                tension: 0.2,
            },
        ],
    };

    return (
        <div>
            <h1>Expenses per Day</h1>
            <Line data={data} />
        </div>
    );
};

export default ExpenseLineChart;