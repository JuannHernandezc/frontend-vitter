
//Imports Vitter

//Imports React Router DOM
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"

//Imports Components
import { Home } from "./components/Home"
import { Register } from "./components/Register"
import { Login } from "./components/Login"
import { Contact } from "./components/Contact"

export const Main = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<h1>Terminos y condiciones</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}