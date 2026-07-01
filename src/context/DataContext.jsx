import { createContext, useContext, useState } from "react";

import {
  pacientes,
  medicos,
  consultas,
  diagnosticos,
  examenes,
  solicitudesAcceso,
  accesosAprobados,
} from "../data/fakeDatabase";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [patients, setPatients] = useState(pacientes);
  const [doctors, setDoctors] = useState(medicos);
  const [appointments, setAppointments] = useState(consultas);
  const [diagnoses, setDiagnoses] = useState(diagnosticos);
  const [exams, setExams] = useState(examenes);
  const [accessRequests, setAccessRequests] = useState(solicitudesAcceso);
  const [approvedAccess, setApprovedAccess] = useState(accesosAprobados);
  

  const value = {
    patients,
    setPatients,

    doctors,
    setDoctors,

    appointments,
    setAppointments,

    diagnoses,
    setDiagnoses,

    exams,
    setExams,

    accessRequests,
    setAccessRequests,

    approvedAccess,
    setApprovedAccess,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}