import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from 'antd';
import './home.css'
import { getData } from '../../api/index'
import * as Icon from '@ant-design/icons'
import Echarts from "../../components/Echarts";

// 列表 列数据
const columns = [
  {
    title: '课程',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
]

//订单数据
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]

// 动态获取icon图标
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
  const userImg = require('../../images/user.jpg')
  // 创建Echart响应式数据
  const [echartsData, setEcharsData] = useState({})

  useEffect(() => {
    getData().then(({ data }) => {
      // console.log(data.data, 'res');
      const { tableData, orderData, userData, videoData } = data.data
      setTabelData(tableData)

      // 对于Echarts数据的组装
      const order = orderData
      // x轴数据
      const xData = order.date
      // series数据的组装,利用Objuct的keys将key转换为一个数组
      const keyArray = Object.keys(order.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        })
      })

      setEcharsData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              name: "当日销量图",
              data: videoData,
              type: 'pie'
            }
          ]
        }
      })
    })
  }, [])
  // 定义Table数据

  const [tableData, setTabelData] = useState([])
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} alt=""/>
            <div className="userInfo">
              <p className="userName">Admin</p>
              <p className="userAccess">法王</p>
            </div>
          </div>
          <div className="loginInfo">
            <p>上次登录时间：<span>2021-7-19</span></p>
            <p>上次登录地点：<span>哈尔滨</span></p>
          </div>
        </Card>
        <Card hoverable className="table">
          <Table columns={columns} dataSource={tableData} pagination={false} rowKey={'name'} />
        </Card>
      </Col>
      <Col span={16}>
        <div className="orders">
          {
            countData.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="icon-Box" style={{ backgroundColor: item.color }}>
                    {iconToElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="ordersValue">￥{item.value}</p>
                    <p className="ordersName">{item.name}</p>
                  </div>
                </Card>
              )
            })
          }
        </div>
        {echartsData.order && <Echarts charData={echartsData.order} style={{ height: '280px' }} />}
        <div className="user-video">
          {echartsData.user && <Echarts charData={echartsData.user} style={{ height: '240px', width: '50%' }} />}
          {echartsData.video && <Echarts charData={echartsData.video} style={{ height: '260px', width: '50%' }} isAxisChart={false} />}
        </div>
      </Col>
    </Row>
  )
}

export default Home