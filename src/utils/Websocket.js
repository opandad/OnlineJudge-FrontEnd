import { REAREND_HOSTNAME } from '../configs/Route';

export const ws = new WebSocket("ws://"+REAREND_HOSTNAME);

ws.onopen = () => {
    // connection opened
    ws.send("websocket开启"); // send a message
};

ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
    // ws.send("send")
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
};