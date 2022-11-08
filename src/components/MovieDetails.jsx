import axios from 'axios';
import React ,{useState, useEffect}from 'react';
import {  useParams } from 'react-router-dom';


const MovieDetails = () => {



    let params = useParams();
    const [movieDetails, setMovieDetails] = useState([]);

    async function getMovieDetails (id){
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
        setMovieDetails(data)
    }
    
    useEffect(() => {
        getMovieDetails(params.id)
    }, []);



    return (
        <div>{movieDetails ?
            <div className="row mt-5">
            <div className="col-md-3 mt-5">
                <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+movieDetails.poster_path} alt="" />
            </div>
            <div className="col-md-9 mt-5">
                <h2>{movieDetails.title}</h2>
                <p className='text-muted py-3'>{movieDetails.overview}</p>
                <ul>
                    <li>budget: {movieDetails.budget}</li>
                    <li>homepage: <a href={movieDetails.homepage}>{movieDetails.homepage}</a> </li>
                    <li>original_language: {movieDetails.original_language}</li>
                    <li>original_title: {movieDetails.original_title}</li>
                    <li>vote: {movieDetails.vote}</li>
                    <li>vote_count: {movieDetails.vote_count}</li>

                </ul>
            </div>
        </div>
        : 
        <div className="vh-100 d-flex align-items-center justify-content-center" >
            <i className="fas fa-spinner fa-spin fa-4x"></i>
        </div>
        }
        
        </div>
    );
}

export default MovieDetails;
