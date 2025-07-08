import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../utils/fakeData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const login = (email, password) => {
    const usersList = JSON.parse(localStorage.getItem("users"));
    const user = usersList.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
