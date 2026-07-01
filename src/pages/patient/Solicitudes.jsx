import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Solicitudes() {
  const {
    accessRequests,
    setAccessRequests,
    approvedAccess,
    setApprovedAccess,
    doctors,
  } = useData();

  const { currentPatientId } = useRole();

  const solicitudesPendientes = accessRequests.filter(
    (r) =>
      r.pacienteId === currentPatientId &&
      r.estado === "PENDING"
  );

  function aprobar(id) {
    const solicitud = accessRequests.find((r) => r.id === id);
    if (!solicitud) return;

    const updatedRequests = accessRequests.map((r) =>
      r.id === id ? { ...r, estado: "APPROVED" } : r
    );

    setAccessRequests(updatedRequests);

    setApprovedAccess([
      ...approvedAccess,
      {
        pacienteId: solicitud.pacienteId,
        medicoId: solicitud.medicoId,
        otorgadoEn: new Date().toISOString(),
        revocadoEn: null,
      },
    ]);
  }

  function rechazar(id) {
    const updatedRequests = accessRequests.map((r) =>
      r.id === id ? { ...r, estado: "REJECTED" } : r
    );

    setAccessRequests(updatedRequests);
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Solicitudes de acceso
      </h1>

      {solicitudesPendientes.length === 0 ? (
        <p className="text-gray-500">
          No hay solicitudes pendientes
        </p>
      ) : (
        <div className="space-y-4">

          {solicitudesPendientes.map((s) => {
            const medico = doctors.find(
              (m) => m.id === s.medicoId
            );

            return (
              <div
                key={s.id}
                className="bg-white p-4 rounded shadow border flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {medico?.nombre || "Médico desconocido"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {medico?.especialidad}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Solicita acceso a tu historial clínico
                  </p>
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => aprobar(s.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Aprobar
                  </button>

                  <button
                    onClick={() => rechazar(s.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Rechazar
                  </button>

                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Solicitudes;