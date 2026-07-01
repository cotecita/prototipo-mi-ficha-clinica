import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState("");

  const { setRole } = useRole();

  const navigate = useNavigate();

  const handleEnter = () => {
    if (!selectedRole) return;

    setRole(selectedRole);

    if (selectedRole === "patient") {
      navigate("/patient/dashboard");
    } else {
      navigate("/doctor/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Mi Ficha Clínica
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Seleccione su rol
        </p>

        <div className="space-y-4">

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-blue-50">
            <input
              type="radio"
              name="role"
              value="patient"
              onChange={(e) => setSelectedRole(e.target.value)}
            />

            <span className="font-medium">
              Paciente
            </span>
          </label>

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-blue-50">
            <input
              type="radio"
              name="role"
              value="doctor"
              onChange={(e) => setSelectedRole(e.target.value)}
            />

            <span className="font-medium">
              Médico
            </span>
          </label>

        </div>

        <button
          onClick={handleEnter}
          disabled={!selectedRole}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition"
        >
          Ingresar
        </button>

      </div>
    </div>
  );
}

export default RoleSelector;