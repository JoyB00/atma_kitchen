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
    <div className="mb-6 grid grid-cols-3 gap-6 ">
      <div className="col-span-1 flex justify-start rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="me-6 rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon icon={faChartSimple} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Profit</h2>
          <h1 className="text-2xl font-semibold">Rp 1.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 flex rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="me-6 rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon icon={faCoins} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Transaction In</h2>
          <h1 className="text-2xl font-semibold">Rp 11.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 flex rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="me-6 rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            size="2xl"
            color="orange"
          />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Transaction Out</h2>
          <h1 className="text-2xl font-semibold">Rp 10.200.000,-</h1>
        </div>
      </div>
      <div className="col-span-1 flex justify-between rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="my-auto">
          <h2 className="text-gray-400">Your Balance</h2>
          <h1 className="text-2xl font-semibold">Rp 10.200.000,-</h1>
        </div>
        <div className="rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            size="2xl"
            color="orange"
          />
        </div>
      </div>
      <div className="col-span-1 flex rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="me-6 rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon icon={faUtensils} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">On Cooking</h2>
          <h1 className="text-2xl font-semibold">120 Product</h1>
        </div>
      </div>
      <div className="col-span-1 flex rounded-2xl bg-white px-4 py-4 drop-shadow-sm">
        <div className="me-6 rounded-full bg-orange-100/50 px-5 py-[1.1rem] ">
          <FontAwesomeIcon icon={faCircleCheck} size="2xl" color="orange" />
        </div>
        <div className="my-auto">
          <h2 className="text-gray-400">Done</h2>
          <h1 className="text-2xl font-semibold">236 Product</h1>
        </div>
      </div>
    </div>
  );
}
