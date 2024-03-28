import React, { useState } from 'react';
import axios from 'axios';
import Column from './Column';
import ProjectSettingsModal from './ProjectSettingsModal';
import './App.css';
import './styles.css';

function App() {
  const [columns, setColumns] = useState([]);
  const [projectName, setProjectName] = useState('Назва проекту');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const createColumn = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/columns/', {
        board: '37',
        name: newColumnName,
      });
      const newColumn = response.data;
      setColumns(prevColumns => [...prevColumns, newColumn]); 
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  const deleteColumn = async (columnId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/columns/${columnId}/`);
      setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectNameChange = (newName) => {
    setProjectName(newName);
    handleCloseModal();
  };

  return (
    <div className="App">
      <div className="header">
        <a className="project-logo">Project Management</a>
      </div>
      <div className="sidebar">
        <div className="menu">
          <div className="projectinfo">
            <img src='./images/projectlogo.png' className="img-project"/>
            <div className="info">
              <a className="project-name">{projectName}</a>
              <a className="project-status">Особистий проект</a>
            </div>
          </div>
          <div className="buttons">
            <li className="button"><img className="icon" src="./images/Info.png"></img><a className="button-text" href="#">Обрати дошку</a></li>
            <li className="button" onClick={handleOpenModal}><img className="icon" src="./images/Gear.png"></img><a className="button-text" href="#">Налаштування проекту</a></li>
          </div>
          <input class='place-text'
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Введіть назву стовпця"
        />
        <button className="createCol" onClick={createColumn}>
          <span className="createCol-title">Створити стовбець</span>
        </button>

        </div>
      </div>
      <div className="container">
        {columns.map((column) => (
          <Column
          key={column.id}
          column={column}
          setColumns={setColumns}
          columnName={column.name}
          onDeleteColumn={deleteColumn}
        />
        ))}
      </div>
      <ProjectSettingsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectName={projectName}
        onProjectNameChange={handleProjectNameChange}
      />
    </div>
  );
}

export default App;
