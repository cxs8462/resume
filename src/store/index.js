import {createStore} from 'redux'
import cloudbase from "@cloudbase/js-sdk";

const App = cloudbase.init({
    env: "hello-cloudbase-4g9iquhpe176b5ac"
});

const db = App.database();
const defaultState = {
    App,db
}

const reduce = (state=defaultState,action)=>{
    return state
}

const store = createStore(reduce)

export default store
