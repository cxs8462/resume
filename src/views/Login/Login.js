import React, {useEffect, useState} from "react";
import './Login.less'
import {Button, Col, Form, Input, message, Row, Tabs, Typography} from "antd";
import {IdcardTwoTone, LockOutlined, MailOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
const { Title } = Typography;

function Login({history,user}){
    const [loading,setLoading] = useState(false);
    const onFinish = e=>{
        setLoading(true)
        const {email, password} = e
        user.auth()
            .signInWithEmailAndPassword(email, password)
            .then((loginState) => {
                // 登录成功
                message.success('登录成功！欢迎您'+email)
                setLoading(false)
                history.push('/');
            }).catch(r=>{
            message.error('邮箱或密码错误！')
            setLoading(false);
        });
    }
    const goRegister = ()=>{
        history.push('/register')
    }
    const goIndex = ()=>{
        history.push('/')
    }
    useEffect(()=>{
        if(user.auth().hasLoginState())
            goIndex();
    },[])
    return (
            <Row justify="center">
                <Col xs={0} sm={16} md={12} lg={12} xl={8}>
                    <div className='Login'>
                        <div className="loginBox">
                            <Title level={3}>Welcome</Title>
                            <Tabs defaultActiveKey="1" centered>
                                <Tabs.TabPane tab={<span><IdcardTwoTone />登录</span>} key="1">
                                    <Form
                                        name="user"
                                        wrapperCol={{ span: 16,offset:4 }}
                                        layout='Vertical'
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: '邮箱格式有误!',
                                                },
                                                {
                                                    required: true,
                                                    message: '请输入邮箱!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='邮箱' prefix={<MailOutlined />} allowClear/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: '请输入密码!' }]}
                                        >
                                            <Input.Password placeholder='密码' prefix={<LockOutlined />} allowClear/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button loading={loading} block type="primary" htmlType="submit">
                                                登 录
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <div className='set'>
                                        <Button type='link' onClick={goRegister}>注册</Button>
                                        <Button type='link' onClick={goIndex}>返回首页</Button>
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={0} md={0} lg={0} xl={0}>
                    <div className='Login'>
                        <div className="loginBoxPhone">
                            <Title level={3}>Welcome</Title>
                            <Tabs defaultActiveKey="1" centered>
                                <Tabs.TabPane tab={<span><IdcardTwoTone />登录</span>} key="1">
                                    <Form
                                        name="user"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16,offset:0 }}
                                        layout='Vertical'
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: '邮箱格式有误!',
                                                },
                                                {
                                                    required: true,
                                                    message: '请输入邮箱!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder='邮箱' prefix={<MailOutlined />} allowClear/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: '请输入密码!' }]}
                                        >
                                            <Input.Password placeholder='密码' prefix={<LockOutlined />} allowClear/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button loading={loading} block type="primary" htmlType="submit">
                                                登 录
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                    <div className='set'>
                                        <Button type='link' onClick={goRegister}>注册</Button>
                                        <Button type='link' onClick={goIndex}>返回首页</Button>
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                </Col>
            </Row>
    )
}

const mapState = state=>({user:state.App})

export default connect(mapState,null)(React.memo(Login))
