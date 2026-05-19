import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  isAuthed: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthed: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthed, setIsAuthed] = useState(
    !!localStorage.getItem("user")
  );

  const login = () => {
    setIsAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}