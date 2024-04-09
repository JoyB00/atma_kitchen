import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charData: [],
      charOptions: {},
    };
  }
  componentDidMount() {
    this.setState({
      charData: this.props.chartData,
      charOptions: this.props.chartOptions,
    });
  }
  render() {
    return (
      <Chart
        options={this.state.charOptions}
        series={this.state.charData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
