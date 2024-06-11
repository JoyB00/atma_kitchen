import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetIngredientUsageReport } from "../../../api/ReportApi.jsx";
import { useState, useRef } from "react";
import React from "react";
import { RotateLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import Button from "../../../Component/Button.jsx";

export function IngredientUsageReportBody() {
  const [from, setFrom] = useState(new Date().toISOString());
  const [to, setTo] = useState(new Date().toISOString());

  const ingredientUsageList = useQuery({
    queryKey: ["ingredientUsage"],
    queryFn: () =>
      GetIngredientUsageReport({
        from: from,
        to: to,
      }),
  });
  const ref = React.createRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const queryClient = useQueryClient();

  const Body = React.forwardRef((props, ref) => (
    <div ref={ref} className="px-6">
      <h1 className="text-4xl font-semibold">Atma Kitchen</h1>
      <p>Jl. Centralpark No. 10 Yogyakarta</p>

      <div className="flex flex-col py-8">
        <span>Ingredient Usage Report</span>
        <span>Print date: {new Date().toDateString()}</span>
      </div>
      {ingredientUsageList.isFetching ? (
        <RotateLoader
          color="orange"
          loading={true}
          cssOverride={{
            justifyContent: "center",
            // marginLeft: "50%",
            borderColor: "red",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <IngredientUsageTable ingredients={ingredientUsageList.data} />
      )}
    </div>
  ));

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-lg border-none bg-gray-200 p-2"
        />
        <div className="px-2" />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-lg border-none bg-gray-200 p-2"
        />
        <div className="px-2" />
        <Button
          onClick={() => queryClient.invalidateQueries(["ingredientUsage"])}
        >
          Regenerate
        </Button>
        <div className="px-2" />
        <Button className="bg-orange-500 text-white" onClick={handlePrint}>
          Print Report
        </Button>
      </div>
      <div className="pt-8">
        <Body ref={ref} />
      </div>
    </div>
  );
}

export function IngredientUsageTable({ ingredients }) {
  return (
    <table className="w-full rounded-xl bg-white">
      <thead>
        <tr>
          <th className="py-4 ps-8">Name</th>
          <th className="py-4">Unit</th>
          <th className="py-4 pe-8">Amount</th>
        </tr>
      </thead>

      {ingredients.data.map((item, i) => (
        <tr key={i}>
          <td className="ps-8">{item.ingredients.ingredient_name}</td>
          <td>{item.ingredients.unit}</td>
          <td className="pe-8">{item.quantity}</td>
        </tr>
      ))}
    </table>
  );
}
