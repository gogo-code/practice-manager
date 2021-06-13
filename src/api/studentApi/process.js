import ajax from "../index";
// 实习申请
export const reportAdd = (token,data) =>
  ajax("/api/auth/student/intention/reportAdd", { token, data }, "post");