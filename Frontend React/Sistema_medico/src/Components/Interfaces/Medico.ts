import { Cita } from "./Citas";


export interface Medico {
    especialidad: string;
    citasPendiente?: Cita[];
    id?: string;
    userName: string;
    email: string;
}




