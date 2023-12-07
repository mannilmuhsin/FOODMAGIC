import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import { useSelector } from "react-redux";
import { auth } from "../../../context/authReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faIndianRupee,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  useGetAllPaymentsMutation,
  useGetusersMutation,
} from "../../../api/adminApiSlice";
import { useGetFullCoursesMutation } from "../../../api/publicApiSlice";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [recentPayments, setRecentPayments] = useState([]);
  const [totalCourses, setToatalCourses] = useState(0);
  const [totalStudents, setToatalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const [totalChefs, setTotalChefs] = useState(0);
  const [getchefs] = useGetusersMutation();
  const [getAllPayments] = useGetAllPaymentsMutation();
  const [getfullcourse] = useGetFullCoursesMutation();

  useEffect(() => {
    const allPayments = async () => {
      const students = new Set();
      const response = await getAllPayments();
      setRecentPayments(response.data.payments.slice(0,10));
      console.log(response.data.payments);
      const Revenue = response?.data?.payments.reduce(
        (a, b) => b.amount + a,
        0
      );
      response?.data?.payments.forEach((user) =>
        students.add(user.user_id.username)
      );
      setTotalRevenue((Revenue * 10) / 100);
      setToatalStudents(students.size);
    };
    allPayments();
  }, []);

  useEffect(() => {
    const fetccourses = async () => {
      try {
        const response = await getfullcourse();
        setToatalCourses(response.data.courses.length);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };
    fetccourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getchefs(3000);
        setTotalChefs(response.data.studens.length);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className=" ">
      <AdminNavbar />
      <div className=" p-8">
        {/* Top Level Welcome */}
        <div className="text-center rounded bg-gradient-to-r from-blue-950 to-gray-950 text-white p-8">
          <h1 className="sm:text-5xl text-4xl font-bold mb-4 text-yellow-500">
            HELLO {user.user}
          </h1>
          <p className="text-lg sm:text-2xl mb-4">
            Welcome to Adimin Dashboard
          </p>
          <p className="text-lg sm:text-2xl mb-4">
            Congratulations! You've Got Some Exciting News
          </p>
        </div>

        {/* Cards - Total Students, Total Courses, Total Revenue */}
        <div className="flex flex-col md:flex-row justify-around my-8">
          {/* Total Students Card */}
          <div
            onClick={() => usenavigate("/admin/userlist")}
            className="hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110 text-center bg-blue-600 text-white p-6 rounded-md shadow-lg mb-4 md:mb-0 hover:shadow-red-500"
          >
            <FontAwesomeIcon icon={faUsers} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Students
            </h2>
            <p className="text-lg md:text-xl">{totalStudents}</p>
          </div>

          <div
            onClick={() => usenavigate("/admin/cheflist")}
            className="hover:bg-yellow-700 transition md:w-64 duration-300 ease-in-out transform hover:scale-110 text-center bg-yellow-600 text-white p-6 rounded-md shadow-lg mb-4 md:mb-0 hover:shadow-red-500"
          >
            <FontAwesomeIcon icon={faUsers} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">Total Chefs</h2>
            <p className="text-lg md:text-xl">{totalChefs}</p>
          </div>

          {/* Total Courses Card */}
          <div
            onClick={() => usenavigate("/admin/allcourses")}
            className="hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-110 text-center bg-purple-600 text-white p-6 rounded-md shadow-lg mb-4 md:mb-0 hover:shadow-red-500"
          >
            <FontAwesomeIcon icon={faBook} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Courses
            </h2>
            <p className="text-lg md:text-xl">{totalCourses}</p>
          </div>

          {/* Total Revenue Card */}
          <div
            onClick={() => usenavigate("/admin/payments")}
            className="hover:bg-green-700  transition duration-300 ease-in-out transform hover:scale-110 text-center bg-green-600 text-white p-6 rounded-md shadow-lg hover:shadow-red-500 "
          >
            <FontAwesomeIcon icon={faIndianRupee} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Revenue
            </h2>
            <p className="text-lg md:text-xl">
              <FontAwesomeIcon icon={faIndianRupee} /> {totalRevenue}
            </p>
          </div>
        </div>

        {/* Videos Section */}
        <div className="text-center mt-14 mb-8 hvr-wobble-bottom w-full">
          <h2 className="text-3xl font-bold text-black-600">RECENT PAYMENTS</h2>
        </div>

        <div className="mt-1">
          {/* <h2 className="text-3xl font-bold mb-4">Recent Payments</h2> */}
          <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">#</th>
                <th className="border border-gray-300 py-2 px-4">Date</th>
                <th className="border border-gray-300 py-2 px-4">Transaction ID</th>
                <th className="border border-gray-300 py-2 px-4">Student</th>
                <th className="border border-gray-300 py-2 px-4">Chef</th>
                <th className="border border-gray-300 py-2 px-4">Course</th>
                <th className="border border-gray-300 py-2 px-4">Amount</th>
                {/* <th className="border border-gray-300 py-2 px-4">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.date}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment._id}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.user_id?.username}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.chef_id?.username}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.course_id?.title}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.amount}</td>
                  {/* <td className="border border-gray-300 py-2 px-4">
                    {!payment.isDivided ? (
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Pay
                      </button>
                    ) : (
                      'PAID'
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
