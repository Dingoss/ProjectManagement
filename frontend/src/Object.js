import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modalstyle.css';

function Object({ object, deleteObject }) {
  const [title, setTitle] = useState(object.title);
  const [description, setDescription] = useState(object.description);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(object.title);
  const [newDescription, setNewDescription] = useState(object.description);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const modalElement = document.querySelector(`.modal-${object.id}`);
    if (isModalOpen) {
      modalElement.style.display = 'block';
    } else {
      modalElement.style.display = 'none';
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    try {
      let responseData;
  
      if (object.id) {
        const response = await axios.put(`http://127.0.0.1:8000/cards/${object.id}/`, {
          title: newTitle,
          description: newDescription,
        });
        responseData = response.data;
      } else {
        const response = await axios.post(`http://127.0.0.1:8000/cards/`, {
          column: object.column_id,
          title: newTitle,
          description: newDescription,
        });
        responseData = response.data;
      }
      setTitle(newTitle);
      setDescription(newDescription);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving card:', error);
      setTitle(newTitle);
      setDescription(newDescription);
      setIsEditMode(false);
    }
  };
  
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/cards/${object.id}/`);
      deleteObject(object.id);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };
  
  return (
    <div className="object">
      <div className="object-title" onClick={openModal}>
        {title}
      </div>
      <span className="delete-button" onClick={handleDelete}>
        X
      </span>
      
      <div className={`modal modal-${object.id}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          {isEditMode ? (
            <input type="text" value={newTitle} onChange={handleTitleChange} />
          ) : (
            <h2>{title}</h2>
          )}
          {isEditMode ? (
            <textarea value={newDescription} onChange={handleDescriptionChange} />
          ) : (
            <p>{description}</p>
          )}
          <div style={{ textAlign: 'right' }}>
            {isEditMode ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEditToggle}>Редагувати</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Object;
