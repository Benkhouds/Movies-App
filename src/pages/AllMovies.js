import { useState,useEffect} from 'react'
import MoviesList from '../components/MoviesList'
import Layout from '../components/layout/Layout'
import Error from '../components/UI/Error'
import Spinner from '../components/UI/Spinner'
import useFetch from '../hooks/useFetch'



export default function AllMovies({location,match, history}){
    
  const [searchTerm , setSearchTerm] = useState('')
  const {movies, error , isLoading ,hasMore} = useFetch(searchTerm)
  useEffect(()=>{ 
      const query= new URLSearchParams(location.search);
      if(match.path === "/movie"){
        if(query.get("search")){
          setSearchTerm(query.get("search"))
        }
        else{
          history.push('/404')
        }
      }
       
  } ,
  [location,match, history])
   

    return (
      <Layout>
          {error  && <Error message={error}/>}
          {isLoading && <Spinner/>} 
          {movies && !isLoading && !error && <MoviesList movies={movies} hasMore={hasMore} searchTerm={searchTerm}/>}
        
      </Layout>
    )
}
  