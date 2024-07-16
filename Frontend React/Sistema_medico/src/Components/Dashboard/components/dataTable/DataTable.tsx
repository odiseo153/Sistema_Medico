import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
//import { Link } from "react-router-dom";
import { EliminarCita } from "../../../Api/ApiController";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};



const DataTables = (props: Props) => {

  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   }, 
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]); 
  // //   }
  // // });

  const handleDelete = (id: string) => {
    //delete the item
    switch (id) {
       case "1":
        EliminarCita(id)
       break;

        case "2":

        break;
    }
    // mutation.mutate(id)
    EliminarCita(id)
  };


  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action p-2">

          <button
            title="Borrar"
            onClick={() => handleDelete(params.row.id)}
            className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>


          <button
            className="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
            title="Editar"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>


        </div>
      );
    },
  };


  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTables;
