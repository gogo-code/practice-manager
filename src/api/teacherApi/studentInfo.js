import ajax from "../index";
// 查询岗位信息
export const questStudent = (params) => ajax("api/auth/teacher/studentInfo/query", params);
export const questUpdate = (token, data) =>
  ajax(
    "api/auth/teacher/studentInfo/update",
    {
      token,
      data,
    },
    "post"
  );
