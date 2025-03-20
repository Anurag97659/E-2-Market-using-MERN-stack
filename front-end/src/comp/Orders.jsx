import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders(){
    const [username, setUsername] = useState("");
    const [orderItems, setOrderItems] = useState([]); // Renamed cartItems to orderItems

    useEffect(() =>{
        fetch("http://localhost:8000/e-2market/v1/users/getUsername",{
            method: "GET",
            credentials: "include",
        })
            .then((res) =>{
                if (res.status === 401){
                    alert("Session expired. Please login again.");
                    window.location.href = "/login";
                }
                return res.json();
            })
            .then((data) =>{
                setUsername(String(data.data.username).toUpperCase());
            })
            .catch((error) =>{
                console.error("Error fetching user details:", error);
            });
    }, []);

    useEffect(() =>{
        fetch("http://localhost:8000/e-2market/v1/users/getorderlist",{
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data = ", data);
                setOrderItems(Array.isArray(data?.data?.orders) ? data.data.orders : []);
            })
            .catch((error) => {
                console.error("Error fetching order items:", error);
                setOrderItems([]); // Ensure it remains an array in case of error
            });
    }, []);
    

    const logout = () =>{
        fetch("http://localhost:8000/e-2market/v1/users/logout",{
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

    return(
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 h-screen fixed bg-white shadow-xl p-6 flex flex-col justify-between border-r">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-wide">
                        <span className="inline-block">Orders</span>
                    </h2>
                    <div className="space-y-3">
                        <Link to="/profile" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            Profile
                        </Link>
                        <Link to="/mycart" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            My cart 🛒
                        </Link>
                        <Link to="/dash" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            📊 Dashboard
                        </Link>
                        <Link to="/search" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            Search ⫍‍⌕‍⫎
                        </Link>
                        <Link to="/Change-details" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            ✏️ Change Details
                        </Link>
                        <Link to="/Change-password" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
                            🔑 Change Password
                        </Link>
                    </div>
                </div>
                <button onClick={logout} className="w-full bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all font-semibold text-lg">
                    🚪 Logout
                </button>
            </div>

            <div className="flex-1 p-8 ml-64">
                <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome, {username}
                    </h2>
                </div>

                <div className="w-full max-w-5xl my-4 mx-auto bg-white rounded-lg shadow-lg p-6 text-center flex justify-between flex-direction-row">
                    <h4 className="font-semibold text-left text-gray-800">
                        Total Items : {orderItems.length}
                    </h4>
                    <h4 className="font-semibold text-left text-gray-800">
                        Amount : ₹ {orderItems.length > 0 ? orderItems.reduce((acc, item) => acc + (item.Price || 0), 0) : 0}
                    </h4>

                </div>

                <div className="mt-8">
                    {orderItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {orderItems.map((product) => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <img src={product.Image} alt={product.Title} className="w-full h-32 object-cover rounded-lg" />
                                    <h3 className="text-xl font-bold text-gray-800 mt-2">{product.Title}</h3>
                                    <p className="text-gray-600">₹{product.Price}</p>
                                    <p className="text-gray-600 font-bold">On The Way</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-lg text-center mt-6">Your orders are empty</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;
