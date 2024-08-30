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

  const addTransaction = (e) => {
    e,preventDefault();
    if(text && amount){
      const parsedAmount = parseFloat(amount);
      const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
      const totalExpenses = transcations.reduce((acc, transaction) => acc + transaction.amount, 0);

      if (parsedAmount > 0 || -parsedAmount <= remainingBalance) {
        if (editing !== null) {
          const updatedTransactions = transactions.map((transaction) =>
            transaction.id === editing ? { ...transaction, text, amount: parsedAmount, method } : transaction
          );
          setTransactions(updatedTransactions);
          setEditing(null);
        } else {
          const newTransaction = {
            id: Math.random(),
            text: text,
            amount: parsedAmount,
            method: method,
          };
    }

  }
}
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
      <div className="balance">
        <h2>YOUR BALANCE</h2>
        <h3>{formatCurrency(calculateBalance())}</h3>
      </div>
      <div className="summary">
        <div>
          <h3>TOTAL INCOME</h3>
          <p style={{ color: 'green'}}>{formatCurrency(calculateTolalIncome())}</p>
        </div>
        <div>
        <h3>TOTAL EXPENSES</h3>
        <p style={{ color: 'red'}}>{formatCurrency(calculateTolalIncome())}</p>
        </div>
      </div>
      <div className="summary">
        <div>
          <h3>TOTAL INCOME</h3>
          <p style={{color: 'green'}}>{formatCurrency(calculateTolalIncome())}</p>
        </div>
        <div>
          <h3>TOTAL EXPENSE</h3>
          <p style={{ color: 'red'}}>{formatCurrency(Math.abs(calculateTotalExpense()))}</p>
        </div>
      </div>
      <div>
        <div className="history">
          <h3>History</h3>
          <ul>
            {incomes.map((income) => (
              <li  key={income.id} className="plus">
                Income Added <span>{formatCurrency(income.amount)}</span>({income.method})
              </li>
            ))}
           {transcations.map((transaction) => (
            <li key={transaction.id} className={transaction.amount > 0 ? 'plus' : 'minus'}>
              {transaction.text} <span>{transaction.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}</span>({transaction.method})
              <button onClick={() => editTransaction(transaction.id)} className="edit-btn">edit</button>
              <button onClick={() => deleteTransaction(transaction.id)} className=""delete-btn>x</button>
            </li>
           ))}
          </ul>
        </div>
      </div>
    </div> 
  )
}
}
export default App;
