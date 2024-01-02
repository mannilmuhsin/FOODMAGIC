import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import { FaSearch } from 'react-icons/fa';

import toast, { Toaster } from "react-hot-toast";
import {
  useGetAllPaymentsMutation,
  useHandlePaymentOfChefMutation,
} from "../../../api/adminApiSlice";

function Payments() {
  const [getAllPayments] = useGetAllPaymentsMutation();
  const [PaymentOfChef] = useHandlePaymentOfChefMutation();
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPayments();
      setPayments(response.data.payments);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.user_id?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.chef_id?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.course_id?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, payments]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePaymentOfChef = async (payment_id) => {
    try {
      const paymentresponse = await PaymentOfChef({ payment_id });
      toast.success(paymentresponse.data.message);
      const response = await getAllPayments();
      setPayments(response.data.payments);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Toaster />
      
      <div className="text-center mt-4  hvr-wobble-bottom w-full ">
        <h2 className="text-3xl font-bold text-black-600">PAYMENTS</h2>
      </div>

      <div className='w-full h-20 flex items-center justify-end px-0 md:px-4 gap-4'>
                        <div className='flex '>
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Search..."
                                className="p-2 rounded-l-md w-full md:w-64 text-black text-verySmall-1 bg-dashboard-bg outline-none"
                            />
                            <div className='w-14 h-10 rounded-r-md bg-black flex justify-center items-center cursor-pointer' >
                                <FaSearch className='text-white' />
                            </div>
                        </div>
                    </div>
         
      <div className="mt-1 p-3">
       
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">#</th>
                {/* <th className="border border-gray-300 py-2 px-4">
                  Transaction ID
                </th> */}
                <th className="border border-gray-300 py-2 px-4">Student</th>
                <th className="border border-gray-300 py-2 px-4">Chef</th>
                <th className="border border-gray-300 py-2 px-4">Date</th>
                <th className="border border-gray-300 py-2 px-4">Course</th>
                <th className="border border-gray-300 py-2 px-4">
                  Total Amount
                </th>
                <th className="border border-gray-300 py-2 px-4">
                  Chef Amount
                </th>
                <th className="border border-gray-300 py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 py-2 px-4">
                    {index + 1}
                  </td>
                  {/* <td className="border border-gray-300 py-2 px-4">
                    {payment._id}
                  </td> */}
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.user_id?.username}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.chef_id?.username}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.date.slice(0,10)}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.course_id?.title}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.amount}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {Math.floor((payment.amount * 90) / 100)}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {!payment.isDivided ? (
                      <button
                        onClick={() => handlePaymentOfChef(payment._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Pay
                      </button>
                    ) : (
                      "PAID"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
     </div>
     {/* Display Pagination Controls */}
     <div className="flex justify-center items-center space-x-2 mt-4">
  {Array.from({ length: Math.ceil(filteredPayments.length / itemsPerPage) }, (_, i) => (
    <button 
      key={i} 
      onClick={() => paginate(i + 1)}
      className={`px-4 py-2 rounded-md 
                  ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}
                  hover:bg-blue-600 hover:text-white`}
    >
      {i + 1}
    </button>
  ))}
</div>
  {/* </div> */}
  </div>

    </div>
  );
}

export default Payments;
