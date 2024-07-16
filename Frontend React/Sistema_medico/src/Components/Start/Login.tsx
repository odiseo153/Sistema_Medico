import { useState } from "react";
import { login } from "../Api/ApiController";
import Button from "../Tools/Button";
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
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };


  return (
    <div className={`flex flex-col items-center justify-center ${loading ? 'opacity-50 pointer-events-none' : ''} ` }>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">

        {loading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Loading /></div>}

        <Cambio setSelectedValue={setSelectedValue} />

        <h2 className="mt-2 text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col" onSubmit={(e) => { e.preventDefault(); IniciarSesion(); }}>
          <input
            type="email"
            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Email "
          />

          <input
            type="password"
            onChange={(e) => { setUser({ ...user, passWord: e.target.value }) }}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />

          <div className="flex  justify-between flex-wrap">
            <a href="/register" className="text-gray-900 mt-2">
              Don't have an account?
            </a>
        <Button Accion={IniciarSesion} />
          </div>
          

        </form>
      </div>
    </div>
  );
}
