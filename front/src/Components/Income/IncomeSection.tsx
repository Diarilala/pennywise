import { useState, useEffect } from "react";
import IncomeList from "./IncomeList";
import AddIncomeForm from "./AddIncomeForm";
import { Link, useNavigate } from "react-router-dom";

interface Income {
  income_id: string;
  user_id: string;
  amount: number;
  source: string;
  description: string;
  created_at: string;
  frequency: string;
  received_date: string;
}

const IncomeSection = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    fetchUserIncomes();
  }, []);

  const fetchUserIncomes = async () => {
    try {
      
      const response = await fetch("http://localhost:3000/api/income", {
        headers: { 
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      alert("Failed to load incomes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIncomeAdded = () => {
    fetchUserIncomes();
    setShowAddPanel(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9370DB]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#FFFFFF] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1E1E1E]">Income</h1>
        <button
          onClick={() => setShowAddPanel(true)}
          className="bg-[#9370DB] hover:bg-[#8360CB] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Income
        </button>
      </div>
        <button>
          <Link to='/dashboard'>Return to home page</Link>
        </button>
      <IncomeList incomes={incomes} onUpdate={fetchUserIncomes} />

      {showAddPanel && (
        <AddIncomeForm 
          onSave={handleIncomeAdded} 
          onCancel={() => setShowAddPanel(false)} 
        />
      )}
    </div>
  );
};

export default IncomeSection;