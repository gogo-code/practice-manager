import ajax from "../index";

// 查询计划信息
export const planQuery = (params) => ajax("api/auth/admin/plan/query", params);

// 添加计划信息
export const planAdd = (token, data) =>
  ajax("api/auth/admin/plan/add", { token, data }, "post");

// 删除计划信息
export const planDelete = (ids) =>
  ajax("api/auth/admin/plan/delete", { ids }, "post");

// 指定实习公司和校外指导教师
export const planUpdateCompany = (token, data) =>
  ajax(
    "api/auth/admin/plan/updateCompany",
    {
      token,
      data,
    },
    "post"
  );

// 指定校内指导教师
export const planUpdateTeacher = (token, data) =>
  ajax(
    "api/auth/admin/plan/updateTeacher",
    {
      token,
      data,
    },
    "post"
  );

// 修改计划信息
export const planUpdate = (token, data) =>
  ajax(
    "api/auth/admin/plan/update",
    {
      token,
      data,
    },
    "post"
  );
