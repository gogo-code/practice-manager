import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import * as XLSX from "xlsx";
import { checkQuery, checkDetail, checkUpdate } from "@/api/adminApi/check";
import { getUser } from "@/api/userApi";

import Search from "./search";
import UpdateModal from "./updateModal";
import CheckModal from "./checkModal";

const confirm = Modal.confirm;

export default class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    detailModalShow: false,
    checkModalShow: false,
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    checkQuery(params)
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

  // 编辑的显示或隐藏
  hideUpdateModal = (record) => {
    if (record !== undefined) {
      checkDetail({ sxgl_student_id: record.sxgl_student_id })
        .then((result) => {
          if (result && result.status === 1) {
            this.setState({
              detail: result.data,
              updateModalShow: !this.state.updateModalShow,
            });
          }
        })
        .catch(() => {
          message.error("查询失败!");
        });
    }
    else{
      this.setState({
        updateModalShow: !this.state.updateModalShow,
      })
    }
  };

  // 编辑的显示或隐藏
  hideCheckModal = (record) => {
    this.setState({
      checkModalShow: !this.state.checkModalShow,
      updateRow: record,
    });
    this.indexQuery();
  };

  // 修改调用接口
  onUpdate = (token, values) => {
    console.log(this.state.updateRow);
    values.sxgl_student_id = this.state.updateRow.sxgl_student_id;
    checkUpdate(token, values)
      .then((result) => {
        if (result && result.status === 1) {
          message.success(result.msg);
          this.hideCheckModal();
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
        width: 150,
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
        title: "审批状态",
        dataIndex: "sxgl_select",
        key: "sxgl_select",
        width: 100,
        align: "center",
        render: (text) => {
          switch (text) {
            case 1:
              return <span style={{ color: "#FF3EFF " }}>审批中</span>;
              break;
            case 3:
              return <span style={{ color: "#00DD77" }}>已通过</span>;
              break;
            case 4:
              return <span style={{ color: "#FF3333" }}>未通过</span>;
              break;
          }
        },
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.hideCheckModal(record)}>审批</a>
              <Divider type="vertical" style={{ margin: "0 10px" }} />
              <a onClick={() => this.hideUpdateModal(record)}>详情</a>
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
          record={this.state.detail}
        />
        <CheckModal
          visible={this.state.checkModalShow}
          hideFunc={this.hideCheckModal}
          record={this.state.updateRow}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}
