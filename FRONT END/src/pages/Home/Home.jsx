import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BiSearchAlt } from "react-icons/bi";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import Homelottile from "../../components/Lottie/Homelottile";
import "animate.css";
import HomeSpComponent from "../../components/Lottie/HomeSpComponent/HomeSpComponent";
import { useNavigate } from "react-router-dom";
import {
  useGetAllCategorysMutation,
  useGetusersMutation,
} from "../../api/publicApiSlice";
import ChefNavbar from "../../components/Navbar/ChefNavbar";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

function Home() {
  const user = useSelector(auth);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [getCatogerys] = useGetAllCategorysMutation();
  const [getAllChefs] = useGetusersMutation();


  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await getAllChefs(3000);
        setChefs(response?.data?.studens.slice(0, 4));
        console.log(response?.data?.studens.slice(0, 4));
      } catch (error) {
      }
    };

    fetchChefs();
  }, []);

  useEffect(() => {
    const fetchCatogery = async () => {
      try {
        const response = await getCatogerys();
        setCategories(response?.data?.categories.slice(0, 4));
        console.log(response?.data?.categories.slice(0, 4));
      } catch (error) {
      }
    };

    fetchCatogery();
  }, []);

  return (
    <div className="min-h-screen  bg-gray-100">
      {/* <Navbar /> */}
      {user.role == 1000 ? (
        <AdminNavbar />
      ) : user.role == 3000 ? (
        <ChefNavbar />
      ) : (
        <Navbar />
      )}
      <div className="container mx-auto flex flex-wrap pt-5 px-2">
        <div className="w-full md:w-1/2 flex flex-col items-center mt-0">

          <form
            action=""
            className="bg-[#e4f7f1] border max-w-[650px] w-full md:p-4 p-2 mb-2 md:mt-5 shadow-lg rounded-lg flex justify-between sm:me-10 m-0"
          >
            <input
              className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
              type="text"
              placeholder="What do you want to Cook today?"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ color: "black" }}
            />
            <div
              className=" cursor-pointer"
              onClick={() =>
                navigate("/allcourses", { state: { searchTerm: searchTerm } })
              }
            >
              <BiSearchAlt size={30} />
            </div>
          </form>
          <div className="text-center py-8">
            <p className="md:text-2xl l md:py-2 text-[#20B486] font-medium text-xl sm:mt-5 mt-0 animate__animated  animate__bounceInDown">
              Savor success in the kitchen!
            </p>
            <h1 className="md:text-7xl text-2xl md:py-2 font-semibold mb-5 animate__animated animate__bounceInLeft animate__delay-1s ">
              Access to <span className="text-[#20B486]">500+ </span> cooking
              courses <br />
              from
              <span className="text-[#20B486]">100+ </span> global chefs.
            </h1>
            <p className="md:text-2xl md:py-2 text-[#20B486] font-medium text-sm animate__animated animate__bounceInUp animate__delay-2s ">
              Elevate your skills, one delectable lesson at a time.
            </p>
          </div>
        </div>
        <div className="w-auto h-auto md:w-1/2 flex  justify-center items-center">
          <Homelottile />
        </div>
      </div>
      <div className="flex max-lg justify-center items-center font-bold text-2xl border-t-2 my-4 pt-7 border-t-slate-300 border-dotted">
        <h1>CHOOSE YOUR FAVOURITE COURSE</h1>
      </div>
      <div className="grid p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 z-10 relative">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="feature text-center p-b-6 bg-gray-200 rounded-lg border-b"
            onClick={() =>
              navigate("/allcourses", { state: { category: category.title } })
            }
          >
            <img
              src={category.image.url}
              className="w-full h-60  object-cover mb-4"
              style={{ objectPosition: 'bottom' }} 
            />
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
          </motion.div>
        ))}
      </div>

      <div className="flex max-lg justify-center items-center font-bold text-2xl border-t-2 border-slate-300 my-4 pt-7 border-dotted ">
        <h1>CHOOSE YOUR FAVOURITE CHEF</h1>
      </div>

      <div className="grid p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 z-10 relative">
        {chefs.map((chef, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="feature text-center bg-gray-200 rounded-lg border-b"
            onClick={() => navigate("/allcourses", { state: { chef: chef } })}
          >
            <img
              src={chef?.pic?.url}
              className="w-full h-80  object-cover mb-4"
              style={{ objectPosition: 'top' }} 
            />
            <h3 className="text-xl font-semibold mb-2">{chef.username}</h3>
          </motion.div>
        ))}
      </div>

      <HomeSpComponent />
      <Footer />
    </div>
  );
}

export default Home;
