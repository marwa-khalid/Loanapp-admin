import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './records.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

function RecordsTable({ searchTerm }) {
  const [loanData, setLoanData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const firebaseConfig = {
    apiKey: "AIzaSyBfP7hRKKLjiKeW7U2ScYIBH-vLaIYiFtI",
    authDomain: "phone-auth-42cba.firebaseapp.com",
    projectId: "phone-auth-42cba",
    storageBucket: "phone-auth-42cba.appspot.com",
    messagingSenderId: "125579364412",
    appId: "1:125579364412:web:9e604129a12c0d17a25b39"
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    fetchData();
  },  [selectedFilter, startDate, endDate]);

  const fetchData = async () => {
    try {
      const database = firebase.database();
      const loansRef = database.ref('loans');

      let query = loansRef;

      if (selectedFilter === 'Today') {
        query = query.orderByChild('createdAt').startAt(new Date().setHours(0, 0, 0, 0)).endAt(new Date().setHours(23, 59, 59, 999));
      }else if (selectedFilter === 'Yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Set the date to yesterday
      
        const startOfYesterday = new Date(yesterday);
        startOfYesterday.setHours(0, 0, 0, 0); // Set the time to the beginning of yesterday
      
        const endOfYesterday = new Date(yesterday);
        endOfYesterday.setHours(23, 59, 59, 999); // Set the time to the end of yesterday
      
        query = query
          .orderByChild('createdAt')
          .startAt(startOfYesterday.getTime())
          .endAt(endOfYesterday.getTime());
      }
      else if (selectedFilter === 'Last 3 days') {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        query = query.orderByChild('createdAt').startAt(threeDaysAgo.getTime());
      } else if (selectedFilter === 'Last 7 days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = query.orderByChild('createdAt').startAt(sevenDaysAgo.getTime());
      }

      query.once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the data object to an array
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLoanData(dataArray);
          console.log(dataArray)
        } else {
          setLoanData([]);
          console.log("hi")
        }
      });


    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
    
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    const inclusiveEndDate = new Date(date);
    inclusiveEndDate.setHours(23, 59, 59, 999);
    setEndDate(inclusiveEndDate);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setStartDate(null);
    setEndDate(null);
  };

  const filteredRecords = loanData.filter((record) => {
    const recordDate = new Date(record.createdAt);
    const meetsDateCriteria =
      (!startDate || recordDate >= startDate) && (!endDate || recordDate <= endDate);

    const meetsSearchCriteria =
      !searchTerm ||
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    return meetsDateCriteria && meetsSearchCriteria;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearchClick = () => {
    fetchData(); 
  }

  const formattedCurrentDate = () => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date().toLocaleDateString(undefined, options).replace(/\//g, ' . ');
  };

  const tableHeaderStyle = {
    background: '#216FF4',
    color: 'white',
    textAlign: 'left',
    padding: '10px'
  };

  const tableBodyCellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    width:"max-content",
  };

  const heading = {
    fontWeight:"bold",
    textAlign:"center"
  }

  return (
    <div style={{ padding: 30, backgroundColor: 'white', marginRight: 30, marginLeft: 30, borderRadius: 12,}}>
      <div style={{ display: 'flex'}} >
        <div style={{ display: 'flex', marginBottom: '20px',width:700, borderRadius: 16, backgroundColor: '#F8F8F8', padding: 25 }}>
          <div>
            <label style={{marginRight: 5,fontWeight:"bold"}}>Start from </label>
            <DatePicker
              className='datePicker'
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd . MM . yyyy" 
              placeholderText={'02. 01. 2024'}
            />
          </div>
          <div >
            <label style={{marginLeft: 10,fontWeight:"bold",marginRight: 5}}>To </label>
            <DatePicker 
            className='datePicker' 
            selected={endDate} 
            onChange={handleEndDateChange}
            dateFormat="dd . MM . yyyy" 
            placeholderText={'02. 01. 2024'} />
          </div>
          
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button style={{ color:"#216FF4",height:41,width:145,borderRadius:12,borderColor:"#216FF4",marginTop:20,alignItems:"flex-end"}} 
          onClick={handleSearchClick}
          >Search</button>
        </div>
       
       
      </div>
      <div style={{ borderRadius: 30,overflow: 'auto', maxHeight: '500px' }}>
        <div className='row'>
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
          <p >Total Records: {filteredRecords.length}</p>
          </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        
            <label style={{ marginRight: 10, fontWeight: 'bold' }}>Filter:</label>
            <select onChange={(e) => handleFilterChange(e.target.value)} value={selectedFilter}>
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last 3 days">Last 3 days</option>
              <option value="Last 7 days">Last 7 days</option>
            </select>
          </div>

        </div>
     
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>NO.</th>
              <th style={tableHeaderStyle}>User Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Mobile</th>
              <th style={tableHeaderStyle}>Loan Amount</th>
              <th style={tableHeaderStyle}>CreatedAt</th>
            </tr>
          </thead>
          <tbody style={tableBodyCellStyle}>
            {filteredRecords.map((record, index) => (
              <tr key={index}>
                <td style={tableBodyCellStyle}>{index + 1}.</td>
                <td style={tableBodyCellStyle}>{record.name}</td>
                <td style={tableBodyCellStyle}>{record.email}</td>
                <td style={tableBodyCellStyle}>{record.phoneNumber}</td>
                <td style={tableBodyCellStyle}>{record.loan}</td>
                <td style={tableBodyCellStyle}>{formatDate(record.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={heading}>Total Records: {filteredRecords.length}</p>
      </div>
    </div>
  );
}

export default RecordsTable;
