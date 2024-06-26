import Single from "../../components/single/Single"
//import { singleUser } from "../../data"
import "./user.scss"
import { useContext } from "react";
import { Contexto } from "../../../Route/Rutas";



const User = () => {

  //Fetch data and send to Single Component
  const contexto = useContext(Contexto);

  return (
    <div className="user">
      <Single {...contexto.usuario}/>
    </div>
  )
}

export default User