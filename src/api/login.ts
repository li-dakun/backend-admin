import request from "../utils/request";

// 登录
export function login(data: any) {
    return request({
        url: "/api/users/login",
        method: "post",
        data,
    });
}