import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import genres from "./genres";
import "./Select.css";

const options = genres.map((genre) => ({
  value: encodeURIComponent(genre),
  label: genre,
}));
const randomGenre = () => options[Math.floor(Math.random() * options.length)];

export default function Shuffle() {
  const [genre, setGenre] = useState(randomGenre());
  const [input, setInput] = useState("");
  function handleInputChange(newInput, { action }) {
    if (action === "input-change" || action === "set-value") {
      setInput(newInput);
    }
  }
  const history = useHistory();
  const go = () => history.push(`/artists/${genre.value}/1`);
  function submit(event) {
    event.preventDefault();
    go();
  }
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Pick a genre</h2>
        <Select
          value={genre}
          onChange={setGenre}
          options={options}
          autoFocus
          isClearable
          backspaceRemovesValue={false}
          escapeClearsValue={false}
          classNamePrefix="gs"
          className="genre-select"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#1db954",
              primary25: "#199f48",
              neutral60: "#999",
              neutral80: "#fff",
            },
          })}
        />
        <button type="submit" disabled={!genre}>
          Shuffle
        </button>
      </form>
    </div>
  );
}
