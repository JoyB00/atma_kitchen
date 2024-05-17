import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { useAtom } from "jotai";
import { customerOrderHistory } from "../../../lib/FetchFunctions";

export default function OrderHistory() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center px-24">
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
      <span className="text-3xl font-bold text-orange-500">Order History</span>
      <span className="text-xl">Did you miss our cake?</span>
    </div>
  );
}

export function TransactionList() {
  const [orderHistory] = useAtom(customerOrderHistory);
  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
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
        <span className=" text-end text-sm">
          Rp. {detail.product.product_price}
        </span>
      </div>
    );
  };

  return (
    <div className="flex h-80 flex-col items-stretch overflow-clip rounded-lg border border-orange-300 bg-gray-100 shadow-lg">
      <div className="flex flex-col items-start bg-orange-500 p-4">
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
