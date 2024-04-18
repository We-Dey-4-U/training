import React, { useState } from 'react';
import api from '../../api'; // Import the Axios instance
import '../../index.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title, description });
      console.log(response.data);
      

       // Redirect the user to the task list page after successful submission
       navigate('/taskList');
     
      
      // Clear the input fields after successful submission
      setTitle('');
      setDescription('');

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;