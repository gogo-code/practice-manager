import ajax from "../index";

// 查询实习方式信息
export const intentionQuery = (params) =>
  ajax("/api/auth/student/intention/query", params);

// 实习方式修改
export const arrangeUpdate = (token,data) =>
  ajax("/api/auth/student/intention/updateSelect", { token, data }, "post");


// 实习申请
export const intentionAdd = (token,data) =>
  ajax("/api/auth/student/intention/add", { token, data }, "post");

