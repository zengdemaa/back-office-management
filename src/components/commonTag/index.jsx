import React from "react"
import { Tag, Space } from "antd"
import './commonTag.css'
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { closeTab, setCurrentMenu } from "../../store/reducers/tab"

const CommonTag = () => {
  const tabList = useSelector(state => state.tab.tabList)
  // 当前选中的数据
  const currentMENU = useSelector(state => state.tab.currentMenu)
  // 获取当前路由信息
  const action = useLocation()
  const navigate = useNavigate()

  const dispath = useDispatch()
  // 关闭tag逻辑
  const handelClickClose = (tag, index) => {
    dispath(closeTab(tag))
    // 索引
    let length = tabList.length - 1
    // 如果关闭的不是当前的tag
    if (tag.path !== action.pathname) {
      return
    }
    if (index === length) {
      // 设置当前数据
      const currentData = tabList[index - 1]
      dispath(setCurrentMenu(currentData))
      navigate(currentData.path)
    } else {
      // 如果tags至少存在一个数据，那么选择后一个tag
      if (tabList.length > 1) {
        // 跳转到下一个tag
        const nextData = tabList[index + 1]
        dispath(setCurrentMenu(nextData))
        navigate(nextData.path)
      }
    }
  }

  // 点击Tag跳转
  const handelChange = (tag) => {
    dispath(setCurrentMenu(tag))
    navigate(tag.path)
  }

  // tag显示
  const setTag = (flag, item, index) => {
    // 判断高亮还是非高亮
    return (
      flag ?
        <Tag color="#55acee" closeIcon onClose={() => handelClickClose(item, index)} key={item.name}>{item.label}</Tag>
        :
        <Tag onClick={() => handelChange(item)} key={item.name}>{item.label}</Tag>
    )

  }
  return (
    <Space size={[0, 8]} className="common-tag">
      {
        // 判断当前选中的数据是否存在，渲染逻辑涉及到当前tag的判断逻辑，多个层级的html渲染，拆分成多个不同的函数进行处理
        // item.path === currentMENU.path判断是否为选中的那一项
        currentMENU.name && tabList.map((item, index) => (setTag(item.path === currentMENU.path, item, index)))
      }
    </Space>
  )
}

export default CommonTag