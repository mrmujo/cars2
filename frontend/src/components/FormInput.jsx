const FormInput = (props) => {
  const { label, placeholder, type, onChange, name } = props
  return (
    <div className="flex flex-col">
      <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type={type} id={name} name={name} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default FormInput
