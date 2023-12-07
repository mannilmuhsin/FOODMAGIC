import React, { useEffect, useState } from 'react'
import ChefNavbar from '../../../components/Navbar/ChefNavbar'
import { useGetPaymentsMutation } from '../../../api/chefApiSlice'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../context/authReducer';

function ChefPayments() {

    const [getPayments]=useGetPaymentsMutation()
    const [Payments, setPayments] = useState([]);
    const user = useSelector(selectCurrentUser)

        useEffect(() => {
          const allPayments = async () => {
            const response = await getPayments(user);
            setPayments(response.data.payments);
          };
          allPayments();
        }, []);

  return (
    <div>
        <ChefNavbar/>
        <div className="text-center mt-14 mb-8 hvr-wobble-bottom w-full ">
        <h2 className="text-3xl font-bold text-black-600">PAYMENTS</h2>
      </div>

      <div className="mt-1 p-3">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">#</th>
                <th className="border border-gray-300 py-2 px-4">Date</th>
                <th className="border border-gray-300 py-2 px-4">Transaction ID</th>
                <th className="border border-gray-300 py-2 px-4">Student</th>
                {/* <th className="border border-gray-300 py-2 px-4">Chef</th> */}
                <th className="border border-gray-300 py-2 px-4">Course</th>
                <th className="border border-gray-300 py-2 px-4">Total Amount</th>
                {/* <th className="border border-gray-300 py-2 px-4">Chef Amount</th> */}
                {/* <th className="border border-gray-300 py-2 px-4">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {Payments.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.date}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment._id}</td>
                  <td className="border border-gray-300 py-2 px-4">{payment.user_id?.username}</td>
                  {/* <td className="border border-gray-300 py-2 px-4">{payment.chef_id?.username}</td> */}
                  <td className="border border-gray-300 py-2 px-4">{payment.course_id?.title}</td>
                  {/* <td className="border border-gray-300 py-2 px-4">{payment.amount}</td> */}
                  <td className="border border-gray-300 py-2 px-4">{Math.floor(payment.amount*90/100)}</td>
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
  )
}

export default ChefPayments
