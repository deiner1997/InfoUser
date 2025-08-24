import React from 'react';
import spinner from "../assets/Spinner.gif"

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 rounded">
        <img src={spinner} alt="Loading" />
        <h3 className="text-center">"LOADING...."</h3>
      </div>
    </div>
  )
}

export default Spinner