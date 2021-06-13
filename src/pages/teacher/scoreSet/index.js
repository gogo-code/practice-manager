import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import * as XLSX from "xlsx";
import { questStudent,questUpdate} from "@/api/teacherApi/studentInfo";
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
    params.sxgl_company_tutor_id = getUser().sxgl_user_account;
    questStudent(params)
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

  // 显示隐藏修改模态框
  hideUpdateModal = () => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
    });
    this.indexQuery();
  };

  // 更新获取数据
  updateData = (record) => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
      updateRow: record,
    });
  };

  // 修改调用接口
  onUpdate = (token, values) => {
    values.sxgl_student_id = this.state.updateRow.sxgl_student_id;
    questUpdate(token, values)
      .then((result) => {
        if (result && result.status === 1) {
          message.success(result.msg);
          this.hideUpdateModal();
        } else {
          message.error("修改失败!");
        }
      })
      .catch(() => {
        message.error("修改失败!!");
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
        title: "学生学号",
        dataIndex: "sxgl_student_id",
        key: "sxgl_student_id",
        width: 120,
        align: "center",
      },
      {
        title: "学生姓名",
        dataIndex: "sxgl_student_name",
        key: "sxgl_student_name",
        width: 100,
        align: "center",
      },
      {
        title: "所在学院",
        dataIndex: "sxgl_student_college",
        key: "sxgl_student_college",
        width: 200,
        align: "center",
      },
      {
        title: "学生专业",
        dataIndex: "sxgl_student_major",
        key: "sxgl_student_major",
        width: 180,
        align: "center",
      },
      {
        title: "学生班级",
        dataIndex: "sxgl_student_class",
        key: "sxgl_student_class",
        width: 100,
        align: "center",
      },
      {
        title: "联系电话",
        dataIndex: "sxgl_student_phone",
        key: "sxgl_student_phone",
        width: 150,
        align: "center",
      },
      {
        title: "实习方式",
        dataIndex: "sxgl_select",
        key: "sxgl_select",
        width: 100,
        align: "center",
        render: (text, record, index) => {
          if (text == 3) {
            return <span style={{ color: "#00DD77" }}>自主实习</span>;
          } else {
            return <span style={{ color: "#FF8800" }}>学校安排</span>;
          }
        },
      },
      {
        title: "最终成绩",
        dataIndex: "sxgl_student_score",
        key: "sxgl_student_score",
        width: 100,
        align: "center",
      },
      {
        title: "操作",
        width: 100,
        align: "center",
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.updateData(record)}>打分</a>
            </div>
          );
        },
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
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          bordered
          rowKey={(record) => record.sxgl_student_id}
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
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}
