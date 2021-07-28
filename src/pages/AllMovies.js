import {useState, useEffect} from 'react'
import useFetch from '../hooks/useFetch'
import MoviesList from '../components/MoviesList'
import SearchBar from '../components/SearchBar'

export default function AllMovies(props){
    const [url, setUrl] = useState(``);
    let term=''
    if(props.location.search){
       term= props.location && props.location.search.match(/\?search=([A-z0-9]*)/)[1];
    }
    
     useEffect(()=>{
       if(term){
        setUrl(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}&page=1`);
       }
       else{
        setUrl(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`);
       }
      
     },[term])
      console.log(term)
     let {data:movies, isLoading,error} = useFetch(url)
     console.log(movies)
    return (
      <div>
        <header>
          <SearchBar />      
        </header>

          {error && <div>{error}</div>}
          {isLoading && !error && <div>Loading...</div>}
          {movies && <MoviesList movies={movies}/>}
          
      </div>
    )
}
  