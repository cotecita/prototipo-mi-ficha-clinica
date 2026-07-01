export const pacientes = [
  {
    id: "1",
    rut: "12345678-9",
    nombre: "María González",
    email: "maria@gmail.com",
    sexo: "FEMALE",
    fechaNacimiento: "1990-05-15",
  },
];

export const medicos = [
  {
    id: "1",
    rut: "98765432-1",
    nombre: "Dr. Carlos Pérez",
    email: "carlos@gmail.com",
    especialidad: "Cardiología",
  },
];

export const consultas = [
  {
    id: "1",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2024-03-15",
    motivo: "Control rutinario",
    tratamiento: "Reposo",
    indicaciones: "Tomar medicamento cada 8 horas",
    centroMedico: "Hospital Regional",
    sector: "PUBLIC",

    sintomas: [
      {
        nombre: "Dolor de cabeza",
        categoria: "Neurológico",
        fechaInicio: "2024-03-10",
      },
      {
        nombre: "Mareos",
        categoria: "Neurológico",
        fechaInicio: "2024-03-11",
      },
    ],
  },
];

export const diagnosticos = [
  {
    id: "1",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2024-03-15",
    codigoICD: "I10",
    descripcion: "Hipertensión arterial",
    estado: "ACTIVE",
  },
];

export const examenes = [
  {
    id: "1",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2024-03-20",
    tipo: "Hemograma",
    resultados: "Valores normales",
    archivo: null,
  },
];

export const solicitudesAcceso = [];

export const accesosAprobados = [];