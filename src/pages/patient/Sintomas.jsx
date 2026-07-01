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
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mis Síntomas
      </h1>

      {misSintomas.length === 0 ? (
        <p className="text-gray-500">
          No hay síntomas registrados
        </p>
      ) : (
        <div className="space-y-3">

          {misSintomas.map((s, i) => (
            <div
              key={i}
              className="bg-white p-4 border rounded"
            >
              <p className="font-bold">{s.nombre}</p>

              <p className="text-sm text-gray-500">
                {s.categoria}
              </p>

              <p className="text-sm text-gray-400">
                {s.fechaInicio}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Sintomas;