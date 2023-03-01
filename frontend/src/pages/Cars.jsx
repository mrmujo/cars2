import Layout from "../components/Layout.jsx";
import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";

const Cars = () => {
  const [cars, setCars] = useState([])
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/cars?min_price=${minPrice}&max_price=${maxPrice}&brand=${brand}`)
      .then(response => response.json())
      .then(json => setCars(json))
    setIsPending(false)
  }, [minPrice, maxPrice, brand])

  const handleChangeBrand = (event) => {
    setCars([])
    setBrand(event.target.value)
    setIsPending(true)
  }

  const handleChangeMinPrice = (event) => {
    setCars([])
    setMinPrice(event.target.value)
    setIsPending(true)
  }

  const handleChangeMaxPrice = (event) => {
    setCars([])
    setMaxPrice(event.target.value)
    setIsPending(true)
  }

  return(
    <Layout> 
      <h2 className="text-white text-lg text-center my-4 uppercase">{brand ? brand : "all brands"}</h2>
      <div className="mx-8">
        <label className="text-white" htmlFor="cars">Choose a brand: </label>
        <select name="car" id="cars" onChange={handleChangeBrand}>
           <option value="">All cars</option> 
           <option value="Fiat">Fiat</option> 
           <option value="bbb">bbb</option> 
        </select>
        <label className="text-white" htmlFor="minPrice">Min price: </label>
        <input type="number" id="minPrice" name="minPrice" onChange={handleChangeMinPrice} defaultValue={minPrice} />
        <label className="text-white" htmlFor="maxPrice">Max price: </label>
        <input type="number" id="maxPrice" name="maxPrice" onChange={handleChangeMaxPrice} defaultValue={maxPrice} />
      </div>
      <div className="mx-8">
        {isPending && <div className="text-white"><h2>Loading cars, brand: {brand}...</h2></div>}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cars && cars.map(
            (el)=>{
              return (<Card key={el._id} car={el} />)
            }
          )}
        </div>
      </div>
    </Layout> 
  )
}

export default Cars
