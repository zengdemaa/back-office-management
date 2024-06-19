import React from "react";
import './login.css'
import { Form, Input, Button, message } from 'antd'
import { getMenu } from '../../api'
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  if(localStorage.getItem('token')){
    return <Navigate to="/home" replace/>
  }

  const handelSubmit = (val) => {
    if (!val.username || !val.password) {
      return message.open({
        type: 'error',
        content: '请输入账号和密码',
      })
    }
    getMenu(val).then(({ data }) => {
      console.log(data);
      localStorage.setItem('token',data.data.token)
      navigate('/home')
    })
  }

  return (
    <Form className="login-container" onFinish={handelSubmit}>
      <div className="login_title">系统登录</div>
      <Form.Item
        label="账号"
        name="username"
      >
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login