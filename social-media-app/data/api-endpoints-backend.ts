export const API_ENDPOINTS = {

    //Auth ENDPOINTS
    AUTH_BEGIN_LOGIN: "/api/v1/Auth/BeginLogin",
    AUTH_COMPLETE_LOGIN_WITHOUT_VALIDATION_TOKEN: "/api/v1/Auth/CompleteLogin",
    AUTH_REGISTER: "/api/v1/Auth/Register",
    AUTH_REFRESH_TOKEN: "/api/v1/Auth/Refresh",

    //USER ENDPOINTS

    USER_GET: "/api/v1/User/GetUserDetails?Id=",
    USER_GET_ALL: "/api/v1/User/GetAllUserDetails",
    USER_CREATE: "/api/v1/User/CreateUser",
    USER_REGISTER: "/api/v1/User/UpdateUser",
    USER_LOGIN:"/api/v1/User/DeleteUser",


    //POST ENDPOINTS

    POST_GET: "/api/v1/Post/GetPost?Id=",
    POST_GET_ALL: "/api/v1/Post/GetAllPosts",
    POST_CREATE: "/api/v1/Post/CreatePost",
    POST_UPDATE: "/api/v1/Post/UpdatePost",
    POST_DELETE: "/api/v1/Post/DeletePost",

    //COMMENT ENDPOINTS

    COMMENT_GET: "/api/v1/Comment/GetComment?Id=",
    COMMENT_GET_ALL: "/api/v1/Comment/GetAllComments",
    COMMENT_CREATE: "/api/v1/Comment/CreateComment",
    COMMENT_UPDATE: "/api/v1/Comment/UpdateComment",
    COMMENT_DELETE: "/api/v1/Comment/DeleteComment",

}