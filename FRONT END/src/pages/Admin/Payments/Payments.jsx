import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetAllPaymentsMutation,
  useHandlePaymentOfChefMutation,
} from "../../../api/adminApiSlice";

function Payments() {
  const [getAllPayments] = useGetAllPaymentsMutation();
  const [PaymentOfChef] = useHandlePaymentOfChefMutation();
  const [Payments, setPayments] = useState([]);

  useEffect(() => {
    const allPayments = async () => {
      const response = await getAllPayments();
      setPayments(response.data.payments);
    };
    allPayments();
  }, []);

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
                <th className="border border-gray-300 py-2 px-4">
                  Transaction ID
                </th>
                <th className="border border-gray-300 py-2 px-4">Student</th>
                <th className="border border-gray-300 py-2 px-4">Chef</th>
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
              {Payments.map((payment, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 py-2 px-4">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.date}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment._id}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.user_id?.username}
                  </td>
                  <td className="border border-gray-300 py-2 px-4">
                    {payment.chef_id?.username}
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
      </div>
    </div>
  );
}

export default Payments;
