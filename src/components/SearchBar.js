import {useRef} from 'react'
import {useHistory} from 'react-router-dom'

export default function SearchBar(){
    const history = useHistory()
     const input= useRef()
     const form = useRef()
     const submitHandler = (e)=>{
         e.preventDefault()       
        history.push(`/movie/?search=${input.current.value}`)
        form.current.reset()
     }
     return(
         <div className="bg-current">
            <form className="bg-gray-900" onSubmit={submitHandler} ref={form}>
                <input className="m-4 w-72 bg-gray-800 text-gray-200 px-4 py-2 outline-none rounded-lg  focus:ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-900 " type="text" placeholder="search" ref={input}/>
            </form>
         </div>
     )
}