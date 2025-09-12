import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
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

interface Category {
    category_id: string;
    name: string;
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ startDate, endDate }) => {
    const [expenses, setExpenses] = useState<ExpenseProp[]>([]);
    const [values, setValues] = useState<number[]>([]);
    const [uniqueLabels, setUniqueLabels] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    
    const fetchCategories = async () => {
        const res = await fetch('http://localhost:3000/api/category', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();
        setCategories(data);
    };

    
    const fetchExpense = async () => {
        const startingDate = startDate + "T00:00:00.000Z";
        const endingDate = endDate + "T00:00:00.000Z";
        const expenses_raw = await fetch(`http://localhost:3000/api/expense/?start=${startingDate}&end=${endingDate}`, {
            method: "GET",
            credentials: 'include'
        });
        const expenses_data = await expenses_raw.json();
        setExpenses(expenses_data);

        const newLabels = expenses_data.map((expense: ExpenseProp) => expense.category_id);
        const setOfLabels = new Set(newLabels);
        const newLabelss = Array.from(setOfLabels) as string[];
        setUniqueLabels(newLabelss);

        const sums: number[] = newLabelss.map((label: string) =>
            expenses_data
                .filter((expense: ExpenseProp) => expense.category_id === label)
                .reduce((acc: number, curr: ExpenseProp) => acc + Number(curr.amount), 0)
        );
        setValues(sums);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchExpense();
    }, []);

    useEffect(() => {
        fetchExpense();
    }, [startDate, endDate]);

    
    const labelNames = uniqueLabels.map(
        (id) => categories.find((cat) => cat.category_id === id)?.name || id
    );

    const data = {
        labels: labelNames,
        datasets: [
            {
                label: 'Expenses by Category',
                data: values,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E7E9ED', '#B2FF66', '#66FFB2', '#FF6666'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='flex flex-col justify-center items-center gap-7'>
            <h1>Expense Pie Chart</h1>
            <Pie data={data} />
        </div>
    );
};

export default ExpensePieChart;