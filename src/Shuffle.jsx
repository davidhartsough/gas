import React from "react";

export default function Shuffle({ token }) {
  const submit = () => console.log(token);
  return (
    <div>
      <p>Helllllo!</p>
      <button type="button" onClick={submit}>
        YO
      </button>
    </div>
  );
}
