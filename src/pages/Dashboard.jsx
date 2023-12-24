import React from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Dashboard() {
  return (
    <div style={{ display: 'flex' ,backgroundColor:"grey"}}>
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
