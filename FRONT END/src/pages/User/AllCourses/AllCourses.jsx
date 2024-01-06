import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import { Spin as Hamburger } from "hamburger-react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Select from "react-select";
import {
  useGetAllCategorysMutation,
  useGetFullCoursesMutation,
  useGetusersMutation,
} from "../../../api/publicApiSlice";
import Navbar from "../../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../../../context/authReducer";

const dropdownStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "1px solid #424542" : "1px solid balck",
    width: "15rem",
    hight: "10rem",
    padding: "10px",
    borderRadius: "8px",
    text: "#424542",
    backgroundColor: "rgb(245, 245, 245)",
    transition: "box-shadow 0.3s",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#60A5FA" : "white",
    color: state.isFocused ? "white" : "#4B5563",
    
  }),
};

function AllCourses() {
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  const [getFullCourses] = useGetFullCoursesMutation();
  const [getCatogerys] = useGetAllCategorysMutation();
  const [getAllChefs] = useGetusersMutation();

  const id = useSelector(selectCurrentId);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await getAllChefs(3000);
        setChefs([{ username: "ALL", _id: null }, ...response?.data?.studens]);
        console.log(response?.data?.studens);
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
        setCategories([{ title: "ALL" }, ...response?.data?.categories]);
        console.log(response?.data?.categories);
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchCatogery();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFullCourses();
        setCourses(response.data.courses);
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchData();
  }, []);

  const [filter, setFilter] = useState({
    chef: location.state?.chef ? location.state.chef?._id : "",
    category: location.state?.category ? location.state.category : "",
    maxPrice: Infinity,
    minPrice: null,
  });

  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm ? location.state.searchTerm : ""
  );
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const usenavigate = useNavigate();

  const handleFilterChange = (filterName, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesChef = filter.chef ? course.chef === filter.chef : true;
    const matchesCategory =
      filter.category !== "ALL"
        ? filter.category
          ? course.category.toUpperCase() === filter.category
          : true
        : true;
    const matchesMinPrice = course.price >= filter.minPrice;
    const matchesMaxPrice = course.price <= filter.maxPrice;
    return matchesChef && matchesCategory && matchesMaxPrice && matchesMinPrice;
  });

  const searchedCourses = filteredCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // let sortedCourses
  // const handleSortChange = (e) => {
  //   const sortDirection = e.target.value;

  //   // Sort courses based on user's choice
  //   if (sortDirection === "desc") {
  //     const sortedCourses = [...courses].sort((a, b) => {
  //       const avgRatingA = calculateAverageRating(a.reviews);
  //       const avgRatingB = calculateAverageRating(b.reviews);
  //       return avgRatingB - avgRatingA;
  //     });
  //     // Update state or display sortedCourses on the UI
  //   } else if (sortDirection === "asc") {
  //     const sortedCourses = [...courses].sort((a, b) => {
  //       const avgRatingA = calculateAverageRating(a.reviews);
  //       const avgRatingB = calculateAverageRating(b.reviews);
  //       return avgRatingA - avgRatingB;
  //     });
  //     // Update state or display sortedCourses on the UI
  //   }
  // };

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = searchedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchedCourses.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div
        style={{ boxShadow: "inset 0 0 50px rgba(72, 57, 94, 0.5)" }}
        className="hidden mt-2 bg-gray-100 items-center border-b-2   lg:flex justify-between"
      >
        {/* <div>
  <label>Sort By Rating:</label>
  <select onChange={handleSortChange}>
    <option value="desc">High to Low</option>
    <option value="asc">Low to High</option>
  </select>
</div> */}

        <div>
          <Select
            options={chefs.map((chef) => ({
              value: chef._id,
              label: chef.username,
            }))}
            onChange={(e) => handleFilterChange("chef", e.value)}
            placeholder="Select a chef"
            isSearchable={false}
            styles={dropdownStyles}
            className="p-4"
            defaultValue={
              filter.chef
                ? { value: filter.chef, label: location?.state?.chef?.username }
                : ""
            }
          />
        </div>
        <div>
          <Select
            options={categories?.map((category) => ({
              value: category.title,
              label: category.title,
            }))}
            onChange={(e) => handleFilterChange("category", e.value)}
            placeholder="Select a category"
            className="p-4"
            isSearchable={false}
            styles={dropdownStyles}
            defaultValue={
              filter.category
                ? { value: filter.category, label: filter.category }
                : ""
            } // Set the default value here
          />
        </div>

        <div className="input p-4">
          <TextField
            className="w-44 bg-gray-100"
            id="outlined-basic"
            label="Min price..."
            variant="outlined"
            type="number"
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
        </div>
        <div className="input  p-4">
          <TextField
            className="w-44 bg-gray-100"
            id="outlined-basic"
            label="Max price..."
            variant="outlined"
            type="number"
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                e.target.value ? e.target.value : Infinity
              )
            }
          />
        </div>

        <div className="bg-[#e4f7f1]  border border-gray-300 h-14 max-w-[650px] w-full md:p-4 p-4 mb-2 md:mt-2 shadow-lg rounded-lg flex justify-between sm:me-10 m-0">
          <input
            className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color: "black" }}
          />
          <BiSearchAlt size={30} />
        </div>
      </div>
      {/* Mobile Menu Button */}
      <div className="w-full lg:hidden bg-gray-100 ">
        <div className="flex mt-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-transparent border h-14 mx-2  items-center p-1 md:p-4  md:mt-2 shadow-lg rounded-lg flex  justify-center"
          >
            <Hamburger size={20} direction="right" />
          </button>
          <div className="bg-[#e4f7f1] border h-14 me-2 w-full md:p-4 p-2 mb-2 md:mt-2 shadow-lg rounded-lg flex justify-between sm:me-10 m-0">
            <input
              className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ color: "black" }}
            />
            <BiSearchAlt size={30} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="relative z-50 w-full lg:hidden  bg-gray-100  animate-fade-down animate-once animate-duration-[2000ms] overflow-hidden max-h-screen">
          <div className="bg-[#e4f7f1] border w-full p-4 shadow-lg rounded-lg">
            <div className="input p-5">
              <TextField
                className="w-44"
                id="outlined-basic"
                label="Min price..."
                variant="outlined"
                value={filter.minPrice}
                type="number"
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
            </div>
            <div className="input p-5">
              <TextField
                className="w-44"
                id="outlined-basic"
                label="Max price..."
                variant="outlined"
                value={filter.maxPrice}
                type="number"
                onChange={(e) =>
                  handleFilterChange(
                    "maxPrice",
                    e.target.value ? e.target.value : Infinity
                  )
                }
              />
            </div>
            <div className="p-5">
            <Select
            options={chefs.map((chef) => ({
              value: chef._id,
              label: chef.username,
            }))}
            onChange={(e) => handleFilterChange("chef", e.value)}
            placeholder="Select a chef"
            isSearchable={false}
            styles={dropdownStyles}
            defaultValue={
              filter.chef
                ? { value: filter.chef, label: location?.state?.chef?.username }
                : ""
            }
          />
            </div>
        
            <div className="p-5">
          <Select
            options={categories?.map((category) => ({
              value: category.title,
              label: category.title,
            }))}
            onChange={(e) => handleFilterChange("category", e.value)}
            placeholder="Select a category"
            // className="relative z-50"
            isSearchable={false}
            styles={dropdownStyles}
            defaultValue={
              filter.category
                ? { value: filter.category, label: filter.category }
                : ""
            } // Set the default value here
          />
        </div>
          </div>
        </div>
      )}

      <div className=" p-4 font-serif bg-gray-100">
        <div className="text-center mt-8 mb-8">
          <h2 className="text-3xl font-bold text-black-600">ALL COURSES</h2>
        </div>

        <div className="flex justify-center  gap-4  flex-wrap mt-8">
          {currentCourses.map((course, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-72  bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-center pt-2">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </p>
              </div>
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover px-4"
                  src={course.coverImage.url}
                  alt={course.title}
                />
              </div>
              <div className="p-4 flex-grow">
                <p className="text-sm text-gray-600 h-12 overflow-hidden leading-4 mb-4">
                  {course.blurb}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-orange-600">
                    ${course.price}
                  </p>
                  {!course.users.includes(id) ? (
                    <button
                      onClick={() =>
                        usenavigate("/coursedetails", {
                          state: { id: course._id },
                        })
                      }
                      className="btn hvr-shutter-in-horizontal justify-center !border-y rounded-md !border-black !text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out"
                    >
                      Enroll now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={() => usenavigate("/user/mylearnigs", {})}
                      className="btn  justify-center !border-y rounded-md !border-black !text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out hvr-shutter-in-horizontal"
                    >
                      Watch now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 px-3 py-1 rounded-md ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllCourses;
