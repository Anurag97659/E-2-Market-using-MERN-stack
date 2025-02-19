import React,{useState} from "react";

function ChangeDetails(){
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const[fullname,setFullname]=useState("");
  const[phone,setPhone]=useState("");
  const[address,setAddress]=useState("");

  const submit=(e)=>{
    e.preventDefault();

    try{
      fetch('http://localhost:8000/e-2market/v1/users/updateDetails',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,email,fullname,phone,address}),
        credentials: 'include',
      })
        .then((res)=>res.json())
        .then((data) =>{
          if (data.error){
            alert(data.error);
          } else {
            alert('Details changed successfully');
            window.location.href='/login';
          }
        })
        .catch((error) =>{
          alert("Details change failed: " + error.message);
        });
    }catch (error){
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Details
        </h2>
        <form onSubmit={submit} id="form" className="space-y-4">
          <div>
            <label
              htmlFor="uname"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="uname"
              placeholder="Enter Username"
              name="uname"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter Full Name"
              name="fullname"
              value={fullname}
              onChange={(e)=>setFullname(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              name="address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeDetails;
