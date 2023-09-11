import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/movie/popular")
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMovieSelect = (event) => {
    setMovieId(event.target.id);
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <MovieCard
        key={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
        release_date={movie.release_date}
      />
    ));
  };

  const renderMovieDetails = () => {
    if (!movieId) {
      return null;
    }

    return (
      <div>
        <h1>{movies[movieId].title}</h1>
        <h2>Release Date: {movies[movieId].release_date}</h2>
        <h2>Runtime: {movies[movieId].runtime}</h2>
        <p>{movies[movieId].overview}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Movie Discovery</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {renderMovies()}
      </div>
      <div>
        {renderMovieDetails()}
      </div>
    </div>
  );
};

export default App;