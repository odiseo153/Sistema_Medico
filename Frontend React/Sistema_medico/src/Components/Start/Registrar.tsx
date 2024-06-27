import { useState } from "react";
import Cambio from "./Cambio";
import { RegistrarMedico, RegistrarPaciente } from "../Api/ApiController";
import { Menssage } from "../MensajeEmergente/Mensaje";
import { validarCampos } from "./ValidarCampos";
import Button from "../Tools/Button";


//import { Medico } from "./Interfaces/Medico";




export default function Registrar() {
  const [selectedValue, setSelectedValue] = useState(true);
  const [entidad, setEntidad] = useState({});



  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;

    setEntidad(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const Registrar = () => {
    console.log(entidad);

    const mensajeError = validarCampos(entidad);

    if (mensajeError != '') {
      Menssage.errorMessage(mensajeError);
      return;
    }
    if (selectedValue) {
      console.log("medico")
      RegistrarMedico(entidad)
    } else {
      console.log("paciente")
      RegistrarPaciente(entidad)
    }

    //Registrarpaciente(paciente);
  };

  return (
    <div className={`flex flex-col items-center justify-center `}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">


        <Cambio setSelectedValue={setSelectedValue} />

        <h2 className="mt-2 text-2xl font-bold text-gray-900 mb-4">Registrar</h2>
        <form className="flex flex-col" >
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Usuario "
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email "
          />

          <input
            type="email"
            name={selectedValue ? 'especialidad' : 'securityStamp'}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder={selectedValue ? 'especialidad' : 'codigo social'}
          />

          <div className="flex  justify-between flex-wrap">
            <a href="/login" className="text-gray-900 mt-2">
             Do you have an account?
            </a>
            <Button Accion={Registrar} />
          </div>


        </form>
      </div>
    </div>
  );
}
