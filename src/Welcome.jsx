import React from "react";
import axios from "axios";

export default function Welcome({ setToken }) {
  function login() {
    axios
      .get("/api/auth")
      .then(({ data }) => {
        console.log(data);
        const token = data.access_token;
        localStorage.setItem("gasToken", token);
        setToken(token);
      })
      .catch(console.warn);
  }
  return (
    <div>
      <p>Fuel your listening</p>
      <p>Start your engine</p>
      <p>Explore the universe of music</p>
      <button onClick={login} type="button">
        Let&apos;s Go
      </button>
    </div>
  );
}
