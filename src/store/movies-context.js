import {createContext, useState, useEffect} from 'react'
import axios from 'axios'
const MoviesContext = createContext()

export  function MoviesContextProvider({children}) {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        console.log("in")
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
             .then((res)=>{     
                   if(res.status !== 200){
                       return new Error(res.statusText)
                   }
                   else{
                        console.log(res)
                        setMovies(()=>res.data.results)
                   }        
                   
             })
             .catch((err)=>console.log(err))
 
    },[])

    return (
        <MoviesContext.Provider value={movies}>
           {children}
        </MoviesContext.Provider>
        
    )
}
export default MoviesContext;