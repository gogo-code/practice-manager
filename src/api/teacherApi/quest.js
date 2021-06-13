import ajax from "../index";

// 查询岗位信息
export const questQuery = (params) => ajax("api/auth/teacher/questMana/query", params);
export const quest = (params) => ajax("api/auth/teacher/questMana/queryTwo", params);

// 添加岗位信息
export const questAdd = (token, data) =>
  ajax("api/auth/teacher/questMana/add", { token, data }, "post");

// 删除岗位信息
export const questDelete = (ids) =>
  ajax("api/auth/teacher/questMana/delete", { ids }, "post");

// 修改岗位信息
export const questUpdate = (token, data) =>
  ajax(
    "api/auth/teacher/questMana/update",
    {
      token,
      data,
    },
    "post"
  );
