import {
  faChartSimple,
  faCircleCheck,
  faCoins,
  faMoneyBillTransfer,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CardSection() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6 ">
      <div className="col-span-1 rounded-2xl bg-white px-4 flex justify-start py-4 drop-shadow-sm">
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] me-6 ">
          <FontAwesomeIcon icon={faChartSimple} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Profit</h2>
          <h1 className="font-semibold text-2xl">Rp 1.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 rounded-2xl bg-white px-4 flex py-4 drop-shadow-sm">
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] me-6 ">
          <FontAwesomeIcon icon={faCoins} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Transaction In</h2>
          <h1 className="font-semibold text-2xl">Rp 11.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 rounded-2xl bg-white px-4 flex py-4 drop-shadow-sm">
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] me-6 ">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            size="2xl"
            color="orange"
          />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Transaction Out</h2>
          <h1 className="font-semibold text-2xl">Rp 10.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 rounded-2xl bg-white px-4 flex py-4 drop-shadow-sm justify-between">
        <div className="my-auto">
          <h2 className="text-gray-400">Your Balance</h2>
          <h1 className="font-semibold text-2xl">Rp 10.200.000,-</h1>
        </div>
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] ">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            size="2xl"
            color="orange"
          />
        </div>
      </div>
      <div className="col-span-1 rounded-2xl bg-white px-4 flex py-4 drop-shadow-sm">
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] me-6 ">
          <FontAwesomeIcon icon={faUtensils} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">On Cooking</h2>
          <h1 className="font-semibold text-2xl">120 Product</h1>
        </div>
      </div>
      <div className="col-span-1 rounded-2xl bg-white px-4 flex py-4 drop-shadow-sm">
        <div className="bg-orange-100/50 rounded-full px-5 py-[1.1rem] me-6 ">
          <FontAwesomeIcon icon={faCircleCheck} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Done</h2>
          <h1 className="font-semibold text-2xl">236 Product</h1>
        </div>
      </div>
    </div>
  );
}
