

  export  const validarCampos = (entidad: { userName?: string; password?: string; email?: string; especialidad?: string; securityStamp?: string; }) => {
    let mensajeError = '';
    if (!entidad.userName) {
      mensajeError += 'El campo Usuario es obligatorio. ';
    }
    if (!entidad.password) {
      mensajeError += 'El campo Password es obligatorio. ';
    }
    if (!entidad.email) {
      mensajeError += 'El campo Email es obligatorio. ';
    }
    if (!entidad.especialidad && !entidad.securityStamp) {
      mensajeError += 'El campo Especialidad o Código Social es obligatorio. ';
    }
    return mensajeError;
  };