import { createSlice } from "@reduxjs/toolkit";
// 利用createSlice创建reducer

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapce: false,
    tabList: [
      {
        path: '/',
        name: 'home',
        label: '首页'
      }
    ],
    currentMenu: {}
  },
  // 通过reducer来接收一个action,通过action来修改state
  reducers: {
    // 必须是一个纯函数
    collapseMenu: state => {
      state.isCollapce = !state.isCollapce
    },
    selectMenuList: (state, { payload: val }) => {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else if (val.name === 'home' && state.tabList.length === 1) {
        state.currentMenu = {}
      }
    },
    closeTab: (state, { payload: val }) => {
      const result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    },
    setCurrentMenu:(state,{payload:val})=>{
      if(val.name === 'home'){
        state.currentMenu={}
      }else{
        state.currentMenu=val
      }
    }
  }
})

// actions会包含redeucers所有的方法
export const { collapseMenu, selectMenuList, closeTab,setCurrentMenu } = tabSlice.actions
export default tabSlice.reducer