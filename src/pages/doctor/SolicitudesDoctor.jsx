import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function SolicitudesDoctor() {
  const { accessRequests, patients } = useData();
  const { currentDoctorId } = useRole();

  const misSolicitudes = accessRequests.filter(
    (r) => r.medicoId === currentDoctorId
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Solicitudes enviadas
      </h1>

      {misSolicitudes.length === 0 ? (
        <p className="text-gray-500">
          No has enviado solicitudes
        </p>
      ) : (
        <div className="space-y-3">

          {misSolicitudes.map((s) => {
            const paciente = patients.find(
              (p) => p.id === s.pacienteId
            );

            return (
              <div
                key={s.id}
                className="bg-white p-4 border rounded"
              >
                <p className="font-bold">
                  {paciente?.nombre}
                </p>

                <p className="text-sm text-gray-500">
                  Estado: {s.estado}
                </p>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default SolicitudesDoctor;