import {HashRouter, Redirect,Route,Switch} from "react-router-dom";
import Page404 from "../views/404/Page404";
import {SuspenseComponent} from "../components/SuspenseComponent";
import {lazy} from "react";
const Home = props=>SuspenseComponent(props,lazy(()=>import("../views/home/home")),'100vh','页面载入中...');
const Login = props=>SuspenseComponent(props,lazy(()=>import("../views/Login/Login")),'100vh','页面载入中...');
const Register = props=>SuspenseComponent(props,lazy(()=>import("../views/Login/register")),'100vh','页面载入中...');


const router = ()=>
    <HashRouter>
        <Switch>
            <Redirect exact path='/' to='/home'/>
            <Route path='/home' exact component={Home}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='' component={Page404}/>
        </Switch>
    </HashRouter>



export default router
