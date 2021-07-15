import React from "react";
import './Loading.less'
import {Spin} from "antd";

function Loading({minHeight,toast}){
    return(
        <Spin tip={toast} wrapperClassName='spin'>
            <div className="loading" style={{minHeight}}/>
        </Spin>
    )
}

export default React.memo(Loading)
