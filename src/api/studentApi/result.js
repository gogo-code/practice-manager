import ajax from "../index";

// 查询实习结果
export const resultQuery = (params) =>
  ajax("/api/auth/student/intention/queryResult", params);