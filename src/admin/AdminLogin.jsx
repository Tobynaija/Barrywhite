
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (adminError || !admin) {
        await supabase.auth.signOut();
        throw new Error("This account is not authorized as an administrator.");
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h1>Barrywhite Travel Agency</h1>
        <h2>Administrator Login</h2>
        <p>Sign in to manage your travel website.</p>

        {error && <div className="admin-error">{error}</div>}

        <label htmlFor="admin-email">Email address</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <Link to="/">Return to website</Link>
      </form>
    </div>
  );
}
