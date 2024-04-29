import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-4 w-full mt-4 mb-6  text-gray-500 bg-white rounded-2xl drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="text-center font-medium px-6">No</th>
            <th className="text-start font-medium py-8 ">Procurement Date</th>
            <th className="text-start font-medium pe-6 ">Details</th>
            <th className="text-start font-medium pe-6 ">Total Price</th>
            <th className="text-start font-medium pe-6 ">Actions</th>
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
