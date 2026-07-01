import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function DoctorDashboard() {
  const { accessRequests, patients } = useData();
  const { currentDoctorId } = useRole();

  const misSolicitudes = accessRequests.filter(
    (r) => r.medicoId === currentDoctorId
  );

  const pendientes = misSolicitudes.filter(
    (r) => r.estado === "PENDING"
  );

  const aprobadas = misSolicitudes.filter(
    (r) => r.estado === "APPROVED"
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Médico
        </h1>
        <p className="text-gray-500">
          Resumen general de solicitudes de acceso
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow border hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Solicitudes totales</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {misSolicitudes.length}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-yellow-700 text-sm">Pendientes</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {pendientes.length}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <p className="text-green-700 text-sm">Aprobadas</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {aprobadas.length}
          </p>
        </div>

      </div>

      {/* ACTIVITY SECTION */}
      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Últimas solicitudes
        </h2>

        {misSolicitudes.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No hay solicitudes registradas aún
          </p>
        ) : (
          <div className="space-y-3">

            {misSolicitudes
              .slice()
              .reverse()
              .slice(0, 5)
              .map((s) => {
                const paciente = patients.find(
                  (p) => p.id === s.pacienteId
                );

                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
                  >

                    {/* LEFT */}
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800">
                        {paciente?.nombre || "Paciente desconocido"}
                      </p>

                    </div>

                    {/* RIGHT BADGE */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        s.estado === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : s.estado === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {s.estado}
                    </span>

                  </div>
                );
              })}
          </div>
        )}

      </div>

    </div>
  );
}

export default DoctorDashboard;