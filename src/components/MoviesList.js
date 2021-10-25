
import MovieItem from './MovieItem'

export default function MoviesList(props){
   
   
    return(
        <div className="w-full px-16 grid grid-cols-4 gap-6">
            {props.movies.map((movie)=>(
                <MovieItem key={movie.id} data={movie}/>
            ))}
        </div>
    )


}