import React, { useState } from 'react';
import Table from './components/Table';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import './App.css';

const App: React.FC = () => {
  const [eID] = useState<string>('148610');

  return (
      <div className="app">
          <div className='flex'>
            <Header />
          </div>
          <div className='flex Sidebar__bottom'>
            <Sidebar />
            <Table eID={eID} />
          </div>
    </div>
  );
};

export default App;