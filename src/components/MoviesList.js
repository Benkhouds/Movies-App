
import MovieItem from './MovieItem'
import {useState,useRef,useEffect, useCallback} from 'react'
import ErrorMessage from './UI/Error'
export default function MoviesList({movies, hasMore, setPageNumber}){

    const [loadStatus , setLoadStatus] = useState('');
    const observer = useRef()

    useEffect(()=>{
        if(movies.length){
            setLoadStatus('loading')
        } else{

            setLoadStatus('')
        }
    },[movies, hasMore])
    const observerCallback = useCallback(([entry])=>{
        if(entry.isIntersecting){
            if(hasMore){
                console.log('in')
                setPageNumber((prev)=>prev + 1)
            }else{
                setLoadStatus('No more Data')
            }
        } 
    },[hasMore, setPageNumber])

     const lastMovieObserver = useCallback((node)=>{      
            if(observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(observerCallback,{threshold : 1 , rootMargin:'-60px'});
            if(node){
              observer.current.observe(node); 
            }
       
     },[observerCallback]);


    return(
        <>
            <div className="w-full px-16 grid grid-cols-4 gap-6">
                {movies.map((movie, i)=>{
                    if(i === movies.length -1) return <MovieItem ref={lastMovieObserver} key={movie.id} data={movie}/>
                    return <MovieItem key={movie.id} data={movie}/>
                })}
            </div>
            <div className="my-8 ">
                {loadStatus ? <ErrorMessage message={loadStatus}/> :'' }
            </div>

        </>
    )


}