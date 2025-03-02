import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title";

const Orders = () => {

  const {products, currency} = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          products.slice(0,4).map((product, index)=>(
            <div key={index} className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />
                <div>
                <p className="sm:text-base font-medium">{product.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">{currency}{product.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                  </div>
                
                <p className="mt-2">Date: <span className="text-gray-400">3, March, 2025</span></p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Orders