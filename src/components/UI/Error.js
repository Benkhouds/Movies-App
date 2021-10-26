

export default function Error({message}) {
 return (
  <div className="bg-gray-600 capitalize py-2 px-4 rounded w-max mx-auto text-white bg-opacity-40 backdrop-filter backdrop-blur">
     <p>{message}</p>
  </div>
 )
}
