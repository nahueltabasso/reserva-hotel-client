export class Persona {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    nroDocumento: number;
    tipoDocumento: string;
    cuit: string;
    telefono: number;
    genero: string;
    fechaCreacion: Date;
    sueldoMensual: number;
    descripcion: string;
    legajo: number;
    rol: Rol;
    domicilio: Domicilio;
    token: string;
}

export class Rol {
    id: number;
    nombreRol: string;
}

export class Pais {
    id: number;
    nombre: string;
}

export class Provincia {
    id: number;
    nombre: string;
    pais: Pais;
}

export class Localidad {
    id: number;
    nombre: string;
    codigoPostal: string;
    provincia: Provincia
}

export class Domicilio {
    id: number;
    calle: string;
    numero: string;
    piso: string;
    departamento: string;
    localidad: Localidad
}

export class EstadoReserva {
    id: number;
    descripcion: string;
}

export class TipoHabitacion {
    id: number;
    descripcion: string;
    capacidad: number;
    denominacion: string;
    precioPorDia: number;
}

export class Salon {
    id: number;
    nombreSalon: string;
    descripcion: string;
    capacidad: number;
    precioPorDia: number;
    fechaCreacion: Date
}

export class Habitacion {
    id: number;
    numeroHabitacion: number;
    fechaCreacion: Date;
    tipoHabitacion: TipoHabitacion;
}

export class Reserva {
    id: number;
    fechaReserva: Date;
    fechaCancelacion: Date;
    cantDias: number;
    fechaEntrada: Date;
    fechaSalida: Date;
    fechaCreacion: Date;
    persona: Persona;
    estadoReserva: EstadoReserva;
    habitacion: Habitacion;
    salon: Salon;
}

export class ReservaFilterDTO {
    estado: EstadoReserva;
    fechaDesde: Date;
    fechaHasta: Date;
}


