import axios from './axios';
import React, { useState , useEffect} from 'react'
import './Home.css'
import image from '../components/image.jpg'
import { Link } from 'react-router-dom';
import requests from './requests';
import Banner from './Banner';


const base_url= 'https://image.tmdb.org/t/p/original/';
export default function Home() {

  const [trendingMovies ,setTrendingMovies] = useState([]);
  const [trendingTv ,setTrendingTv] = useState([]);
  const [trendingPeople ,setTrendingPeople] = useState([]);
  const [isLargeRow , setIsLarge] = useState(true)



  async function getTrending (mediaType , callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results.slice(0,10))
  }
  
  useEffect(()=>{
    getTrending('movie' , setTrendingMovies);
    getTrending('tv' , setTrendingTv);
    getTrending('person', setTrendingPeople);

  },[])
  const [fetchTrending, setfetchTrending] = useState([]);
  const [fetchNetflixOriginals, setfetchNetflixOriginals] = useState([]);
  const [fetchTopRated, setfetchTopRated] = useState([]);
  const [fetchActionMovies, setfetchActionMovies] = useState([]);
  const [fetchComedyMovies, setfetchComedyMovies] = useState([]);
  const [fetchHorrorMovies, setfetchHorrorMovies] = useState([]);
  const [fetchRomanceMovies, setfetchRomanceMovies] = useState([]);
  const [fetchDocumantaries, setfetchDocumantaries] = useState([]);
  useEffect(()=>{
    async function fetchData(fetchType , callback){
        const request = await axios.get(`${fetchType}`);
        callback(request.data.results);
        return request;
        
    }
    // if [] run once when the row loads, and don't run again
    fetchData(requests.fetchTrending , setfetchTrending);
    fetchData(requests.fetchNetflixOriginals , setfetchNetflixOriginals);
    fetchData(requests.fetchTopRated , setfetchTopRated);
    fetchData(requests.fetchActionMovies, setfetchActionMovies);
    fetchData(requests.fetchComedyMovies, setfetchComedyMovies);
    fetchData(requests.fetchHorrorMovies, setfetchHorrorMovies);
    fetchData(requests.fetchRomanceMovies, setfetchRomanceMovies);
    fetchData(requests.fetchDocumantaries,setfetchDocumantaries);
},[]);

  return (
    <>
    <Banner/>
    <div className='container pt-5'>
    <div className='row'>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr mb-4 w-25"></div>
        <h2 className='h3'> Trending Movies <br /> Movies <br /> To Watch Right Now</h2>
        <p className='text-muted'>Top Trending Movies by Day</p>
        <div className="brdr mt-4 "></div>
        </div>
      </div>
      {trendingMovies.map((movie, i )=> <div key={i} className='wrapper col-md-4 col-lg-2 py-2'>
        <Link to={`/movieDetails/${movie.id}`}> 
        <div className="card ">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
          <p className='descriptions '>{movie.title}</p>
        </div>
        </Link>
        
      </div>)}


    </div>
    <div className='row py-5'>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr mb-4 w-25"></div>
        <h2 className='h3'> Trending <br /> TV <br /> To Watch Right Now</h2>
        <p className='text-muted'>Top Trending TV by Day</p>
        <div className="brdr mt-4 "></div>
        </div>
      </div>
      {trendingTv.map((tv, i )=> <div key={i} className='wrapper col-md-2 py-2'>

        <div className="card ">
          <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
          
          <p className='descriptions '>{tv.name}</p>
        
        </div>
      
      </div>)}

    </div>
    
    <div className="row ">
      <h2>ALL-TIME BOX-OFFICE </h2>
      <h4 className='text-muted'>Best Recent Films</h4>
          <div className='row__posters'>
                
              {fetchTrending.map((movie , i)=> (<div key={i} className='wrapper col-md-2 py-2'>
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              </div>
              ))
              }
      </div>
          <div className='row__posters'>
              
              {fetchDocumantaries.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchComedyMovies.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchHorrorMovies.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchNetflixOriginals.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchRomanceMovies.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchTopRated.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
          <div className='row__posters'>
              
              {fetchActionMovies.map(movie=> (
                  <img 
                  key={movie.id}
                  
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
              ))}
          </div>
    </div>

    <div className='row py-5 '>
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr mb-4 w-25"></div>
        <h2 className='h3'> Trending <br /> People <br /> To Watch Right Now</h2>
        <p className='text-muted'>Top Trending People by Day</p>
        <div className="brdr mt-4 "></div>
        </div>
      </div>
      {trendingPeople.map((person, i )=> <div key={i} className='wrapper col-md-2 py-2'>

        <div className="card ">
          {person.profile_path === null ? <img src={image} className='w-100 ' alt="" />:<img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />}
{/*           
          <h3 className='descriptions py-5'>{person.name}</h3>
          <p className='text-muted'>{person.original_name}</p> */}
        
        </div>
      
      </div>)}

    </div>
    </div>
    </>
  )
}
