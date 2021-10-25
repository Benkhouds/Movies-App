import { useContext,useEffect} from 'react'
import MoviesList from '../components/MoviesList'
import Layout from '../components/layout/Layout'
import Spinner from '../components/UI/Spinner'
import MoviesContext from '../store/movies-context'



export default function AllMovies({location,match, history}){
    

  const {movies, error , isLoading , setSearchTerm} = useContext(MoviesContext)
 
  useEffect(()=>{ 
     
      const query= new URLSearchParams(location.search);
      console.log(query.get("search"))
      if(match.path === "/movie"){
        if(query.get("search")){
          setSearchTerm(query.get("search"))
        }
        else{
          history.push('/404')
        }
      }
       
  } ,
  [movies,location,match, history, setSearchTerm])
   

    return (
      <Layout>
          {error  && <div>{error}</div>}
          {isLoading && <Spinner/>} 
          {movies && !error && !isLoading && <MoviesList movies={movies}/>}
        
      </Layout>
    )
}
  