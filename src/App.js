
import {Switch, Route} from 'react-router-dom'
import AllMovies from './pages/AllMovies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'

function App() { 
   
  return (
         <Switch>
            <Route key="home" path="/" component={AllMovies} exact/>
            <Route key="search" path="/movie" component={AllMovies} exact/>
            <Route path="/id/:id" component={MovieDetails} exact/> 
            <Route path="*" component={NotFound} />

         </Switch>

   ); 
}

export default App;

