import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Telas/Home'
import Clientes from "./Telas/Clientes";
import Produtos from "./Telas/Produtos";
import Servicos from "./Telas/Servico";


const AppRoutes = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/servicos" element={<Servicos />} />
                </Routes>
            </Router>

        </>
    )
}

export default AppRoutes;