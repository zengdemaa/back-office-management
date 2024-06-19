import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// 创建拦截接口
Mock.mock(/home\/getData/,homeApi.getStatisticalData)
// 获取用户数据
Mock.mock(/user\/getUser/,userApi.getUserList)
// 新增用户数据
Mock.mock(/user\/addUser/,'post',userApi.createUser)
// 编辑用户数据
Mock.mock(/user\/editUser/,'post',userApi.updateUser)

Mock.mock(/user\/deleteUser/,'post',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)