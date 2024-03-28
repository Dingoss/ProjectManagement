import React from 'react';

// Компонент категорії
function Category({ name, isOpen, togglePanel }) {
  return (
    <div className="category" onClick={() => togglePanel(name)}>
      {name}
      {isOpen && <PanelList />}
    </div>
  );
}

// Компонент для списку панелей
function PanelList() {
  const panels = ['Меню області', 'Улюблене', 'Завдання', 'Повідомлення', 'Налаштування проекту'];

  return (
    <div className="panel-list">
      {panels.map(panel => (
        <li key={panel} className="button"><a className="button-text" href={`/service-${panels.indexOf(panel) + 1}/`}>{panel}</a></li>
      ))}
    </div>
  );
}

export { Category, PanelList };
