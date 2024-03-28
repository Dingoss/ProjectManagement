import React, { useState, useEffect } from 'react';

const ProjectSettingsModal = ({ isOpen, onClose, projectName, onProjectNameChange }) => {
  const [newProjectName, setNewProjectName] = useState(projectName);

  useEffect(() => {
    const modalElement = document.getElementById('projectSettingsModal');
    if (isOpen) {
      modalElement.style.display = 'block';
    } else {
      modalElement.style.display = 'none';
    }
  }, [isOpen]);

  const handleSave = () => {
    onProjectNameChange(newProjectName);
    onClose();
  };

  return (
    <div id="projectSettingsModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Налаштування проекту</h2>
        <label htmlFor="projectName">Змінити назву проекту:</label>
        <input
          type="text"
          id="projectName"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={handleSave}>Зберегти</button>
      </div>
    </div>
  );
};

export default ProjectSettingsModal;
