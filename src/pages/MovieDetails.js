
import {  useEffect, useReducer , useRef} from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/UI/Spinner'
import ErrorElement from '../components/UI/Error'
import Layout from '../components/layout/Layout'



const baseURL = "https://api.themoviedb.org/3";


/* Reducer for Handling state */
function reducer(state, action){
    switch(action.type){
        case 'movieData':{
            return {...state ,
                     isLoading: false,
                     error:'', 
                     synopsis :action.setSynopsis,
                     title:action.setTitle,
                     videoKey : action.setVideoKey, 
                    }
        }
        case 'initialize':{
            return {...state, isLoading:true , error:''}
        }
        case 'loadState':{
            return {...state, isLoading : action.setIsLoading }
        }
        case 'error':{
           return {...state, error: action.setError,isLoading: false}
        }
        default :{
            return {...state, isLoading:false, error : "no action found"}
        }

    }
}

/* Initial states that will be passed to the reducer  */
const initialState ={isLoading:true , error:'',synopsis:'', title:'', videoKey:'' }


/* React component */
export default function MovieDetails(){
    const placeholderRef = useRef();
    const {id} = useParams()  
    const [state, dispatch] = useReducer(reducer,initialState)
    //Destructuring the state
    const {isLoading, error , title , synopsis, videoKey} = state;

    useEffect(()=>{
        //initializing the loading state to false and error to empty string 
        //every time the id in the url changes 
        dispatch({type:'initialize'});

        //each fetch return a promise that we capture into the promises array
        const promises = [
                    fetch(`${baseURL}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
                    fetch(`${baseURL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
                ]
        //handling of multiple promises at the same time        
        Promise.all(promises)    
             .then(responses => Promise.all(responses.map(res => res.json())))
             .then((results)=>{
                //the results variable is an array of the data from both api endpoints
                //so the data from the first endpoint would be stored in results[0] 
                console.log(results); 
                const [movieTrailerResults, movieInfo ] = results;
                 if("success" in movieInfo && !movieInfo.success){
                     throw new Error(movieInfo.status_message);
                 }
                 //the movie trailer object has a results key which is an array of multiple providers
                 //of the movie trailer info  , we can simply choose the first one
                 //if there's no result we simply set an empty string to state
                 //so that even if we couldn't find a trailer for the movie we can still show the overview  
                 const movieTrailer =movieTrailerResults.results?.length ? movieTrailerResults.results[0] : {key:''};
                 
                //we check if the dataset is not empty before updating the state  
                //we set the loading state to false on both error and movieData action types
                if(!movieInfo.overview || !movieInfo.original_title ){
                     throw new Error("couldn't find related data");
                }else{
                    dispatch({
                            type:'movieData',
                            setTitle:  movieInfo.original_title,
                            setSynopsis : movieInfo.overview,
                            setVideoKey : movieTrailer.key
                    })
                }    
    
             })
             .catch((err)=>{           
                 dispatch({type:'error', setError:err.message ?? 'error fetching data'}); 
             })

    },[id])

    function showIFrame(e){
       e.target.classList.remove('hidden');
       placeholderRef.current.classList.add('hidden');

    }

    return(
        <Layout>
            {error && <ErrorElement message={error}/>}  
            {isLoading && <Spinner/>}
            {!error && !isLoading && 
                <main className="px-16 py-4">
                        <h1 className="title text-white text-3xl font-semibold mb-12">
                            {title}
                        </h1>
                        <div className="p-2 grid grid-cols-2 gap-8 items-start w-full h-96">
                            <div className="w-full h-full relative bg-gray-800 overflow-hidden">
                                <div className="activity" ref={placeholderRef}></div>
                                <iframe 
                                        onLoad={showIFrame}  
                                        className="hidden h-full w-full"
                                        src={`https://www.youtube.com/embed/${videoKey}`} 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                >
                                </iframe>

                            </div>
                            <div className="pl-4 pr-8 lg:w-3/4">
                                <h1 className="title font-semibold text-2xl mb-6 text-gray-200 text-opacity-90 ">Overview</h1>
                                <p className="text-white leading-relaxed tracking-wide ">
                                    {synopsis}
                                </p>

                            </div>

                        </div>
                </main>
            }          
        </Layout>
    )
}