import React, { Component } from "react";
import * as echarts from "echarts";

export default class index extends Component {
  componentDidMount() {
    let myChart = echarts.init(document.getElementById("classCount"));
    let bgColor = "#fff";
    let echartData = [
     
      {
        name: "审批中   ",
        value: "1",
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#A1AEFF",
              },
              {
                offset: 1,
                color: "#9686F3",
              },
            ]),
          },
        },
      },
      {
        name: "未通过   ",
        value: "1",
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FEAE5C",
              },
              {
                offset: 1,
                color: "#FECC84",
              },
            ]),
          },
        },
      },
      {
        name: "已通过   ",
        value: "1",
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#70F3C2",
              },
              {
                offset: 1,
                color: "#48D69E",
              },
            ]),
          },
        },
      },
      {
        name: "学校安排",
        value: "10",
        itemStyle: {
          normal: {
            //颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#3295FF",
              },
              {
                offset: 1,
                color: "#81BEFF",
              },
            ]),
          },
        },
      },
    ];
    let option = {
      backgroundColor: bgColor,
      legend: {
        // 垂直
        orient: "vertical",
        left: "60%",
        top: "18%",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 23,
        textAlign: "right",
        formatter: function (name) {
          let data = option.series[0].data;
          let tarValue = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          let blank = "     ";
          let singleBlank = "";
          for (let i = 0; i <= blank.length - (tarValue + "").length; i++) {
            singleBlank += "  ";
          }
          return (
            "{a|" +
            name +
            "}" +
            singleBlank +
            "{b|" +
            tarValue +
            "}" +
            " " +
            "人"
          );
          // '{a|`+name+`a}`+`{b|`+tarValue+`b}`+`个`;
        },
        textStyle: {
          rich: {
            a: {
              fontSize: 13,
              fontWeight: 400,
              color: "#333333",
              lineHeight: 13,
            },
            b: {
              fontSize: 13,
              fontWeight: "bold",
              color: "#333333",
              lineHeight: 13,
            },
          },
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}" + " " + "{d}" + "%",
      },
      title: {
        text: '', //主标题文本
        left: "20%",
        top: "37%",
        textStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
          align: "center",
        },
      },
      graphic: {
        //副标题
        type: "text",
        left: "19%",
        top: "55%",
        style: {
          text: "",
          textAlign: "center",
          color: "#666",
          fontSize: 14,
          fontWeight: 400,
        },
      },
      series: [
        {
          type: "pie",
          radius: ["0", "73"],
          center: ["27%", "50%"],
          data: echartData,
          hoverAnimation: true,
          labelLine: {
            normal: {
              length: 20,
              length2: 120,
              lineStyle: {
                color: "#e6e6e6",
              },
            },
          },
          label: {
            show: false,
          },
        },
      ],
    };

    myChart.setOption(option);
  }
  render() {
    // 142饼状图
    return <div style={{ width: 367, height: 200 }} id="classCount"></div>;
  }
}
