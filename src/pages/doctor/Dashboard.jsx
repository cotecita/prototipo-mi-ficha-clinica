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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Dashboard Médico
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 border rounded">
          <p className="text-gray-500">Solicitudes</p>
          <p className="text-2xl font-bold">
            {misSolicitudes.length}
          </p>
        </div>

        <div className="bg-white p-4 border rounded">
          <p className="text-gray-500">Pendientes</p>
          <p className="text-2xl font-bold">
            {pendientes.length}
          </p>
        </div>

        <div className="bg-white p-4 border rounded">
          <p className="text-gray-500">Aprobadas</p>
          <p className="text-2xl font-bold">
            {aprobadas.length}
          </p>
        </div>

      </div>

      {/* últimas solicitudes */}
      <div className="bg-white p-4 border rounded">
        <h2 className="font-bold mb-3">
          Últimas solicitudes
        </h2>

        {misSolicitudes.slice(-3).map((s) => {
          const paciente = patients.find(
            (p) => p.id === s.pacienteId
          );

          return (
            <div key={s.id} className="border-b py-2">
              <p>{paciente?.nombre}</p>
              <p className="text-sm text-gray-500">
                {s.estado}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default DoctorDashboard;