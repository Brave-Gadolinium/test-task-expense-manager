import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className='sidebar__header'>
        <div>
          <span>Название проекта</span>
          <span>Аббревиатуры</span>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <ul className='sidebar__list'>
        <li><img src="./assets/window.png" alt="Проект По проекту"/>По проекту</li>
        <li><img src="./assets/window.png" alt="Проект Объекты" />Объекты</li>
        <li><img src="./assets/window.png" alt="Проект РД" />РД</li>
        <li><img src="./assets/window.png" alt="Проект МТО" />МТО</li>
        <li className="active"><img src="./assets/window.png" alt="Проект СМР" />СМР</li>
        <li><img src="./assets/window.png" alt="Проект График" />График</li>
        <li><img src="./assets/window.png" alt="Проект МиМ" />МиМ</li>
        <li><img src="./assets/window.png" alt="Проект Рабочие" />Рабочие</li>
        <li><img src="./assets/window.png" alt="Проект Капитализация" />Капитализация</li>
        <li><img src="./assets/window.png" alt="Проект Бюджет" />Бюджет</li>
        <li><img src="./assets/window.png" alt="Проект Финансирование" />Финансирование</li>
        <li><img src="./assets/window.png" alt="Проект Панорамы" />Панорамы</li>
        <li><img src="./assets/window.png" alt="Проект Камеры" />Камеры</li>
        <li><img src="./assets/window.png" alt="Проект Поручения" />Поручения</li>
        <li><img src="./assets/window.png" alt="Проект Контрагенты" />Контрагенты</li>
      </ul>
    </div>
  );
}

export default Sidebar;