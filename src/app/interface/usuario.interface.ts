export interface UsuarioInformacion {
    id:                            number;
    usuario:                       Usuario;
    informacionPersonal:           InformacionPersonal;
    informacionMedica:             InformacionMedica;
    informacionContacto:           InformacionContacto;
    informacionContactoEmergencia: InformacionContactoEmergencia[];
    inscripcion:                   Inscripcion[];
    pagos?:                        Pago[];
    reigstroEntradasSalidas?:      ReigstroEntradasSalida[];
}

export interface InformacionContacto {
    id:            number;
    numeroCelular: string;
    numeroCasa:    string;
    cp:            string;
    estado:        string;
    municipio:     string;
    colonia:       string;
    calle:         string;
    numero:        string;
}

export interface InformacionContactoEmergencia {
    id:              number;
    nombre:          string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    parentesco:      string;
    numeroCelular:   string;
    numeroCasa:      string;
    correo:          string;
}

export interface InformacionMedica {
    id:               number;
    alergias:         string;
    padecimientos:    string;
    estatura:         string;
    peso:             string;
    tipoSangre:       string;
    afiliacionMedica: AfiliacionMedica;
}

export interface AfiliacionMedica {
    id:               number;
    afiliacionMedica: string;
}

export interface InformacionPersonal {
    id:              number;
    folio:           number;
    fechaNacimiento: Date;
    sexo:            string;
    curp:            string;
}

export interface Inscripcion {
    id:     number;
    dia:    number;
    inicio: string;
    fin:    string;
    plan:   Plan;
}

export interface Plan {
    id:         number;
    plan:       string;
    precio:     string;
    disciplina: Disciplina;
}

export interface Disciplina {
    id:         number;
    disciplina: string;
}
export interface Pago {
  id?:            number;
  referencia:    string;
  monto:         string;
  cuentaDestino: string;
  formaPago:     string;
  conceptoPago:  string;
  observaciones: string;
  fechaPago:     Date;
  fechaRegistro?: Date;
}
export interface ReigstroEntradasSalida {
  id:    number;
  tipo:  string;
  fecha: Date;
}

export interface Usuario {
    id:              string;
    correo:          string;
    nombre:          string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    isActive:        boolean;
    rol:             string;
    fechaRegistro:   Date;
    imgPerfil:       string;
}
