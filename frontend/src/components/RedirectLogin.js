import React from "react";
import { Navigate } from "react-router-dom";

export default function redirectLogin() {
  return <Navigate to="/signin"> </Navigate>;
}
