import React from 'react';
import RecordsTable from './RecordsTable';

function MainContent() {
  return (
    <div style={{ flexGrow: 1, backgroundColor:"#F8F8F8" ,height:"200vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',backgroundColor:"white"  }}>
        <div style={{ fontWeight: 'bold',padding:"20px",color:"#1A2D33",fontSize:24}}>All Records</div>
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <input type="text" placeholder="Search People ...." style={{ padding: '5px', marginRight: 30,color:"#939393", backgroundColor:"#F8F8F8",border:"none",width:200, height:25,borderRadius:8 }} />
        </div>
      </div>
      <RecordsTable />
    </div>
  );
}

export default MainContent;
