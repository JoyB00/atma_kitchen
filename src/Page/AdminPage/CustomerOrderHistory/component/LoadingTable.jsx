import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-6 w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-start font-medium py-8 ps-8">Status</th>
            <th className="text-start font-medium ">Details</th>
            <th className="text-start font-medium ">Order Date</th>
            <th className="text-start font-medium ">Paid Off Date</th>
            <th className="text-start font-medium ">Pick Up Date</th>
            <th className="text-start font-medium ">Payment Method</th>
            <th className="text-center font-medium ">Used Point</th>
            <th className="text-center font-medium ">Earned Point</th>
            <th className="text-center font-medium ">Total Price</th>
            <th className="text-center font-medium pe-6">Tip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-12 col-span-5" colSpan={10} align="center">
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
