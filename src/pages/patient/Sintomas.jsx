import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Sintomas() {
  const { appointments } = useData();
  const { currentPatientId } = useRole();

  const misSintomas = appointments
    .filter((c) => c.pacienteId === currentPatientId)
    .flatMap((c) => c.sintomas || [])
    .sort(
      (a, b) =>
        new Date(b.fechaInicio) - new Date(a.fechaInicio)
    );

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mis Síntomas
        </h1>

        <p className="text-gray-500">
          Historial de síntomas registrados durante las consultas médicas.
        </p>
      </div>

      {misSintomas.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No hay síntomas registrados.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misSintomas.map((s, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {s.nombre}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Categoría:{" "}
                    <span className="font-medium">
                      {s.categoria}
                    </span>
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                  Síntoma
                </span>

              </div>

              <div className="mt-4 border-t pt-3 flex justify-between text-sm text-gray-500">

                <span>
                  Inicio:{" "}
                  <span className="font-medium text-gray-700">
                    {s.fechaInicio}
                  </span>
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Sintomas;