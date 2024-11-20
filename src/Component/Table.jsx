// import React from 'react';

const Table = ({ expenses }) => {
    return (
      <div>
        <h1>Expense List</h1>
        <table border="1" style={{ width: '100%', textAlign: 'left', padding: '8px' }}>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount.toFixed(2)}</td>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  