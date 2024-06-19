import React from "react";
// 给子路由一个出口
import { Outlet } from "react-router-dom";

import { Layout, theme } from 'antd';
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import CommonTag from "../components/commonTag";
import { useSelector } from "react-redux";
const { Content } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const collapce = useSelector(state => state.tab.isCollapce)

  return (
    <Layout className="main-container">
      <CommonAside collapce={collapce}/>
      <Layout>
        <CommonHeader collapce={collapce}/>
        <CommonTag />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main