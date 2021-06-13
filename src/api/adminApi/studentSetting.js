import ajax from "../index";

// 查询学生信息
export const studentQuery = (params) =>
  ajax("api/auth/admin/student/query", params);

// 导入学生信息
export const studentAdd = (token, data) =>
  ajax("api/auth/admin/student/add", { token, data }, "post");

// 删除学生信息
export const studentDelete = (ids) =>
  ajax("api/auth/admin/student/delete", { ids }, "post");

// 修改学生信息
export const studentUpdate = (
  token,
  sxgl_student_id,
  sxgl_student_name,
  sxgl_student_college,
  sxgl_student_major,
  sxgl_student_class,
  sxgl_student_phone
) =>
  ajax(
    "api/auth/admin/student/update",
    {
      token,
      sxgl_student_id,
      sxgl_student_name,
      sxgl_student_college,
      sxgl_student_major,
      sxgl_student_class,
      sxgl_student_phone,
    },
    "post"
  );

// 重置学生密码
export const studentResetPwd = (token, id) =>
  ajax("api/auth/admin/student/reset", { token, id }, "post");
