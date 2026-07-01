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
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Solicitudes de Acceso
        </h1>

        <p className="text-gray-500">
          Revisa y administra las solicitudes de acceso a tu historial clínico.
        </p>
      </div>

      {solicitudesPendientes.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No hay solicitudes pendientes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {solicitudesPendientes.map((s) => {
            const medico = doctors.find(
              (m) => m.id === s.medicoId
            );

            return (
              <div
                key={s.id}
                className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* Información */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">

                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                        {medico?.nombre?.charAt(0) || "M"}
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {medico?.nombre || "Médico desconocido"}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {medico?.especialidad}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                        Pendiente
                      </span>

                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                        Acceso a historial clínico
                      </span>

                    </div>

                  </div>

                  {/* Botones */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => aprobar(s.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-medium transition"
                    >
                      Aprobar
                    </button>

                    <button
                      onClick={() => rechazar(s.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-medium transition"
                    >
                      Rechazar
                    </button>

                  </div>

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