import ajax from "../index";

// 查询岗位信息
export const jobQuery = (params) =>
  ajax("api/auth/admin/job/query", params);

// 添加岗位信息
export const jobAdd = (token, data) =>
  ajax("api/auth/admin/job/add", { token, data }, "post");

// 删除岗位信息
export const jobDelete = (ids) =>
  ajax("api/auth/admin/job/delete", { ids }, "post");

// 修改岗位信息
export const jobUpdate = (token, data) =>
  ajax(
    "api/auth/admin/job/update",
    {
      token,
      data,
    },
    "post"
  );