import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './records.css';
import { FiCalendar } from 'react-icons/fi';

function RecordsTable({ searchTerm }) {
  const [loanData, setLoanData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://loanapp-server-production.up.railway.app/loans');
      setLoanData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  return (
    <div style={{ padding: 30, backgroundColor: 'white', marginRight: 30, marginLeft: 30, borderRadius: 12}}>
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
      </div>
    </div>
  );
}

export default RecordsTable;
