import ajax from "../index";

// 查询公司教师信息
export const companyTutorQuery = (params) =>
  ajax("api/auth/admin/companyTutor/query", params);

// 添加公司教师信息
export const companyTutorAdd = (token, data) =>
  ajax("api/auth/admin/companyTutor/add", { token, data }, "post");

// 删除公司教师信息
export const companyTutorDelete = (ids) =>
  ajax("api/auth/admin/companyTutor/delete", { ids }, "post");

// 修改公司教师信息
export const companyTutorUpdate = (token, data) =>
  ajax(
    "api/auth/admin/companyTutor/update",
    {
      token,
      data,
    },
    "post"
  );