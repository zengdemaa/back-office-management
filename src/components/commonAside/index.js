import React from "react"
import MenuConfig from '../../config/index'
import * as Icon from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMenuList } from "../../store/reducers/tab"

import { Layout, Menu } from 'antd';

const { Sider } = Layout;

// 动态获取icon图标
const iconToElement = (name) => React.createElement(Icon[name])

// 处理菜单的数据
const items = MenuConfig.map((icon) => {
  // 没有子菜单
  const child = {
    key: icon.path,
    icon: iconToElement(icon.icon),
    label: icon.label
  }
  // 有子菜单
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return {
        key: item.path,
        label: item.label
      }
    })
  }
  return child
})



const CommonAside = ({ collapce }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 通过dispath调用reducers方法并传数据
  const setTabList = (val) => {
    dispatch(selectMenuList(val))
  }
  // 点击菜单跳转
  const selectMenu = (e) => {
    let data
    MenuConfig.forEach(item => {
      // 找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find(child => {
            return child.path === e.key
          })
        }
      }
    })
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label
    })
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsed={collapce} >
      <h3 className="app-name">{collapce ? '后台' : '后台管理系统'}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{ height: '100%' }}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside