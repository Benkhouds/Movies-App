import { useContext, useState,useEffect} from 'react'
import {Redirect } from 'react-router-dom'
import MoviesList from '../components/MoviesList'
import SearchBar from '../components/SearchBar'
import MoviesContext from '../store/movies-context'
import Spinner from '../components/layout/Spinner'
import axios from 'axios'
export default function AllMovies({location,match}){
    const [data, setData] =useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const movies = useContext(MoviesContext)
    
    useEffect(()=>{
      setError('');
      setIsLoading(true)
      const query= new URLSearchParams(location.search);
      console.log(query.get("search"))
       if(match.path === "/movie"){
        if(query.get("search")){
          handleSearch(query.get("search"))
        }else{
          setError('url')
          setIsLoading(false)
        }
      }
      else{
        if(movies && movies.length){
          setData(movies)
        } 
        else{
           setError('error fetching data')
        }
        setIsLoading(false)    
      }
       
    },[location, match, movies])
   
   function handleSearch(term){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}&page=1`)
    .then((res)=>{     
            if(res.status !== 200){
                setError(res.statusText)
                return Error(res.statusText)
            }
            else{
                const results = res.data.results
                results.length ? setData(results) :setError('No results found');
                setIsLoading(false)
            }
          
   })
  }


    
     
    return (
      <div>
        <header>
          <SearchBar/>      
        </header>

          {error && error !=='url' && <div>{error}</div>}
          {error === 'url' && <Redirect to="/" />}
          {isLoading && <Spinner/>} 
          {data && !error && <MoviesList movies={data}/>}
          
      </div>
    )
}
  