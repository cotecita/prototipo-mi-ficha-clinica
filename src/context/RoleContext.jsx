import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function login(user) {
    setCurrentUser(user);
  }

  function logout() {
    setCurrentUser(null);
  }

  const isPatient = currentUser?.role === "PATIENT";
  const isDoctor = currentUser?.role === "DOCTOR";

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,

        isPatient,
        isDoctor,

        currentPatientId: isPatient ? currentUser.id : null,
        currentDoctorId: isDoctor ? currentUser.id : null,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}