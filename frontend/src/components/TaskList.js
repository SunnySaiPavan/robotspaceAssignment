import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

const TaskList = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredTasks = tasks.filter(
    (task) => !filter || task.status === filter
  );

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Filter by Status
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFilterChange('')}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('Pending')}>
            Pending
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('In Progress')}>
            In Progress
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterChange('Completed')}>
            Completed
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td
                  style={{
                    color: new Date(task.dueDate) < new Date() ? 'red' : 'inherit',
                  }}
                >
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
