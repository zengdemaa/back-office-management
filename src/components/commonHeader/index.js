import React from "react";
import { Button, Layout, Avatar, Dropdown } from 'antd';
import userAvatar from '../../images/user.jpg'
import './Header.css'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
// useSelector 从 store 中读取数据，使用 useDispatch dispatch actions。创建包含 <Counter> 组件的
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducers/tab";
import { useNavigate } from "react-router-dom";

const { Header } = Layout

const CommonHeader = ({ collapce }) => {

  const navigate = useNavigate()
  // 登出
  const logOut = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => logOut()} target="_blank" rel="noopener noreferrer" >
          退出
        </a>
      ),
    },
  ];
  // 通过dispath
  const dispatch = useDispatch()

  //点击展开或收起
  const setCollapsed = () => {
    dispatch(collapseMenu())
  }

  return (
    <Header className="header-container">
      <Button
        icon={collapce ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        type="text"
        onClick={() => { setCollapsed() }}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
      />
      <Dropdown
        menu={{ items }}
      >
        <Avatar src={userAvatar} size={48} />
      </Dropdown>
    </Header>
  )
}

export default CommonHeader