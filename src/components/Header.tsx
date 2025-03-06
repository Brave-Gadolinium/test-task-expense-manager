import React from 'react';
import '../styles/Header.scss'

function Header() {
  return (
    <div className="header">
      <ul className='header__list'>
        <li><img src="./assets/menu.png" alt="Проект По проекту"/></li>
        <li><img src="./assets/arrow-left.png" alt="Проект По проекту"/></li>
        <li>Просмотр</li>
        <li>Управление</li>
      </ul>
    </div>
  );
}

export default Header;