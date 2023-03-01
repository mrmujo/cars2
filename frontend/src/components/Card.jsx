import { Link } from 'react-router-dom'

const Card = ({car}) => {
  let {brand, price, make, year, km, cm3, _id} = car

  return (
    <Link to={`/cars/${_id}`}>
     <div className="shadow-md p-5 flex flex-col bg-gray-700 text-white rounded-lg transition ease-in-out hover:scale-105 duration-300 font-mono">
        <div className="font-bold text-center text-lg text-FarmNavy"><span className="text-FarmLime">{brand}</span> {make}</div>
        <div>Year: {year}</div> 
        <div>Price: <span className="font-semibold text-orange-600">{price}</span></div>
        <div>Engine: {cm3}cm3</div>
      </div>
    </Link>
  )
}

export default Card
