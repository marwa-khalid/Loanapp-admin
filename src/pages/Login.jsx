import React from 'react';
import logo from '../images/admin.png';  
import bg from '../images/background.jpg';  
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice'; 

const LoginPage = () => {

    const dispatch = useDispatch();

  const containerStyle = { 
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(37, 33, 244, 0.4)' 
  };

  const formStyle = {
    zIndex: 1, 
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    textAlign: 'center',
    width:300,
    height:390
  };

  const logoStyle = {
    width: '130px', // Adjust the size as needed
  };

  const inputStyle = {
    width: '90%',
    padding: '15px',
    borderRadius: '16px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    marginRight:"10px"
  };

  const buttonStyle = {
    width: '100%',
    padding: '13px',
    borderRadius: '16px',
    backgroundColor: '#216FF4',
    color: 'white',
    cursor: 'pointer',
    borderColor:"transparent",
    marginRight:"10px",
    marginTop:"10px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailError] = useState("");
  const [passErr, setPassError] = useState("");
  const [Err, setError] = useState("");

  const handleLogin = async () => {

    if (!email) {
      setEmailError("Email is required");
      setError('');
      setPassError('');
      return;
    }else { setEmailError(''); setError('');}
    if (!password) {
      setPassError("Password is required");
      setEmailError(''); 
      setError('');
      return;
    }else { setPassError('');  setError('');}
    
    if(email=="admin@dhaninstant.com" && password == "12345678"){   
      dispatch(login({ email: email, password: password }));
    }
    else setError("Invalid Credentials");
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={formStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <h2 style={{ color: 'black', textAlign:"start" }}>Log In</h2>
        <p style={{ color: '#949494', textAlign:"start"  }}>Enter your email and password to log in</p>
        <input style={inputStyle} type="email" placeholder="Email Address" className='inputt'
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
           
        <input style={inputStyle} type="password" placeholder="Password" className='inputt'
          
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
        <button style={buttonStyle} onClick={handleLogin}>Log In</button>
        <p style={{ color: 'black'}}>Forgot your password?</p>
        {passErr && <p style={{ color: 'red', fontSize: '16px' }}>{passErr}</p>}
        {emailErr && <p style={{ color: 'red', fontSize: '16px'}}>{emailErr}</p>}
        {Err && <p style={{ color: 'red', fontSize: '16px' }}>{Err}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
