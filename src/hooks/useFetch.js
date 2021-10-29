
import {useEffect , useReducer} from 'react'
import axios from 'axios'

const baseURL = "https://api.themoviedb.org/3";
const apiKey =process.env.REACT_APP_API_KEY;
const initialState={isLoading:true , error:'', movies:[],hasMore:false }

function reducer(state, action){
    switch(action.type){
        case 'reset':{
            return {isLoading:true , error:'', movies:[], hasMore:false};
        }
        case 'loading':{
            return {...state, isLoading:true , error:''}
        }
        case 'error':{
            return{ movies:[], hasMore:false , isLoading:false, error:action.setError}
        }
        case 'data':{
            return {isLoading:false, error:"", movies: [...state.movies , ...action.setMovies], hasMore:action.setHasMore}
        }
        default:{
            console.log("action is not supported");
            break; 
        }
    }
}


export default function useFetch(searchTerm, pageNumber) {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    //triggers every time the search term changes
    useEffect(()=>{
        dispatch({type:'reset'});
    },[searchTerm])
    
    //triggers whenever the searchTerm or the pageNumber changes
    useEffect(()=>{
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source()
        if(searchTerm.length) handleSearch(searchTerm, pageNumber, source.token)
        return ()=>source.cancel();
    },[searchTerm, pageNumber])  
    
    //updating the movies state with the searched data 
    async function handleSearch(q,page, cancelToken){
        dispatch({type:'loading'})
        const searchUrl = `search/movie?api_key=${apiKey}&language=en-US&query=${q}&page=${page}`
        try{    
            const res =await axios.get(`${baseURL}/${searchUrl}`,{cancelToken})
            if(res.status !== 200){
                dispatch({type:'error', setError:res.statusText})
                return Error(res.statusText)
            }
            else{
                const hasMore =  res.data.total_pages > page ;
                const results = res.data.results
                console.log(res.data)
                //has more
                results.length ? 
                dispatch({type:'data', setMovies:results, setHasMore:hasMore})  
                    : 
                dispatch({type:'error', setError:`No results found for "${q}"`});
            }       
        }
        catch(err){
            if(axios.isCancel(err)) return 
            dispatch({type:'error', setError:"error fetching data"})
        }
    }

    //triggers only when the application first loads or refreshes and the search term is empty 
    useEffect(()=>{
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source()
        if(!searchTerm){
            fetchTrending(source.token, pageNumber); 
        }
        return ()=>source.cancel();
    },[searchTerm, pageNumber])

    //fetching the trending movies
    async function fetchTrending(cancelToken, page){    
        dispatch({type:'loading'})
        const trendingUrl = `trending/movie/week?api_key=${apiKey}&language=en-US&page=${page}`;
        try{
            const res = await axios.get(`${baseURL}/${trendingUrl}`,{ cancelToken})
            if(res.status !== 200){
                dispatch({type:'error', setError: 'error fetching data'})
            }
            else{
                const hasMore =  res.data.total_pages > page ;
                console.log(hasMore)
                dispatch({type:'data', setMovies: res.data.results, setHasMore:hasMore})
            }              
        } 
        catch(err){
            if(axios.isCancel(err)) return 
            dispatch({type:'error', setError: 'error fetching data'})
        }   
    }

            
    return state; 
}
