import ajax from "../index";

// 查询公司信息
export const companyQuery = (params) =>
  ajax("api/auth/admin/company/query", params);

// 添加公司信息
export const companyAdd = (token, data) =>
  ajax("api/auth/admin/company/add", { token, data }, "post");

// 删除公司信息
export const companyDelete = (ids) =>
  ajax("api/auth/admin/company/delete", { ids }, "post");

// 修改公司信息
export const companyUpdate = (
  token,
  sxgl_company_id,
  sxgl_company_name,
  sxgl_company_college,
  sxgl_company_major,
  sxgl_company_class,
  sxgl_company_phone
) =>
  ajax(
    "api/auth/admin/company/update",
    {
      token,
      sxgl_company_id,
      sxgl_company_name,
      sxgl_company_college,
      sxgl_company_major,
      sxgl_company_class,
      sxgl_company_phone,
    },
    "post"
  );
