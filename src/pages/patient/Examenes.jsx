import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Examenes() {
  const { exams, setExams } = useData();
  const { currentPatientId } = useRole();
  const [nuevoExamen, setNuevoExamen] = useState({
    tipo: "",
    resultados: "",
    fecha: new Date().toISOString().split("T")[0],
    archivo: null,
  });

  const misExamenes = exams.filter(
    (e) => e.pacienteId === currentPatientId
  );


  function agregarExamen() {
    if (!nuevoExamen.tipo.trim()) {
      alert("Debe ingresar el tipo de examen.");
      return;
    }

    if (nuevoExamen.archivo) {
      const reader = new FileReader();

      reader.onload = () => {
        const examen = {
          id: crypto.randomUUID(),
          pacienteId: currentPatientId,
          medicoId: null,
          fecha: nuevoExamen.fecha,
          tipo: nuevoExamen.tipo,
          resultados: nuevoExamen.resultados,
          archivo: {
            nombre: nuevoExamen.archivo.name,
            tipo: nuevoExamen.archivo.type,
            contenido: reader.result,
          },
        };

        setExams([...exams, examen]);

        setNuevoExamen({
          tipo: "",
          resultados: "",
          fecha: new Date().toISOString().split("T")[0],
          archivo: null,
        });
      };

      reader.readAsDataURL(nuevoExamen.archivo);
    } else {
      const examen = {
        id: crypto.randomUUID(),
        pacienteId: currentPatientId,
        medicoId: null,
        fecha: nuevoExamen.fecha,
        tipo: nuevoExamen.tipo,
        resultados: nuevoExamen.resultados,
        archivo: null,
      };

      setExams([...exams, examen]);

      setNuevoExamen({
        tipo: "",
        resultados: "",
        fecha: new Date().toISOString().split("T")[0],
        archivo: null,
      });
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mis Exámenes
      </h1>

      <div className="bg-white p-4 rounded shadow border space-y-4">

        <h2 className="text-xl font-semibold">
          Agregar examen
        </h2>

        <input
          className="border p-2 rounded w-full"
          placeholder="Tipo de examen"
          value={nuevoExamen.tipo}
          onChange={(e) =>
            setNuevoExamen({
              ...nuevoExamen,
              tipo: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-2 rounded w-full"
          value={nuevoExamen.fecha}
          onChange={(e) =>
            setNuevoExamen({
              ...nuevoExamen,
              fecha: e.target.value,
            })
          }
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Resultados"
          value={nuevoExamen.resultados}
          onChange={(e) =>
            setNuevoExamen({
              ...nuevoExamen,
              resultados: e.target.value,
            })
          }
        />

        <input
          type="file"
          className="border p-2 rounded w-full"
          onChange={(e) =>
            setNuevoExamen({
              ...nuevoExamen,
              archivo: e.target.files[0],
            })
          }
        />

        <button
          onClick={agregarExamen}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar examen
        </button>

      </div>

      {misExamenes.length === 0 ? (
        <p className="text-gray-500">
          No tienes exámenes registrados
        </p>
      ) : (
        <div className="space-y-4">

          {misExamenes.map((e) => (
            <div
              key={e.id}
              className="bg-white p-4 rounded shadow border space-y-3"
            >

              <div className="flex justify-between">
                <h2 className="font-bold text-lg">
                  {e.tipo}
                </h2>

                <span className="text-sm text-gray-400">
                  {e.fecha}
                </span>
              </div>

              <p>{e.resultados}</p>

              {e.archivo ? (
                <div className="space-y-2">

                  <p className="text-green-700 font-medium">
                    📄 {e.archivo.nombre}
                  </p>

                  <div className="flex gap-4">

                    <a
                      href={e.archivo.contenido}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </a>

                    <a
                      href={e.archivo.contenido}
                      download={e.archivo.nombre}
                      className="text-blue-600 hover:underline"
                    >
                      Descargar
                    </a>

                  </div>

                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  No hay archivo adjunto.
                </p>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Examenes;