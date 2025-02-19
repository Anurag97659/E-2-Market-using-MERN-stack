import React,{useEffect,useState} from"react";
import{Link} from"react-router-dom";

function Profile(){
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState("");
    const[fullname,setFullname]=useState("");
    const[address,setAddress]=useState("");

    useEffect(()=>{
        fetch("http://localhost:8000/e-2market/v1/users/getProfile",{
            method:"GET",
            credentials:"include",
        })
            .then((res)=>{
                if (res.status === 401){
                    alert("Session expired. Please login again.");
                    window.location.href ="/login";
                }
                return res.json();
            })
            .then((data)=>{
                setUsername(String(data.data.username).toUpperCase());
                setEmail(String(data.data.email));
                setPhone(String(data.data.phone));
                setFullname(String(data.data.fullname));
                setAddress(String(data.data.address));
                
            })
            .catch((error)=>{
                console.error("Error fetching user details:", error);
            });
    }, []);
  
    const logout=()=>{
        fetch("http://localhost:8000/e-2market/v1/users/logout",{
            method:"POST",
            credentials:"include",
        })
            .then((res)=>{
                if (res.status === 200){
                    alert("Logged out successfully");
                    window.location.href ="/login";
                } else{
                    alert("Logout failed. Please try again.");
                }
            })
            .catch((error)=>{
                console.error("Error logging out:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 h-screen fixed bg-white shadow-lg p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile</h2>
                    <div className="space-y-4">
                        <Link to="/dash"className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Dashboard</Link>
                        <Link to="/search"className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Search ⫍‍⌕‍⫎ </Link>
                        <Link to="/mycart"className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">My cart 🛒 </Link>
                        <Link to="/Change-details" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Change Details</Link>
                        <Link to="/Change-password" className="block text-gray-700 font-medium py-3 px-4 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">Change Password</Link>
                    </div>
                </div>
                <button onClick={logout} className="mt-60 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition">Logout</button>
            </div>

            <div className="ml-64 p-6 w-full">
                <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Profile Details</h2>
                    <div className="space-y-4">
                        <div>
                            <h2 className="block text-sm font-medium text-gray-700">Fullname :{fullname} </h2>                            
                        </div>
                        <div>
                            <h2 className="block text-sm font-medium text-gray-700">Username :{username} </h2>
                        </div>
                        <div>
                            <h2 className="block text-sm font-medium text-gray-700">Email :{email} </h2>
                        </div>
                        <div>
                            <h2 className="block text-sm font-medium text-gray-700">Phone :{phone} </h2>
                        </div>
                        <div>
                            <h2 className="block text-sm font-medium text-gray-700">Address :{address} </h2>
                        </div>                        
                    </div>
                </div>
            </div>        
        
                
        </div>
    );
}

export default Profile;
