import ajax from "../index";

// 查询教师信息
export const teacherQuery = (params) =>
  ajax("api/auth/admin/teacher/query", params);

// 导入教师信息
export const teacherAdd = (token, data) =>
  ajax("api/auth/admin/teacher/add", { token, data }, "post");

// 删除教师信息
export const teacherDelete = (ids) =>
  ajax("api/auth/admin/teacher/delete", { ids }, "post");

// 修改教师信息
export const teacherUpdate = (
  token,
  sxgl_teacher_id,
  sxgl_teacher_name,
  sxgl_teacher_college,
  sxgl_teacher_major,
  sxgl_teacher_class,
  sxgl_teacher_phone
) =>
  ajax(
    "api/auth/admin/teacher/update",
    {
      token,
      sxgl_teacher_id,
      sxgl_teacher_name,
      sxgl_teacher_college,
      sxgl_teacher_major,
      sxgl_teacher_class,
      sxgl_teacher_phone,
    },
    "post"
  );

// 重置教师密码
export const teacherResetPwd = (token, id) =>
  ajax("api/auth/admin/teacher/reset", { token, id }, "post");
