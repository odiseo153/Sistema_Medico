import { useContext, useEffect, useState } from "react";
import "./pacientes.scss";
import { Contexto } from "../../../Route/Rutas";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { Paciente } from "../../../Interfaces/Paciente";
import Loading from "../../../Loading";


const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: () => {
      return <img className="m-2" src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png" alt="" />;
    },
  },
  {
    field: "userName",
    type: "string",
    headerName: "Nombre",
    width: 250,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 150,
  },

];

const Pacientes = () => {
  const contexto = useContext(Contexto);
  const [paciente, setPaciente] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const Pacientes = () => {
          const nuevosPacientes = contexto.usuario.citasPendiente.map((e) => e.paciente);
          setPaciente((prevPacientes) => [...prevPacientes, ...nuevosPacientes]);
          setIsLoading(true);
        };
  
        Pacientes();
      } catch (error) {
        console.log(error);
      }
    }, 500); // Ajusta el tiempo de retardo según sea necesario
  
    return () => clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente
  }, []);
  

  return (
    <div className="products">
      <div className="info">
        <h1>Pacientes</h1>
      </div>



     {!isLoading? (
        <Loading />
      ) : (
        <DataTable slug="products" columns={columns} rows={paciente} />
      )} 


    
    </div>
  );
};

export default Pacientes;
