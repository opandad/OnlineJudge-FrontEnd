export default class Data{
    constructor(){
        this.websocketID=null;
        this.httpStatus={
            "msg": null,
            "isError": false,
            "errorCode": null,
            "subMsg":"",
            "requestPath": null,
            "method": null,
        };
        this.data=null;
    }

    ReturnData = () =>{
        return this.websocketID, this.httpStatus, this.data;
    }
}

/* 
this.data = {
            "websocketID": null,
            "httpStatus": {
                "msg": null,
                "isError": false,
                "errorCode": null,
                "subMsg":"",
                "requestPath": null,
                "method": null,
            },
            "data": {
                "email": [
                    {
                        "email": null,
                        "userID": null,
                        "user": [
                            {
                                "id": null,
                                "account": null,
                                "password": null,
                                "verifyCode": null,
                                "authority": null,
                            },
                        ]
                    }
                ],
                "user": [
                    {
                        "id": null,
                        "account": null,
                        "password": null,
                        "verifyCode": null,
                        "authority": null,
                    }
                ],
                "problem": [
                    {
                        "id": null,
                        "name": null,
                        "description": null, //json
                        "isHideToUser": null,
                        "isRobotProblem": null,
                        "judggerInfo": null //json
                    }
                ],
                "contest": [
                    {
                        "id": null,
                        "name": null,
                        "startTime": null,
                        "endTime": null,
                        "contestInfo": null //json
                    }
                ],
                "language": [
                    {
                        "id": null,
                        "language": null,
                        "runCmd": null
                    }
                ],
                "submit": [
                    {
                        "id": null,
                        "submitState": null,
                        "runTime": null,  //int
                        "submitTime": null,
                        "problemsID": null,
                        "contestID": null,
                        "userID": null,
                        "languageID": null
                    }
                ],
                "contestsHasProblems": [
                    {
                        "languageID": null,
                        "problemsID": null
                    }
                ],
                "usersJoinContests": [
                    {
                        "userID": null,
                        "contestID": null
                    }
                ],
                "page": {
                    "pageSize": null, //int
                    "pageIndex": null //int
                },
                "verifyCode": null
            }
        };
*/