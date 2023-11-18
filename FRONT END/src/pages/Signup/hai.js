import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {Link} from "react-router-dom"
import "./Signup.css"

function Signup() {
  const [values, setvalues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const [focused, setfocused] = useState({
    username: "false",
    email: "false",
    password: "false",
    confirmpassword: "false",
    phone:'false'
  });
  const [prevToastId, setPrevToastId] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/signup", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          showToast(error.response.data.message);
        } else if (error.request) {
          showToast(error.message);
        } else {
          showToast(error.message);
        }
      });
  };

  const handlechanges = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleblur = (e) => {
    setfocused({ ...focused, [e.target.name]: "true" });
  };

  const showToast = (message) => {
    if (prevToastId) {
      toast.dismiss(prevToastId);
    }

    const newToastId = toast.error(message, {
      duration: 3000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        width: "300px",
      },
    });
    setPrevToastId(newToastId);
  };

  return (
    <div className="Signup">
      <div className="hidden   sm:block">
      <div className="logo flex justify-center"><img src="data:image/png;base64,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" alt="" /></div>

      <img src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div>
  
    <form onSubmit={handlesubmit}>
      <Toaster />
      <h1 className="h1 underline" >SIGNUP</h1>
      <div className="input">
        <label htmlFor="" name="username">
          User Name
        </label>
        <input
        className="forminput"
          type="text"
          placeholder="Username"
          name="username"
          onBlur={handleblur}
          focused={focused.username}
          onChange={handlechanges}
          pattern="^[A-Za-z0-9]{3,16}$"
          required
        />
        <span>
          User name should be 3-16 charecters and shouldn't include any
          special charecter.!
        </span>
      </div>

      <div className="input">
        <label htmlFor="" name="email">
          Email
        </label>
        <input
          className="forminput"
          type="email"
          name="email"
          placeholder="Email"
          onBlur={handleblur}
          focused={focused.email}
          onChange={handlechanges}
          required
        />
        <span>it should be a valid email.</span>
      </div>

      <div className="input">
        <label htmlFor="" name="phone">
          Phone
        </label>
        <input
          className="forminput"
          type="text"
          name="phone"
          placeholder="Phone number"
          onChange={handlechanges}
          pattern="^[0-9]{10}$"
          focused={focused.phone}
          onBlur={handleblur}
          required
        />
        <span>it should be 10 numbers.</span>
      </div>

      <div className="input">
        <label htmlFor="" name="password">
          Password
        </label>
        <input
          className="forminput"
          type="password"
          name="password"
          placeholder="Password"
          onBlur={handleblur}
          focused={focused.password}
          onChange={handlechanges}
          pattern="^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$"
          required
        />
        <span>
          password should be 8-20 charecters and iclude at least 1 letter, 1
          number and 1 special charecter.
        </span>
      </div>

      <div className="input">
        <label htmlFor="" name="confirmpassword">
          Consorm Password
        </label>
        <input
          className="forminput"
          type="password"
          name="confirmpassword"
          placeholder="Conform Password"
          onFocus={() => setfocused({ ...focused, confirmpassword: "true" })}
          onBlur={handleblur}
          focused={focused.confirmpassword}
          onChange={handlechanges}
          pattern={values.password}
          required
        />
        <span>password dosn't match.</span>
      </div>

      <button>SUBMIT</button>
      <span className="span">
    {/* Register as chef <Link>CHEF</Link> */}
      </span>
    <span className="span">
    {/* Already have an account ? <Link>Login!</Link>  */}
    </span>
    </form>
  </div>
  )
}

export default Signup
