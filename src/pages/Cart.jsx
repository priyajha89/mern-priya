import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/Api";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.product._id} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.description}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.product.price}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">
                  Qty: {item.quantity}
                </span>
                <span className="text-lg font-bold">
                  ₹{item.product.price * item.quantity}
                </span>
                <Button
                  onClick={() => removeFromCart(item.product._id)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total: ₹{calculateTotal()}</span>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
