import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Historial() {
  const { patients, diagnoses, appointments, exams, approvedAccess } =
    useData();

  const { currentDoctorId } = useRole();

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const patient = patients.find((p) => p.id === selectedPatientId);

  const hasAccess = approvedAccess.some(
    (a) =>
      a.medicoId === currentDoctorId &&
      a.pacienteId === selectedPatientId &&
      !a.revocadoEn
  );

  const patientDiagnoses = diagnoses.filter(
    (d) => d.pacienteId === selectedPatientId
  );

  const patientAppointments = appointments.filter(
    (c) => c.pacienteId === selectedPatientId
  );

  const patientExams = exams.filter(
    (e) => e.pacienteId === selectedPatientId
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Historial Médico del Paciente
      </h1>

      {/* Selector de paciente */}
      <div className="bg-white p-4 rounded shadow border">

        <label className="block text-sm font-medium mb-2">
          Seleccionar paciente
        </label>

        <select
          className="border p-2 rounded w-full"
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">Seleccione...</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - {p.rut}
            </option>
          ))}
        </select>
      </div>

      {/* Sin paciente seleccionado */}
      {!selectedPatientId && (
        <p className="text-gray-500">
          Selecciona un paciente para ver su historial
        </p>
      )}

      {/* Sin acceso */}
      {selectedPatientId && !hasAccess && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          No tienes acceso autorizado a este historial clínico
        </div>
      )}

      {/* Con acceso */}
      {selectedPatientId && hasAccess && (
        <div className="space-y-6">

          <div className="bg-white p-4 rounded shadow border">
            <h2 className="font-bold text-lg">
              {patient?.nombre}
            </h2>

            <p className="text-gray-500">
              RUT: {patient?.rut}
            </p>
          </div>

          {/* Diagnósticos */}
          <Section title="Diagnósticos">
            {patientDiagnoses.map((d) => (
              <Item
                key={d.id}
                title={d.descripcion}
                subtitle={`ICD: ${d.codigoICD}`}
              />
            ))}
          </Section>

          {/* Consultas */}
          <Section title="Consultas">
            {patientAppointments.map((c) => (
              <Item
                key={c.id}
                title={c.motivo}
                subtitle={c.fecha}
              />
            ))}
          </Section>

          {/* Exámenes */}
          <Section title="Exámenes">
            {patientExams.map((e) => (
              <Item
                key={e.id}
                title={e.tipo}
                subtitle={e.resultados}
              />
            ))}
          </Section>

        </div>
      )}

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow border">
      <h3 className="font-bold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({ title, subtitle }) {
  return (
    <div className="border rounded p-3">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

export default Historial;