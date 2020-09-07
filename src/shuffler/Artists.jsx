import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { getArtists } from "../utils";
import "./Artists.css";

function getRandomPage(total) {
  const pages = Math.ceil(total / 4) - 1;
  const randomPage = Math.floor(Math.random() * (pages - 2)) + 1;
  return randomPage;
}

function ArtistImage({ images, name }) {
  const image = images[images.length - 1];
  if (image) {
    return <img className="artist-img" src={image.url} alt={name} />;
  }
  return <div className="artist-img" />;
}

function Artists({ genre, page = "1" }) {
  const [loading, setLoading] = useState(true);
  const [artists, setArtists] = useState(null);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    setLoading(true);
    const localKey = `${genre}/${page}`;
    const localData = sessionStorage.getItem(localKey);
    if (localData) {
      const data = JSON.parse(localData);
      setTotal(data.total);
      setArtists(data.artists);
      setLoading(false);
    } else {
      getArtists(genre, page).then((data) => {
        setTotal(data.total);
        setArtists(data.artists);
        setLoading(false);
        sessionStorage.setItem(localKey, JSON.stringify(data));
      });
    }
  }, [genre, page]);
  if (loading) return <div className="loader" />;
  return (
    <div className="artists-shuffle">
      <h2>{decodeURIComponent(genre)}</h2>
      <div className="artists">
        {artists.map((artist) => (
          <div key={artist.id} className="artist">
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="artist-link"
            >
              <ArtistImage images={artist.images} name={artist.name} />
              <h3 className="artist-name">{artist.name}</h3>
            </a>
            <div className="artist-genres">
              {artist.genres.map((g, i) => (
                <Link
                  to={`/artists/${g.replace(/ /g, "%20")}/1`}
                  key={g}
                  className="genre-link"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <Link
          to={`/artists/${genre}/${getRandomPage(total)}`}
          className="button action"
        >
          Reshuffle
        </Link>
        <Link to="/" className="button action">
          Change Genre
        </Link>
      </div>
    </div>
  );
}

export default () => {
  const { genre, page } = useParams();
  if (!genre) return <Redirect to="/" />;
  return <Artists genre={genre} page={page || "1"} />;
};
