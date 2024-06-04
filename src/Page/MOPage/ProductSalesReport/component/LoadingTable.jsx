import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className=" mb-6 mt-4 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-6 text-center font-medium">No</th>
            <th className="py-8 text-start font-medium ">Product</th>
            <th className="px-6 text-start font-medium ">Quantity</th>
            <th className="pe-6 text-start font-medium ">Price</th>
            <th className="pe-6 text-center font-medium ">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col-span-5 py-12" colSpan={5} align="center">
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
