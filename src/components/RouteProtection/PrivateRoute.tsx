import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabase";

export default function PrivateRoute({ children }: any) {
  const user = supabase.auth.user();
  return user ? children : <Navigate to="/" />;
}
