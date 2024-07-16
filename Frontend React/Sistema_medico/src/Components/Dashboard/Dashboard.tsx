import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/menu/Menu";
import { Contexto } from "../Route/Rutas";

export default function Dashboard({ children } : { children: ReactNode }) {
  const context = React.useContext(Contexto);

  const Layout = () => {
    return (
     <div className="">
        
        {context.usuario !== null && (
          <div className="">
            <Menu />
          </div>
        )}

        
        <div className="mt-10 flex-grow p-2">
          {children}
        </div>

        
      </div>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}
