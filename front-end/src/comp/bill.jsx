import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Bill() {
  const [username, setUsername] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });

  useEffect(() => {
    fetch("http://localhost:8000/e-2market/v1/users/getUsername", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((data) => {
        setUsername(String(data.data.username).toUpperCase());
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
      }, []);

  useEffect(() => {
    fetch("http://localhost:8000/e-2market/v1/users/getusercartlist", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data = ", data);
        setCartItems(data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const logout = () => {
    fetch("http://localhost:8000/e-2market/v1/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Logged out successfully");
          window.location.href = "/login";
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const deleteuser = () => {
    alert("Are you sure you want to delete your account?");
    fetch("http://localhost:8000/e-2market/v1/users/delete", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          alert("User deleted successfully");
          window.location.href = "/login";
        } else {
          alert("User deletion failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handlePayment = ()=>{
    alert(`Payment method: ${paymentMethod} selected. Proceeding to payment...`);
    fetch("http://localhost:8000/e-2market/v1/users/addtoOrder",{
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
  })
  .then((res) => res.json())
  .then((data) =>{
      alert(data.message || "Order placed successfully!");
  })
  .catch((error) =>{
      console.error("Error placing order:", error);
      alert("Something went wrong");
  });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 h-screen fixed bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">PAYMENT</h2>
          <div className="space-y-4">
            <Link to="/profile" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Profile</Link>
            <Link to="/search" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Search ⫍‍⌕‍⫎</Link>
            <Link to="/mycart" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">My cart 🛒</Link>
            <Link to="/orders" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Orders</Link>
            <Link to="/Change-details" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Change Details</Link>
            <Link to="/Change-password" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Change Password</Link>
          </div>
        </div>
        <button onClick={logout} className="mt-60 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition">Logout</button>
        <button onClick={deleteuser} className="mt-1 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition">Delete account</button>
      </div>

     
      <div className="flex-1 p-8 ml-64">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {username}</h2>
        </div>

        
        <div className="w-full max-w-5xl my-4 mx-auto bg-white rounded-lg shadow-lg p-6 text-center flex justify-between">
          <h4 className="font-semibold text-gray-800">Total Items: {cartItems.length}</h4>
          <h4 className="font-semibold text-gray-800">Amount: ₹ {cartItems.reduce((acc, item) => acc + item.Price, 0)}</h4>
        </div>

        
        <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="upi" 
                    checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
              <span>UPI</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="card" 
                    checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
              <span>Credit/Debit Card</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="emi" 
                    checked={paymentMethod === "emi"} onChange={() => setPaymentMethod("emi")} />
              <span>EMI</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" value="cod" 
                        checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          
          <div className="mt-4">
            {paymentMethod === "upi" && (
              <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border rounded" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            )}
            {paymentMethod === "card" && (
              <div className="space-y-2">
                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                <input type="text" placeholder="Expiry (MM/YY)" className="w-full p-2 border rounded" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
              </div>
            )}
          </div>

          <button onClick={handlePayment} className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Bill;
