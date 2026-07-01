import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Accesos() {
  const {
    approvedAccess,
    setApprovedAccess,
    doctors,
  } = useData();

  const { currentPatientId } = useRole();

  const misAccesos = approvedAccess.filter(
    (a) =>
      a.pacienteId === currentPatientId &&
      !a.revocadoEn
  );

  function revocar(medicoId) {
    const updated = approvedAccess.map((a) =>
      a.pacienteId === currentPatientId &&
      a.medicoId === medicoId &&
      !a.revocadoEn
        ? {
            ...a,
            revocadoEn: new Date().toISOString(),
          }
        : a
    );

    setApprovedAccess(updated);
  }

  function getDoctor(medicoId) {
    return doctors.find((d) => d.id === medicoId);
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Médicos con acceso a mi historial
      </h1>

      {misAccesos.length === 0 ? (
        <p className="text-gray-500">
          No hay médicos con acceso actualmente
        </p>
      ) : (
        <div className="space-y-4">

          {misAccesos.map((a) => {
            const doctor = getDoctor(a.medicoId);

            return (
              <div
                key={`${a.medicoId}-${a.pacienteId}`}
                className="bg-white p-4 rounded shadow border flex justify-between items-center"
              >

                <div>
                  <p className="font-bold text-lg">
                    {doctor?.nombre}
                  </p>

                  <p className="text-gray-500">
                    {doctor?.especialidad}
                  </p>

                  <p className="text-sm text-gray-400">
                    Acceso otorgado: {a.otorgadoEn}
                  </p>
                </div>

                <button
                  onClick={() => revocar(a.medicoId)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Revocar acceso
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Accesos;