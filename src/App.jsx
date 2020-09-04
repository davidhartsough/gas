import React, { useState } from "react";
import Welcome from "./Welcome";
import Router from "./shuffler/Router";

function App() {
  const [token, setToken] = useState(localStorage.getItem("gasToken"));
  if (!token) return <Welcome setToken={setToken} />;
  return <Router />;
}

export default App;
