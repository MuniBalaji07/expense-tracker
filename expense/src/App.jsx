import React, { useState } from 'react';
import './App.css';

function App() {
  const[incomes, setIncomes] = useState([]);
  const[method, setMethod] = useState('Cash')
  

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
          <div>
            <label htmlFor="method">Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="UPI">UPI</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
          <button type="submit">Add Income</button>
       </form>
      </div>
    </div> 
  )
}

export default App;
