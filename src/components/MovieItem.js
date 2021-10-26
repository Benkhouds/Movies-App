
import {Link} from 'react-router-dom'
import {useRef} from 'react'
import placeholderImage from '../images/placeholder.jpg'

export default function MovieItem(props){
    const placeholderRef = useRef();
    const id = props.data.id
    const poster_path = props.data.poster_path
    const baseUrl ='https://image.tmdb.org/t/p/w500'
    let ratingColor = "text-green-500";
    if(props.data.vote_average<5){
      ratingColor = "text-red-700"
    }
    else if(props.data.vote_average <7){
      ratingColor = "text-yellow-400"
    }
    function showImage(e){
      if(e.target.src === window.location.origin+ placeholderImage){
         e.target.className+= " filter blur-sm";
      }
      e.target.classList.remove('hidden')
      placeholderRef.current.classList.add('hidden');
      
    }
    function imageErrorHandler(e){
       e.target.setAttribute('src', placeholderImage);
    }
    return(
        <div key={props.data.id} className="group overflow-hidden relative">
          <img className="hidden" src={poster_path ? `${baseUrl}${poster_path}`: placeholderImage} 
              style={{aspectRatio:2/3}} 
              alt={props.data.title} 
              onLoad={showImage} 
              onError={imageErrorHandler}
          />
          <div className="bg-gray-800 filter blur relative" style={{aspectRatio:"2/3"}} ref={placeholderRef}>
            <div className="activity"></div>
          </div>
          
          <div className="absolute bg-gray-900 transform translate-y-full 
                    group-hover:translate-y-0 transition-transform text-white 
                    duration-300
                    w-full p-4 bg-opacity-70 bottom-0 z-20"
          >
            <div className="flex justify-between">
                <h1 className="font-semibold">{props.data.title}</h1>
                <span className={ratingColor+" font-bold"}>{props.data.vote_average}</span>
            </div> 
            <Link to={{ pathname: `/id/${id}`}}
                  className="theme-color px-4 py-2 rounded block w-max mt-4"
            >
              Watch The Trailer
            </Link>
          </div>
          
        </div>
    )
}