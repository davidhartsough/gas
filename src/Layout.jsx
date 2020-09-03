import React from "react";

export default function Layout({ children }) {
  return (
    <section>
      <header>
        <h1>
          <span role="img" aria-label="gas emoji">
            ⛽️
          </span>
          GAS (for Spotify)
        </h1>
        <h2>The Genre/Artist Shuffle app</h2>
      </header>
      {children}
    </section>
  );
}
