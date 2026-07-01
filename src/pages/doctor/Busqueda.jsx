import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function BusquedaPaciente() {
  const { patients, accessRequests } = useData();
  const { currentDoctorId } = useRole();

  const [rut, setRut] = useState("");
  const [resultado, setResultado] = useState(null);

  function buscar() {
    const paciente = patients.find((p) => p.rut === rut);
    setResultado(paciente || null);
  }

  function solicitarAcceso() {
    if (!resultado) return;

    const yaExiste = accessRequests.some(
      (r) =>
        r.medicoId === currentDoctorId &&
        r.pacienteId === resultado.id &&
        r.estado === "PENDING"
    );

    if (yaExiste) return;

    accessRequests.push({
      id: crypto.randomUUID(),
      medicoId: currentDoctorId,
      pacienteId: resultado.id,
      estado: "PENDING",
    });

    alert("Solicitud enviada al paciente");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Buscar paciente
        </h1>
        <p className="text-gray-500">
          Ingresa el RUT del paciente para solicitar acceso a su historial
        </p>
      </div>

      {/* SEARCH CARD */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-4">

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            RUT del paciente
          </label>

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Ej: 12345678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </div>

        <button
          onClick={buscar}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          Buscar paciente
        </button>
      </div>

      {/* RESULTADO */}
      {resultado && (
        <div className="bg-white p-6 rounded-2xl shadow border space-y-5">

          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-800">
              {resultado.nombre}
            </h2>

            <p className="text-gray-500">
              RUT: {resultado.rut}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={solicitarAcceso}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
            >
              Solicitar acceso
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default BusquedaPaciente;