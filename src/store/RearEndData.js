/*
    主体：RearEndData

    等待补充：userinfo     description contestinfo
*/

//<====================其他类=======================>

//<====================user==================>
class UserInfo{
    constructor(){

    }
    // ReturnData(){

    // }
}

export class User {
    constructor() {
        this.id=null;
        this.name=null;
        this.password=null;
        this.authority=null;
        this.userInfo=null;
    }

    // ReturnData(){
    //     return {
    //         "id":this.id,
    //         "name":this.name,
    //         "password":this.password,
    //         "authority":this.authority,
    //         "userInfo":this.userInfo
    //     };
    // }
}

export class Email {
    constructor() {
        this.email=null;
        this.userID=null;
        this.user=new User();
    }
    // ReturnData(){
    //     return {
    //         "email":this.email,
    //         "userID":this.userID,
    //         "user":this.user.ReturnData()
    //     }
    // }
}

export class Team {
    constructor() {
        this.team=null;
        this.userID=null;
        this.user = new User();
    }
    // ReturnData(){
    //     return {
    //         "team":this.team,
    //         "userID":this.userID,
    //         "user":this.user.ReturnData()
    //     }
    // }
}

//<=====================problem=================>
class Description{
    constructor(){

    }
    // ReturnData(){
        
    // }
}

class JudggerInfo{
    constructor(){

    }

    // ReturnData(){

    // }
}

export class Problem {
    constructor() {
        this.id = null;
        this.name=null;
        this.description=new Description();
        this.isHideToUser=null;
        this.isRobotProblem=null;
        this.judggerInfo=new JudggerInfo();
    }
}


//<=================contest=================>
class ContestInfo{
    constructor(){

    }
}

export class Contest {
    constructor() {
        this.id = null;
        this.name = null;
        this.startTime = null;
        this.endTime = null;
        this.contestInfo=new ContestInfo();
    }
}


//<==================language==============>
export class Language {
    constructor() {
        this.id = null;
        this.language = null;
        this.runCmd = null;
    }
}

//<==================submit==================>
class SubmitInfo{
    constructor(){

    }
}

export class Submit {
    constructor() {
        this.id = null;
        this.submitState = null;
        this.runTime = null;
        this.submitTime = null;
        this.problemID = null;
        this.contestID = null;
        this.languageID =null;
        this.isError = null;
        this.submitInfo = new SubmitInfo();
    }
}

//<=============中间表===================>
export class ContestsHasProblems {
    constructor() {
        this.contestsID = null;
        this.languagesID = null;
    }
}

export class UsersJoinContests {
    constructor() {
        this.usersID = null;
        this.contestID = null;
    }
}

export class Page {
    constructor() {
        this.pageIndex = null;
        this.PageSize = null;
    }
}

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


//<================Data==========================>
export class Data {
    constructor() {
        this.verifyCode=null;
        this.page=new Page();

        this.email=new Array();
        this.user = new Array();
        this.team=new Array();
        this.contest= new Array();
        this.language = new Array();
        this.submit = new Array();
        this.contestsHasProblems = new Array();
        this.usersJoinContests = new Array();
    }
}

export class RearEndData{
    constructor(){
        this.websocketID = null;
        this.httpStatus = new HTTPStatus();
        this.data=new Data();
    }
}