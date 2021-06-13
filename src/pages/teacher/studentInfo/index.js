import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import * as XLSX from "xlsx";
import {
    questStudent,
} from "@/api/teacherApi/studentInfo";
import { getUser } from "@/api/userApi";
import Search from "./search";

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
        title: "实习报告",
        dataIndex: "sxgl_student_Report",
        key: "sxgl_student_Report",
        width: 100,
        align: "center",
        render: (text, record, index) => {
            if(record.sxgl_student_Report)
          return (
            <a
              href={
                "/api/auth/upload/downloadReport?data=" + record.sxgl_student_Report
              }
              download="实习报告.doc"
            >
              下载
            </a>
          );
          else {
              return <span style={{color:"	#FF3333 "}}>未上传</span>
          }
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
      </div>
    );
  }
}
