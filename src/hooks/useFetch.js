import {useEffect,useState} from 'react'
import axios from 'axios'
export default function useFetch(term){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(()=>{
        if(term){
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}&page=1`)
             .then((res)=>{
               
                   if(res.status !== 200){
                       setError(res.statusText)
                       throw Error(res.statusText)
                   }
                   else{
                        setData(res.data.results)
                        setIsLoading(false)
                   }        
                   
             })
             .catch((err)=>console.log(err))
        }
    },[term])
    
    return {data, isLoading,error}
}