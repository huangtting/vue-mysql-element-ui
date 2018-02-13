import * as types from './type.js' 

const mutations={
    [types.LOGIN]:(state,data)=>{
        state.token=data;
        // console.log(state.token);
        window.sessionStorage.setItem('token',data);
    },
    [types.UserLogout]:(state,data)=>{
        state.token = null;
        window.sessionStorage.removeItem('token');
    },
    [types.USERID]: (state, data) => {
        //把用户id存起来
        state.userid = data;
        window.sessionStorage.setItem('userid', data);
    },
    [types.SETUSERBALANCE]: (state, data) => {
        
        state.balance = data;
        console.log(state.balance);
        window.sessionStorage.setItem('userbalance', state.balance);
    },
    [types.USERBALANCE]: (state, data) => {      
        state.balance -= data;
        console.log(state.balance);
        window.sessionStorage.setItem('userbalance', state.balance);
    },
    [types.SETOPPOINTMENT]:(state,data)=>{
        state.oppointment.push(data);
    },
    [types.CLEAROPPOINTMENT]:(state)=>{
        state.oppointment=[];
    },
    [types.ADDNOTICE]:(state,data)=>{
        state.notice.push(data);
    },
    [types.DELETENOTICE]:(state,index)=>{
        state.notice.splice(index,1);
        console.log(state.notice);
    },
    [types.CLEARNOTICE]:(state)=>{
        state.notice=[];
        
    },
}
export default mutations;