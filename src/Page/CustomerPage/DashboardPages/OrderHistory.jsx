import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { useAtom } from "jotai";
import { customerOrderHistory } from "../../../lib/FetchFunctions";

export default function OrderHistory() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center px-24">
        <Header />
        <div className="py-2" />
        <TransactionList />
      </div>
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <div className="flex flex-col text-start">
      <span className="font-bold text-orange-500 text-3xl">Order History</span>
      <span className="text-xl">Did you miss our cake?</span>
    </div>
  );
}

export function TransactionList() {
  const [orderHistory] = useAtom(customerOrderHistory);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {orderHistory.map((transaction) => (
        <TransactionTile
          detailedTransaction={transaction}
          key={transaction.transaction.id}
        />
      ))}
    </div>
  );
}

export function TransactionTile({ detailedTransaction }) {
  // hirarki detail transaction
  // - transaction
  // - cart
  //   - product/hampers

  const ProductTile = (transactionDetail) => {
    const detail = transactionDetail.transactionDetail;
    return (
      <div className="flex flex-row px-4 items-center py-2 text-nowrap text-black">
        <span className="font-bold text-md text-start">
          {detail.product.product_name} (x{detail.quantity})
        </span>
        <div className="w-full" />
        <span className=" text-sm text-end">
          Rp. {detail.product.product_price}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 h-80 rounded-lg shadow-lg flex flex-col items-stretch overflow-clip border border-orange-300">
      <div className="flex flex-col items-start p-4 bg-orange-500">
        <span>Ordered on</span>
        <span className="text-xl font-bold">
          {detailedTransaction.transaction.order_date}
        </span>
        <span className="text-xs">
          Order ID: {detailedTransaction.transaction.id}
        </span>
      </div>
      <div className="py-2" />
      <div className="flex flex-col">
        <div className="flex flex-col">
          {detailedTransaction.details.map((transactionDetails) => (
            <ProductTile transactionDetail={transactionDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}
