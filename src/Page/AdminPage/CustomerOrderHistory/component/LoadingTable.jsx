import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-6 mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="py-8 ps-8 text-start font-medium">Status</th>
            <th className="text-start font-medium ">Details</th>
            <th className="text-start font-medium ">Order Date</th>
            <th className="text-start font-medium ">Paid Off Date</th>
            <th className="text-start font-medium ">Pick Up Date</th>
            <th className="text-start font-medium ">Payment Method</th>
            <th className="text-center font-medium ">Used Point</th>
            <th className="text-center font-medium ">Earned Point</th>
            <th className="text-center font-medium ">Total Price</th>
            <th className="pe-6 text-center font-medium">Tip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col-span-5 py-12" colSpan={10} align="center">
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
