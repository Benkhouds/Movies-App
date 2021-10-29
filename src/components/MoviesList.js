
import MovieItem from './MovieItem'
import {useState,useRef,useEffect, useCallback} from 'react'
import useFetchMore from '../hooks/useFetchMore'
import ErrorMessage from './UI/Error'
import {v4 as uuid} from 'uuid';
import Spinner from './UI/Spinner'

export default  function MoviesList({movies, hasMore, searchTerm}){
    
    const [pageNumber , setPageNumber ] = useState(1);

    const {loading , error , list , hasMore : stillHasMore  } =  useFetchMore(searchTerm,pageNumber);

    const observer = useRef()
    useEffect(()=>{
        console.log(movies)

    },[movies])

    const observerCallback = useCallback(([entry], obs)=>{
        
        if(entry.isIntersecting){
            if(!loading && ((pageNumber === 1 && hasMore) || (pageNumber > 1 && stillHasMore))){
                obs.disconnect();
                setPageNumber((prev)=>(prev + 1))      
            }
        } 
    },[stillHasMore, setPageNumber, pageNumber, hasMore, loading])

     const lastMovieObserver = useCallback((node)=>{   
            if(loading) return ;
            if(observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(observerCallback);
            if(node){
              observer.current.observe(node); 
            }
       
     },[observerCallback, loading]);

    useEffect(()=>{console.log(loading)
    },[list,loading])
    return(
        <>
            <div className="w-full px-16 grid grid-cols-4 gap-6 pb-4">
                {movies.map((movie, i)=>{
                    if(pageNumber === 1 && i === movies.length - 1 ){
                        return  <MovieItem key={uuid()} data={movie} ref={lastMovieObserver}/>
                    }
                     return <MovieItem key={uuid()} data={movie}/>
                })}
                {!loading && pageNumber > 1 && list.map((movie, i)=>{
                    if(i=== list.length - 1){
                        return  <MovieItem key={uuid()} data={movie} ref={lastMovieObserver}/>
                    }
                     return <MovieItem key={uuid()} data={movie}/>
                })}
               
            </div>
            {loading && 
                <div className="h-48">
                    <Spinner/>
                </div>
            }
            {error && <ErrorMessage message={error}/>}
           

        </>
    )


}