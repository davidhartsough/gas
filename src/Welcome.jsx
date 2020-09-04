import React, { useState } from "react";
import { getToken } from "./utils";

export default function Welcome({ setToken }) {
  const [loading, setLoading] = useState(false);
  function login() {
    setLoading(true);
    getToken().then(setToken);
  }
  return (
    <section className="welcome">
      <header>
        <img id="logo" src="/logo192.png" alt="GAS logo" />
        <h1>GAS </h1>
        <p> (for Spotify)</p>
      </header>
      <h2>The Genre/Artist Shuffler</h2>
      <ul>
        <li>Fuel your listening</li>
        <li>Start your engine</li>
        <li>Explore the universe of music</li>
      </ul>
      {loading ? (
        <div className="loader" />
      ) : (
        <button onClick={login} type="button" id="login">
          Let&apos;s Go
        </button>
      )}
    </section>
  );
}
