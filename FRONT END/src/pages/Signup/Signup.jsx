import React, { useState } from "react";
import axios from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import OTP from "../OTP/OTP";
import logo from '../../assets/logo.png'

const Signup = () => {
  const usenavigate = useNavigate();
  const [otpon, setotpon] = useState(false);
  const [values, setvalues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    isChef: false,
  });
  const [focused, setfocused] = useState({
    username: "false",
    email: "false",
    password: "false",
    confirmpassword: "false",
    phone: "false",
    isChef: false,
  });
  const [prevToastId, setPrevToastId] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post("/user/signup", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        // console.log('hello dat'+response.data.message)
        if (response.status == 201) {
          toast.success(response.data.message);
          // setotpon(!otpon);
          usenavigate("/login");
        }
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

  const handlecheckbox = () => {
    setvalues((values) => ({
      ...values,
      isChef: !values.isChef,
    }));
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
    <section className="Signup bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {/* {loading && <Spinner />} If you have a Spinner component */}
      <Toaster />
      <div className="max-w-6xl flex flex-col md:flex-row">
        <div className="w-full hidden md:w-1/2 p-8 md:p-16 md:block sm:flex items-center justify-center mt-28">
          <img
            className="rounded-3xl"
            src="https://img.freepik.com/free-photo/portrait-young-boy-chef-costume_23-2150773056.jpg"
            alt="Login Icon"
          />
        </div>

        {!otpon ? (
          <div className="w-full md:w-1/2 p-4 md:p-16 flex flex-col items-center">
            <h2 className="font-bold text-4xl text-[#002D74] dark:text-blue-400">
              SIGNUP
            </h2>
            <img
              src={logo}
              alt="Your Logo"
              className="w-28 h-28 mt-4 cursor-pointer"
              onClick={() => usenavigate("/")}
            />
            <form
              className="w-full max-w-md flex flex-col gap-4"
              onSubmit={handlesubmit}
            >
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
                  className="forminput appearance-none"
                  type="number"
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
                  password should be 8-20 charecters and iclude at least 1
                  letter, 1 number and 1 special charecter.
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
                  onFocus={() =>
                    setfocused({ ...focused, confirmpassword: "true" })
                  }
                  onBlur={handleblur}
                  focused={focused.confirmpassword}
                  onChange={handlechanges}
                  pattern={values.password}
                  required
                />
                <span>password dosn't match.</span>
              </div>
              <label className="flex items-center gap-2 relative">
                <input
                  type="checkbox"
                  name="isChef"
                  checked={values.isChef}
                  onChange={handlecheckbox}
                  className="hidden"
                />
                <div
                  className={` w-12 h-6 bg-gray-300 rounded-full p-1 flex items-center`}
                >
                  <div
                    className={`bg-${
                      values.isChef ? "blue" : "gray"
                    }-500 w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                      values.isChef ? "translate-x-6" : "translate-x-1"
                    }`}
                  ></div>
                </div>
                <p className="ml-2">Are you a chef ?</p>
              </label>

              <div className="relative"></div>
              <button className="bg-[#002D74] rounded-xl dark:text-blue-400 text-white py-3 hover:scale-105 duration-300">
                SUBMIT
              </button>
            </form>

            <div className="mt-2 text-lg py-5 flex dark:text-blue-400 text-[#002D74] text-center">
              <p className="sp text-base block mr-2 font-semibold dark-text-blue-400 text-[#1f3e71]">
                Do you have already an account ?
              </p>
              <p
                onClick={() => {
                  usenavigate("/login");
                }}
                className="text-base underline font-bold text-red-600 cursor-pointer"
              >
                Login!
              </p>
            </div>
          </div>
        ) : (
          <OTP />
        )}
      </div>
    </section>
  );
};

export default Signup;
