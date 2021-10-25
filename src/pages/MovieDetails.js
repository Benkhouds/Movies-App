
import {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/UI/Spinner'
export default function MovieDetails(){
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error , setError] = useState('')
    const [videoKey, setVideoKey] = useState(null)
     
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
             .then((res)=>{
                 if(!res.ok){
                     throw Error(res.statusText)
                 }
                 return res.json()
             })
             .then(({results})=>{   
                 console.log(results)
                if(!results){
                   setError('no trailer was found')
                }     
                setVideoKey(results[0].key)
                setIsLoading(false)        
             })
             .catch((err)=>console.log(err))

    })
    return(
        <div>
            <h1>Trailer</h1>

            {error && <h3>{error}</h3>}  
            {!error && (isLoading ?<Spinner/> :<iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>) }
            
        </div>
    )
}