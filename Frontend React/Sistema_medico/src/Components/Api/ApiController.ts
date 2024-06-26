/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Cita } from "../Interfaces/Citas";
//import { Medico } from "../Interfaces/Medico";
import { Menssage } from "../MensajeEmergente/Mensaje";
import { Url } from "./Url";



export const login = async (email: string, password: string, medico = true) => {
    try {
        const peticion = medico ? 'LoginMedico' : 'LoginPaciente';
        const persona = medico ? 'Doctor' : 'Paciente';

        const response = await fetch(`${Url}${peticion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const { value } = await response.json();
        const data = value;

        console.log(data)

        if (data.code === 404) {
            Menssage.errorMessage(data.message);
            return;
        }
        else if (data.userName) {
            Menssage.successMessage(`Bienvenido ${persona} ${data.userName}`);

            console.log(JSON.stringify(data));

            const tipo = medico ? 0 : 1;
            sessionStorage.setItem('idUser', JSON.stringify(data.id));
            sessionStorage.setItem('tipo', tipo.toString());


            setTimeout(() => {
                window.location.href = "/";
            }, 1000)

        }

    } catch (error) {
        console.error('Error:', error);

    }
};







export const RegistrarMedico = async (medico) => {
    try {
        const response = await fetch(`${Url}Medico`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medico)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();

        if (data.value !== null) {
            Menssage.successMessage(`Bienvenido Doctor ${data.value.userName}`);
        } else {
            Menssage.errorMessage(data.message);
        }

    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }
};

export const RegistrarCita = async (cita: { pacienteId: string; medicoId: string; estado: string; comentarios: string; }) => {
    try {
        const response = await fetch(`${Url}Citas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cita)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log(data['code']);
        if (data['code']) {
            Menssage.warningNormalMessage(data.message);
        }

        Menssage.successMessage("cita Agregada con exito");

        setTimeout(() => {
            window.location.href = "/citas";
        }, 1000)

    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }
};

export const RegistrarPaciente = async (paciente) => {
    try {
        const response = await fetch(`${Url}Pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();

        console.log(data);
        if (data !== null) {
            Menssage.successMessage(`Bienvenido Paciente ${data.userName}`);
        } else {
            Menssage.errorMessage(data.message);
        }

    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }
}



export const GetCitas = async (): Promise<Cita[]> => {

    try {
        const response = await fetch(`${Url}Citas`);
        const citas = await response.json();

        console.log(citas)

        return citas;
    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }

    return [];
}

export const GetEntidad = async (medico = true): Promise<any> => {
    try {
        const Id = sessionStorage.getItem("idUser");
        const entidad = medico ? 'Medico' : 'Paciente';

        const UrlCompleta = `${Url}${entidad}/${Id}`;
        // Asegúrate de que el ID esté en el formato correcto y no contenga caracteres no deseados
        //const Id = id.trim();

        // Realiza la solicitud al servidor
        const response = await fetch(UrlCompleta.replace('"', '').replace('"', ''));

        //  console.log(UrlCompleta.replace('"','').replace('"',''));


        // Verifica si la solicitud fue exitosa 
        if (!response.ok) {
            throw new Error('La solicitud no pudo completarse correctamente.');
        }

        // Parsea la respuesta JSON
        const res = await response.json();

        // Retorna los datos recibidos
        console.log(res)
        return res;
    } catch (error) {
        // Manejo de errores
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
        return null; // Retorna null en caso de error
    }
};


export const GetMedicos = async (): Promise<{ userName: string, id: string, especialidad: string }[]> => {

    try {
        const response = await fetch(`${Url}Medicos`);
        const medicos = await response.json();



        return medicos;
    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }

    return [];
}

export const EliminarCita = async (id: string) => {

    try {
        const response = await fetch(`${Url}Citas/${id}`, {
            method: 'DELETE',
        });
        const res = await response.json();

        console.log(res)

        if (res) {
            Menssage.successMessage('Cita borrada con exito');
            //window.location.href = '/citas';
        }
        else {
            Menssage.errorMessage('la Cita no se pudo borrar');
        }



    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }

}


export const Actualizar =async (usuario:any,medico=false) =>{

    try{
        const ruta = medico ? 'Medicos' : 'Pacientes';
        
        const response = await fetch(`${Url}${ruta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(usuario)
        });

        const res = await response.json();

        if(res.userName){
            Menssage.successMessage("los datos se actualizaron correctamente");           
        }    


    }catch(error){
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }
}


export const BorrarCita = async (id: string) => {

    try {
        const response = await fetch(`${Url}Citas/${id}`, {
            method: 'DELETE',
        });
        const res = await response.json();

        console.log(res)

        if (res) {
            Menssage.successMessage('Cita borrada con exito');
            //window.location.href = '/citas';
        }
        else {
            Menssage.errorMessage('la Cita no se pudo borrar');
        }



    } catch (error) {
        Menssage.errorMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido');
    }

}




