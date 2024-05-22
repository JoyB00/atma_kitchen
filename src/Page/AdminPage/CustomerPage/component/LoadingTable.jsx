import { RotateLoader } from "react-spinners";
export default function LoadingTable({ loading }) {
  return (
    <>
      <table className="col-span-6 mb-6 mt-4 w-full  rounded-2xl bg-white text-gray-500 drop-shadow-md">
        <thead className="border-b-2">
          <tr>
            <tr>
              <th className="py-8 ps-8 text-start text-sm font-medium">
                Full Name
              </th>
              <th className="pe-6 text-start text-sm font-medium ">Email</th>
              <th className="pe-6 text-start text-sm font-medium ">
                Phone Number
              </th>
              <th className="pe-6 text-start text-sm font-medium">
                Date Of Birth
              </th>
              <th className="pe-6 text-center text-sm font-medium">Point</th>
              <th className="pe text-center text-sm font-medium">
                Nominal Balance
              </th>
            </tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="col-span-5 py-12" colSpan={6} align="center">
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
