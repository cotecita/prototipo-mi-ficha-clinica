import {
  LayoutDashboard,
  ClipboardList,
  Stethoscope,
  FileText,
  HeartPulse,
  ShieldCheck,
  Search,
  UserRound,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function Sidebar() {
  const { currentUser, logout, isPatient, isDoctor } = useRole();
  const navigate = useNavigate();

  // 🔵 LINKS PACIENTE
  const patientLinks = [
    {
      name: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Diagnósticos",
      path: "/patient/diagnosticos",
      icon: ClipboardList,
    },
    {
      name: "Consultas",
      path: "/patient/consultas",
      icon: Stethoscope,
    },
    {
      name: "Exámenes",
      path: "/patient/examenes",
      icon: FileText,
    },
    {
      name: "Síntomas",
      path: "/patient/sintomas",
      icon: HeartPulse,
    },
    {
      name: "Solicitudes",
      path: "/patient/solicitudes",
      icon: ShieldCheck,
    },
    {
      name: "Accesos",
      path: "/patient/accesos",
      icon: UserRound,
    },
  ];

  // 🟣 LINKS MÉDICO
  const doctorLinks = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Buscar paciente",
      path: "/doctor/busqueda",
      icon: Search,
    },
    {
      name: "Solicitudes",
      path: "/doctor/solicitudes",
      icon: ShieldCheck,
    },
    {
      name: "Historial",
      path: "/doctor/historial",
      icon: ClipboardList,
    },
    {
      name: "Nueva consulta",
      path: "/doctor/nueva-consulta",
      icon: Stethoscope,
    },
    {
      name: "Nuevo diagnóstico",
      path: "/doctor/nuevo-diagnostico",
      icon: FileText,
    },
    {
      name: "Nuevo examen",
      path: "/doctor/nuevo-examen",
      icon: FileText,
    },
  ];

  // 🎯 decidir links según rol
  const links = isPatient ? patientLinks : doctorLinks;

  function logoutHandler() {
    logout();
    navigate("/");
  }

  return (
    <aside className="w-72 bg-blue-900 text-white flex flex-col">

      {/* HEADER */}
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-2xl font-bold">Mi Ficha Clínica</h1>
        <p className="text-sm text-blue-200 mt-1">
          Historial Médico
        </p>
      </div>

      {/* USER INFO */}
      <div className="p-6 border-b border-blue-800">
        <div className="font-semibold text-lg">
          {currentUser?.nombre}
        </div>

        <div className="text-sm text-blue-200">
          {isPatient
            ? "Paciente"
            : currentUser?.especialidad || "Médico"}
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition ${
                  isActive
                    ? "bg-blue-700"
                    : "hover:bg-blue-800"
                }`
              }
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={logoutHandler}
          className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;