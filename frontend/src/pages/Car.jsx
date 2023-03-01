import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";

const Car = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [price, setPrice] = useState(null)
  const [errors, setErrors] = useState(null)
  const [isPending, setIsPending] = useState(true);

  const onChange = (e) => {
    setPrice(e.target.value)
  }

  const getCar = async () => {
    const res = await fetch(`http://localhost:8000/cars/${id}`)

    if (!res.ok) {
      setErrors("Could not fetch the data for that resource")
    } else {
      const data = await res.json()
      setCar(data)
      setPrice(data.price)
    }

    setIsPending(false)
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8000/cars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000" 
      }
    })
    if (!res.ok) {
      let data = await res.json()
      let errors = data.detail.map(el => { return `${el.loc[1]}: ${el.msg}` })
      setErrors(errors)
    } else {
      setErrors([])
      navigate("/cars")
    }
  }

  const updatePrice = async () => {
    const res = await fetch(`http://localhost:8000/cars/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price })
    })

    const data = await res.json()
    if (!res.ok) {
      let errors = data.detail.map(el => { return `${el.loc[1]}: ${el.msg}` })
        setErrors(errors)
    } else {
      setErrors([])
      setCar(data)
    }
  }

  useEffect(() => {
    getCar()
  }, [])

  return (
    <Layout>
      {isPending && <div className="bg-red-500 w-full h-10 text-white text-lg">Loading car...</div>}
      {errors && <ul className="flex flex-col mx-auto text-center">
        {errors && errors.map((error, index) => {
          <li key={index} className="my-2 p-1 border-2 border-red-700 max-w-md mx-auto">{error}</li>
        })}
      </ul>}

      {car && <div>
        <div className="flex flex-col justify-between min-h-full items-center text-white">
          <div className="font-bold texl-xl text-gray-600 my-3">{car.brand} {car.make}</div>
          <div className="max-w-xl">
            <img src="https://via.placeholder.com/960x550.png?text=IMAGINE+A+CAR" alt="a car" />
          </div>
          <div className="flex flex-col items-center font-normal text-lg">
            <div>Price: <span className="font-semibold text-orange-600 text-xl">${car.price}</span></div>
            <div>Year: ${car.year}</div>
            <div>Km: ${car.km}</div>
          </div>

          <div className="flex flex-row">
            <FormInput label="change price"
              placeholder={price}
              type="number"
              value={price}
              onChange={onChange}
              required />
            <button className="bg-yellow-500 text-white px-3 p-2 rounded-md m-3 transition-opacity hover:opacity-80" onClick={updatePrice}>Update</button>
            <button className="bg-red-700 text-white px-3 p-2 rounded-md m-3 transition-opacity hover:opacity-80" onClick={handleDelete}>Delete</button>
          </div>
          <p>Warning: Deleting a car is permanent</p>
        </div>
      </div>}
    </Layout>
  )
}
export default Car
