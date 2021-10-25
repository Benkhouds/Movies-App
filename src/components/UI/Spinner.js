import spinner from '../../images/spinner.gif'
export default function Spinner() {
    return (
        <img className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2" src={spinner} alt="spinner" />
    )
}
