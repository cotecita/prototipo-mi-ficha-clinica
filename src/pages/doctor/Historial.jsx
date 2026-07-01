import { useMemo, useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";
import { useChatbotContext } from "../../context/ChatbotContext";

function Historial() {
  const { patients, diagnoses, appointments, exams, approvedAccess } = useData();
  const { currentDoctorId } = useRole();
  const { setPageContext } = useChatbotContext();

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedConsulta, setSelectedConsulta] = useState(null);
  const [filter, setFilter] = useState("ALL"); // ALL | CONSULTAS | DIAGNOSTICOS | EXAMENES

  const patient = patients.find((p) => p.id === selectedPatientId);

  

  const hasAccess = approvedAccess.some(
    (a) =>
      a.medicoId === currentDoctorId &&
      a.pacienteId === selectedPatientId &&
      !a.revocadoEn
  );

  function calcEdad(fechaNacimiento) {
    if (!fechaNacimiento) return null;
    const diff = Date.now() - new Date(fechaNacimiento).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  // =========================
  // DATA ORDENADA
  // =========================
  const timeline = useMemo(() => {
    if (!selectedPatientId) return [];

    const eventos = [
      ...appointments
        .filter((c) => c.pacienteId === selectedPatientId)
        .map((c) => ({
          id: c.id,
          tipo: "CONSULTA",
          fecha: c.fecha,
          data: c,
        })),

      ...diagnoses
        .filter((d) => d.pacienteId === selectedPatientId)
        .map((d) => ({
          id: d.id,
          tipo: "DIAGNOSTICO",
          fecha: d.fecha,
          data: d,
        })),

      ...exams
        .filter((e) => e.pacienteId === selectedPatientId)
        .map((e) => ({
          id: e.id,
          tipo: "EXAMEN",
          fecha: e.fecha,
          data: e,
        })),
    ];

    return eventos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [selectedPatientId, appointments, diagnoses, exams]);

  useEffect(() => {
    setPageContext({
      page: "Historial",
      timeline: timeline,
      timeline,
      role: "doctor",
    });

    return () => {
      setPageContext(null);
    }
  }, [selectedPatientId, timeline, setPageContext]);

  const filteredTimeline = timeline.filter((e) => {
    if (filter === "ALL") return true;
    return e.tipo === filter;
  });

  function color(tipo) {
    switch (tipo) {
      case "CONSULTA":
        return "border-blue-500 bg-blue-50";
      case "DIAGNOSTICO":
        return "border-red-500 bg-red-50";
      case "EXAMEN":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-300";
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Historial Médico
      </h1>

      {/* SELECTOR PACIENTE */}
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

      {!selectedPatientId && (
        <p className="text-gray-500">
          Selecciona un paciente para ver su historial
        </p>
      )}

      {selectedPatientId && !hasAccess && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          No tienes acceso autorizado a este historial clínico
        </div>
      )}

      {/* CONTENIDO */}
      {selectedPatientId && hasAccess && (
        <div className="space-y-6">

          {/* INFO PACIENTE */}
          <div className="bg-white p-4 rounded shadow border">
            <h2 className="font-bold text-lg">
              {patient?.nombre}
            </h2>

            <p className="text-gray-500">
              RUT: {patient?.rut}
            </p>

            <p className="text-sm text-gray-500">
              Sexo: {patient?.sexo} · Edad: {calcEdad(patient?.fechaNacimiento)}
            </p>
          </div>

          {/* FILTROS */}
          <div className="flex gap-2">
            {["ALL", "CONSULTA", "DIAGNOSTICO", "EXAMEN"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded border ${
                  filter === f ? "bg-black text-white" : "bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="space-y-3">
            {filteredTimeline.map((e) => (
              <div
                key={`${e.tipo}-${e.id}`}
                className={`border-l-4 p-4 rounded shadow-sm ${color(e.tipo)}`}
              >

                <div className="flex justify-between">
                  <span className="font-bold">{e.tipo}</span>
                  <span className="text-sm text-gray-500">
                    {e.fecha}
                  </span>
                </div>

                {/* CONSULTA */}
                {e.tipo === "CONSULTA" && (
                  <div className="space-y-1">
                    
                    {/* Header clickeable */}
                    <button
                      onClick={() => setSelectedConsulta(e.data)}
                      className="text-left w-full hover:underline"
                    >
                      <p className="font-semibold text-blue-700">
                        🩺 {e.data.motivo}
                      </p>
                    </button>

                    {/* info rápida visible sin abrir */}
                    <p className="text-sm text-gray-600">
                      Tratamiento: {e.data.tratamiento}
                    </p>

                    <p className="text-xs text-gray-400">
                      {e.fecha}
                    </p>
                  </div>
                )}

                {/* DIAGNOSTICO */}
                {e.tipo === "DIAGNOSTICO" && (
                  <p className="text-sm">
                    {e.data.descripcion} (ICD: {e.data.codigoICD})
                  </p>
                )}

                {/* EXAMEN */}
                {e.tipo === "EXAMEN" && (
                  <div className="text-sm space-y-1">
                    <p>{e.data.tipo}</p>
                    <p className="text-gray-600">{e.data.resultados}</p>

                    {e.data.archivo && (
                      <a
                        href={e.data.archivo.contenido}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver archivo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL CONSULTA */}
      {selectedConsulta && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[500px] space-y-3">

            <h2 className="text-xl font-bold">Consulta médica</h2>

            <p><strong>Motivo:</strong> {selectedConsulta.motivo}</p>
            <p><strong>Fecha:</strong> {selectedConsulta.fecha}</p>
            <p><strong>Tratamiento:</strong> {selectedConsulta.tratamiento}</p>
            <p><strong>Indicaciones:</strong> {selectedConsulta.indicaciones}</p>

            <div>
              <strong>Síntomas:</strong>
              <ul className="list-disc ml-5">
                {selectedConsulta.sintomas?.map((s, i) => (
                  <li key={i}>
                    {s.nombre} ({s.categoria})
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedConsulta(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Historial;