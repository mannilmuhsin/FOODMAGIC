import React, { useEffect, useState } from "react";
// import Card from "../../components/Card/HomeImageCard";
import Navbar from "../../components/Navbar/Navbar";
// import SearchBar from "../../components/SearchBar/SearchBar";
import { BiSearchAlt } from "react-icons/bi";
import { auth } from "../../context/authReducer";
import { useSelector } from "react-redux";
import Homelottile from "../../components/Lottie/Homelottile";
import "animate.css";
import HomeSpComponent from "../../components/Lottie/HomeSpComponent/HomeSpComponent";
import { useNavigate } from "react-router-dom";
import { useGetAllCategorysMutation, useGetusersMutation } from "../../api/publicApiSlice";
import ChefNavbar from "../../components/Navbar/ChefNavbar";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function Home() {
  const user = useSelector(auth);
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [getCatogerys] = useGetAllCategorysMutation();
  const [getAllChefs] = useGetusersMutation()

  // const id = useSelector(selectCurrentId);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await getAllChefs(3000);
        setChefs(response?.data?.studens.slice(0,4));
        console.log(response?.data?.studens.slice(0,4));
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchChefs();
  }, []);
  
  useEffect(() => {
    const fetchCatogery = async () => {
      try {
        const response = await getCatogerys();
        setCategories(response?.data?.categories.slice(0,4));
        console.log(response?.data?.categories.slice(0,4));
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchCatogery();
  }, []);
  // const list=[1,2]

  const list = [
    "src/assets/tacos.png",
    // "src/assets/dinner.png",
    // "src/assets/salad.png",
    "src/assets/pasta.png",
    "src/assets/pasta.png",
    "src/assets/tacos.png",
    // "src/assets/dinner.png",
    // "src/assets/salad.png",
  ];
  return (
    <div className="min-h-screen  bg-gray-100">
      {/* <Navbar /> */}
      {user.role == 1000 ?
      <AdminNavbar/>
      :
      user.role == 3000?
      <ChefNavbar/>
      :
      <Navbar />
      }
      <div className="container mx-auto flex flex-wrap pt-8">
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
            {/* <i className="fa fa-search fa-lg mt-1"></i> */}
            <div className=" cursor-pointer" onClick={()=>navigate('/allcourses', { state: { searchTerm: searchTerm } })}>

            <BiSearchAlt size={30}  />
            </div>
          </form>
          {/* <div className="text-center">
      <p className="md:text-2xl md:py-2 text-[#20B486] font-medium text-sm sm:mt-5 mt-0">
        Savor success in the kitchen!
      </p>
      <h1 className="md:text-7xl text-xl md:py-2 font-semibold mb-5">
        Access to <span className="text-[#20B486]">500+ </span> cooking courses <br />
        from 
        <span className="text-[#20B486]">100+ </span> global chefs.
      </h1>
      <p className="md:text-2xl md:py-2 text-[#20B486] font-medium text-sm mt-0">
        Elevate your skills, one delectable lesson at a time.
      </p>
    </div> */}
          <div className="text-center py-8">
            <p className="md:text-2xl md:py-2 text-[#20B486] font-medium text-sm sm:mt-5 mt-0 animate__animated  animate__bounceInDown">
              Savor success in the kitchen!
            </p>
            <h1 className="md:text-7xl text-xl md:py-2 font-semibold mb-5 animate__animated animate__bounceInLeft animate__delay-1s ">
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
      <div className="container mx-auto gap-5 flex flex-wrap justify-center">
        {categories.map((category, index) => (
          <div
          onClick={()=>navigate('/allcourses', { state: { category: category.title } })}
            key={index}
            className="video-card w-72  mx-2 rounded-b-md border-b-2 my-4 overflow-hidden hover:bg-slate-400 transition duration-300 ease-in-out transform hover:scale-105 "
          >
            <img
              src={category.image.url}
              // alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-1 flex justify-center">
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex max-lg justify-center items-center font-bold text-2xl border-t-2 border-slate-300 my-4 pt-7 border-dotted ">
        <h1>CHOOSE YOUR FAVOURITE CHEF</h1>
      </div>
      <div className="container mx-auto flex gap-5 flex-wrap justify-center">
        {chefs.map((chef, index) => (
          <div
          onClick={()=>navigate('/allcourses', { state: { chef: chef } })}
            key={index}
            className="video-card w-72 border-b-2  mx-2 rounded-b-md my-4 overflow-hidden hover:bg-slate-400 transition duration-300 ease-in-out transform hover:scale-105 "
          >
            <img
              src={chef?.pic?.url}
              // alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-1 flex justify-center">
              <h3 className="text-lg font-semibold mb-2">{chef.username}</h3>
            </div>
          </div>
        ))}
      </div>
      <HomeSpComponent />
    </div>
  );
}

export default Home;
