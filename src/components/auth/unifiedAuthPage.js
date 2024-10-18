import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const UnifiedAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          navigate("/");
        }
      } else {
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password,
          },
        );

        if (authError) throw authError;

        if (authData.user) {
          const { error: insertError } = await supabase.from("users").insert({
            id: authData.user.id,
            email: authData.user.email,
            username,
          });

          if (insertError) throw insertError;

          alert(
            "Registration successful! Please check your email for verification.",
          );
          setIsLogin(true);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isLogin ? "Anmelden" : "Registrieren"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                "focus:border-purple-500 focus:ring-purple-500",
                "py-3 px-4", // Increased padding here
              )}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                "focus:border-purple-500 focus:ring-purple-500",
                "py-3 px-4", // Increased padding here
              )}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Benutzername
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                  "focus:border-purple-500 focus:ring-purple-500",
                  "py-3 px-4", // Increased padding here
                )}
                required
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLogin ? "Anmeldung läuft..." : "Registrierung läuft..."}
              </>
            ) : isLogin ? (
              "Anmelden"
            ) : (
              "Registrieren"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            {isLogin
              ? "Noch kein Konto? Registrieren"
              : "Bereits ein Konto? Anmelden"}
          </button>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Fehler</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Alert className="mt-6">
          <AlertTitle>
            Willkommen bei Gerda Ahorner's Bachblüten-Harmonie Rad!
          </AlertTitle>
          <AlertDescription>
            Entdecke Deine innere Harmonie und Lebensfreude mit unserem Ja zum
            Leben Programm{" "}
            <a href="https://www.ja-zum-leben.at">www.ja-zum-leben.at</a>.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default UnifiedAuthPage;
