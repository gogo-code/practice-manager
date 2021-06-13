import React, { Component } from "react";
import * as echarts from "echarts";
import { querycollege } from "@/api/adminApi/count";
export default class departmentCount extends Component {
  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params) => {
    querycollege(params)
      .then((result) => {
        if (result && result.status === 1) {
          this.echartsShow(result.data);
        }
      })
      .catch(() => {
        // message.error("查询失败!");
        console.log("查询失败");
      });
  };

  echartsShow = (data) => {
    let myChart = echarts.init(document.getElementById("departmentCount"));
    let bgColor = "#fff";
    let option = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        axisLabel: { interval: 0, rotate: 30, align: "center", margin: 20 },
        data: [
          "法学院",
          "机械学院",
          "计算机学院",
          "建筑学院",
          "经济管理学院",
          "理学院",
          "美术学院",
          "医学院",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "学生人数",
          type: "bar",
          data: data.map(item => item.sum),
          barWidth: 20,
          itemStyle: {
            normal: {
              //颜色渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#02ede2",
                },
                {
                  offset: 1,
                  color: "#267ef8",
                },
              ]),
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  };

  render() {
    return (
      <div
        style={{ width: 457, height: 300, margin: "0 auto" }}
        id="departmentCount"
      ></div>
    );
  }
}
