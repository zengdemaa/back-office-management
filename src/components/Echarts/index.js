import React, { useEffect,useRef } from "react";
import * as echarts from 'echarts';

// Echarts的配置数据
// 有坐标系
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
}

// 无坐标系
const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
}

const Echarts = ({ style, charData, isAxisChart = true }) => {
  // 通过echarts.current获取实例
  const echartsRef = useRef()
  // 设置一个响应式变量，不影响页面渲染
  let echartsObj = useRef(null)
  useEffect(() => {
    let options
    //echarts的初始化 
    echartsObj.current = echarts.init(echartsRef.current)
    //设置option
    if (isAxisChart) {
      axisOption.xAxis.data = charData.xData
      // 通过series进行传递
      axisOption.series = charData.series
      options = axisOption
    } else {
      normalOption.series = charData.series
      options = normalOption
    }
    echartsObj.current.setOption(options)
  }, [charData])
  return (
    <div style={style} ref={echartsRef}></div>
  )
}

export default Echarts