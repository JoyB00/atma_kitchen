import Button from "../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEgg,
  faFilter,
  faMoneyCheck,
  faMoneyCheckDollar,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
// import Drawer from "../../../../Component/Drawer";
// import Checkbox from "../../../../Component/Checkbox";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { fetchWithdrawalRequests, confirmWithdrawalRequest } from "../../../api/BalanceWithdrawal";
export default function BodyWithdrawal() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithdrawalRequests();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await confirmWithdrawalRequest(id);
      const data = await fetchWithdrawalRequests(); // Refresh the requests
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <div className="grid w-full grid-cols-6">
        <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
          <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
            <FontAwesomeIcon icon={faMoneyCheckDollar} /> Withdrawal Data{" "}
          </h1>
          <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
        </motion.div>
        <div className="col-span-2 ms-auto pt-6">
          <Button
            className="my-4 me-2 border-2 border-orange-500 bg-transparent text-orange-500 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
          </Button>
        </div>
      </div>
      <div>
      <h1>Withdrawal Requests</h1>
      <table className="w-full mt-4 bg-white shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-6">Customer ID</th>
            <th className="py-4 px-6">Amount</th>
            <th className="py-4 px-6">Bank Name</th>
            <th className="py-4 px-6">Account Number</th>
            <th className="py-4 px-6">Date</th>
            <th className="py-4 px-6">Detail Information</th>
            <th className="py-4 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td className="py-4 px-6">{request.customer_id}</td>
              <td className="py-4 px-6">{request.nominal_balance}</td>
              <td className="py-4 px-6">{request.bank_name}</td>
              <td className="py-4 px-6">{request.account_number}</td>
              <td className="py-4 px-6">{request.date}</td>
              <td className="py-4 px-6">{request.detail_information}</td>
              <td className="py-4 px-6">
                <Button onClick={() => handleConfirm(request.id)} className="bg-green-500 text-white px-4 py-2">
                  Confirm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      

      
    </div>
  );
}
