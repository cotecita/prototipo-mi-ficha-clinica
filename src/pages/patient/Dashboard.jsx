import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function PatientDashboard() {
  const { currentPatientId } = useRole();

  const {
    diagnoses,
    appointments,
    exams,
    accessRequests,
    approvedAccess,
  } = useData();

  const patientDiagnoses = diagnoses.filter(
    (d) => d.pacienteId === currentPatientId
  );

  const patientAppointments = appointments.filter(
    (c) => c.pacienteId === currentPatientId
  );

  const patientExams = exams.filter(
    (e) => e.pacienteId === currentPatientId
  );

  const pendingRequests = accessRequests.filter(
    (r) =>
      r.pacienteId === currentPatientId &&
      r.estado === "PENDING"
  );

  const activeAccess = approvedAccess.filter(
    (a) =>
      a.pacienteId === currentPatientId &&
      !a.revocadoEn
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Paciente
        </h1>
        <p className="text-gray-500">
          Resumen de tu historial clínico
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card
          title="Diagnósticos activos"
          value={patientDiagnoses.length}
          color="green"
        />

        <Card
          title="Consultas médicas"
          value={patientAppointments.length}
          color="blue"
        />

        <Card
          title="Exámenes"
          value={patientExams.length}
          color="indigo"
        />

        <Card
          title="Solicitudes pendientes"
          value={pendingRequests.length}
          color="yellow"
        />

        <Card
          title="Médicos con acceso"
          value={activeAccess.length}
          color="purple"
        />

      </div>

      {/* INFO PANEL */}
      <div className="bg-white border rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Estado general de tu ficha
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="text-gray-500">Accesos activos</p>
            <p className="text-xl font-bold text-gray-800">
              {activeAccess.length}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="text-gray-500">Solicitudes pendientes</p>
            <p className="text-xl font-bold text-gray-800">
              {pendingRequests.length}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="text-gray-500">Última actualización</p>
            <p className="text-xl font-bold text-gray-800">
              {patientAppointments.length > 0
                ? patientAppointments[patientAppointments.length - 1].fecha
                : "Sin datos"}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ================= CARD ================= */

function Card({ title, value, color = "blue" }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    green: "text-green-600 bg-green-50 border-green-100",
    yellow: "text-yellow-700 bg-yellow-50 border-yellow-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
  };

  return (
    <div className="bg-white border rounded-2xl shadow p-6 hover:shadow-md transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>
        {value}
      </p>
    </div>
  );
}

export default PatientDashboard;