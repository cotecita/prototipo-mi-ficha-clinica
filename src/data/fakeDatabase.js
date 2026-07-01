export const pacientes = [
  {
    id: "1",
    rut: "12345678-9",
    nombre: "María González",
    email: "maria@gmail.com",
    sexo: "FEMENINO",
    fechaNacimiento: "1990-05-15",
    edad: 36,
    password: "123456",
  },
  {
    id: "2",
    rut: "17654321-4",
    nombre: "Juan Soto",
    email: "juan@gmail.com",
    sexo: "MASCULINO",
    fechaNacimiento: "1985-09-22",
    edad: 40,
    password: "123456",
  },
];

export const medicos = [
  {
    id: "1",
    rut: "98765432-1",
    nombre: "Dr. Carlos Pérez",
    email: "carlos@gmail.com",
    especialidad: "Cardiología",
    password: "123456",
  },
  {
    id: "2",
    rut: "11222333-4",
    nombre: "Dra. Ana Martínez",
    email: "ana@gmail.com",
    especialidad: "Neurología",
    password: "123456",
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

  {
    id: "2",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2024-06-02",
    motivo: "Dolor torácico leve",
    tratamiento: "Analgésicos y observación",
    indicaciones: "Control en 7 días si persiste",
    centroMedico: "Clínica San José",
    sector: "PRIVATE",
    sintomas: [
      {
        nombre: "Dolor torácico",
        categoria: "Cardiovascular",
        fechaInicio: "2024-06-01",
      },
      {
        nombre: "Fatiga",
        categoria: "General",
        fechaInicio: "2024-06-01",
      },
    ],
  },

  {
    id: "3",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-01-20",
    motivo: "Mareos recurrentes",
    tratamiento: "Evaluación neurológica",
    indicaciones: "Solicitar exámenes complementarios",
    centroMedico: "Hospital Regional",
    sector: "PUBLIC",
    sintomas: [
      {
        nombre: "Mareos",
        categoria: "Neurológico",
        fechaInicio: "2025-01-18",
      },
      {
        nombre: "Náuseas",
        categoria: "Gastrointestinal",
        fechaInicio: "2025-01-18",
      },
    ],
  },

  {
    id: "4",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-03-10",
    motivo: "Dolor abdominal",
    tratamiento: "Antiespasmódicos",
    indicaciones: "Evitar alimentos irritantes",
    centroMedico: "Clínica Norte",
    sector: "PRIVATE",
    sintomas: [
      {
        nombre: "Dolor abdominal",
        categoria: "Gastrointestinal",
        fechaInicio: "2025-03-09",
      },
    ],
  },

  {
    id: "5",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-06-18",
    motivo: "Control general",
    tratamiento: "Sin tratamiento",
    indicaciones: "Hábitos saludables",
    centroMedico: "Hospital Regional",
    sector: "PUBLIC",
    sintomas: [
      {
        nombre: "Cansancio",
        categoria: "General",
        fechaInicio: "2025-06-17",
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
    estado: "ACTIVO",
  },

  {
    id: "2",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2024-06-03",
    codigoICD: "R07.9",
    descripcion: "Dolor torácico no especificado",
    estado: "RESUELTO",
  },

  {
    id: "3",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-01-21",
    codigoICD: "R42",
    descripcion: "Mareos recurrentes en estudio",
    estado: "ACTIVO",
  },

  {
    id: "4",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-03-11",
    codigoICD: "R10.9",
    descripcion: "Dolor abdominal inespecífico",
    estado: "ACTIVO",
  },

  {
    id: "5",
    pacienteId: "1",
    medicoId: "1",
    fecha: "2025-06-19",
    codigoICD: "Z00.0",
    descripcion: "Chequeo médico general normal",
    estado: "RESUELTO",
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
    archivo: {
      nombre: "hemograma.pdf",
      tipo: "application/pdf",
      contenido: "/documentos/hemograma.webp",
    },
  },
];

export const solicitudesAcceso = [];

export const accesosAprobados = [];