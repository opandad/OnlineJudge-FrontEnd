//<====================user==================>
class UserInfo {
    constructor() {

    }
    // ReturnData(){

    // }
}

export class User {
    constructor() {
        this.id = null;
        this.name = null;
        this.password = null;
        this.authority = null;
        this.userInfo = null;
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
        this.email = null;
        this.userID = null;
        this.user = new User();
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
        this.team = null;
        this.userID = null;
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
class Description {
    constructor() {
        this.problemDescription = null;
        this.inputDescription = null;
        this.outputDescription = null;
        this.inputRequirements = null;
        this.outputRequirements = null;
        this.inputCase = null;
        this.outputCase = null;
        this.tips = null;
        this.timeLimit = null;
        this.memoryLimit = null;
        this.realTimeLimit = null;
        this.fileSizeLimit = null;
    }
}

class JudggerInfo {
    constructor() {
        this.ProblemPath = null;
    }
}

export class Problem {
    constructor() {
        this.id = null;
        this.name = null;
        this.description = new Description();
        this.isHideToUser = null;
        this.isRobotProblem = null;
        this.judggerInfo = new JudggerInfo();
    }
}


//<=================contest=================>
class ContestInfo {
    constructor() {

    }
}

export class Contest {
    constructor() {
        this.id = null;
        this.name = null;
        this.startTime = null;
        this.endTime = null;
        this.contestInfo = new ContestInfo();
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
class SubmitInfo {
    constructor() {

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
        this.languageID = null;
        this.isError = null;
        this.submitCode = null;
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



//<==============redis=================>
export class UserData{
    constructor(){
        this.userID = null;
        this.password = null;
        this.authority = null;
        this.websocketID = null;
        this.verifyCode = null;
    }
}

// <=============== other ==============>
export class LoginInfo{
    constructor(){
        this.account = null;
        this.userID = null;
        this.password = null;
        this.authority = null;
        this.snowflakeID = null;
        this.verifyCode = null;
    }
}

//<================Data==========================>
// export class Data {
//     constructor() {
//         this.loginInfo = new LoginInfo();
//         this.userData = new UserData();
//         this.page = new Page();
//         this.email = new Array();
//         this.user = new Array();
//         this.team = new Array();
//         this.contest = new Array();
//         this.language = new Array();
//         this.submit = new Array();
//         this.contestsHasProblems = new Array();
//         this.usersJoinContests = new Array();
//     }
// }