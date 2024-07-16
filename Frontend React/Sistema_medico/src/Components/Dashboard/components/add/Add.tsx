/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
//import { Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GetMedicos, RegistrarCita } from "../../../Api/ApiController";
import { Contexto } from "../../../Route/Rutas";
import { validarCampos } from "../../../Start/ValidarCampos";


// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  data:any[];
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const contexto = useContext(Contexto);
  const [selectedDoctorId, setSelectedDoctorId] = useState(""); // Stores the selected doctor ID
  const [doctores, setDoctores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [cita, setCita] = useState({
    "pacienteId": contexto.usuario.id,
    "medicoId": selectedDoctorId,
    "estado": "",
    "comentarios": "",
    "fecha":""
  }); 


  useEffect(() => {
    try {
      const GetData = async () => {
        const doct = await GetMedicos();
        setDoctores(doct);
        setLoading(true)
      }

      GetData();
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();


    setCita((value) => {
      value = {
        ...value,
        [e?.target?.name]: e?.target?.value
      }

      // RETURNING VALUE
      return value;
    })

    console.log(cita);
    // props.setOpen(false)
  };

  const handleOnSubmit = () => {

    RegistrarCita(cita);
    //contexto.usuario.citas.push(cita)
    props.data.push(cita);
    console.log(cita)
    props.setOpen(false)

  }

  const fechaActual = new Date().toISOString().split('T')[0];


  return (
    <div>
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="w-96 relative flex flex-col p-4 rounded-md text-black bg-white">
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Crear una <span className="text-[#7747ff]">Cita</span></div>

            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>

              <div className="block relative">
                <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Fecha</label>
                <input min={fechaActual} type="date" onChange={handleChange} name="fecha" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
              </div>

              <div className="block relative">
                <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Estado Actual</label>
                <input onChange={handleChange} name="estado" placeholder="Estado" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
              </div>

              <div className="block relative">
                <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Comentarios</label>
                <input onChange={handleChange} name="comentarios" placeholder="Comentario acerca de tu estado" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
              </div>

              <div className="block relative">
                <label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
                  Doctores
                </label>

                <div className="overflow-y-auto h-[200px]">

                  {loading ?
                    <div>
                      {doctores.map((doctor) => (
                        <div key={doctor.id} className="">
                          <label className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="medicoId"
                              value={doctor.id}
                              checked={selectedDoctorId === doctor.id}
                              onChange={handleChange}
                              className={`mr-2 ${selectedDoctorId === doctor.id ? 'bg-blue-500 border-blue-700' : 'bg-gray-200 border-gray-400'} rounded-md focus:ring-2 focus:ring-blue-300`} // Tailwind styles for radio button
                            />
                            <span className="ml-2 text-gray-700">{doctor.userName} : {doctor.especialidad}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    :
                    <div>
                      <div className="relative flex w-64 animate-pulse gap-2 p-4">
                        <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                        <div className="flex-1">
                          <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                          <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                        </div>
                        <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                      </div>
                    </div>
                  }



                </div>
              </div>

              <button onClick={handleOnSubmit} className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Crear</button>

            </form>

            <button onClick={() => props.setOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
