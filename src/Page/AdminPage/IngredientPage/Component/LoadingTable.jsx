import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-6 mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <th className="py-8 ps-8 text-start font-medium">
              Ingredient Name
            </th>
            <th className="pe-6 text-start font-medium ">Qty</th>
            <th className="pe-6 text-start font-medium">Unit</th>
            <th className="pe-6 text-center font-medium">Action</th>
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
