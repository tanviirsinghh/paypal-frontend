import { useState } from "react";
import {  useNavigate } from "react-router-dom"

export default  function CustomInput() {
    const navigate =useNavigate();
    const search = (e) => {
        navigate("?q=" + e)

    }
    const[inputValue, setInputValue] = useState("")

        const handleChange= (e)=>{
          const lowercase = e.target.value;
          setInputValue(lowercase)
        }
    
    return (
        <input
            type="text"
            className="form-control search-input px-5 rounded-3"
            placeholder="🔎 Search Your friends & opponents"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={inputValue}
            onChange={handleChange}
            onKeyUp={(e) => search(e.target.value)}
        />
    )
}