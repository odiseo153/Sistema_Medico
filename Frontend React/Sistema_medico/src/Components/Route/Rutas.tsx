import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Home from "../Dashboard/pages/home/Home";
import Citas from "../Dashboard/pages/citas/Citas";
import Pacientes from "../Dashboard/pages/pacientes/Pacientes";
import User from "../Dashboard/pages/user/User";
import Login from "../Start/Login";
import Registrar from "../Start/Registrar";
import Dashboard from "../Dashboard/Dashboard";
import { GetEntidad } from "../Api/ApiController";
import NotFound from "../Dashboard/pages/NotFound/404";

export const Contexto = createContext({});

export default function Rutas() {
  const [usuario, setUsuario] = useState(null);
  const [userTipo, setUserTipo] = useState(0);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const tipo = sessionStorage.getItem("tipo");
      if (tipo !== null) {
        const tipoEntidad = Number.parseInt(tipo);
        const entidad = await GetEntidad(tipoEntidad === 0);
        setUsuario(entidad);
        setUserTipo(tipoEntidad);
      } else {
        setUsuario(null);
        setUserTipo(0);
      }
    };

    obtenerUsuario();
  }, []);

  const isLoggedIn = !!usuario;

  return (
    <Contexto.Provider value={{ usuario, userTipo }}>
      <Dashboard>
        <Routes>

          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/citas" element={isLoggedIn ? <Citas /> : <Navigate to="/login" />} />
          <Route path="/pacientes" element={isLoggedIn ? <Pacientes /> : <Navigate to="/login" />} />
          <Route path="/perfil" element={isLoggedIn ? <User /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <Registrar /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Dashboard>
    </Contexto.Provider>
  );
}
