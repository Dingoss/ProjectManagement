import React, { useState } from 'react';
import axios from 'axios';

function CreateBoardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const createBoard = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/board/', {
        name: 'Нова дошка',
      });
      console.log('Board created:', response.data);
      // Перенаправляем пользователя на основную страницу с доской (App)
      window.location.href = '/app';
    } catch (error) {
      console.error('Error creating board:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="main-page">
      <h1>Сторінка створення дошки</h1>
      <button onClick={createBoard} disabled={isLoading}>
        {isLoading ? 'Створення...' : 'Створити дошку'}
      </button>
    </div>
  );
}

export default CreateBoardPage;
