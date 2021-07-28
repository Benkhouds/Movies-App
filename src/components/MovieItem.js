
import {Link} from 'react-router-dom'

export default function MovieItem(props){
    
    const id = props.data.id
    const poster_path = props.data.poster_path
    const baseUrl ='https://image.tmdb.org/t/p/w500'
    return(
        <div key={props.data.id}>
          <img src={poster_path ? `${baseUrl}${poster_path}`: '../cine.jpg'} alt={props.data.title} />
          <h1>{props.data.title}</h1>
          <span>{props.data.vote_average}</span>
          <Link to={{
            pathname: `/id/${id}`
          }}>Trailer</Link>
          
        </div>
    )
}