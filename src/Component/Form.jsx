
import React, { useState, useEffect } from 'react';

const Form = () => {
  // State to store the list of expenses
  const [expenses, setExpenses] = useState([]);

  // State to store the current input values from the form
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',  // New category field
  });

  // List of categories (you can customize these categories)
  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure valid data before adding to expenses list
    if (!formData.name || !formData.amount || !formData.date || !formData.category) {
      alert('Please fill in all fields.');
      return;
    }

    const newExpense = {
      id: Date.now(), // Use timestamp as a unique ID
      ...formData,
      amount: parseFloat(formData.amount), // Convert amount to a number
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setFormData({ name: '', amount: '', date: '', category: '' }); // Reset form
  };

  // Calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      {/* Form to add expense */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Expense Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter expense name"
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* New category dropdown */}
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>

      {/* Displaying the list of expenses */}
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)} on {expense.date} (Category: {expense.category})
          </li>
        ))}
      </ul>

      {/* Displaying the total expenses */}
      <h3>Total Expenses: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Form;
