import ajax from "../index";

// 查询实习计划信息
export const planQuery = (params) =>
  ajax("/api/auth/student/plan/query", params);