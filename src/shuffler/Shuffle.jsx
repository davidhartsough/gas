import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import genres from "./genres";
import "./Select.css";

const options = genres.map((genre) => ({
  value: genre.replace(/ /g, "%20"),
  label: genre,
}));
const randomGenre = () => options[Math.floor(Math.random() * options.length)];

export default function Shuffle() {
  const [genre, setGenre] = useState(randomGenre());
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
        <CreatableSelect
          value={genre}
          onChange={setGenre}
          options={options}
          autoFocus
          isClearable
          backspaceRemovesValue={false}
          classNamePrefix="gs"
          className="genre-select"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#1db954",
              primary25: "#199f48",
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
