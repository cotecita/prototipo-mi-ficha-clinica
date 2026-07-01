import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  // Usuario "logueado" para el prototipo
  const currentPatientId = "1";
  const currentDoctorId = "1";

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        currentPatientId,
        currentDoctorId,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
