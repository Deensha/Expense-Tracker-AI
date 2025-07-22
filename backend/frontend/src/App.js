import React, { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleAdd = () => {
    const expense = { name, amount };
    fetch('http://localhost:5000/api/add-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.expenses);
        setSuggestion(data.suggestion);  // Show AI suggestion
      });

    setName('');
    setAmount('');
  };

  return (
    <div className="App">
      <h1>Expense Tracker with AI Suggestions</h1>

      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAdd}>Add Expense</button>

      <h2>Expense List:</h2>
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.date} - {exp.name} - ₹{exp.amount}
          </li>
        ))}
      </ul>

      {suggestion && <p><strong>AI Suggestion:</strong> {suggestion}</p>}
    </div>
  );
}

export default App;
