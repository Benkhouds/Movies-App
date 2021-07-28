import {useRef} from 'react'
import {useHistory} from 'react-router-dom'
export default function SearchBar(props){
     const history = useHistory()
     const input= useRef()
     const form = useRef()
     const submitHandler = (e)=>{
         e.preventDefault()
         history.push(`/movie/?search=${input.current.value}`)
         form.current.reset()
     }
     return(
        <form onSubmit={submitHandler} ref={form}>
            <input type="text" placeholder="search" ref={input}/>
        </form>
     )
}