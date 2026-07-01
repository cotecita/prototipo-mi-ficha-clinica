import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";

import MainLayout from "../layouts/MainLayout";

import PatientDashboard from "../pages/patient/Dashboard";
import DoctorDashboard from "../pages/doctor/Dashboard";
import BusquedaPaciente from "../pages/doctor/Busqueda";
import Solicitudes from "../pages/patient/Solicitudes";
import Historial from "../pages/doctor/Historial";
import NuevaConsulta from "../pages/doctor/NuevaConsulta";
import NuevoDiagnostico from "../pages/doctor/NuevoDiagnostico";
import Diagnosticos from "../pages/patient/Diagnosticos";
import Examenes from "../pages/patient/Examenes";
import Consultas from "../pages/patient/Consultas";
import Sintomas from "../pages/patient/Sintomas";
import Accesos from "../pages/patient/Accesos";
import SolicitudesDoctor from "../pages/doctor/SolicitudesDoctor";
import NuevoExamen from "../pages/doctor/NuevoExamen";

const Placeholder = ({ title }) => (
  <h1 className="text-3xl font-bold">{title}</h1>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/patient",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <PatientDashboard />,
      },
      {
        path: "diagnosticos",
        element: <Diagnosticos />,
      },
      {
        path: "consultas",
        element: <Consultas />,
      },
      {
        path: "examenes",
        element: <Examenes />,
      },
      {
        path: "sintomas",
        element: <Sintomas />,
      },
      {
        path: "solicitudes",
        element: <Solicitudes />,
      },
      {
        path: "accesos",
        element: <Accesos />,
      },
    ],
  },

  {
    path: "/doctor",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "busqueda",
        element: <BusquedaPaciente />,
      },
      {
        path: "solicitudes",
        element: <SolicitudesDoctor />,
      },
      {
        path: "historial",
        element: <Historial />,
      },
      {
        path: "nueva-consulta",
        element: <NuevaConsulta />,
      },
      {
        path: "nuevo-diagnostico",
        element: <NuevoDiagnostico />,
      },
      {
        path: "nuevo-examen",
        element: <NuevoExamen />,
      },
    ],
  },
]);