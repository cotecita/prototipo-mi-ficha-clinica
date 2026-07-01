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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Nuevo Diagnóstico Médico
      </h1>

      {/* Selección paciente */}
      <div className="bg-white p-4 rounded shadow border">
        <label className="block font-medium mb-2">
          Paciente
        </label>

        <select
          className="border p-2 rounded w-full"
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

      {/* Formulario */}
      <div className="bg-white p-4 rounded shadow border space-y-4">

        <input
          className="border p-2 rounded w-full"
          placeholder="Código ICD (ej: I10)"
          name="codigoICD"
          value={form.codigoICD}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Descripción del diagnóstico"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />

        <select
          className="border p-2 rounded w-full"
          name="estado"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="ACTIVO">ACTIVO</option>
          <option value="RESUELTO">RESUELTO</option>
        </select>

        <button
          onClick={guardarDiagnostico}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar diagnóstico
        </button>

      </div>

    </div>
  );
}

export default NuevoDiagnostico;