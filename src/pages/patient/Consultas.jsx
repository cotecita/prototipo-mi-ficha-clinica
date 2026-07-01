import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Consultas() {
  const { appointments, doctors } = useData();
  const { currentPatientId } = useRole();

  const misConsultas = appointments.filter(
    (c) => c.pacienteId === currentPatientId
  );

  function getDoctorName(id) {
    const doctor = doctors.find((d) => d.id === id);
    return doctor ? doctor.nombre : "Médico desconocido";
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mis Consultas Médicas
      </h1>

      {misConsultas.length === 0 ? (
        <p className="text-gray-500">
          No tienes consultas registradas
        </p>
      ) : (
        <div className="space-y-4">

          {misConsultas.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded shadow border space-y-2"
            >

              <div className="flex justify-between">
                <h2 className="font-bold text-lg">
                  {c.motivo}
                </h2>

                <span className="text-sm text-gray-400">
                  {c.fecha}
                </span>
              </div>

              <p className="text-gray-600">
                <strong>Tratamiento:</strong> {c.tratamiento}
              </p>

              <p className="text-gray-600">
                <strong>Indicaciones:</strong> {c.indicaciones}
              </p>

              <p className="text-sm text-gray-500">
                Atendido por: {getDoctorName(c.medicoId)}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Consultas;