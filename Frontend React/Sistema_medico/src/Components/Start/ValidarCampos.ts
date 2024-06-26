import { Menssage } from "../MensajeEmergente/Mensaje";

export const validarCampos = (objeto) => {
    for (const key in objeto) {
      if (Object.prototype.hasOwnProperty.call(objeto, key) && !objeto[key]) {
        Menssage.errorMessage(`El campo ${key} no puede estar vacío`);
      }
    }
    return "bien"; // Retorna null si todos los campos están llenos
  };