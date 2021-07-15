import './Header.less'
import {Button, Menu,Dropdown} from "antd";
import {UserOutlined} from "@ant-design/icons";

function Header({goLogin,userInfo,signOut}){

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={signOut}>退出登录</Menu.Item>
        </Menu>
    );

    return(
        <div className='header'>
            <div className="left"></div>
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
