/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RegistrarPaciente, RegistrarMedico } from "../Api/ApiController";
//import Button from "../Tools/Button";
import { Menssage } from "../MensajeEmergente/Mensaje";
import { validarCampos } from "./ValidarCampos";
//import { paciente } from "./Interfaces/paciente";


export function Creacion({ objeto, entidadType }: { objeto: any, entidadType: boolean }) {

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
        if (mensajeError) {
            Menssage.errorMessage(mensajeError);
            return;
        }
        if (entidadType) {
            console.log("medico")
            RegistrarMedico(entidad)
        } else {
            console.log("paciente")
            RegistrarPaciente(entidad)
        }

        //Registrarpaciente(paciente);
    };

    return (
        <form onSubmit={e => e.preventDefault()} className="mt-10">
            {Object.keys(objeto).map((key, index) => (
                <div key={index} className="mb-4">
                    <label htmlFor={key} className="block text-white-600 font-normal mb-2">{key}</label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        onChange={handleChange}
                        className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    />
                </div>
            ))}

            <button onClick={Registrar} className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

            <div className="mt-5 flex items-center justify-between pb-6">
                <p className="mb-0 me-2">have an account?</p>
                
                <a 
                href="/login" 
                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950" 
                data-twe-ripple-init data-twe-ripple-color="light">
                    Login
                </a>

            </div>
        </form>
    );
}



