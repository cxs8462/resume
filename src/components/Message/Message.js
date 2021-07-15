import './Message.less'
import React, {useEffect, useState} from "react";
import {Avatar, Button, Comment, Divider, Modal, Spin, Tooltip, Form, Input, message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import moment from "moment";
import {connect} from "react-redux";

const {TextArea} = Input;
const formNow = date => {
    const dayOne = 24 * 60 * 60 * 1000;
    const time = new Date(date);
    const now = new Date();
    if (now.getTime() - time.getTime() > dayOne) {
        return moment(date).startOf('day').fromNow();
    } else {
        return moment(date).startOf('minutes').fromNow();
    }
}


const Comments = ({children, email, text, time, isChild = true, ids = undefined, onSend}) => (
    <Comment style={{background: "white"}}
             actions={[isChild ? null : <Button onClick={() => onSend(ids)} type='link'>回复</Button>]}
             author={<a>{email}</a>}
             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
             datetime={formNow(time)}
             content={
                 <p>
                     {text}
                 </p>
             }
    >
        {children}
    </Comment>
);
const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea maxLength={50} rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item style={{textAlign: "right"}}>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发送
            </Button>
        </Form.Item>
    </>
);

function Message({app}) {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [sendShow, setSendShow] = useState(false);
    const [value, setValue] = useState("");
    const [id, setId] = useState(undefined);
    const [list, setList] = useState([]);
    useEffect(() => {
        if(loading){
            app.callFunction({
                name: "comments", data: {type: 'get'}
            }).then((res) => {
                setList(JSON.parse(JSON.stringify(res.result.data.map(r=>({...r,child:r.child.reverse()})).reverse())))
                setLoading(false);
            })
        }
    }, [loading])
    const handleSubmit = () => {
        if (!value) {
            message.warning('请输入内容！');
            return
        }
        setSubmitting(true);
        if (id) {
            app.callFunction({
                name: "comments", data: {type: 'add',email:app.auth().hasLoginState().user.email,text:value,id,time:moment().format("YYYY-MM-DD HH:mm:ss")}
            }).then(() => {
                setSubmitting(false);
                setSendShow(false);
                setValue("");
                setLoading(true);
            })
        } else {
            app.callFunction({
                name: "comments", data: {type: 'add',email:app.auth().hasLoginState().user.email,text:value,time:moment().format("YYYY-MM-DD HH:mm:ss")}
            }).then(() => {
                setSubmitting(false);
                setSendShow(false);
                setValue("");
                setLoading(true);
            })
        }
    }
    const changeSend = (ids = undefined) => {
        setId(ids);
        if (app.auth().hasLoginState()) {
            setSendShow(true);
        } else {
            message.warning('请登录后使用');
        }
    }
    return (
        <div className='Message'>
            <div className="title">
                <Button size='large' type='link'>留言</Button>
                <div className="right">
                    <Tooltip title="试试看留言功能吧">
                        <Button size='large' type='link' onClick={() => changeSend()}>点此留言<EditOutlined/></Button>
                    </Tooltip>
                </div>
            </div>
            <Divider className='fgx'/>
            <Spin spinning={loading}>
                <div className="Contents">
                    {list.map(
                        r =>
                            <Comments key={r._id} onSend={changeSend} email={r.email} ids={r._id} text={r.text}
                                      time={r.time} isChild={false}>
                                {r.child.map(s => <Comments key={s.time} email={s.email} text={s.text} time={s.time}/>)}
                            </Comments>
                    )}
                </div>
            </Spin>
            <Modal
                width="80vw"
                visible={sendShow}
                title={id ? '回复评论' : '发送评论'}
                onCancel={() => {
                    setSendShow(false);
                    setValue("");
                }}
                footer={null}
            >
                <Comment
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    }
                    content={
                        <Editor
                            onChange={e => setValue(e.target.value)}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </Modal>
        </div>
    )
}

const userInfo = state => ({app: state.App});
export default connect(userInfo, null)(React.memo(Message));
