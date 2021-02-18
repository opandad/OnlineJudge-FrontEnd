/*
    处理数据交互用
*/
import { REAREND_HOSTNAME } from '../configs/Rearend';

class OJWebSocket {
    constructor() {
        this.websocket = null;
        this.data = {
            "websocketID": null,
            "isError": false,
            "data": {
                "user": {
                    "id": null,
                    "account": null,
                    "password": null,
                    "verifyCode": null,
                    "authority": null,
                    "loginByWhat": null
                },
                "page": {
                    "pageSize": 20,
                    "pageIndex": 1
                },
                "problems": {

                },
                "contests": {

                },
                "languages": {
                },
                "submits": {

                }
            }
        };
        this.handlers = {
            login: this.Login,
            logout: this.Logout
        };
    }

    initialize = () => {
        try {
            this.websocket = new WebSocket("wss://" + REAREND_HOSTNAME);
        } catch (err) {
            console.log("start websocket error: ", err);
            setTimeout(() => {
                this.initialize();
            }, 10000);
        }

        this.websocket.onopen = (e) => {
            //打开连接后自动登录
            var loginInfo = {
                websocketID: "",
                RequestPath: "user/login/auto",
                user: {
                    userID: 0,
                    password: ""
                }
            };
            this.sendData(loginInfo);
        };

        this.websocket.onmessage = (e) => {
            var receive = JSON.parse(e.data);

            //error
            if (receive["isError"] === true) {
                if (receive["msg"] === 404) {

                }
            }
            else {
                if(receive["function"] in this.handlers){
                    this.handlers[receive["function"]](receive);
                }else{
                    console.error("Cannot handle type: " + receive["function"]);
                }
            }
        }

        this.websocket.onerror = (e) => {

        };

        this.websocket.onclose = (e) => {

        };

        this.sendData = (message) => {
            this.websocket.send(JSON.stringify(message));
        };
    }

    /*
    <============================handlers函数=====================================>
    */
    /*
        用户相关
    */
    Login(){

    }
    Logout(){

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

export const ws = new OJWebSocket;