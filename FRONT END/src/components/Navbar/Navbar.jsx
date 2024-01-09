import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { auth, logOut } from "../../context/authReducer";
import logo from "../../assets/logo.png"

const Navbar = ({ className }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-gray-800 text-white ${className ?className :''}  `}>
      <div className=" flex justify-center items-center  px-4 md:px-0">
        {/* Logo */}
        <div className="logo ms-2 sm:ms-8 w-16 md:w-20">
          <img src={logo} alt="Logo" />
          {/* <img src="/src/assets/logo.png" alt="Logo" /> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex me-96 space-x-4">
          {['/', '/allcourses', '/user/mylearnings', '/chat', '/blog'].map((path) => (
            <button key={path} className="nav-button p-2 hvr-underline-from-center" onClick={() => navigate(path)}>
              {path === '/' ? 'HOME' :path === '/user/mylearnings'? 'MYLEARNINGS' : path.split('/')[1].toUpperCase()}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {!user?.user ? (
            // <button className="nav-button me-2 sm:me-10" onClick={() => navigate("/login")}>
            //   LOGIN
            // </button>
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
                {user?.pro ? user.pro : <FontAwesomeIcon icon={faUser} size="2x" />}
                <span className="uppercase">{user?.user}</span>
              </div>
              <button className="nav-button  hvr-bounce-to-bottom   md:flex border p-2 " onClick={handleLogOut}>
                LOGOUT
              </button>
            </div>
          )}
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Hamburger toggled={isMobileMenuOpen} toggle={toggleMobileMenu} />
          {isMobileMenuOpen && (
            <div className="absolute z-50 top-16 left-0 right-0 bg-gray-800">
              {['/', '/allcourses', '/user/mylearnings', '/chat', '/blog','/profile','/logout'].map((path) => (
                <button
                  key={path}
                  className="block w-full py-2 px-4 text-left hover:bg-gray-700"
                  onClick=
                  {path === '/logout' ? (e) =>{
                    handleLogOut(e)
                    toggleMobileMenu()
                  } :() =>{
                    navigate(path)
                    toggleMobileMenu()
                  }
                    }
                >
                  {path === '/' ? 'HOME' :path === '/user/mylearnings'? 'MYLEARNINGS' : path.split('/')[1].toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
