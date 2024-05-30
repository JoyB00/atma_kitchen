import Sidebar from "../../../AdminPage/AdminComponent/Sidebar/Sidebar";
import NavbarAdmin from "../../../AdminPage/AdminComponent/NavbarAdmin/NavbarAdmin";
import FooterDashboard from "../../../../Component/FooterDashboard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecapDataPage from "./RecapDataPage";

export default function RecapOrderPage() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const data = location.state;

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Memproses data untuk mendapatkan daftar produk dan kuantitas
    const tempProductList = {};
    data.transaction.forEach((transaction) => {
      transaction.transaction_details.forEach((detail) => {
        if (detail.hampers) {
          // Jika detail transaksi merupakan hampers
          detail.hampers.hampers_detail.forEach((hampersDetail) => {
            const productId = hampersDetail.product
              ? hampersDetail.product.product_name
              : null;
            const quantity = 1;
            if (productId) {
              if (tempProductList[productId]) {
                tempProductList[productId] += quantity;
              } else {
                tempProductList[productId] = quantity;
              }
            }
          });
        } else {
          // Jika detail transaksi bukan hampers
          const productId = detail.product.product_name;
          const quantity = detail.quantity;
          if (tempProductList[productId]) {
            tempProductList[productId] += quantity;
          } else {
            tempProductList[productId] = quantity;
          }
        }
      });
    });

    // Mengubah objek produk menjadi array
    const productListArray = Object.keys(tempProductList).map((productId) => ({
      id: productId,
      quantity: tempProductList[productId],
    }));

    // Menyimpan hasil di state
    setProductList(productListArray);
  }, []); // Tidak ada dependensi, useEffect hanya akan dijalankan sekali setelah komponen dimount

  return (
    <div className="flex size-full min-h-screen min-w-full items-start bg-orange-100/50">
      <Sidebar role={user.role_id} />
      {console.log("list", productList)}
      <div className=" w-[99vw] pe-[1rem] ps-[20.5rem] text-left text-black">
        <NavbarAdmin
          url={
            user.role_id == 2
              ? "/AdminDashboard"
              : user.role_id == 3
                ? "/MoDashboard/confirmationToProcess"
                : ""
          }
          page="Confirmation To Process"
          setSearch={setSearch}
        />
        <div className="mt-36 px-4 ">
          <div className="h-screen w-full rounded-3xl bg-white">
            <div className="rounded-t-3xl bg-orange-500 p-5 text-center text-white">
              <h1 className="font-semibold">DAILY ORDER LIST</h1>
              <p>{data.transaction[0].pickup_date.slice(0, 16)}</p>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1 p-3">
                <p>Order List</p>
                {data.transaction.map((item) => {
                  return (
                    <div className="mb-6">
                      <p>Nota Number : {item.transaction_number}</p>
                      <p>Name : {item.customer.users.fullName}</p>
                      <p>Time : {item.pickup_date.slice(11, 16)}</p>

                      {item.transaction_details.map((detail) => {
                        return (
                          <p>
                            {detail.quantity} {"   "}
                            {detail.product_id
                              ? detail.product.product_name
                              : detail.hampers.hampers_name}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 p-3">
                <p>Recap </p>
                {data.transaction.map((item) => {
                  return (
                    <>
                      {item.transaction_details.map((detail) => {
                        return (
                          <>
                            {detail.hampers_id ? (
                              <>
                                {detail.hampers.hampers_detail.map(
                                  (detailHampers) => {
                                    return (
                                      <>
                                        {detailHampers.product && (
                                          <p>
                                            {1} {"   "}
                                            {
                                              detailHampers.product
                                                ?.product_name
                                            }
                                          </p>
                                        )}
                                      </>
                                    );
                                  },
                                )}
                              </>
                            ) : (
                              <p>
                                {detail.quantity} {"   "}
                                {detail.product_id
                                  ? detail.product.product_name
                                  : detail.hampers.hampers_name}
                              </p>
                            )}
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
