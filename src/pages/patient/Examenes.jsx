import { useState } from "react";
import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";
import { useChatbotContext } from "../../context/ChatbotContext";
import { useEffect, useMemo } from "react";

function Examenes() {
  const { exams, setExams } = useData();
  const { currentPatientId } = useRole();
  const { setPageContext } = useChatbotContext();


  const [nuevoExamen, setNuevoExamen] = useState({
    tipo: "",
    resultados: "",
    fecha: new Date().toISOString().split("T")[0],
    archivo: null,
  });

    const misExamenes = useMemo(() => {
    return exams.filter(
      (e) => e.pacienteId === currentPatientId
    );
  }, [exams, currentPatientId]);


    useEffect(() => {
      setPageContext({
        page: "Examenes",
        examenes: misExamenes,
      });
  
      return () => {
        setPageContext(null);
      }
    }, [misExamenes, setPageContext]);

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
    }

    setNuevoExamen({
      tipo: "",
      resultados: "",
      fecha: new Date().toISOString().split("T")[0],
      archivo: null,
    });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mis Exámenes
        </h1>
        <p className="text-gray-500">
          Resultados de laboratorio e imágenes médicas
        </p>
      </div>

      {/* FORM 
      <div className="bg-white border rounded-2xl shadow p-6 space-y-5">

        <h2 className="text-lg font-semibold text-gray-800">
          Agregar nuevo examen
        </h2>

        <div className="grid gap-4">

          <input
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Tipo de examen (ej: Hemograma, Radiografía)"
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
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={nuevoExamen.fecha}
            onChange={(e) =>
              setNuevoExamen({
                ...nuevoExamen,
                fecha: e.target.value,
              })
            }
          />

          <textarea
            className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Resultados del examen"
            value={nuevoExamen.resultados}
            onChange={(e) =>
              setNuevoExamen({
                ...nuevoExamen,
                resultados: e.target.value,
              })
            }
            rows={3}
          />

          <input
            type="file"
            className="border p-3 rounded-xl w-full bg-white"
            onChange={(e) =>
              setNuevoExamen({
                ...nuevoExamen,
                archivo: e.target.files[0],
              })
            }
          />

        </div>

        <button
          onClick={agregarExamen}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          Guardar examen
        </button>

      </div> */}

      {/* LISTA */}
      {misExamenes.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No tienes exámenes registrados
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misExamenes
            .slice()
            .reverse()
            .map((e) => (
              <div
                key={e.id}
                className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
              >

                {/* HEADER */}
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {e.tipo}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Fecha: {e.fecha}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                    Examen
                  </span>

                </div>

                {/* RESULTADOS */}
                <div className="mt-4 text-sm text-gray-700">
                  <p className="font-medium text-gray-800 mb-1">
                    Resultados:
                  </p>
                  <p>{e.resultados || "Sin resultados registrados"}</p>
                </div>

                {/* ARCHIVO */}
                <div className="mt-4 border-t pt-3">

                  {e.archivo ? (
                    <div className="space-y-2">

                      <p className="text-green-700 font-medium text-sm">
                        📄 {e.archivo.nombre}
                      </p>

                      <div className="flex gap-4 text-sm">

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
                      Sin archivo adjunto
                    </p>
                  )}

                </div>

              </div>
            ))}
        </div>
      )}

    </div>
  );
}

export default Examenes;