import { useState } from "react";

interface AddIncomeFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const AddIncomeForm = ({ onSave, onCancel }: AddIncomeFormProps) => {
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    description: "",
    date: new Date().toLocaleDateString('en-CA')
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.source) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: formData.amount,
          source: formData.source,
          description: formData.description,
          date: new Date(formData.date).toISOString()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add income");
      }
      
      onSave();
    } catch (error: any) {
      console.error("Error adding income:", error);
      alert(error.message || "Failed to add income. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1E1E1E] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFFFFF] w-full max-w-md rounded-lg shadow-xl border border-[#9370DB]">
        <div className="p-6 border-b border-[#9370DB]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Add New Income</h2>
            <button 
              onClick={onCancel}
              className="text-[#9370DB] hover:text-[#8360CB] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
              Income Source *
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={e => setFormData({...formData, source: e.target.value})}
              className="w-full px-3 py-2 border border-[#9370DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9370DB] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#9370DB]">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full pl-8 pr-3 py-2 border border-[#9370DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9370DB] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 border border-[#9370DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9370DB] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-[#9370DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9370DB] focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-[#9370DB] rounded-md text-[#9370DB] hover:bg-[#9370DB] hover:bg-opacity-10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#9370DB] text-[#FFFFFF] rounded-md hover:bg-[#8360CB] disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Adding..." : "Add Income"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeForm;