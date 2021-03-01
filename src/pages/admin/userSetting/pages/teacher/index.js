import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import * as XLSX from "xlsx";
import {
  teacherQuery,
  teacherDelete,
  teacherAdd,
  teacherUpdate,
  teacherResetPwd,
} from "@/api/adminApi/teacherSetting";
import { getUser } from "@/api/userApi";

import Search from "./search";
import UpdateModal from "./updateModal";

const confirm = Modal.confirm;

export default class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    updateModalShow: false,
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    teacherQuery(params)
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            loading: false,
            data: result.data,
          });
        }
      })
      .catch(() => {
        message.error("查询失败!");
      });
  };

  // 表单搜索
  onSearch = (params) => {
    this.indexQuery(params);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 导入文件
  uploadFilesChange = (file) => {
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: "binary" });
        // 存储获取到的数据
        let data = {};
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          let tempData = [];
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            // console.log(sheet); // 表名
            this.setState({
              sheet,
            });
            data[sheet] = tempData.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
          }
        }
        const excelData = data.Sheet1;
        // console.log(data[`${this.state.sheet}`]);
        const newData = data[`${this.state.sheet}`].map((item) => {
          return {
            sxgl_teacher_id: item["教师工号"],
            sxgl_name: item["教师姓名"],
            sxgl_department: item["所属学院"],
            sxgl_phone: item["联系电话"],
          };
        });
        teacherAdd(getUser().token, newData)
          .then((result) => {
            if (result && result.status === 1) {
              message.success("上传成功!");
              this.indexQuery();
            }
          })
          .catch(() => {
            message.error("上传失败!");
          });
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log(e);
        message.error("文件类型不正确！");
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file.file);
  };

  // 导出文件
  onExport = (params) => {
    let data = this.state.data;
    console.log(Object.keys(data[0]));
    let head = [
      "教师工号",
      "教师姓名",
      "所属学院",
      "联系电话",
    ];
    data = data.map((e) => Object.values(e));
    data.unshift(head);

    let filename = "教师表.xlsx";
    let ws_name = "SheetJS";

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    console.log(wb);
    console.log(ws);
    ws["!cols"] = [
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    XLSX.writeFile(wb, filename);
  };

  deleteSelect = (params) => {
    if (this.state.selectedRowKeys.length < 1) {
      message.warning("请先选择要删除的项");
      return;
    }
    let _this = this;
    confirm({
      title: "提示",
      content: "确认要删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        let ids = _this.state.selectedRowKeys;
        teacherDelete(ids)
          .then((result) => {
            if (result && result.status === 1) {
              message.success("删除成功!");
              _this.indexQuery();
              _this.setState({
                selectedRowKeys: [],
              });
            } else {
              message.error("删除失败!");
            }
          })
          .catch(() => {
            message.error("删除失败!");
          });
      },
    });
  };

  // 编辑的显示或隐藏
  hideUpdateModal = (record) => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
      updateRow: record,
    });
  };
  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "id",
        key: "id",
        width: 50,
        align: "center",
        render: (text, record, index) => {
          return (this.state.currentIndex - 1) * 8 + index + 1;
        },
      },
      {
        title: "教师工号",
        dataIndex: "sxgl_teacher_id",
        key: "sxgl_teacher_id",
        width: 120,
        align: "center",
      },
      {
        title: "教师姓名",
        dataIndex: "sxgl_name",
        key: "sxgl_name",
        width: 100,
        align: "center",
      },
      {
        title: "所属学院",
        dataIndex: "sxgl_department",
        key: "sxgl_department",
        width: 200,
        align: "center",
      },
      {
        title: "联系电话",
        dataIndex: "sxgl_phone",
        key: "sxgl_phone",
        width: 180,
        align: "center",
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <div>
              <a
                onClick={() => {
                  Modal.confirm({
                    title: "提示",
                    content: "确认要重置密码吗?",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                      teacherResetPwd(getUser().token, record.sxgl_teacher_id)
                        .then((result) => {
                          if (result && result.status === 1) {
                            message.success("重置成功!");
                            this.indexQuery();
                          } else {
                            message.error("重置失败!");
                          }
                        })
                        .catch(() => {
                          message.error("重置失败!");
                        });
                    },
                  });
                }}
              >
                重置密码
              </a>
              <Divider type="vertical" style={{ margin: "0 10px" }} />
              <a onClick={() => this.hideUpdateModal(record)}>编辑</a>
            </div>
          );
        },
        align: "center",
      },
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Search openChange={() => this.openChange()} onSearch={this.onSearch} />

        <div style={{ marginBottom: 8 }}>
          <Upload
            showUploadList={false}
            beforeUpload={function () {
              return false;
            }}
            onChange={this.uploadFilesChange}
          >
            <Button type="primary" ghost style={{ marginRight: 8 }}>
              导入
            </Button>
          </Upload>
          <Button
            type="primary"
            ghost
            style={{ marginRight: 8 }}
            onClick={this.onExport}
          >
            导出
          </Button>
          <Button type="danger" ghost onClick={this.deleteSelect}>
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          bordered
          rowKey={(record) => record.sxgl_teacher_id}
          size="small"
          pagination={{
            pageSize: 8,
            onChange: (page, pageSize) => {
              this.setState({
                currentIndex: page,
              });
            },
          }}
        />
        <UpdateModal
          visible={this.state.updateModalShow}
          hideFunc={this.hideUpdateModal}
          record={this.state.updateRow}
        />
      </div>
    );
  }
}
