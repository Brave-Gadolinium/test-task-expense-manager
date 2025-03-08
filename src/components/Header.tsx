import React from 'react';
import '../styles/Header.scss'

function Header() {
  return (
    <div className="header">
      <ul className='header__list'>
        <li><img style={{ height: `20px` }} src="./assets/menu.png" alt="Проект По проекту"/><div className='psevdoElem'></div></li>
        <li><img style={{ height: `20px` }} src="./assets/arrow-left.png" alt="Проект По проекту"/><div className='psevdoElem'></div></li>
        <li style={{ height: `40px` }} className='header__list__view'>Просмотр<div className='psevdoElem'></div></li>
        <li style={{ height: `40px` }} className='header__list__manage'>Управление<div className='psevdoElem'></div></li>
      </ul>
    </div>
  );
}

export default Header;