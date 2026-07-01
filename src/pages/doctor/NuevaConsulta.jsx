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
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Nueva Consulta Médica
        </h1>
        <p className="text-gray-500">
          Registra una nueva atención clínica del paciente
        </p>
      </div>

      {/* SELECT PACIENTE */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-3">

        <label className="block text-sm font-medium text-gray-600">
          Seleccionar paciente
        </label>

        <select
          className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Motivo de consulta"
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Tratamiento"
            name="tratamiento"
            value={form.tratamiento}
            onChange={handleChange}
          />

          <textarea
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Indicaciones médicas"
            name="indicaciones"
            rows={3}
            value={form.indicaciones}
            onChange={handleChange}
          />

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Síntomas (ej: dolor de cabeza, fiebre)"
            name="sintomas"
            value={form.sintomas}
            onChange={handleChange}
          />

        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={guardarConsulta}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          Guardar consulta
        </button>

      </div>

    </div>
  );
}

export default NuevaConsulta;