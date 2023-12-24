import logo from './logo.svg';
import React , {useEffect} from 'react';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, login, logout } from './redux/UserSlice';

function App() {
  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    
    console.log(user)
    console.log(isLoggedIn)
    if (storedIsLoggedIn === "true") {
      dispatch(login({ user}));
    }
  }, []);

 return (
  <>
  <div className="app">
  {isLoggedIn ? (
      <>
      <Dashboard/>
      </>
    ) : (
      
      <Login/>
      
    )}
    </div>
</>
  );
}

export default App;
