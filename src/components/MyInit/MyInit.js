import React from "react";
import './MyInit.less'
import {Tabs,Typography, Divider} from "antd";
import {SmileTwoTone} from "@ant-design/icons";
import {connect} from "react-redux";
const { Title, Paragraph, Text } = Typography;

class MyInit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introduce:[],
            skill:[]
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData(){
        this.props.db.collection("MyIni").get().then(r=>{
            this.setState({
                introduce: [...r.data[0]["introduce"]],
                skill: [...r.data[1]["skill"]],
            })
        })
    }

    render() {
        return (
            <div className='MyInit'>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab={<span><SmileTwoTone />我的信息</span>} key="1">
                        <Title level={4}>个人简历</Title>
                        <Paragraph>
                            个人介绍：
                            <pre className='introduce'>
                                {this.state.introduce.map(r=><p key={r}>{r}</p>)}
                            </pre>
                        </Paragraph>
                        <Paragraph>
                            技术栈：
                            {this.state.skill.map(r=><Text key={r} keyboard>{r}</Text>)}
                        </Paragraph>
                        <Divider/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}
const state = state=>({db: state.db})
export default connect(state,null)(MyInit)
