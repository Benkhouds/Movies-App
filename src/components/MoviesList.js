
import MovieItem from './MovieItem'

export default function MoviesList(props){
   
   
    return(
        <div className="movies-wrapper">
            {props.movies.map((movie)=>(
                <MovieItem key={movie.id} data={movie}/>
            ))}
        </div>
    )


}