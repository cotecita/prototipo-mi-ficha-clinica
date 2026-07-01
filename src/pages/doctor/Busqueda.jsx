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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Buscar paciente
      </h1>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Ingrese RUT (ej: 12345678-9)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />

        <button
          onClick={buscar}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {resultado && (
        <div className="bg-white p-4 rounded shadow border space-y-2">

          <p className="font-bold text-lg">
            {resultado.nombre}
          </p>

          <p className="text-gray-500">
            RUT: {resultado.rut}
          </p>

          <button
            onClick={solicitarAcceso}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Solicitar acceso
          </button>

        </div>
      )}

      {resultado === null && rut && (
        <p className="text-red-500">
          Paciente no encontrado
        </p>
      )}

    </div>
  );
}

export default BusquedaPaciente;