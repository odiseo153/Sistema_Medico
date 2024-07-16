
import React, { useState } from "react";
import "./single.css";
import { Actualizar } from "../../../Api/ApiController";
//import { Medico } from "../../../Interfaces/Medico";


const Single = (props) => {
  const [editar, setEditar] = useState(false);

  const [usuario, setUsuario] = useState({
    "userName": props.userName,
    "email": props.email,
    "id": props.id
  })

  const editarUsuario = () => {
    Actualizar(usuario,props.especialidad !== null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();


    setUsuario((value) => {
      value = {
        ...value,
        [e?.target?.name]: e?.target?.value
      }

      // RETURNING VALUE
      return value;
    })

    console.log(usuario);
    // props.setOpen(false)
  };


  return (
    <div className="">

      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <a id="botonBack" href="/Empleados">
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"
                      ></path>
                    </svg>
                    <span>Atras</span>
                  </a>
                </div>

                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/medical-science-lab/doctor-icon.png"
                      className="rounded-circle"
                      width="150"
                      alt="medico img"
                    />
                    <div className="mt-3">
                      <h4>
                        {props.userName}
                      </h4>
                      <p className="text-muted font-size-sm">
                        {props.email}
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-users me-2"></i>
                    Datos Del {props.especialidad ? "Medico" : "Paciente"}
                  </div>

                  <button className="btn-success" onClick={() => setEditar(!editar)}>
                    Editar  <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                </div>


                <div className="card-body">


                  <div className="row">
                    <div className="col-sm-3 h-20">
                      <h6 className="mb-0 text-3xl">Nombre</h6>
                    </div>
                    <div className="col-sm-9 text-2xl">

                      {!editar ?
                        <div className="text-black">
                          {props.userName}
                        </div>
                        :
                        <div className="grid w-full max-w-xs items-center gap-1.5">
                          <input
                            placeholder="."
                            type="text"
                            name="userName"
                            defaultValue={props.userName}
                            onChange={handleChange}
                            className="text-green-700 flex h-10 w-full rounded-md border-black border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                      }

                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3 h-20">
                      <h6 className="mb-0 text-3xl">Correo</h6>
                    </div>
                    <div className="col-sm-9 text-2xl text-secondary">

                      {!editar ?
                        <div className="text-black">
                          {props.email}
                        </div>
                        :
                        <div className="grid w-full max-w-xs items-center gap-1.5">
                          <input
                            placeholder="."
                            type="text"
                            name="email"
                            onChange={handleChange}
                            defaultValue={props.email}
                            className="text-green-700 flex h-10 w-full rounded-md border-black border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>

                      }


                    </div>
                  </div>

                  <hr />

                  {props.especialidad &&
                    <div className="row">
                      <div className="col-sm-3 h-20">
                        <h6 className="mb-0 text-3xl">Especialidad </h6>
                      </div>
                      <div className="col-sm-9 text-2xl text-secondary">

                        {!editar ?
                          <div className="text-black">
                            {props.especialidad}
                          </div>
                          :
                          <div className="grid w-full max-w-xs items-center gap-1.5">
                            <input
                              placeholder="."
                              type="text"
                              defaultValue={props.especialidad}
                              onChange={handleChange}
                              className="text-green-700  flex h-10 w-full rounded-md border-black border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </div>
                        }

                      </div>
                    </div>
                  }




                  <hr />

                  {editar &&
                    <div className="row ">
                      <div className="col-sm-12 mt-5">
                        <button className="Btn" onClick={editarUsuario}>
                          <i className="fa-solid fa-pen-to-square"></i>
                          Editar
                        </button>
                      </div>
                    </div>
                  }


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Single;
