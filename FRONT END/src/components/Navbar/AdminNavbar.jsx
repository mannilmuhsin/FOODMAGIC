import React, { useState } from 'react'
import "./Navbar.css";
import { auth, logOut } from "../../context/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function AdminNavbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const dispatch=useDispatch()

  const HandlelogOut=(e)=>{
    e.preventDefault();
    dispatch(logOut())
  }

  const handlelogin = () => {
    usenavigate("/login");
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="navbar">
    <div className="container mx-auto flex justify-between items-center py-4">
      {/* <div className="logo  w-16 md:w-20 ">
        <img src="src/assets/logo.png" alt="" />
      </div> */}
      <div className="hidden md:flex space-x-4">
        <a href="/admin" className="nav-link">
          DASHBORD
        </a>
        <a href="/admin/userlist" className="nav-link">
          STUDENTS
        </a>
        <a href="#" className="nav-link">
          CHEFS
        </a>
        <a href="#" className="nav-link">
        ALL COURSES
        </a>
      </div>
      <div className="md:hidden" onClick={toggleMobileMenu}>
        <Hamburger />
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Course
          </a>
          <a href="#" className="nav-link">
            Community
          </a>
          <a href="#" className="nav-link">
            Blog
          </a>
          {!user?.user ? (
            <a href="#" className="nav-link">
              Login
            </a>
          ) : (
            <a href="#" className="nav-link">
              Profile
            </a>
          )}
        </div>
      )}
      {!user?.user ? (
        <div
          className="hidden signinandsignup md:flex space-x-4"
          onClick={handlelogin}
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
        <>
        <div className="hidden cursor-pointer signinandsignup md:flex items-end" onClick={()=>{
          usenavigate('/admin/profile')
        }}>
          {user?.pro ? (
            user.pro
          ) : (
            <FontAwesomeIcon className="me-3" icon={faUser} size="2x"  />
          )}{" "}
          {user?.user}
        </div>
        <button className="ms-3 mt-2 border rounded p-1" onClick={HandlelogOut}>logout</button>
        </>
      )}
    </div>
  </nav>
  )
}

export default AdminNavbar
