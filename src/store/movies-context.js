import {createContext, useState, useEffect} from 'react'
import axios from 'axios'
const MoviesContext = createContext()

const baseURL = "https://api.themoviedb.org/3"

export  function MoviesContextProvider({children}) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error , setError] = useState("");
    const [searchTerm , setSearchTerm] = useState("");
    const [reset, setReset] = useState(false);


    //triggers whenever the searchTerm updates
    useEffect(()=>{
        if(searchTerm){
            handleSearch(searchTerm)
        }
    },[searchTerm])  

    //triggers only when the application first loads or refreshes  
    useEffect(()=>{
        fetchTrending(); 
    },[reset])

    //fetching the trending movies
    async function fetchTrending(){     
        const res = await axios.get(`${baseURL}/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
        try{
            setIsLoading(false);
            if(res.status !== 200){
                setError('error fetching data')
            }
            else{
                console.log(res)
                setMovies(res.data.results)
            }              
        } 
        catch(err){
            setError('error fetching data')
        }   
    }

    //updating the movies state with the searched data 
    async function handleSearch(term){
        setIsLoading(true);
        setError("");
        const res =await axios.get(`${baseURL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}&page=1`)
        try{    
            setIsLoading(false)
            if(res.status !== 200){
                setError(res.statusText)
                return Error(res.statusText)
            }
            else{
                const results = res.data.results
                console.log(results)
                results.length ? setMovies(results) : setError('No results found');
            }       
        }
        catch(err){
            console.log(err)
            setError("error fetching data");
            setIsLoading(false);
        }
    }
            
    const context = {
        movies,
        error,
        isLoading,
        setSearchTerm,
        setReset
    }

    return (
        <MoviesContext.Provider value={context}>
           {children}
        </MoviesContext.Provider>
        
    )
}
export default MoviesContext;