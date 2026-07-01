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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard Paciente
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card
          title="Diagnósticos activos"
          value={patientDiagnoses.length}
        />

        <Card
          title="Consultas médicas"
          value={patientAppointments.length}
        />

        <Card
          title="Exámenes"
          value={patientExams.length}
        />

        <Card
          title="Solicitudes pendientes"
          value={pendingRequests.length}
        />

        <Card
          title="Médicos con acceso"
          value={activeAccess.length}
        />

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {value}
      </p>
    </div>
  );
}

export default PatientDashboard;