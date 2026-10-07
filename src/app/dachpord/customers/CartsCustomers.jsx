
const CartsCustomers = ({label , value}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

export default CartsCustomers
