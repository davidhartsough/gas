import React, { useState } from "react";
import Layout from "./Layout";
import Welcome from "./Welcome";
import Shuffle from "./Shuffle";

function App() {
  const [token, setToken] = useState(localStorage.getItem("gasToken"));
  return (
    <Layout>
      {!token ? <Welcome setToken={setToken} /> : <Shuffle token={token} />}
    </Layout>
  );
}

export default App;
