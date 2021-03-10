import ajax from "../index";

// 查询计划信息
export const planQuery = (params) =>
  ajax("api/auth/admin/plan/query", params);

// 添加岗位信息
export const planAdd = (token, data) =>
  ajax("api/auth/admin/plan/add", { token, data }, "post");

// 删除岗位信息
export const planDelete = (ids) =>
  ajax("api/auth/admin/plan/delete", { ids }, "post");

// 修改岗位信息
export const planUpdate = (token, data) =>
  ajax(
    "api/auth/admin/plan/update",
    {
      token,
      data,
    },
    "post"
  );