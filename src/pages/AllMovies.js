import { useState,useEffect} from 'react'
import MoviesList from '../components/MoviesList'
import Layout from '../components/layout/Layout'
import Error from '../components/UI/Error'
import Spinner from '../components/UI/Spinner'
import useFetch from '../hooks/useFetch'



export default function AllMovies({location,match, history}){
    
  const [searchTerm , setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1);
  const {movies, error , isLoading ,hasMore} = useFetch(searchTerm , pageNumber)
  console.log(hasMore)
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
          {isLoading && pageNumber===1 && <Spinner/>} 
          {movies && !error && <MoviesList movies={movies} hasMore={hasMore} setPageNumber={setPageNumber} />}
        
      </Layout>
    )
}
  