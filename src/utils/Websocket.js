import { REAREND_HOSTNAME } from '../configs/Rearend';

export const ws = new WebSocket("ws://"+REAREND_HOSTNAME);

export var websocketData={};

ws.onopen = () => {
    //Auto login
    var loginInfo = {
        userID: 0,
        websocketID: 0,
        password: 0,
        loginByWhat:"auto"
    }

    // connection opened
    ws.send(JSON.stringify(loginInfo)); // send a message
};

ws.onmessage = (e) => {
    // a message was received
    websocketData = JSON.parse(e.data);
    console.log("解析后: " + e.data);
    console.log(websocketData["userID"]);
    // document.cookie(e.data)
    ws.send("send")
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
    var expires = new Date(new Date() + 24*60*60*1000);
    // document.cookie = "userID="+stringify(websocketData["userID"]);
    // Cookies.set('userInfo', websocketData["userID"], {expires: expires});
};