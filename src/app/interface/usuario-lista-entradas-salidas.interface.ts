export interface EntradasSalidas {
    id:            number;
    tipo:          string;
    fecha:         Date;
    usuarioPerfil: UsuarioPerfil;
}

interface UsuarioPerfil {
    id:      number;
    usuario: Usuario;
}

interface Usuario {
    id:              string;
    correo:          string;
    nombre:          string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    isActive:        boolean;
    rol:             string;
    fechaRegistro:   Date;
    fechaBaja:       null;
    imgPerfil:       string;
}
