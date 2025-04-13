import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        // console.log(response.data.products);
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table -------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* ---------- Product List -----------*/}
        {
          list.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-b">
              <img className="w-12" src={item.image[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <button onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</button>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;
