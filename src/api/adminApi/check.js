import ajax from "../index";

// 查询申请信息
export const checkQuery = (params) => ajax("api/auth/admin/check/query", params);
export const checkDetail = (params) => ajax("api/auth/admin/check/queryDetail", params);
export const checkUpdate =(token, data) => ajax("api/auth/admin/check/update",  { token, data }, "post");
