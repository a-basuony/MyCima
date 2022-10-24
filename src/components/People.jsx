import React,{useState, useEffect} from 'react';
import axios from 'axios';
import image from '../components/image.jpg';

const People = () => {
    const [trendingPeople ,setTrendingPeople] = useState([]);

    async function getTrending (mediaType , callback){
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
        callback(data.results)
    }
    useEffect(()=>{
        getTrending('person', setTrendingPeople);
    
    },[])
    return (
        <div className='row'>
            <div className='row py-5'>
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
                
                <h3 className='descriptions py-5'>{person.name}</h3>
                <p className='text-muted'>{person.original_name}</p>
                
                </div>
        
            </div>)}
            
        </div>
        </div>
    );
}

export default People;
