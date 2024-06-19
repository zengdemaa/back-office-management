import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, message, Popconfirm, Modal, InputNumber, Select, DatePicker, } from "antd";
import './user.css'
import { getUser, addUser, editUser, deleteUser } from "../../api";
import dayjs from "dayjs";


const User = () => {
  const [userData, setUserData] = useState({
    name: ''
  })

  // 用户列表数据
  const [tableData, setTableData] = useState([])
  // 新增用户或编辑用户
  const handleCilck = (type, rowData) => {
    if (type === 'add') {//新增
      setModelTap(0)
    } else {//编辑
      setModelTap(1)
      /* 对数据进行深拷贝,cloneData和rowData之间没有引用关系，修改其中任意一个对象，都不会影响另一个,
      如果rowData中有函数、undefined或者symbol，在JSON.stringify的过程中会丢失。*/
      const cloneDate = JSON.parse(JSON.stringify(rowData))
      cloneDate.birth = dayjs(cloneDate.birth)
      // 表单数据的回填
      form.setFieldsValue(cloneDate)
    }
    setModelOpen(!modelOpen)
  }
  //提交信息处理
  const handelFinish = (e) => {
    setUserData({
      name: e.keyword
    })
    getTableData()
    e.keyword = null
    // console.log(e.keyword);  
  }

  // 表单数据
  const getTableData = () => {
    getUser(userData).then(({ data }) => {
      // console.log(res.data,'res');
      setTableData(data.list)
    })
  }
  useEffect(() => {
    // 调用后端接口获取用户列表数据
    getTableData()
  }, [getTableData])

  // 删除确认操作
  const handleDelet = ({id}) => {
    deleteUser({id}).then(()=>{
      getTableData()
    })
  }

  // 取消操作
  const cancel = (e) => {
    // console.log(e);
    message.error('Click on No');
  };

  // 表单数据处理
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      // 映射数据处理的逻辑
      key: 'sex',
      render: (sex) => {
        return sex ? '女' : '男'
      }
    },
    {
      title: '出生日期',
      key: 'birth',
      dataIndex: 'birth',
    },
    {
      title: '地址',
      key: 'addr',
      dataIndex: 'addr',
    },
    {
      title: '操作',
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button style={{ marginRight: '5px' }} onClick={() => handleCilck('edit', rowData)}>编辑</Button>
            <Popconfirm
              title="删除提示"
              description="此操作将删除该用户,请确定是否继续?"
              onConfirm={() => { handleDelet(rowData) }}
              onCancel={cancel}
              okText="确认"
              cancelText="取消"
            >
              <Button danger type="primary">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    },
  ];

  // 0代表新增，1代表编辑
  const [modelTap, setModelTap] = useState(0)

  // 对话框弹出控制
  const [modelOpen, setModelOpen] = useState(false)

  // 弹窗确定的事件
  const handelOk = () => {
    form.validateFields().then((val) => {
      // 对日期参数进行处理,格式化用format
      val.birth = dayjs(val.birth).format("YYYY-MM-DD")
      //调后端的接口
      if (modelTap) {//编辑
        editUser(val).then(() => {
          // console.log(val);
          handelCancel()
          getTableData()
        })
      } else {//新增
        // .then 成功的回调
        addUser(val).then(() => {
          handelCancel()
          getTableData()
        })
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  //弹窗取消的事件
  const handelCancel = () => {
    setModelOpen(false)
    form.resetFields()
  }

  //创建form实例
  const [form] = Form.useForm();

  return (
    <div className="users">
      <div className="flex-box space-between w100">
        <Button type="primary" onClick={() => handleCilck('add')}>+新增</Button>
        <Form
          layout="inline"
          onFinish={handelFinish}
        >
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="keyword">
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </div>
      <Table style={{marginTop:'20px'}} columns={columns} dataSource={tableData} rowKey={'id'} />
      <Modal
        title={modelTap ? '编辑用户' : '新增用户'}
        open={modelOpen}
        onOk={handelOk}
        onCancel={handelCancel}
        okText='确定'
        cancelText='取消'
      >
        <Form
          labelAlign="left"
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 18
          }}
          style={{
            maxWidth: 600
          }}
          form={form}
        >
          {
            modelTap == 1 &&
            <Form.Item
              name='id'
              hidden
            >
              <Input />
            </Form.Item>
          }

          <Form.Item
            name='name'
            label='姓名'
            rules={[
              {
                required: true,
                message: '请填写你的姓名',
              }
            ]}
          >
            <Input placeholder="请填写你的姓名" />
          </Form.Item>
          <Form.Item
            name='age'
            label='年龄'
            rules={[
              {
                required: true,
                message: '请填写你的年龄',
              },
              {
                type: Number,
                message: '年龄必须是数字'
              }
            ]}
          >
            <InputNumber placeholder="请填写你的年龄" />
          </Form.Item>
          <Form.Item
            name='sex'
            label='性别'
            rules={[
              {
                required: true,
                message: '请选择你的性别',
              }
            ]}
          >
            <Select
              placeholder='请选择你的性别'
              style={{
                width: 120,
              }}
              options={[
                {
                  value: '0',
                  label: '男',
                },
                {
                  value: '1',
                  label: '女',
                },
                {
                  value: 'NaN',
                  label: '不能选中',
                  disabled: true
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name='birth'
            label='出生日期'
            rules={[
              {
                required: true,
                message: '请填写你的出生日期',
              }
            ]}
          >
            <DatePicker placeholder="请选择" format='YYYY/MM/DD' />
          </Form.Item>
          <Form.Item
            name='addr'
            label='地址'
            rules={[
              {
                required: true,
                message: '请填写你的地址',
              }
            ]}
          >
            <Input placeholder="请填写你的地址"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User