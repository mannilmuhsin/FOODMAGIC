import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  useVerifyPasswordMutation,
  useChangePasswordMutation,
} from "../../api/userApiSlice";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function ChangePasswordModal({ setOpenModal }) {
  const [prevToastId, setPrevToastId] = useState(null);
  const user = useSelector(auth);
  const [Verify] = useVerifyPasswordMutation();
  const [changepassword] = useChangePasswordMutation();
  const [one, setone] = useState(false);
  const [values, setvalues] = useState({
    oldpassword: "",
    newpassword: "",
    conformpassword: "",
  });

  const handlechanges = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleverify = (e) => {
    e.preventDefault();
    Verify({ values, user })
      .then((response) => {
        if (response.data.message == "ok") {
          setone(true);
        } else {
          showToast(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          showToast(error.response.data.message);
        } else if (error.request) {
          showToast(error.message);
        } else {
          showToast(error.message);
        }
      });
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

  const passwordPattern =
    /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

  const handlechangepassword = (e) => {
    e.preventDefault();
    if (!passwordPattern.test(values.newpassword)) {
      showToast("Invalid password format. Please check the requirements.");
      return;
    }
    changepassword({ values, user })
      .then((res) => {
        // toast.success(res.data.message);
        if (res.data.message == "Password changed successfully") {
          Swal.fire({
            title: "Password changed successfully!",
            showConfirmButton: false,
            timer: 1500,
            icon: "success",
          });

          setOpenModal(false);
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
        <div className="relative w-auto bg-red-500 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Change Password</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModal(false)}
              >
                <span className="bg-transparent text-black opacity-50 mt-auto h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            {!one ? (
              <form>
                <div className="input w-full p-3">
                  <TextField
                    id="outlined-basic"
                    className="forminput "
                    name="oldpassword"
                    label="Old Password"
                    variant="outlined"
                    type="password"
                    value={values.oldpassword}
                    onChange={handlechanges}
                  />
                </div>
              </form>
            ) : (
              <form>
                <div className="input w-full p-4">
                  <TextField
                    id="outlined-basic"
                    className="forminput "
                    name="newpassword"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={values.newpassword}
                    helperText={
                      values.newpassword &&
                      !passwordPattern.test(values.newpassword)
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
                    name="conformpassword"
                    label="Conform Password"
                    variant="outlined"
                    type="password"
                    value={values.conformpassword}
                    helperText={
                      values.newpassword !== values.conformpassword
                        ? "conform password not match."
                        : ""
                    }
                    onChange={handlechanges}
                    required
                  />
                </div>
              </form>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
              {!one ? (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleverify}
                >
                  Verify
                </button>
              ) : (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handlechangepassword}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ChangePasswordModal;
