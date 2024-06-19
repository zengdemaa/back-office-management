import http from './axios'

export const getData = () => {
  return http.request({
    url: '/home/getData',
    method: 'get',
    params: {}
  })
}
// params：通常在GET请求中使用，用来向服务器发送一些参数或者查询条件，通常将数据添加到请求的URL后面。
export const getUser = (params) => {
  return http.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
// data: 通常在POST请求中使用，用来向服务器发送一些应用/用户的数据，数据被包含在请求体（request body）中。
export const addUser = (data) => {
  return http.request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  return http.request({
    url: '/user/editUser',
    method: 'post',
    data
  })
}

export const deleteUser = (data) => {
  return http.request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}

export const getMenu = (data) => {
  return http.request({
    url: '/permission/getMenu',
    method: 'post',
    data
  })
}