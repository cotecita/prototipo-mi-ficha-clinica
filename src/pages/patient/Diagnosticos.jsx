import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";
import { useChatbotContext } from "../../context/ChatbotContext";
import { useEffect, useMemo } from "react";

function Diagnosticos() {
  const { diagnoses } = useData();
  const { currentPatientId } = useRole();
  const { setPageContext } = useChatbotContext();

  const misDiagnosticos = useMemo(() => {
  return diagnoses.filter(
    (d) => d.pacienteId === currentPatientId
  );
}, [diagnoses, currentPatientId]);

  useEffect(() => {
      setPageContext({
        page: "Diagnosticos",
        diagnosticos: misDiagnosticos,
      });
  
      return () => {
        setPageContext(null);
      }
    }, [misDiagnosticos, setPageContext]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mis Diagnósticos
        </h1>
        <p className="text-gray-500">
          Registro clínico de diagnósticos médicos
        </p>
      </div>

      {/* EMPTY STATE */}
      {misDiagnosticos.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No tienes diagnósticos registrados
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misDiagnosticos.map((d) => (
            <div
              key={d.id}
              className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
            >

              {/* HEADER CARD */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {d.descripcion}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Código ICD: <span className="font-medium">{d.codigoICD}</span>
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    d.estado === "ACTIVO"
                      ? "bg-green-100 text-green-700"
                      : d.estado === "RESUELTO"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {d.estado}
                </span>

              </div>

              {/* FOOTER INFO */}
              <div className="mt-4 flex justify-between text-xs text-gray-400 border-t pt-3">

                <span>
                  Fecha: <span className="font-medium text-gray-500">{d.fecha}</span>
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Diagnosticos;