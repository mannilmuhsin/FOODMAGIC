import React, { useState } from "react";
import axios from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/authApiSlice";
import { setCredentials } from "../../context/authReducer";
import { Dna } from "react-loader-spinner";
import logo from "../../assets/logo.png"
// import GoogleLogin from "react-google-login";

const Login = () => {
  const [login] = useLoginMutation();
  const [loading, setloading] = useState(false);
  const navigat = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname;

  // const { loginWithRedirect } = useAuth0();
  const usenavigate = useNavigate();
  // console.log(from);
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const [focused, setfocused] = useState({
    email: "false",
    password: "false",
  });
  const [prevToastId, setPrevToastId] = useState(null);

  const handlesubmit = (e) => {
    setloading(true);
    e.preventDefault();
    login(values)
      .then((response) => {
        if (response.error) {
          showToast(response.error.data.message);
          setloading(false);
        } else {
          dispatch(
            setCredentials({
              user: response.data.user,
              role: response.data.role,
              token: response.data.accesstoken,
              id: response.data.id,
            })
          );
          setloading(false);
          if (response.data.role === 2000) {
            navigat(from || "/", { replace: true });
          } else if (response.data.role === 1000) {
            navigat(from || "/admin", { replace: true });
          } else if (response.data.role === 3000) {
            navigat(from || "/chef", { replace: true });
          }
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
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {loading && (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
      <Toaster />
      {!loading && (
        <div className="max-w-6xl flex flex-col md:flex-row">
          <div className="w-full hidden md:w-1/2 p-8 md:p-16 md:block sm:flex items-center justify-center mt-28">
            <img
              className="rounded-3xl"
              src="https://img.freepik.com/free-photo/portrait-young-boy-chef-costume_23-2150773056.jpg"
              alt="Login Icon"
            />
          </div>

          <div className="Login w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center">
            <h2 className="font-bold text-4xl text-[#002D74] dark:text-blue-400">
              LOGIN
            </h2>
            <img
              src={logo}
              alt="Your Logo"
              className="w-28 h-28 mt-4 cursor-pointer"
              onClick={() => usenavigate("/")}
            />
            <p className="text-sm mt-4 text-[#002D74] dark:text-blue-400">
              If you are already a member, easily log in
            </p>

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
                <span>it should be a valid username.</span>
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
                <span>it should be a valid password.</span>
              </div>

              <div className="relative"></div>
              <button className="bg-[#002D74] rounded-xl dark:text-blue-400 text-white py-3 hover:scale-105 duration-300">
                SUBMIT
              </button>
            </form>

            <div className="flex mt-2 text-lg py-5 dark:text-blue-400 text-[#002D74] text-center">
              <p className="mr-2 font-semibold dark-text-blue-400 text-[#1f3e71]">
                Do you have already an account ?
              </p>
              <a
                href="/vendor/login"
                className="underline font-bold text-red-600"
              >
                Login!
              </a>
            </div>

            <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-lg">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-5 text-lg flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  usenavigate("/signup");
                }}
                className="py-2 px-3 dark-bg-gray-900 ms-3 bg-white border rounded-xl hover:scale-110 duration-300"
              >
                Register
              </button>
              {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
            </div>
            <div className="mt-8 text-lg border-t border-[#002D74] py-5 text-[#002D74] text-center dark:text-blue-400">
              <a href="/forgot-password">Forgot your password?</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
