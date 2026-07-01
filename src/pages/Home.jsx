import { useState } from "react";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { pacientes, medicos } from "../data/fakeDatabase";

function Home() {
  const { login } = useRole();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin() {
    // Buscar en pacientes
    const patient = pacientes.find(
      (p) =>
        p.email === form.email &&
        p.password === form.password
    );

    if (patient) {
      login({
        id: patient.id,
        nombre: patient.nombre,
        email: patient.email,
        role: "PATIENT",
      });

      navigate("/patient/dashboard");
      return;
    }

    // Buscar en médicos
    const doctor = medicos.find(
      (m) =>
        m.email === form.email &&
        m.password === form.password
    );

    if (doctor) {
      login({
        id: doctor.id,
        nombre: doctor.nombre,
        email: doctor.email,
        role: "DOCTOR",
      });

      navigate("/doctor/dashboard");
      return;
    }

    alert("Credenciales incorrectas");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">
            Mi Ficha Clínica
          </h1>

          <p className="text-gray-500">
            Sistema de gestión médica
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">
              Correo
            </label>
            <input
              className="mt-1 border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ej: medico@correo.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Contraseña
            </label>
            <input
              className="mt-1 border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* BOTÓN */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            Iniciar sesión
          </button>

        </div>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-400">
          Demo prototipo — datos simulados
        </p>

      </div>
    </div>
  );
}

export default Home;