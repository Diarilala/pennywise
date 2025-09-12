import IncomeItem from "./Item";

interface Income {
  income_id: string;
  user_id: string;
  amount: number;
  source: string;
  description: string;
  frequency: string;
  received_date: string;
  created_at: string;
}

interface IncomeListProps {
  incomes: Income[];
  onUpdate: () => void;
}

const IncomeList = ({ incomes, onUpdate }: IncomeListProps) => {
  if (incomes.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-xl shadow-sm p-8 text-center border border-[#9370DB]">
        <svg className="mx-auto h-12 w-12 text-[#9370DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-[#1E1E1E]">No income records yet</h3>
        <p className="mt-2 text-[#1E1E1E]">Start by adding your first income source.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] rounded-xl shadow-sm overflow-hidden border border-[#9370DB]">
      <div className="border-b border-[#9370DB] px-6 py-4 bg-[#9370DB] bg-opacity-10">
        <h2 className="text-lg font-medium text-[#1E1E1E]">Income History</h2>
      </div>
      
      <div className="divide-y divide-[#9370DB] divide-opacity-20">
        {incomes.map(income => (
          <IncomeItem 
            key={income.income_id} 
            income={income} 
            onUpdate={onUpdate} 
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;