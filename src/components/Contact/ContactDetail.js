import React from "react";
import './ContactDetail.less'
import {Tabs} from "antd";
import {IdcardTwoTone, MailOutlined, PhoneOutlined, WechatOutlined} from "@ant-design/icons";
import { Typography, Divider } from 'antd';
import {connect} from "react-redux";
const { Paragraph, Text } = Typography;

class ContactDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            WeChat:'',
            Phone:'',
            Email:''
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData(){
        this.props.db.collection("lxfs").get().then(r=>{
            this.setState({
                ...r.data[0]
            })
        })
    }

    render() {
        return (
            <div className='ContactDetail'>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab={<span><IdcardTwoTone />联系方式</span>} key="1">
                        <Paragraph><Text type="secondary">WeChat</Text></Paragraph>
                        <Paragraph copyable={{ text: 'cxs8462' }}>
                            <Text className='lxfsText'><WechatOutlined className='lxfsIcon'/>{this.state.WeChat}</Text>
                        </Paragraph>
                        <Paragraph><Text type="secondary">Phone</Text></Paragraph>
                        <Paragraph>
                            <Text className='lxfsText'><PhoneOutlined className='lxfsIcon'/>{this.state.Phone}</Text>
                        </Paragraph>
                        <Paragraph><Text type="secondary">Email</Text></Paragraph>
                        <Paragraph copyable={{ text: '1296787743@qq.com' }}>
                            <Text className='lxfsText'><MailOutlined className='lxfsIcon'/>{this.state.Email}</Text>
                        </Paragraph>
                        <Divider/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const state = state=>({db: state.db})

export default connect(state,null)(ContactDetail)
