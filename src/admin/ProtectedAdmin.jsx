
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProtectedAdmin({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (active) setStatus("denied");
        return;
      }

      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", session.user.id)
        .maybeSingle();

      if (active) {
        setStatus(!error && data ? "allowed" : "denied");
      }
    }

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === "loading") return <p>Checking administrator access...</p>;
  if (status === "denied") return <Navigate to="/admin/login" replace />;

  return children;
}
