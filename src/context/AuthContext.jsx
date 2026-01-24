import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(15);
  const [loading, setLoading] = useState(true);

  // 🔹 Helper: extract userId (student only)
  const getUserId = (userData) => {
    if (!userData) return null;

    const inner = userData.user ?? userData;

    if (inner?._id) return inner._id;
    if (Array.isArray(inner) && inner[0]?._id) return inner[0]._id;

    return null;
  };

  // 🔹 Helper: role detection
  const getRole = (userData) => {
    if (!userData) return null;
    return userData.role || userData.user?.role || null;
  };

  // 🔄 Restore auth on reload
  useEffect(() => {
    try {
      const storedUserStr = localStorage.getItem("user");

      if (storedUserStr) {
        const parsedUser = JSON.parse(storedUserStr);
        setUser(parsedUser);

        const role = getRole(parsedUser);

        // 🎓 STUDENT → restore credits
        if (role === "student") {
          const userId = getUserId(parsedUser);
          if (userId) {
            const storedCredits = localStorage.getItem(`credits_${userId}`);
            setCredits(storedCredits ? Number(storedCredits) : 15);
          } else {
            setCredits(15);
          }
        }

        // 🏢 COMPANY → ignore credits
        if (role === "company") {
          setCredits(0);
        }
      } else {
        setCredits(15);
      }
    } catch (e) {
      console.error("Auth restore failed:", e);
      setUser(null);
      setCredits(15);
    } finally {
      setLoading(false);
    }
  }, []);

  // 💾 Persist user + student credits
  useEffect(() => {
    if (!user) return;

    localStorage.setItem("user", JSON.stringify(user));

    const role = getRole(user);
    if (role !== "student") return;

    const userId = getUserId(user);
    if (!userId) return;

    localStorage.setItem(`credits_${userId}`, String(credits));
  }, [user, credits]);

  // 🎓 STUDENT LOGIN (existing behavior)
  const login = (userData) => {
    const studentUser = {
      ...userData,
      role: "student",
    };

    setUser(studentUser);

    const userId = getUserId(studentUser);
    if (userId) {
      const storedCredits = localStorage.getItem(`credits_${userId}`);
      setCredits(storedCredits ? Number(storedCredits) : 15);
    } else {
      setCredits(15);
    }
  };

  // 🏢 COMPANY LOGIN (NEW)
  const loginCompany = async (email, password) => {
    // 🔴 Later replace with API call
    const companyUser = {
      email,
      companyName: "Demo Company",
      role: "company",
    };

    setUser(companyUser);
    setCredits(0); // company does not use credits
  };

  // 🚪 LOGOUT (works for both)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCredits(15);
  };

  // 🎓 Student credit helpers
  const addCredits = (amount) =>
    setCredits((prev) => prev + amount);

  const deductCredits = (amount) =>
    setCredits((prev) => Math.max(prev - amount, 0));

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role: getRole(user),
        isStudent: getRole(user) === "student",
        isCompany: getRole(user) === "company",

        credits,
        loading,

        login,
        loginCompany,
        logout,

        addCredits,
        deductCredits,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
