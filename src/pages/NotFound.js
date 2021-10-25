
import Navbar from '../components/layout/Navbar'

export default function NotFound() {
    return (
        <>
            <Navbar additionalClasses={"relative z-30"}/>
          
            <div className="z-20 absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-gray-100  w-max px-16 py-6 rounded-md ">
                <p className="text-gray-800 text-center font-bold text-xl">Page Not Found | 404</p>
            </div>
        </>
    )
}
