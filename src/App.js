
import {Switch, Route} from 'react-router-dom'
import AllMovies from './pages/AllMovies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'
import {MoviesContextProvider} from './store/movies-context'

function App() { 

  return (
     <MoviesContextProvider>
         <Switch>
            <Route key="home" path="/" component={AllMovies} exact/>
            <Route key="search" path="/movie" component={AllMovies} exact/>
            <Route path="/id/:id" component={MovieDetails} exact/> 
            <Route path="*" component={NotFound} />

         </Switch>
     </MoviesContextProvider>   
   ); 
}

export default App;

