import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function SolicitudesDoctor() {
  const { accessRequests, patients } = useData();
  const { currentDoctorId } = useRole();

  const misSolicitudes = accessRequests.filter(
    (r) => r.medicoId === currentDoctorId
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Solicitudes enviadas
        </h1>
        <p className="text-gray-500">
          Historial de accesos solicitados a pacientes
        </p>
      </div>

      {/* EMPTY STATE */}
      {misSolicitudes.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center shadow">
          <p className="text-gray-500">
            No has enviado solicitudes aún
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misSolicitudes.map((s) => {
            const paciente = patients.find(
              (p) => p.id === s.pacienteId
            );

            return (
              <div
                key={s.id}
                className="bg-white border rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-md transition"
              >

                {/* INFO PACIENTE */}
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {paciente?.nombre || "Paciente desconocido"}
                  </p>

                  <p className="text-sm text-gray-500">
                    RUT: {paciente?.rut || "—"}
                  </p>
                </div>

                {/* ESTADO */}
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      s.estado === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : s.estado === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : s.estado === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s.estado}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default SolicitudesDoctor;