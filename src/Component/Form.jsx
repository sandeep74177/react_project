import React, { useState } from 'react';

const Form = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    category: '', // New category field
  });

  // List of categories (you can customize these categories)
  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'];

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

    // Pass the new expense data back to the parent component
    onAddExpense(newExpense);

    // Reset form
    setFormData({ name: '', amount: '', date: '', category: '' });
  };

  return (
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
  );
};

export default Form;
