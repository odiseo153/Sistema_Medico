import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Contexto } from "../../../Route/Rutas";

const Menu = () => {
  const [mostraMenu, setMenu] = useState(false);
  const [mostraRutas, setRutas] = useState(false);

  const cerrarSesion = () => {
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("tipo");

    window.location.href = "/login";
  };

  const context = useContext(Contexto);

  const medico = context.userTipo === 0;
  const name = context.usuario.userName;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            <button onClick={() => setRutas(!mostraRutas)} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">{name} </span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src="https://www.svgrepo.com/show/3102/blood-drop.svg" alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

                <div className="text-white">
                  <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" title="Home">Home</Link>
                  <Link to="/citas" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" title="Citas">Citas</Link>

                  {medico &&
                    <Link to="/pacientes" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" title="Pacientes">Pacientes</Link>
                  }
                </div>

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 ">
              <div>
                <button onClick={() => setMenu(!mostraMenu)} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"  >
                  <img className="h-8 w-8 rounded-full" src="https://st2.depositphotos.com/1006689/10154/v/450/depositphotos_101541298-stock-illustration-user-icon-team-people-vector.jpg " alt="" />
                  <span className="text-white mt-1 ml-2">{name}</span>
                </button>
              </div>

              <div className={` ${mostraMenu ? 'block' : 'hidden'}  absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}  >
                <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:" role="menuitem" id="user-menu-item-0" title="Home">Perfil</Link>
                <Link to="/login" onClick={cerrarSesion} className="block px-4 py-2 text-sm text-gray-700 hover:" role="menuitem" id="user-menu-item-0" title="Home">Logout</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className={mostraRutas ? 'sm:hidden' : 'hidden sm:hidden'} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">

          <Link to="/" className="text-gray-300 w-10 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium " title="Home">Home</Link>
          <Link to="/citas" className="text-gray-300 w-10 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" title="Citas">Citas</Link>

          {medico &&
            <Link to="/pacientes" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" title="Pacientes">Pacientes</Link>
          }

        </div>
      </div>



    </nav>
  );
};

export default Menu;
