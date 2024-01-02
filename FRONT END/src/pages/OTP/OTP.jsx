import React, { useState, useRef } from "react";
import "./OTP.css";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function OTP() {
  const user = useSelector(auth);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const usenavigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    } else {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    } else if (index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }
  };

  const handleSubmit = (e) => {
    let OTP = otp.join("");
    console.log(OTP);
    e.preventDefault();
    axios
      .post(
        "/user/verifyotp",
        { OTP, user },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        usenavigate("/login");
        // console.log(response.data.message);
        // console.log(response.status);
        // if (response.data.message == 2000) {
        // } else if (response.data.message == 3000) {
        //   console.log("in if");
        //   usenavigate("/chef/login", { replace: true });
        // }
      })
      .catch((error) => {
        if (error.response) {
          // showToast(error.response.data.message);
        } else if (error.request) {
          // showToast(error.message);
        } else {
          // showToast(error.message);
        }
      });
  };

  return (
    <div className="otp-container">
      <h1>Enter OTP</h1>
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="otp-digit"
            ref={inputRefs[index]}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}

export default OTP;
