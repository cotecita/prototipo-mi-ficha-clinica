import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function NuevoExamen() {
  const { patients, exams, setExams } = useData();
  const { currentDoctorId } = useRole();

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [form, setForm] = useState({
    tipo: "",
    resultados: "",
  });

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function guardarExamen() {
    if (!selectedPatientId || !form.tipo) return;

    const reader = new FileReader();

    reader.onload = () => {
      const nuevoExamen = {
        id: crypto.randomUUID(),
        pacienteId: selectedPatientId,
        medicoId: currentDoctorId,
        fecha: new Date().toISOString().split("T")[0],
        tipo: form.tipo,
        resultados: form.resultados,
        archivo: file
          ? {
              nombre: file.name,
              tipo: file.type,
              contenido: reader.result,
            }
          : null,
      };

      setExams([...exams, nuevoExamen]);
    };

    if (file) reader.readAsDataURL(file);
    else {
      const nuevoExamen = {
        id: crypto.randomUUID(),
        pacienteId: selectedPatientId,
        medicoId: currentDoctorId,
        fecha: new Date().toISOString().split("T")[0],
        tipo: form.tipo,
        resultados: form.resultados,
        archivo: null,
      };

      setExams([...exams, nuevoExamen]);
    }

    setForm({ tipo: "", resultados: "" });
    setFile(null);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Nuevo Examen Médico
        </h1>
        <p className="text-gray-500">
          Registra exámenes clínicos e imágenes médicas del paciente
        </p>
      </div>

      {/* SELECT PACIENTE */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-3">

        <label className="block text-sm font-medium text-gray-600">
          Seleccionar paciente
        </label>

        <select
          className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">Selecciona paciente</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

      </div>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-5">

        <div className="grid gap-4">

          <input
            name="tipo"
            placeholder="Tipo de examen (ej: Hemograma, Radiografía)"
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.tipo}
            onChange={handleChange}
          />

          <textarea
            name="resultados"
            placeholder="Resultados del examen"
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.resultados}
            onChange={handleChange}
            rows={3}
          />

          {/* FILE UPLOAD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Archivo médico (opcional)
            </label>

            <input
              type="file"
              className="border p-3 rounded-xl w-full bg-white"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="text-sm text-green-600">
                📎 Archivo seleccionado: {file.name}
              </p>
            )}
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={guardarExamen}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          Guardar examen
        </button>

      </div>

    </div>
  );
}

export default NuevoExamen;