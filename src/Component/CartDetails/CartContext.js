import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(null);

export function CartContextProvider(props) {
  let baseUrl = "https://ecommerce.routemisr.com";

  let [cartData, setCartData] = useState();

  async function getAllCartData() {
    try {
      let headers = {
        token: localStorage.getItem("token"),
      };
      let { data } = await axios.get(`${baseUrl}/api/v1/cart`, { headers });
      setCartData(data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  }

  async function removeItem(id) {
    try {
      let headers = {
        token: localStorage.getItem("token"),
      };
      let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers });
      setCartData(data);
    } catch (error) {
      console.error("❌ Error removing item:", error);
    }
  }

  async function updateQuantity(id, count) {
    try {
      let body = { count };
      let headers = {
        token: localStorage.getItem("token"),
      };
      let { data } = await axios.put(`${baseUrl}/api/v1/cart/${id}`, body, { headers });
      setCartData(data);
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  }

  async function addToCart(productId) {
    try {
      let body = { productId };
      let headers = {
        token: localStorage.getItem("token"),
      };
      let { data } = await axios.post(`${baseUrl}/api/v1/cart`, body, { headers });
      if (data.status === "success") {
        await getAllCartData(); // تحديث البيانات بعد الإضافة
      }
      return data;
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      return error;
    }
  }

  return (
    <CartContext.Provider value={{ cartData, getAllCartData, removeItem, updateQuantity, addToCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
