import React, { useState } from 'react';
import './App.css';

function App() {
  const [incomes, setIncomes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash'); 
  const [editing, setEditing] = useState(null);

  const addIncome = (e) => {
    e.preventDefault();
    if (incomeAmount) {
      setIncomes([...incomes, { id: Math.random(), amount: parseFloat(incomeAmount), method }]);
      setIncomeAmount('');
      setMethod('Cash'); 
    }
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (text && amount) {
      const parsedAmount = parseFloat(amount);
      const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
      const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
      const remainingBalance = totalIncome - totalExpenses;

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
          setTransactions([...transactions, newTransaction]);
        }
        setText('');
        setAmount('');
        setMethod('Cash'); 
      } else {
        alert('Insufficient balance for this expense.');
      }
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const editTransaction = (id) => {
    const transaction = transactions.find((transaction) => transaction.id === id);
    setText(transaction.text);
    setAmount(transaction.amount);
    setMethod(transaction.method);
    setEditing(id);
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0).toFixed(2);
  };

  const calculateTotalExpenses = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  };

  const calculateBalance = () => {
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return (totalIncome - Math.abs(totalExpenses)).toFixed(2); 
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
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
          <p style={{ color: 'green' }}>{formatCurrency(calculateTotalIncome())}</p>
        </div>
        <div>
          <h3>TOTAL EXPENSES</h3>
          <p style={{ color: 'red' }}>{formatCurrency(Math.abs(calculateTotalExpenses()))}</p> {/* Displaying total expenses */}
        </div>
      </div>
      <div className="history">
        <h3>History</h3>
        <ul>
          {incomes.map((income) => (
            <li key={income.id} className="plus">
              Income Added <span>{formatCurrency(income.amount)}</span> ({income.method})
            </li>
          ))}
          {transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.amount > 0 ? 'plus' : 'minus'}>
              {transaction.text} <span>{transaction.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}</span> ({transaction.method})
              <button onClick={() => editTransaction(transaction.id)} className="edit-btn">edit</button>
              <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="new-transaction">
        <h3>{editing !== null ? 'Edit Transaction' : 'Add new transaction'}</h3>
        <form onSubmit={addTransaction}>
          <div>
            <label htmlFor="text">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
          <button type="submit">{editing !== null ? 'Edit Transaction' : 'Add Transaction'}</button>
        </form>
      </div>
    </div>
  );
}

export default App;
