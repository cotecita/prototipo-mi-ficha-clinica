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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Nuevo Examen Médico</h1>

      <select
        className="border p-2 w-full"
        onChange={(e) => setSelectedPatientId(e.target.value)}
      >
        <option value="">Selecciona paciente</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <input
        name="tipo"
        placeholder="Tipo de examen"
        className="border p-2 w-full"
        value={form.tipo}
        onChange={handleChange}
      />

      <textarea
        name="resultados"
        placeholder="Resultados"
        className="border p-2 w-full"
        value={form.resultados}
        onChange={handleChange}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={guardarExamen}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar examen
      </button>
    </div>
  );
}

export default NuevoExamen;