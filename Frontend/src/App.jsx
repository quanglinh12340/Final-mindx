import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import "./App.css";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

function App() {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:3000/movies/getAll");
      setListData(data.data.result);
    };
    fetchData();
  }, []);
  console.log(listData);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="menu">
            <IoMenu />
          </div>
          <div className="logo"></div>
          <div className="search">
            <IoSearch />
          </div>
        </div>
        <MovieList movies={listData} onMovieClick={handleMovieClick} />
        {selectedMovie && (
          <MovieDetails movie={selectedMovie} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default App;
