
import React, { useState, useEffect } from 'react';
import Form from './Component/Form'; // Assuming your Form component is in Form.js
import Table from './Component/Table'; // Assuming your Table component is in Table.js

import './App.css'

const App = () => {
  // State to store the list of expenses
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage when the component mounts
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  // Save expenses to localStorage whenever the expenses state changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Handle adding new expense from the Form component
  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      {/* Pass handleAddExpense to Form component to allow adding expenses */}
      <Form onAddExpense={handleAddExpense} />

      {/* Pass expenses to Table component to display the list */}
      <Table expenses={expenses} />
    </div>
  );
};

export default App;
