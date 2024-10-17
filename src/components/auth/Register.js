import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../config/supabaseClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Registriere den Benutzer mit Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Füge zusätzliche Benutzerdaten zur users Tabelle hinzu
        const { error: insertError } = await supabase.from("users").insert({
          id: authData.user.id, // Verwende die von Supabase Auth generierte ID
          email: authData.user.email,
          username,
        });

        if (insertError) throw insertError;

        alert(
          "Registration successful! Please check your email for verification.",
        );
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
