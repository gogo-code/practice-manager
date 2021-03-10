import ajax from "./index";

// 文件下载接口
export const fileUpload = (params) => ajax("api/auth/upload/download", params);

