export const FRONTEND_ROUTE = {
    //index
    Home: "/",

    //login
    Login: "/login",
    Regist: "/regist",
    ForgetPassword: "/forget_password",

    //feature
    Problem: "/problems",
    Contests: "/contests",
    SubmitStatus: "/submit_status",
}

//rear end
export const REAREND_HOSTNAME = "http://127.0.0.1:8080"
export const REAREND_ROUTE = {
    Home: REAREND_HOSTNAME + "/",

    //user
    LoginByEmail: REAREND_HOSTNAME + "/user/login_by_email",
    ForgetPassword: REAREND_HOSTNAME + "/user/forget_password_by_email",
    GetEmailVerifycationCode: REAREND_HOSTNAME + "/user/get_email_verify_code",
    RegistByEmail: REAREND_HOSTNAME + "/user/regist_by_email",

    //problem
    GetProblemList: REAREND_HOSTNAME + "/problems/list",

    //contest
    GetContestList: REAREND_HOSTNAME + "/contests/list"
}