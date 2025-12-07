import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = "auth_current_user";
const STORAGE_KEY_USERS = "auth_users";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Demo-only: credentials stored in localStorage; password is not used/stored securely.
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
      const users: Array<{ name: string; email: string; password: string }> = rawUsers ? JSON.parse(rawUsers) : [];
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) return false;
      const u: User = { name: found.name, email: found.email };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
      setUser(u);
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
      const users: Array<{ name: string; email: string; password: string }> = rawUsers ? JSON.parse(rawUsers) : [];
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) return false;
      users.push({ name, email, password });
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      const u: User = { name, email };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
      setUser(u);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};