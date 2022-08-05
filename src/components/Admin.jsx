import React from 'react'
import { useState,useEffect } from 'react'
import { auth } from '../helpers/firebase.js'
import { useNavigate } from "react-router";
import { Navbar } from './utils/Navbar.jsx';
import {db} from '../helpers/firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.currentUser){
      setUser(auth.currentUser);
    }else{
      navigate('/');
    }
  },[navigate]);
  return (
    <div>
      <Navbar />
    </div>
  )
}
