
import SearchBar from '../SearchBar'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import MoviesContext from '../../store/movies-context'
export default function Navbar() {

 const {setReset} = useContext(MoviesContext)
 function handleClick(){
     setReset((prevState)=>!prevState);
 }
 return (
    <nav className="flex flex-col md:flex-row justify-between py-6 px-12 items-center mb-4 lg:mb-8">
        <Link to="/" onClick={handleClick}>
            <img className="block w-40 " src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="logo"/>
        </Link>
        <SearchBar/>
    </nav>
 )
}
