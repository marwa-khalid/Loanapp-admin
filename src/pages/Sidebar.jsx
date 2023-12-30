import React from 'react';
import logo from '../images/admin.png';
import home from '../images/home.jpg';
import logoutIcon from '../images/logout.jpg';
import {useDispatch} from "react-redux";
import { logout } from "../redux/UserSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const handleLogout = () =>{
        dispatch(logout());
    }
    const stayOnMain = () =>{
    }
  return (
    <div style={{ width: '200px', backgroundColor: '#fff', color: '#216FF4', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '70%', alignItems: 'center' }} />
      </div>
      <p style={{ width:"80%", textAlign: 'start', color: 'black'}}>Main</p>

        <button onClick={stayOnMain} style={{ textAlign: 'start', backgroundColor: 'white', color: '#216FF4', padding: '10px', marginBottom: '10px', borderRadius: '8px', width:"90% ", borderColor:"#216FF4", fontWeight:"bold", borderWidth:"1px" }}>
          <img src={home} style={{width:"40%",marginRight:10}} />Home
        </button>
        <button onClick={handleLogout} style={{ textAlign: 'start', backgroundColor: 'white', color: '#5C5E64', padding: '10px', borderRadius: '8px',borderColor:"transparent",width:"90% ",fontWeight:"bold" }}>
        <img src={logoutIcon} style={{width:"40%",marginRight:10}} />Logout
        </button>
    </div>
  );
}

export default Sidebar;
