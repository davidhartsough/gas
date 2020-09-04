import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <section>
      <header>
        <Link to="/" className="header-link">
          <img id="logo" src="/logo192.png" alt="GAS logo" />
          <h1>GAS </h1>
          <p> (for Spotify)</p>
        </Link>
      </header>
      {children}
    </section>
  );
}
