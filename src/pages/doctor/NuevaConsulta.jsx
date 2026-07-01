import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function NuevaConsulta() {
  const { patients, appointments, setAppointments } = useData();
  const { currentDoctorId } = useRole();

  const [selectedPatientId, setSelectedPatientId] = useState("");

  const [form, setForm] = useState({
    motivo: "",
    tratamiento: "",
    indicaciones: "",
    sintomas: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function guardarConsulta() {
    if (!selectedPatientId) return;

    const nuevaConsulta = {
      id: crypto.randomUUID(),
      pacienteId: selectedPatientId,
      medicoId: currentDoctorId,
      fecha: new Date().toISOString().split("T")[0],
      motivo: form.motivo,
      tratamiento: form.tratamiento,
      indicaciones: form.indicaciones,

      sintomas: form.sintomas
        ? form.sintomas.split(",").map((s) => ({
            nombre: s.trim(),
            categoria: "general",
            fechaInicio: new Date().toISOString().split("T")[0],
          }))
        : [],
    };

    setAppointments([...appointments, nuevaConsulta]);

    alert("Consulta creada correctamente");

    setForm({
      motivo: "",
      tratamiento: "",
      indicaciones: "",
      sintomas: "",
    });

    setSelectedPatientId("");
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Nueva Consulta Médica
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
          placeholder="Motivo de consulta"
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Tratamiento"
          name="tratamiento"
          value={form.tratamiento}
          onChange={handleChange}
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Indicaciones"
          name="indicaciones"
          value={form.indicaciones}
          onChange={handleChange}
        />

        {/* 🔥 IMPORTANTE: campo síntomas */}
        <input
          className="border p-2 rounded w-full"
          placeholder="Síntomas (ej: dolor de cabeza, fiebre)"
          name="sintomas"
          value={form.sintomas}
          onChange={handleChange}
        />

        <button
          onClick={guardarConsulta}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar consulta
        </button>

      </div>

    </div>
  );
}

export default NuevaConsulta;