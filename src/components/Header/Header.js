import './Header.less'
import {Button, Menu,Dropdown} from "antd";
import {UserOutlined} from "@ant-design/icons";

function Header({goLogin,userInfo,signOut}){

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={signOut}>退出登录</Menu.Item>
        </Menu>
    );
    const goGitHub = ()=>{
        window.open("https://github.com/cxs8462/resume");
    }

    return(
        <div className='header'>
            <div className="left">
                <Button type="link" onClick={goGitHub}>To Github</Button>
            </div>
            <div className="right">
                {
                    userInfo
                        ?
                        <Dropdown.Button className='userInfo' overlay={menu}>{userInfo.user.email}</Dropdown.Button>
                        :
                        <Button type='link' onClick={goLogin}><UserOutlined />登录</Button>
                }

            </div>
        </div>
    )
};
export default Header
