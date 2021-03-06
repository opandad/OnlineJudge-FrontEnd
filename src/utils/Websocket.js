/*
    处理数据交互用

    bug
    没有掉线重连机制，用户体验不好
*/
import { REAREND_HOSTNAME } from '../configs/Rearend';

class OJWebSocket {
    constructor() {
        //test
        console.log("constructor")

        this.handlers = {
            login: this.Login,
            logout: this.Logout
        };
    
        this.initialize();
    }

    initialize = () =>{
        this.websocket = new WebSocket("ws://" + REAREND_HOSTNAME);

        this.websocket.onopen = (e) => {
            console.log("成功连接")
        };

        this.websocket.onmessage = (e) => {
            var receive = JSON.parse(e.data);

            console.log(receive);

            //error
            if (receive["isError"] === true) {
                if (receive["errorCode"] === 404) {

                }
            }
            else {
                if (receive["method"] in this.handlers) {
                    this.handlers[receive["method"]](receive);
                } else {
                    console.error("Cannot handle type: " + receive["method"]);
                }
            }
        }

        this.websocket.onerror = (e) => {
            console.log("发生错误");
        };

        this.websocket.onclose = (e) => {
            console.log("websocket关闭");
        };
    }

    SendData = (message) => {
        console.log("发送数据："+JSON.stringify(message))
        this.websocket.send(JSON.stringify(message));
    };

    Reconnect = () =>{
        this.websocket = new WebSocket("ws://" + REAREND_HOSTNAME);
    }

    /*
    <============================handlers函数=====================================>
    */
    /*
        用户相关
    */
    Login() {

    }
    Logout() {

    }

    UpdateUserInfo() {

    }

    /*
        题目相关
    */
    QueryProblemsList() {

    }
    QueryProblemDetail() {

    }
    QuerySubmit() {

    }

    /*
        竞赛相关
    */
    QueryContestsList() {

    }
    QueryContestDetail() {

    }
}

const WS = new OJWebSocket();
export default WS