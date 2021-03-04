/*
    处理数据交互用

    bug
    没有掉线重连机制，用户体验不好
*/
import { REAREND_HOSTNAME } from '../configs/Rearend';

class OJWebSocket {
    constructor() {
        console.log("constructor")
        
        
        this.websocket = new WebSocket("ws://" + REAREND_HOSTNAME);
        this.handlers = {
            login: this.Login,
            logout: this.Logout
        };
    
        this.websocket.onopen = (e) => {
            //打开连接后自动登录
            // this.data["httpStatus"]["requestPath"]="account/login/user"
            // this.data["data"]["email"][0]["email"]="abc@qq.com"
            // this.data["data"]["email"][0]["user"]["password"]="abc"

            this.sendData(this.data);

            console.log("成功连接")
        };

        this.websocket.onmessage = (e) => {
            var receive = JSON.parse(e.data);

            //test
            console.log("接收消息")
            console.log(receive)

            //error
            if (receive["isError"] === true) {
                if (receive["errorCode"] === 404) {

                }
            }
            else {
                if (receive["function"] in this.handlers) {
                    this.handlers[receive["function"]](receive);
                } else {
                    console.error("Cannot handle type: " + receive["function"]);
                }
            }
        }

        this.websocket.onerror = (e) => {
            console.log("发生错误")
        };

        this.websocket.onclose = (e) => {
            console.log("websocket关闭")
        };
    }

    sendData = (message) => {
        console.log("发送数据："+JSON.stringify(message))
        this.websocket.send(JSON.stringify(message));
    };

    close = () =>{
        this.websocket.close();
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