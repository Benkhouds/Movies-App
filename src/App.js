
import {Switch, Route} from 'react-router-dom'

import AllMovies from './pages/AllMovies'
import MovieDetails from './pages/MovieDetails'
function App() { 
 
  return (
     <Switch>
        <Route path="/" component={AllMovies} exact/>
       { <Route path="/movie" component={AllMovies} />}
        <Route path="/id/:id" component={MovieDetails} exact/>
        
      </Switch>
    
   );
   
}

export default App;

