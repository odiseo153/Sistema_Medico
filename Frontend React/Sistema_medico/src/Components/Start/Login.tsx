import { useState } from "react";
import { login } from "../Api/ApiController";
import Button from "../Tools/Button";
import Presentacion from "./Presentacion";
import Cambio from "./Cambio";
import Loading from "../Dashboard/pages/Loading/Loading";




export default function Login() {
  const [selectedValue, setSelectedValue] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    passWord: "",
    email: ""
  });

  const IniciarSesion = async () => {
    setLoading(true);

    login(user.email, user.passWord, selectedValue)
      .then(() => {
        setLoading(false);
      })
      .catch(err => console.log(err));
  };



  return (
    <div className={`relative ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
    <section className="gradient-form h-full">
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
                        <h1 className="text-3xl bold">Login</h1>
                      </h4>
                    </div>

                    {loading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Loading /></div>}

                    <Cambio setSelectedValue={setSelectedValue} />

                    <form className="mt-3">
                      <p className="mb-4">Please login to your account</p>
                      {/*email input*/}
                      <div className="relative mb-4" >
                        <div className="flex flex-row gap-1 text-black bg-white rounded-md py-1 px-1">
                          <i className="fa-solid fa-envelope p-1"></i>
                          <input placeholder="email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type="text" className="bg-inherit focus:outline-none pl-1 w-full" />
                        </div>
                      </div>

                      <div className="relative mb-4" >
                        <div className="flex flex-row gap-1 text-black bg-white rounded-md py-1 px-1">
                          <i className="fa-solid fa-lock p-1"></i>
                          <input placeholder="password" type="password" onChange={(e) => { setUser({ ...user, passWord: e.target.value }) }} className="bg-inherit focus:outline-none pl-1 w-full" />
                        </div>
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <Button Accion={IniciarSesion} />
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <a href="/register" className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950" data-twe-ripple-init data-twe-ripple-color="light">Register</a>
                      </div>
                    </form>
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