import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-4 w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-start font-medium py-8 ps-8">Product Name</th>
            <th className="text-start font-medium pe-6">Category</th>
            <th className="text-start font-medium pe-6 ">Qty</th>
            <th className="text-start font-medium pe-6">Price</th>
            <th className="text-center font-medium pe-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-12 col-span-5" colSpan={5} align="center">
              <RotateLoader
                color="orange"
                loading={loading}
                cssOverride={{
                  justifyContent: "center",
                  // marginLeft: "50%",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table className=" h-[50%] mt-4 mb-6 text-gray-500 bg-white rounded-3xl drop-shadow-lg col-span-2">
        <thead className="border-b-2">
          <tr>
            <th className="text-start font-medium py-8 ps-8">Top 5 Selling</th>
            <th className="text-start font-medium pe-6">Sold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-12 col-span-5" colSpan={5} align="center">
              <RotateLoader
                color="orange"
                loading={loading}
                cssOverride={{
                  justifyContent: "center",
                  // marginLeft: "50%",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
