import ajax from "../index";

// 查询公司信息
export const companyQuery = (params) =>
  ajax("api/auth/admin/company/query", params);

// 查询公司名称信息
export const queryCompanyName = (params) =>
  ajax("api/auth/admin/company/queryCompanyName", params);

// 添加公司信息
export const companyAdd = (token, data) =>
  ajax("api/auth/admin/company/add", { token, data }, "post");

// 删除公司信息
export const companyDelete = (ids) =>
  ajax("api/auth/admin/company/delete", { ids }, "post");

// 修改公司信息
export const companyUpdate = (token, data) =>
  ajax(
    "api/auth/admin/company/update",
    {
      token,
      data,
    },
    "post"
  );
