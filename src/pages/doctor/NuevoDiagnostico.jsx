import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function NuevoDiagnostico() {
  const { patients, diagnoses, setDiagnoses } = useData();
  const { currentDoctorId } = useRole();

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [form, setForm] = useState({
    codigoICD: "",
    descripcion: "",
    estado: "ACTIVO",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function guardarDiagnostico() {
    if (!selectedPatientId) return;

    const nuevoDiagnostico = {
      id: crypto.randomUUID(),
      pacienteId: selectedPatientId,
      medicoId: currentDoctorId,
      fecha: new Date().toISOString().split("T")[0],
      codigoICD: form.codigoICD,
      descripcion: form.descripcion,
      estado: form.estado,
    };

    setDiagnoses([...diagnoses, nuevoDiagnostico]);

    alert("Diagnóstico guardado correctamente");

    setForm({
      codigoICD: "",
      descripcion: "",
      estado: "ACTIVE",
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Nuevo Diagnóstico Médico
        </h1>
        <p className="text-gray-500">
          Registra un diagnóstico clínico del paciente
        </p>
      </div>

      {/* SELECT PACIENTE */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-3">

        <label className="block text-sm font-medium text-gray-600">
          Seleccionar paciente
        </label>

        <select
          className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">Seleccione un paciente</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} - {p.rut}
            </option>
          ))}
        </select>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-5">

        <div className="grid gap-4">

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Código ICD (ej: I10)"
            name="codigoICD"
            value={form.codigoICD}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Descripción del diagnóstico"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />

          <select
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            name="estado"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="RESUELTO">RESUELTO</option>
          </select>

        </div>

        {/* BUTTON */}
        <button
          onClick={guardarDiagnostico}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
        >
          Guardar diagnóstico
        </button>

      </div>

    </div>
  );
}

export default NuevoDiagnostico;