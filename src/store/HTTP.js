// import {Data} from './Data'
/*
    主体：RearEndData

    等待补充：userinfo     description contestinfo
*/

//<====================其他类=======================>

//<===================http相关===============>
export class HTTPStatus{
    constructor(){
        this.msg=null;
        this.isError=null;
        this.errorCode=null;
        this.subMsg=null;
        this.requestPath=null;
        this.method=null;
    }
}

// export class RearEndData{
//     constructor(){
//         this.websocketID = null;
//         this.httpStatus = new HTTPStatus();
//         this.data=new Data();
//     }
// }