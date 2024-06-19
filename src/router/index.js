import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mail from "../pages/mail";
import User from "../pages/user";
import pageOne from "../pages/other/pageOne";
import pageTwo from '../pages/other/pageTwo'
import Login from "../pages/login";

function RequireLogin({ children, ...props }) {
  function checkUserAuthentication() {
    // 检查你的应用的登录状态，例如，你可能在本地存储中保存登录凭据：
    const token = localStorage.getItem("token");

    // 如果 token 存在且有效，则用户已经登录：
    if (token) {
      return true;
    }

    // 否则，用户尚未登录：
    return false;
  }
  let isLoggedIn = checkUserAuthentication();
  return isLoggedIn ? children : <Navigate to="/login" />;
}

const router = [
  {
    path:'/login',
    element:<Login />
  },
  {
    path: '/',
    element: <RequireLogin><Main /></RequireLogin>,
    children: [
      {
        path: '/',
        element: <Navigate to='home' replace />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'mail',
        element: <Mail />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'other',
        children: [
          {
            path: 'pageOne',
            Component: pageOne
          },
          {
            path: 'pageTwo',
            Component: pageTwo
          }
        ]
      }
    ]
  }
]

export default createBrowserRouter(router)