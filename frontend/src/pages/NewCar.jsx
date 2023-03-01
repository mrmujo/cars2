import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";

const NewCar = () => {
  const emptyCar = {
    "brand": "",
    "make": "",
    "year": null,
    "cm3": null,
    "price": null,
    "km": null,
  };
  const inputs = [
    { label: "Brand", placeholder: "Brand", type: "text", name: "brand" },
    { label: "Make", placeholder: "Make", type: "text", name: "make" },
    { label: "Year", placeholder: "Year", type: "number", name: "year" },
    { label: "Cubic centimeters", placeholder: "Cubic centimeters", type: "number", name: "cm3" },
    { label: "Price", placeholder: "Price", type: "number", name: "price" },
    { label: "Kilometers", placeholder: "Kilometers", type: "number", name: "km" },
  ];
  const [newCar, setNewCar] = useState(emptyCar);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addCar(newCar);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleReset = (e) => {
    setErrors([]);
    setNewCar(emptyCar);
  };

  const addCar = async (newCar) => {
    const response = await fetch("http://localhost:8000/cars/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    });
    if (response.ok) {
      setErrors([]);
      navigate("/cars");
    } else {
      console.log(response);
      const data = await response.json();
      console.log(data);
      let errors = data.detail.map((el) => {
        return `${el.loc[1]} -${el.msg}`;
      });
      console.log(errors);
      setErrors(errors);
    }
  };

  return (
    <Layout> 
      <div><h1 className="flex justify-center text-white font-mono">Insert a new Car</h1></div>
      <div className="flex justify-center text-white">New car status: {JSON.stringify(newCar)}</div>
      {errors && <ul className="mx-8 bg-red-500">
        {errors && errors.map((el, index) => ( <li className="text-white" key={index}>{el}</li> ))}
      </ul>}
      <div className="text-white mx-8">
        <form onSubmit={handleSubmit} className="text-black grid grid-cols-3">
          {inputs.map((input) => (
            <div className="space-y-2 mx-8 my-8">
            <FormInput
              key={input.id || input.name}
              name={input.name}
              label={input.label}
              {...input}
              value={newCar[input.name]}
              onChange={onChange}
              required
            />
            </div>
          ))}
          <div className="flex">
            <div className="flex-initial w-32 space-x-2 space-y-2 my-8">
              <button type="submit" onClick={handleSubmit} className="inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Insert</button>
            </div>
            <div className="flex-1 space-x-2 space-y-2 my-8">
              <button type="reset" onClick={handleReset} className="inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </Layout> 
  );
}

export default NewCar
