import React,{lazy} from "react";
import Header from "../../components/Header/Header";
import {connect} from "react-redux";
import './home.less'
import {Col, Row} from "antd";
import {SuspenseComponent} from "../../components/SuspenseComponent";
const Card = props=>SuspenseComponent(props,lazy(()=>import("../../components/Card/Card")),'300px');
const MyInit = props=>SuspenseComponent(props,lazy(()=>import("../../components/MyInit/MyInit")),'300px');
const ContactDetail = props=>SuspenseComponent(props,lazy(()=>import("../../components/Contact/ContactDetail")),'300px');
const Message = props=>SuspenseComponent(props,lazy(()=>import("../../components/Message/Message")),'300px');


class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            user:this.props.app.auth().hasLoginState()
        }
    }
    goLogin(){
        this.props.history.push('/login')
    }
    signOut(){
        this.props.app.auth().signOut().then(r=>{
            window.location.reload();
        })
    }
    render() {
        return (
            <div className='home'>
                <Header userInfo={this.state.user} signOut={this.signOut.bind(this)} goLogin={this.goLogin.bind(this)}/>
                <div className="content">
                    <Row gutter={[24,24]}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <Card/>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16} xl={18}>
                            <MyInit/>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                            <ContactDetail/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Message/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
const userInfo = state=>({app:state.App});
export default connect(userInfo,null)(Home);

