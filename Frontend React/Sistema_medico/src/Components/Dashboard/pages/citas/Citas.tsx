/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import {  useState } from "react";
import Add from "../../components/add/Add";
//import { userRows } from "../../data";
//import { GetCitas } from "../../../Api/ApiController";
//import { Cita } from "../../../Interfaces/Citas";
import { GridColDef } from "@mui/x-data-grid";
//import Loading from "../../../Loading";
import { useContext } from "react";
import { Contexto } from "../../../Route/Rutas";


// import { useQuery } from "@tanstack/react-query";



const columnsPaciente: GridColDef[] = [
  {
     field: "id",
     headerName: "ID",
     width: 90 
    
  },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: () => {
      return <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="m-1" alt="" />;
    },
  },
  {
    field: "medico",
    type: "string",
    headerName: "Doctor",
    width: 150,
  },
  {
    field: "fecha",
    type: "Date",
    headerName: "Fecha",
    width: 200,
  },
  {
    field: "completada",
    type: "boolean",
    headerName: "Completada",
    width: 200,
  }
];

const columnsMedico: GridColDef[] = [
  {
     field: "id",
     headerName: "ID",
     width: 90 
    
  },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: () => {
      return <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="m-1" alt="" />;
    },
  },
  {
    field: "pacienteName",
    type: "string",
    headerName: "Paciente",
    width: 150,
  },
  {
    field: "fechaHora",
    type: "Date",
    headerName: "Fecha",
    width: 200,
  },
  {
    field: "completada",
    type: "boolean",
    headerName: "Completada",
    width: 200,
  }
];



const Citas = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contexto = useContext(Contexto);
  //const citas = contexto.usuario.citasPendiente ? contexto.usuario.citasPendiente : contexto.usuario.citas; 
  const [data, setData] = useState<any[]>(contexto.usuario.citasPendiente);
  

  const columnas =contexto.userTipo == 0 ? columnsMedico : columnsPaciente;



  return (
    <div className="users">
      <div className="info">
        <h1 className="text-3xl">Citas</h1>

        {contexto.usertTipo == 1 && 
        <button className="rounded-lg relative h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500" onClick={() => setOpen(true)}>
          Agregar Nueva Cita
        </button>
        }
      </div>

      {/* 
      
      <DataTable slug="users" columns={columns} rows={userRows} />
      */}

        <DataTable slug="Citas" columns={columnas} rows={data} />

      {open && <Add slug="Cita" columns={columnas} data={data} setOpen={setOpen} />}
    </div>
  );
};

export default Citas;

