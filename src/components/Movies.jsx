
import axios from 'axios';
import React, { useState , useEffect} from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Banner from './Banner';

export default function Movies() {

  const [trendingMovies ,setTrendingMovies] = useState([]);
  let nums = new Array(13).fill(1).map((ele , index )=> index+1)

  async function getTrending (pageNumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
    setTrendingMovies(data.results)
  }
  
  useEffect(()=>{
    getTrending(1);

  },[])

  return (
    <>
    <Banner/>
        <div className="container">
    {trendingMovies ?
      <div className='row justify-content-center'>
      
      {trendingMovies.map((movie, i )=> <div key={i} className='wrapper col-md-2 py-2'>
        <Link to={`/movieDetails/${movie.id}`}> 
        <div className="card ">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
          
        </div>
        </Link>
        
      
      </div>)}

    </div>
    :
    <div className="vh-100 d-flex align-items-center justify-content-center" >
      <i className="fas fa-spinner fa-spin fa-4x"></i>
    </div>}
    <nav className="py-5 position-relative bottom-0">
            <ul className="pagination pagination-sm d-flex justify-content-center">
                {
                    nums.map((pageNum ,i )=> <li onClick={()=> getTrending(pageNum)} key={i} className="page-item"><a className="page-link bg-transparent">{pageNum}</a></li> )
                }
            </ul>
        </nav>
        </div>
    </>
  )
}
