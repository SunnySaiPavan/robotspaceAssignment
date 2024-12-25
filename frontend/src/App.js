// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import TaskFilter from './components/TaskFilter';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // Handle task deletion here
    console.log(`Delete task with ID: ${id}`);
  };

  return (
    <Container>
      <h1 className="my-4">Task Tracker</h1>
      <TaskFilter onFilterChange={setFilter} />
      <button className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Task
      </button>
      <TaskList onEdit={handleEdit} onDelete={handleDelete} filter={filter}/>
      <TaskFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        task={selectedTask}
      />
    </Container>
  );
};

export default App;
