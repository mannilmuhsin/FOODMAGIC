import React, { useState } from "react";
import "./Navbar.css";
import { auth, logOut } from "../../context/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/logo.png'

function AdminNavbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const dispatch = useDispatch();

  const HandlelogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const handlelogin = () => {
    usenavigate("/login");
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className={`bg-gray-800 text-white  `}>
      <div className=" flex justify-center items-center  px-4 md:px-0">
        {/* Logo */}
        <div className="logo ms-2 sm:ms-8 w-16 md:w-20">
          <img src={logo} alt="Logo" />
        </div>
        <div className="hidden md:flex me-96 space-x-4">
          {[
            { path: "/admin", label: "DASHBOARD" },
            { path: "/admin/userlist", label: "STUDENTS" },
            { path: "/admin/cheflist", label: "CHEFS" },
            // { path: "/admin/allcourses", label: "ALL COURSES" },
            { path: "/admin/payments", label: "PAYMENTS" },
            { path: "/admin/category", label: "CATEGORY" },
          ].map((item) => (
            <button
              key={item.path}
              className="nav-button p-2 hvr-underline-from-center"
              onClick={() => usenavigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {!user?.user ? (
            <div
              className=" signinandsignup md:flex me-2 sm:me-10 space-x-4"
              onClick={() => navigate("/login")}
            >
              <a href="#" className="logbutton">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                LOGIN
              </a>
            </div>
          ) : (
            <div className="hidden md:flex me-4">
              <div
                className="flex items-center me-4 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {user?.pro ? (
                  user.pro
                ) : (
                  <FontAwesomeIcon icon={faUser} size="2x" />
                )}
                <span className="uppercase ms-1"> {user?.user}</span>
              </div>
              <button
                className="nav-button  hvr-bounce-to-bottom   md:flex border p-2 "
                onClick={HandlelogOut}
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden" onClick={toggleMobileMenu}>
          <Hamburger />
        </div>
        {isMobileMenuOpen && (
          <div className="absolute z-50 top-16 left-0 right-0 bg-gray-800">
            {[
              { path: "/admin", label: "DASHBOARD" },
              { path: "/admin/userlist", label: "STUDENTS" },
              { path: "/admin/cheflist", label: "CHEFS" },
              // { path: "/admin/allcourses", label: "ALL COURSES" },
              { path: "/admin/payments", label: "PAYMENTS" },
              { path: "/admin/category", label: "CATEGORY" },
            ].map((item) => (
              <button
                key={item.path}
                className="block w-full py-2 px-4 text-left hover:bg-gray-700"
                onClick={() => {
                  usenavigate(item.path);
                  toggleMobileMenu();
                }}
              >
                {item.label}
              </button>
            ))}
            {user?.user && (
              <>
                <button
                  className="block w-full py-2 px-4 text-left hover:bg-gray-700"
                  onClick={() => {
                    usenavigate("/profile");
                    toggleMobileMenu();
                  }}
                >
                  PROFILE
                </button>
                <button
                  className="block w-full py-2 px-4 text-left hover:bg-gray-700"
                  onClick={(e) => {
                    HandlelogOut(e);
                    toggleMobileMenu();
                  }}
                >
                  LOGOUT
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;
