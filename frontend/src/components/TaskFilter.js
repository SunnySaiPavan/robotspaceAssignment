// src/components/TaskFilter.js
import React from 'react';

const TaskFilter = ({ onFilterChange }) => (
  <div className="mb-3">
    <label>Filter by Status:</label>
    <select onChange={(e) => onFilterChange(e.target.value)} className="form-control">
      <option value="">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
);

export default TaskFilter;
