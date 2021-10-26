
import {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import Layout from '../components/layout/Layout'

const baseURL = "https://api.themoviedb.org/3";
export default function MovieDetails(){
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [synopsis , setSynopsis] = useState('')
    const [title, setTitle] = useState('') 
    const [error , setError] = useState('')
    const [videoKey, setVideoKey] = useState(null)
     
    useEffect(()=>{
        const promises = [
                    fetch(`${baseURL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
                    fetch(`${baseURL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
                ]
        Promise.all(promises)    
             .then((responses)=>{
                return Promise.all(
                     responses.map((res)=>{
                         if(!res.ok){
                            setError('error fetching data')
                         }
                         return res.json()
                     })
                 )     
             })
             .then((results)=>{
                 console.log(results[1])   
                 setIsLoading(false)
                 setTitle(results[1].original_title)
                if(!results[1]?.overview){
                    setError("couldn't find overview")
                }else{
                    setSynopsis(results[1].overview)
                }    
                if(!results[0]?.results[0]?.key){
                   setError('no trailer was found')
                }else{
                    setVideoKey(results[0].results[0].key)
                }
                
                   
                console.log(results)
             })
             .catch((err)=>{
                 setError('error fetching data');
                 setIsLoading(false);
             })

    },[id])
    function showIFrame(e){
       console.log(e)
    }
    return(
        <Layout>
            {error && <Error message={error}/>}  
            {isLoading && <Spinner/>}
            <main className="px-16 py-4">
                <div className="relative mb-12">
                    <h1 className="text-white text-3xl font-semibold ">
                        <span className="absolute block theme-color w-36 h-4 -bottom-1 -z-10"></span>
                        {title}
                    </h1>
                </div>
                {!error &&
                    <div className="p-2 grid grid-cols-2 gap-8 items-center">
                        <iframe 
                                onLoad={showIFrame}  
                                width="560" 
                                height="315" 
                                src={`https://www.youtube.com/embed/${videoKey}`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                        >
                        </iframe>
                        <p>
                            {synopsis}
                        </p>

                    </div>
                }
            </main>
        </Layout>
    )
}