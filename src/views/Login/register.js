import React, {useEffect, useState} from "react";
import './register.less'
import {Button, Col, Form, Input, Row, Tabs, Typography,message} from "antd";
import {IdcardTwoTone, LockOutlined,MailOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
const { Title } = Typography;

function Register({history,user}){
    const [loading,setLoading] = useState(false);
    const onFinish = e=>{
        setLoading(true)
        const {email, password} = e
        user.auth().signUpWithEmailAndPassword(email, password)
            .then((r) => {
                message.success('发送邮件成功！请前往邮箱继续')
                setLoading(false)
                // 发送验证邮件成功
            }).catch(r=>{
                console.log('err',r.message)
            message.error('邮箱已被注册或者邮箱有误！')
            setLoading(false)
        });
    }
    const goLogin = ()=>{
        history.push('/login');
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
                <div className='register'>
                    <div className="loginBox">
                        <Title level={3}>New User</Title>
                        <Tabs defaultActiveKey="1" centered>
                            <Tabs.TabPane tab={<span><IdcardTwoTone />注册</span>} key="1">
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
                                        rules={[{ required: true, message: '请输入密码!' },() => ({
                                            validator(_, value) {
                                                if (value.length>=8 && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('密码格式不正确!'));
                                            },
                                        })]}
                                    >
                                        <Input.Password max={32} placeholder='密码' prefix={<LockOutlined />} allowClear/>
                                    </Form.Item>
                                    <Form.Item
                                        name="qrmm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: '请再次输入密码!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('两次密码不一致!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder='重复密码' allowClear/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button loading={loading} block type="primary" htmlType="submit">
                                            注册
                                        </Button>
                                        <Button onClick={goLogin} style={{marginTop:'10px'}} block>
                                            返回
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </Col>
            <Col xs={24} sm={0} md={0} lg={0} xl={0}>
                <div className='Login'>
                    <div className="loginBoxPhone">
                        <Title level={3}>New User</Title>
                        <Tabs defaultActiveKey="1" centered>
                            <Tabs.TabPane tab={<span><IdcardTwoTone />注册</span>} key="1">
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
                                        rules={[{ required: true, message: '请输入密码!' },() => ({
                                            validator(_, value) {
                                                if (value.length>=8 && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('密码格式不正确!'));
                                            },
                                        })]}
                                    >
                                        <Input.Password max={32} placeholder='密码' prefix={<LockOutlined />} allowClear/>
                                    </Form.Item>
                                    <Form.Item
                                        name="qrmm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: '请再次输入密码!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('两次密码不一致!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder='重复密码' allowClear/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button loading={loading} block type="primary" htmlType="submit">
                                            注册
                                        </Button>
                                        <Button onClick={goLogin} style={{marginTop:'10px'}} block>
                                            返回
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

const mapState = state=>({user:state.App})

export default connect(mapState,null)(React.memo(Register))
