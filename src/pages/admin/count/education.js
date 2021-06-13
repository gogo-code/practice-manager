import React, { Component } from "react";
import * as echarts from "echarts";

export default class Education extends Component {
  state = {
      
    data: [
      {
        name: "博士",
        value: 120,
      },
      {
        name: "硕士",
        value: 86,
      },
      {
        name: "本科",
        value: 70,
      },
      {
        name: "专科",
        value: 30,
      },
      {
        name: "其他",
        value: 30,
      },
    ],
  };
  componentDidMount() {
    let myChart = echarts.init(document.getElementById("education"));
    myChart.setOption(this.getOption());
  }
  getOption = () => {
    const { data } = this.state;
    // 最大值
    const max = 130;

    const option = {
      tooltip: {},
      radar: {
        name: {
          textStyle: {
            color: "#999999",
          },
        },
        indicator: data.map((item) => {
          return { name: item.name, max: max };
        }),
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: data.map((item) => item.value),
              name: "学历结构分析",
              itemStyle: {
                normal: {
                  color: "#1890FF",
                },
              },
              areaStyle: {
                normal: {
                  color: "rgba(24,144,255,0.2)",
                },
              },
            },
          ],
        },
      ],
    };
    return option;
  };

  render() {
      
    return (
      <div
        style={{
          width: 457,
          height: 300,
          margin: "0 auto",
        }}
        id="education"
      ></div>
    );
  }
}
