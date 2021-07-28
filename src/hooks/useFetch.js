import {useEffect,useState} from 'react'
import axios from 'axios'
export default function useFetch(url){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(()=>{
        axios.get(url)
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
 
    },[url])
    
    return {data, isLoading,error}
}