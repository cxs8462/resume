import {Suspense} from 'react'
import Loading from "./Loading/Loading";



export const SuspenseComponent = (props,Component,minHeight="300px",toast='组件载入中...')=>
    <Suspense fallback={<Loading minHeight={minHeight} toast={toast}/>}>
        <Component {...props}/>
    </Suspense>

