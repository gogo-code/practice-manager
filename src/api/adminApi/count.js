import ajax from "../index";

export const queryteacherToStudent = (params) => ajax("api/auth/admin/count/queryteacherToStudent", params);
export const querycollege = (params) => ajax("api/auth/admin/count/querycollege", params);
