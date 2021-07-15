import React from "react";
import './Card.less'
import {Button, Divider, Skeleton, Statistic, Tooltip} from "antd";
import {BookTwoTone, EyeTwoTone, HeartTwoTone, InfoCircleOutlined} from "@ant-design/icons";
import {Motion, spring} from "react-motion";
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from "react-redux";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailShow: false,
            list: [],
            count:{
                read:0,
                article:0,
                Favorites:0
            }
        }
    }
    componentDidMount() {
        this.getData();
    }

    getData(){
        this.props.db.collection("CSDN").get().then(r=>{
            this.setState({
                count: {...r.data[0]}
            })
        })
    }

    changeDetail() {
        if (!this.state.detailShow) {
            this.setState({detailShow: true, list: []})
            this.props.db.collection("CSDN").get().then(r=>{
                this.addItem(r.data[1].list.slice(0,7))
            })
        } else {
            this.setState({detailShow: false})
        }
    }

    addItem(arr) {
        for (let i = 0; i < arr.length; i++) {
            setTimeout(() => {
                const s = this.state.list.slice();
                s.push(arr[i]);
                this.setState({list: s})
            }, i * 100)
        }
    }
    goArticle(url){
        window.open(url)
    }

    render() {
        return (
            <div className="CardBox">
                <div className={["Card", this.state.detailShow ? "CardTop" : ""].join(" ")}>
                    <div className="title">
                        <Button size='large' type='link' onClick={this.goArticle.bind(this,"https://blog.csdn.net/ZuoZuoDangerou")}>CSDN</Button>
                        <div className="right">
                            <Tooltip title="我的博客">
                                <InfoCircleOutlined/>
                            </Tooltip>
                        </div>
                    </div>
                    <Divider className='fgx'/>
                    <div className="statis">
                        <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.count.read, {stiffness: 120, damping: 70})}}>
                            {value => <Statistic title="阅读量" value={Math.floor(value.x)} prefix={<EyeTwoTone/>}/>}
                        </Motion>
                        <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.count.article, {stiffness: 20, damping: 10})}}>
                            {value => <Statistic title="文章数" value={Math.floor(value.x)} prefix={<BookTwoTone/>}/>}
                        </Motion>
                        <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.count.Favorites, {stiffness: 20, damping: 10})}}>
                            {value => <Statistic title="收藏数" value={Math.floor(value.x)} prefix={<HeartTwoTone/>}/>}
                        </Motion>
                    </div>
                    <Divider className='fgx'/>
                    <div className="bottom">
                        <div className="left">
                            博文数据
                        </div>
                        <Button type='link' onClick={this.changeDetail.bind(this)}>切换文章列表</Button>
                    </div>
                </div>
                <div className={["CardList", this.state.detailShow ? "CardTop" : ""].join(" ")}>
                    <div className="title">
                        <Button size='large' type='link'>最新博文</Button>
                        <div className="right">
                            <Tooltip title="最新的博文列表">
                                <InfoCircleOutlined/>
                            </Tooltip>
                        </div>
                    </div>
                    <Divider className='fgx'/>
                    <div className="list">
                        {this.state.list.length?
                            <TransitionGroup>
                                {this.state.list.map((r, index) =>
                                    <CSSTransition key={r.title} classNames='listEnter' timeout={500}>
                                        <div className='listItemBox'>
                                            <p onClick={this.goArticle.bind(this,r.url)} className="listItem">{index + 1}、{r.title}</p>
                                            <span>{r.time}</span>
                                        </div>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            :
                            <div className='enty'>
                                <Skeleton.Input style={{ height:'20px' }} active />
                                <Skeleton.Input style={{ marginTop:'5px',height:'20px' }} active />
                                <Skeleton.Input style={{ marginTop:'5px',height:'20px' }} active />
                                <Skeleton.Input style={{ marginTop:'5px',height:'20px' }} active />
                                <Skeleton.Input style={{ marginTop:'5px',height:'20px' }} active />
                            </div>
                        }
                    </div>
                    <Divider className='fgx'/>
                    <div className="bottom">
                        <div className="left">
                            博文条目
                        </div>
                        <Button type='link' onClick={this.changeDetail.bind(this)}>切换博文数据</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const state = state=>({db: state.db})

export default connect(state,null)(Card)
