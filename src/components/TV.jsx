import React,{useState, useEffect} from 'react';
import axios from './axios';
import Banner from './Banner';
import requests from './requests';


const base_url= 'https://image.tmdb.org/t/p/original/';
const Tv = () => {
    const [trendingTv ,setTrendingTv] = useState([]);

    const [fetchTrending, setfetchTrending] = useState([]);
    const [fetchNetflixOriginals, setfetchNetflixOriginals] = useState([]);
    const [fetchTopRated, setfetchTopRated] = useState([]);
    const [fetchDocumantaries, setfetchDocumantaries] = useState([]);
    const [isLargeRow , setIsLarge] = useState(true)



    useEffect(()=>{
        async function fetchData(fetchType , callback){
            const request = await axios.get(`${fetchType}`);
            callback(request.data.results);
            return request;
            
        }
    fetchData(requests.fetchTrending , setfetchTrending);
    fetchData(requests.fetchNetflixOriginals , setfetchNetflixOriginals);
    fetchData(requests.fetchTopRated , setfetchTopRated);

    },[]);
    async function getTrending (mediaType , callback){
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
        callback(data.results)
    }
    useEffect(()=>{
        getTrending('tv', setTrendingTv);
    
    },[])
    return (
        <>
        <Banner/>
        <div className="container">
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
                <h2>ALL-TIME TV </h2>
                <h4 className='text-muted'>Best Recent Tvs</h4>
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
                        
                        {fetchNetflixOriginals.map(movie=> (
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
            </div>
        </div>
        </>
    );
}

export default Tv;

