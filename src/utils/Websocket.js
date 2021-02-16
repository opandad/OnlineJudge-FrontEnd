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
                if (receive["HTTPStatusCode"] === 404) {

                }
            }
            else {
                if (receive["msg"] !== null) {
                    if (receive["msg"] in this.handlers) {
                        this.handlers[receive["msg"]]();
                    }
                    else {
                        console.log("不能处理这个数据 " + receive["msg"]);
                    }
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
    handleLoginByEmail() {

    }
    handleLoginByAuto() {

    }
    handleUserInfo() {

    }

    /*
        题目相关
    */
    handleProblemsList() {

    }
    handleProblemDetail() {

    }
    handleSubmit() {

    }

    /*
        竞赛相关
    */
    handleContestsList() {

    }
    handleContestDetail() {

    }
}

export const ws = new OJWebSocket;