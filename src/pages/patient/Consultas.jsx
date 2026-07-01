import { useData } from "../../context/DataContext";
import { useRole } from "../../context/RoleContext";

function Consultas() {
  const { appointments, doctors } = useData();
  const { currentPatientId } = useRole();

  const { setPageContext } = useChatbotContext();

  const misConsultas = appointments.filter(
    (c) => c.pacienteId === currentPatientId
  );

  function getDoctorName(id) {
    const doctor = doctors.find((d) => d.id === id);
    return doctor ? doctor.nombre : "Médico desconocido";
  }

  useEffect(() => {
    setPageContext({
      page: "Consultas",
      consultas: misConsultas,
    });

    return () => {
      setPageContext(null);
    }
  }, [misConsultas, setPageContext]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mis Consultas Médicas
        </h1>
        <p className="text-gray-500">
          Historial de atenciones médicas
        </p>
      </div>

      {/* EMPTY STATE */}
      {misConsultas.length === 0 ? (
        <div className="bg-white border rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500">
            No tienes consultas registradas
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {misConsultas
            .slice()
            .reverse()
            .map((c) => (
              <div
                key={c.id}
                className="bg-white border rounded-2xl shadow p-5 hover:shadow-md transition"
              >

                {/* HEADER CARD */}
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {c.motivo}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Atendido por{" "}
                      <span className="font-medium text-gray-700">
                        {getDoctorName(c.medicoId)}
                      </span>
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                    {c.fecha}
                  </span>

                </div>

                {/* BODY */}
                <div className="mt-4 space-y-2 text-sm text-gray-700">

                  <p>
                    <span className="font-semibold text-gray-800">
                      Tratamiento:
                    </span>{" "}
                    {c.tratamiento}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800">
                      Indicaciones:
                    </span>{" "}
                    {c.indicaciones}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="mt-4 border-t pt-3 text-xs text-gray-400 flex justify-between">
                  <span>
                    Médico: {getDoctorName(c.medicoId)}
                  </span>

                </div>

              </div>
            ))}
        </div>
      )}

    </div>
  );
}

export default Consultas;