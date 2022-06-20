//Imports React js
import { useState,useEffect } from "react"
//Imports Vitter

//Imports React Router DOM
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"

//Imports Components
import { Home } from "./components/Home"
import { Register } from "./components/Register"
import { Login } from "./components/Login"
import { Contact } from "./components/Contact"
import { Admin } from "./components/Admin"

//Imports Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./helpers/firebase.js";

//Imports Components
import { Navbar } from "./components/utils/Navbar"
import { TermsAndConditions } from "./components/TermsAndConditions"

export const Main = () => {

    const [firebaseUser, setFirebaseUser] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setFirebaseUser(user);
                console.log(user);
            }else{
                setFirebaseUser(null);
            }
        });
    }, []); 
    return firebaseUser !== false ? (
        <BrowserRouter>
        <Navbar firebaseUser={firebaseUser}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<TermsAndConditions />}/>
                <Route path="/rememberPassword" element={<h1>Olvidaste tu contraseña</h1>}/>
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
    ) : (
        <p>Cargando Información</p>
    )
}