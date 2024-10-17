import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../config/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funktion zum Abrufen des aktuellen Benutzers
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    // Rufe den aktuellen Benutzer ab
    fetchUser();

    // Setze einen Listener für Auth-Änderungen
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setLoading(false);
      },
    );

    // Cleanup-Funktion
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
