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
  }, []);

  const fetchData = async () => {
    try {
      const database = firebase.database();
      const loansRef = database.ref('loans');

      console.log(loansRef)
      console.log('Firebase initialized:', firebase.apps.length > 0);
      console.log('Database reference:', loansRef.toString());
      
      // Attach an asynchronous callback to read the data
      loansRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        console.log('Data fetched with once:', data);
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
    setEndDate(date);
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
    width:"max-content"
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
              placeholderText={`${formattedCurrentDate()}`}
            />
          </div>
          <div >
            <label style={{marginLeft: 10,fontWeight:"bold",marginRight: 5}}>To </label>
            <DatePicker 
            className='datePicker' 
            selected={endDate} 
            onChange={handleEndDateChange}
            dateFormat="dd . MM . yyyy" 
            placeholderText={`${formattedCurrentDate()}`} />
          </div>
          
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button style={{ color:"#216FF4",height:41,width:145,borderRadius:12,borderColor:"#216FF4",marginTop:20,alignItems:"flex-end"}} 
          onClick={handleSearchClick}
          >Search</button>
        </div>
       
      </div>
      <div style={{ borderRadius: 30 }}>
      <p >Total Records: {filteredRecords.length}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
