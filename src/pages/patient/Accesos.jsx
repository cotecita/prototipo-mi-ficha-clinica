import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Accesos() {
  const {
    approvedAccess,
    setApprovedAccess,
    doctors,
  } = useData();

  const { currentPatientId } = useRole();

  const misAccesos = approvedAccess.filter(
    (a) =>
      a.pacienteId === currentPatientId &&
      !a.revocadoEn
  );

  function revocar(medicoId) {
    const updated = approvedAccess.map((a) =>
      a.pacienteId === currentPatientId &&
      a.medicoId === medicoId &&
      !a.revocadoEn
        ? {
            ...a,
            revocadoEn: new Date().toISOString(),
          }
        : a
    );

    setApprovedAccess(updated);
  }

  function getDoctor(medicoId) {
    return doctors.find((d) => d.id === medicoId);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Médicos con acceso
        </h1>

        <p className="text-gray-500">
          Administra qué profesionales pueden acceder a tu historial clínico.
        </p>
      </div>

      {misAccesos.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No hay médicos con acceso actualmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misAccesos.map((a) => {
            const doctor = getDoctor(a.medicoId);

            return (
              <div
                key={`${a.medicoId}-${a.pacienteId}`}
                className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* Información */}
                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                      {doctor?.nombre?.charAt(0) || "M"}
                    </div>

                    <div>

                      <h2 className="text-lg font-semibold text-gray-800">
                        {doctor?.nombre}
                      </h2>

                      <p className="text-gray-500">
                        {doctor?.especialidad}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          Acceso activo
                        </span>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                          Desde {new Date(a.otorgadoEn).toLocaleDateString()}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Acción */}
                  <button
                    onClick={() => revocar(a.medicoId)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-medium transition"
                  >
                    Revocar acceso
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

export default Accesos;