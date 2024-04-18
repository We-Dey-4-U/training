import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'; // Import the Axios instance
import TaskItem from './TaskItem';
import '../../index.css'; // Import the CSS file for styling

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="task-list-container"> {/* Apply a class for styling */}
      <h2>Task List</h2>
      <Link to="/tasks" className="task-form-link">Create New Task</Link> {/* Link to TaskForm page */}
      <div className="task-list"> {/* Apply a class for styling */}
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;