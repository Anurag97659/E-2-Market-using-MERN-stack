import React,{useEffect,useState} from "react";
import{Link} from "react-router-dom";

function Bill(){
    return(
        <div>
            <h1>Bill</h1>
            <Link to="/mycart">Back to My Cart</Link>
        </div>
    );
}

export default Bill;
