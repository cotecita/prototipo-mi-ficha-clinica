import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Examenes() {
  const { exams } = useData();
  const { currentPatientId } = useRole();

  const misExamenes = exams.filter(
    (e) => e.pacienteId === currentPatientId
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mis Exámenes
      </h1>

      {misExamenes.length === 0 ? (
        <p className="text-gray-500">
          No tienes exámenes registrados
        </p>
      ) : (
        <div className="space-y-4">

          {misExamenes.map((e) => (
            <div
              key={e.id}
              className="bg-white p-4 rounded shadow border space-y-2"
            >

              <div className="flex justify-between">
                <h2 className="font-bold text-lg">
                  {e.tipo}
                </h2>

                <span className="text-sm text-gray-400">
                  {e.fecha}
                </span>
              </div>

              <p className="text-gray-600">
                {e.resultados}
              </p>

              {/* Archivo */}
              {e.archivo ? (
                <a
                  href={e.archivo}
                  download={`examen-${e.tipo}`}
                  className="text-blue-600 font-medium"
                >
                  Descargar archivo
                </a>
              ) : (
                <p className="text-sm text-gray-400">
                  Sin archivo adjunto
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