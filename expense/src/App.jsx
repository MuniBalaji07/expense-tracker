import React, { useState } from 'react';
import './App.css';

function App() {
  const[incomes, setIncomes] = useState([]);
  

  const addIncome = (e) => {
    e.preventDefault();
    if (incomeAmount) {
      setIncomes([...incomes, { id: Math.random(), amount: parseFloat(incomeAmount), method }]);
      setIncomeAmount('');
      setMethod('Cash'); 
    }
  };
  
  return(
    <div className="App">
       <h1>Expense Tracker</h1>
      <div className="income-input">
        <h3>Add Income</h3>
        <form onSubmit={addIncome}>
        <div>
            <label htmlFor="income">Amount</label>
            <input
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
        

        </form>
        
      
      </div>
   </div> 
  )
}

export default App;
