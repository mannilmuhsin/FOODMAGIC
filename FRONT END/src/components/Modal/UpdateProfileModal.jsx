import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { auth } from "../../context/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateProfileMutation } from "../../api/userApiSlice";
import { setCredentials } from "../../context/authReducer";
import Swal from "sweetalert2";

function UpdateProfileModal({ setupdateModal, preusername, prephone }) {
  const user = useSelector(auth);
  const dispatch = useDispatch();
  const [prevToastId, setPrevToastId] = useState(null);
  const [updatProfile] = useUpdateProfileMutation();
  const [values, setvalues] = useState({
    username: preusername,
    phone: prephone,
  });

  const handlechanges = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
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

  const usernamePattern = /^[A-Za-z0-9]{3,16}$/;
  const updateProfileHandle = (e) => {
    e.preventDefault();
    if (!usernamePattern.test(values.username)) {
      showToast("Invalid user name format. Please check the requirements.");
      return;
    }
    console.log(user);
    updatProfile({ values, user })
      .then((res) => {
        if (res.data.error == false) {
          Swal.fire({
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
          });
          console.log(res.data.user);
          dispatch(
            setCredentials({
              user: res.data.user,
              token: res.data.token,
            })
          );
          console.log(user);
          setupdateModal(false);
        } else {
          showToast(res.data.message);
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

  return (
    <>
      <Toaster />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Update Profile</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setupdateModal(false)}
              >
                {/* <FiCrosshair/> */}
                <span className="bg-transparent text-black opacity-50 mt-auto h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            <form>
              <div className="input w-full p-4">
                <TextField
                  id="outlined-basic"
                  className="forminput "
                  name="username"
                  label="User Name"
                  variant="outlined"
                  type="text"
                  value={values.username}
                  helperText={
                    values.username && !usernamePattern.test(values.username)
                      ? " User name should be 3-16 charecters and shouldn't include any special charecter.!"
                      : ""
                  }
                  onChange={handlechanges}
                  required
                />
              </div>
              <div className="input w-full p-5">
                <TextField
                  id="outlined-basic"
                  className="forminput "
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  type="number"
                  value={values.phone}
                  onChange={handlechanges}
                  required
                />
              </div>
            </form>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setupdateModal(false)}
              >
                Close
              </button>

              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={updateProfileHandle}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default UpdateProfileModal;
