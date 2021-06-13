import React, { Component } from "react";
import * as echarts from "echarts";
import { queryteacherToStudent } from "@/api/adminApi/count";
export default class departmentCount extends Component {
  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    queryteacherToStudent(params)
      .then((result) => {
        if (result && result.status === 1) {
          this.echartsShow(result.data);
        }
      })
      .catch(() => {
        // message.error("查询失败!");
        console.log('查询失败')
      });
  };
  echartsShow = (data) => {
    let myChart = echarts.init(document.getElementById("rate"));
    let bgColor = "#fff";

    let echartData = [
      {
        name: "在校学生",
        value: `${data[0].a}`,
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#4C8EFA",
              },
              {
                offset: 1,
                color: "#5CCFFF",
              },
            ]),
          },
        },
      },
      {
        name: "授课教师",
        value: `${data[1].a}`,
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FFD18C",
              },
              {
                offset: 1,
                color: "#FEAD5A",
              },
            ]),
          },
        },
      },
      {
        name: "总数",
        value: `${data[0].a+data[1].a}`,
        itemStyle: {
          color: "transparent",
        },
      },
    ];
    let echartData1 = [
      {
        name: "在校学生",
        value: `${data[0].a}`,
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(76,142,250,.15)",
              },
              {
                offset: 1,
                color: "rgba(92,207,255,.15)",
              },
            ]),
          },
        },
      },
      {
        name: "授课教师",
        value: `${data[1].a}`,
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255,209,140,.15)",
              },
              {
                offset: 1,
                color: "rgba(254,173,90,.15)",
              },
            ]),
          },
        },
      },
      {
        name: "总数",
        value: `${data[0].a+data[1].a}`,
        itemStyle: {
          color: "transparent",
        },
      },
    ];

    let option = {
      backgroundColor: bgColor,

      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{b}" + " " + "{c}" + "人",
      },
      title: {
        text: `${data[0].a+data[1].a}`, //主标题文本
        subtext: "全校人数", //副标题文本
        left: "center",
        top: "57%",
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
          align: "center",
        },
        subtextStyle: {
          fontSize: 14,
          fontWeight: 400,
          color: "#666",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["65", "107"],
          center: ["50%", "80%"],
          startAngle: 180,
          data: getData(echartData),
          hoverAnimation: true,
          labelLine: {
            normal: {
              length: 10,
              length2: 40,
              lineStyle: {
                color: "#e6e6e6",
              },
              minTurnAngle: 180,
            },
          },
          label: {
            formatter: "{name|{b}}\n{sum|{c}人}",
            padding: [0, -50, 0, -50],
            textStyle: {
              rich: {
                name: {
                  fontSize: 14,
                  color: "#666",
                  align: "center",
                  lineHeight: 16,
                },
                sum: {
                  fontSize: 13,
                  fontWeight: "600",
                  color: "#333",
                  align: "center",
                  lineHeight: 16,
                },
              },
            },
          },
        },
        {
          type: "pie",
          radius: ["65", "117"],
          center: ["50%", "80%"],
          startAngle: 180,
          data: echartData1,
          hoverAnimation: false,
          label: {
            show: false,
          },
          z: -1,
        },
      ],
    };

    function getData(arr) {
      arr.forEach((item) => {
        item.label = {
          show: (function () {
            if (item.value == `${data[0].a+data[1].a}`) {
              return false;
            } else {
              return true;
            }
          })(),
        };
        item.labelLine = {
          show: (function () {
            if (item.value == `${data[0].a+data[1].a}`) {
              return false;
            } else {
              return true;
            }
          })(),
        };
        item.tooltip = {
          show: (function () {
            if (item.value == `${data[0].a+data[1].a}`) {
              return false;
            } else {
              return true;
            }
          })(),
        };
      });
      return arr;
    }

    myChart.setOption(option);
  };

  render() {
    // 142饼状图
    return (
      <div
        style={{  height: 200, maxWidth:1800,margin: "0 auto",  }}
        id="rate"
      />
    );
  }
}
