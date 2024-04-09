import { faChartLine, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarChart from "../../component/BarChart";
import LineChart from "../../component/LineChart";
import * as chart from "../../variable/chart";
export default function GraphSection() {
  return (
    /* Bar Chart */
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="col-span-2 rounded-2xl bg-white px-4 flex justify-start py-12 drop-shadow-sm h-[340px]">
        <div className="w-full h-full">
          <div className="flex justify-between px-4">
            <h1 className="text-xl font-semibold">Annual Sales</h1>
            <p className="rounded-2xl bg-orange-50 p-2 hover:bg-orange-100">
              <FontAwesomeIcon icon={faChartSimple} size="xl" color="orange" />
            </p>
          </div>
          <BarChart
            chartData={chart.barChartDataConsumption}
            chartOptions={chart.barChartOptionsConsumption}
          />
        </div>
      </div>
      {/* Line Chart */}
      <div className="col-span-2 rounded-2xl bg-white px-4 flex py-12 drop-shadow-sm h-[340px]">
        <div className="w-full h-full">
          <div className="flex justify-between px-4">
            <h1 className="text-xl font-semibold">Annual Sales Revenue</h1>
            <p className="rounded-2xl bg-orange-50 p-2 hover:bg-orange-100">
              <FontAwesomeIcon icon={faChartLine} size="xl" color="orange" />
            </p>
          </div>
          <div className="grid grid-cols-4 h-full">
            <div className="col-span-1 ps-4">
              <p className="text-2xl font-semibold">Rp 150K</p>
            </div>
            <div className="col-span-3 h-full">
              <LineChart
                chartData={chart.lineChartDataTotalSpent}
                chartOptions={chart.lineChartOptionsTotalSpent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
