
//  {
//   "id": 10,
//   "title": "测试",
//   "key": "/personSetting",
//   "icon": "setting"
// },
import React, { Component } from "react";
import { Upload, message, Button, Icon } from "antd";
import { fileUpload } from "@/api/fileApi.js";
export default class index extends Component {
  onDownload = (params) => {
    fileUpload({
      data: "/public/uploads/documents/practice_report/程序验收单.doc",
    });
  };

  render() {
    const props = {
      name: "uploadDemo",
      action: "/api/auth/upload/uploadReport",
      //   headers: {
      //     authorization: "authorization-text",
      //   },
      //   onChange(info) {
      //     if (info.file.status !== "uploading") {
      //       console.log(info.file, info.fileList);
      //     }
      //     if (info.file.status === "done") {
      //       message.success(`${info.file.name} file uploaded successfully`);
      //     } else if (info.file.status === "error") {
      //       message.error(`${info.file.name} file upload failed.`);
      //     }
      //   },
    };
    return (
      <>
        <Upload {...props}>
          <Button>上传</Button>
        </Upload>
        <Button onClick={this.onDownload} type="link">
          文件下载
        </Button>
        <div>
          {" "}
          <a href="/api/auth/upload/download?data=/public/uploads/documents/practice_report/程序验收单.doc" download="实习报告.doc">
            下载
          </a>
        </div>
      </>
    );
  }
}
