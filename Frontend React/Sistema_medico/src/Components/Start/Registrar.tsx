import {  useState } from "react";
import Presentacion from "./Presentacion";
import Cambio from "./Cambio";
import { Creacion } from "./Creacion";


//import { Medico } from "./Interfaces/Medico";


export default function Registrar() {
  const [selectedValue, setSelectedValue] = useState(true);


  const [medico, setMedico] = useState({
    userName: "",
    password: "",
    email: "",
    especialidad: ""
  });

  
  const [paciente, setPaciente] = useState({
    userName: "",
    password: "",
    email: "",
    securityStamp: ""
});


  return (
    <div className="">
      <section className="gradient-form h-full ">
        <div className="container h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-dark shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">

                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">

                      <div className="text-center">
                        <img className="mx-auto w-48 rounded-2xl" src="https://cdn.thecollector.com/wp-content/uploads/2022/05/world-health-organisation-snake-logo.jpg?width=1400&quality=55" alt="logo" />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Somos el mejor equipo medico
                          <h1 className="text-3xl bold">Registro</h1>
                        </h4>
                      </div>

                      <Cambio setSelectedValue={setSelectedValue} />
                     
                      {selectedValue &&
                        <Creacion objeto={medico} entidadType={selectedValue} />
                      }

                      {!selectedValue &&
                        <Creacion objeto={paciente} entidadType={selectedValue} />
                      }

                    </div>
                  </div>


                  {/* Right column container with background and description*/}
                  <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none" style={{ background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)' }}>
                    <Presentacion />
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


