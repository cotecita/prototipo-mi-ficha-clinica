import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Diagnosticos() {
  const { diagnoses } = useData();
  const { currentPatientId } = useRole();

  const misDiagnosticos = diagnoses.filter(
    (d) => d.pacienteId === currentPatientId
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mis Diagnósticos
      </h1>

      {misDiagnosticos.length === 0 ? (
        <p className="text-gray-500">
          No tienes diagnósticos registrados
        </p>
      ) : (
        <div className="space-y-4">

          {misDiagnosticos.map((d) => (
            <div
              key={d.id}
              className="bg-white p-4 rounded shadow border"
            >
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">
                  {d.descripcion}
                </h2>

                <span
                  className={`px-2 py-1 rounded text-sm ${
                    d.estado === "ACTIVO"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {d.estado}
                </span>
              </div>

              <p className="text-gray-500">
                Código ICD: {d.codigoICD}
              </p>

              <p className="text-sm text-gray-400">
                Fecha: {d.fecha}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Diagnosticos;