import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from '../axios';


const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const base_url = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };
        fetchData();
    }, [fetchUrl])

    if (!movies) {
        return <p>Loading...</p>
    }
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    (isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name || movie.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row;
