import React, { useState } from 'react';
import Object from './Object';
import axios from 'axios';

const Column = ({ column, columnName, index, setColumns, onDeleteColumn, renameColumn }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState(columnName || "Новий стовпець");
  const [objects, setObjects] = useState(column.objects || []);

  const handleRenameColumn = () => {
    renameColumn(column.id, newColumnName);
    setIsEditing(false);
  };

  const createObject = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/cards/', {
        column: column.id,
        title: 'Завдання',
        description: 'Тут записаний опис завдання'
      });
      const newObject = response.data;
      setObjects(prevObjects => [...prevObjects, newObject]);
    } catch (error) {
      console.error('Error creating object:', error);
    }
  };

  const deleteObject = objectId => {
    setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId));
  };

  if (!column) {
    return null;
  }

  return (
    <div className="column">
      {isEditing ? (
        <input
          type="text"
          value={newColumnName}
          onChange={e => setNewColumnName(e.target.value)}
          onBlur={handleRenameColumn}
          autoFocus
        />
      ) : (
        <div className="column-name" onClick={() => setIsEditing(true)}>
          {columnName || "Новий стовпець"}
        </div>
      )}
      {objects.map(object => (
        <Object key={object.id} object={object} deleteObject={deleteObject} />
      ))}
      <button className="createObj" onClick={createObject}>
        Створити завдання
      </button>
      <button className="deleteColumn" onClick={() => onDeleteColumn(column.id)}>
        Видалити стовпець
      </button>
    </div>
  );
};

export default Column;
