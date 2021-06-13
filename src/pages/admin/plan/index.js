import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import {
  planQuery,
  planDelete,
  planAdd,
  planUpdate,
  planUpdateCompany,
  planUpdateTeacher,
} from "@/api/adminApi/plan";
import Search from "./search";
import UpdateModal from "./updateModal";
import ArrangeCompany from "./arrangeCompany";
import ArrangeTeacher from "./arrangeTeacher";
import AddModal from "./addModal";
import moment from "moment";

const confirm = Modal.confirm;
export default class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    updateModalShow: false,
    addModalShow: false,
    arrangeCompanyShow: false,
    arrangeTeacherShow: false,
    updateRow: {},
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    planQuery(params)
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

  // 显示隐藏修改模态框
  hideUpdateTeacherModal = () => {
    this.setState({
      arrangeTeacherShow: !this.state.arrangeTeacherShow,
    });
    this.indexQuery();
  };

  // 显示隐藏修改模态框
  hideUpdateComapanyModal = () => {
    this.setState({
      arrangeCompanyShow: !this.state.arrangeCompanyShow,
    });
    this.indexQuery();
  };

  // 显示隐藏添加模态框
  hideAddModal = () => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
    this.indexQuery();
  };

  // 添加数据
  addData = (params) => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
  };

  // 更新获取数据
  updateData = (record) => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
      updateRow: record,
    });
  };

  // 指定实习单位和校外教师
  arrangeCompany = (record) => {
    this.setState({
      arrangeCompanyShow: !this.state.arrangeCompanyShow,
      updateRow: record,
    });
  };

  // 指定校内教师
  arrangeTeacher = (record) => {
    this.setState({
      arrangeTeacherShow: !this.state.arrangeTeacherShow,
      updateRow: record,
    });
  };

  // 添加调用接口
  onAdd = (token, values) => {
    values.sxgl_createtime = moment(values.startAndEndTime[0]).format(
      "yyyy-MM-DD"
    );
    values.sxgl_endtime = moment(values.startAndEndTime[1]).format(
      "yyyy-MM-DD"
    );
    planAdd(token, values)
      .then((result) => {
        if (result && result.status === 1) {
          message.success(result.msg);
          this.hideAddModal();
        } else {
          message.error("添加失败!");
        }
      })
      .catch(() => {
        message.error("添加失败!!");
      });
  };

  // 修改调用接口
  onUpdate = (token, values) => {
    values.sxgl_plan_id = this.state.updateRow.sxgl_plan_id;
    values.sxgl_createtime = moment(values.startAndEndTime[0]).format(
      "yyyy-MM-DD"
    );
    values.sxgl_endtime = moment(values.startAndEndTime[1]).format(
      "yyyy-MM-DD"
    );
    planUpdate(token, values)
      .then((result) => {
        if (result && result.status === 1) {
          message.success(result.msg);
          this.hideUpdateModal();
        } else {
          message.error("修改失败!");
        }
      })
      
  };

  // 修改调用接口
  onUpdateCompany = (token, values) => {
    values.sxgl_student_class=this.state.updateRow.sxgl_student_class
    planUpdateCompany(token, values)
      .then((result) => {
        if (result && result.status === 1) {
          message.success(result.msg);
          this.hideUpdateComapanyModal();
        } else {
          message.error("修改失败!");
        }
      })
      .catch(() => {
        message.error("修改失败!!");
      });
  };

    // 修改调用接口
    onUpdateTeacher = (token, values) => {
      values.sxgl_student_class=this.state.updateRow.sxgl_student_class
      planUpdateTeacher(token, values)
        .then((result) => {
          if (result && result.status === 1) {
            message.success(result.msg);
            this.hideUpdateTeacherModal();
          } else {
            message.error("修改失败!");
          }
        })
        .catch(() => {
          message.error("修改失败!!");
        });
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
        let _ids=_this.state.selectedRowKeys.map(item=>item.split('-')[0])
        let ids = _ids;
        planDelete(ids)
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

  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "sxgl_plan_id",
        key: "sxgl_plan_id",
        width: 50,
        align: "center",
        render: (text, record, index) => {
          return (this.state.currentIndex - 1) * 8 + index + 1;
        },
        fixed: "left",
      },
      {
        title: "计划名称",
        dataIndex: "sxgl_plan_name",
        key: "sxgl_plan_name",
        width: 250,
        align: "center",
      },
      {
        title: "所属院系",
        dataIndex: "sxgl_department",
        key: "sxgl_department",
        width: 120,
        align: "center",
      },
      {
        title: "班级",
        dataIndex: "sxgl_student_class",
        key: "sxgl_student_class",
        width: 100,
        align: "center",
      },
      {
        title: "学年学期",
        dataIndex: "sxgl_year",
        key: "sxgl_year",
        width: 130,
        align: "center",
      },
      {
        title: "实习年级",
        dataIndex: "sxgl_grade",
        key: "sxgl_grade",
        width: 100,
        align: "center",
      },
      {
        title: "开始日期",
        dataIndex: "sxgl_createtime",
        key: "sxgl_createtime",
        width: 100,
        align: "center",
        render: (text) => {
          return moment( text ).format("yyyy-MM-DD");
        },
      },
      {
        title: "结束日期",
        dataIndex: "sxgl_endtime",
        key: "sxgl_endtime",
        width: 100,
        align: "center",
        render: (text) => {
          return moment( text ).format("yyyy-MM-DD");
        },
      },
      {
        title: "实习类型",
        dataIndex: "sxgl_type",
        key: "sxgl_type",
        width: 100,
        align: "center",
      },
      {
        title: "实习单位",
        dataIndex: "sxgl_company_name",
        key: "sxgl_company_name",
        width: 200,
        align: "center",
      },
      {
        title: "校内教师",
        dataIndex: "sxgl_name",
        key: "sxgl_name",
        width: 100,
        align: "center",
      },
      {
        title: "校外教师",
        dataIndex: "sxgl_company_tutor_name",
        key: "sxgl_company_tutor_name",
        width: 100,
        align: "center",
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.updateData(record)}>修改实习计划</a>
              <Divider type="vertical" style={{ margin: "0 10px" }} />
              <a onClick={() => this.arrangeCompany(record)}>
                {" "}
                指定实习单位和校外教师
              </a>
              <Divider type="vertical" style={{ margin: "0 10px" }} />
              <a onClick={() => this.arrangeTeacher(record)}>指定校内教师</a>
            </div>
          );
        },
        align: "center",
        fixed: "right",
      },
    ];
    const {
      loading,
      selectedRowKeys,
      data,
      updateModalShow,
      addModalShow,
      updateRow,
      arrangeCompanyShow,
      arrangeTeacherShow
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Search openChange={() => this.openChange()} onSearch={this.onSearch} />
        <div style={{ marginBottom: 8 }}>
          <Button type="primary" onClick={this.addData}>
            添加
          </Button>
          <Button type="danger" ghost onClick={this.deleteSelect}>
            删除
          </Button>
          {/* <Button type="primary" ghost onClick={this.deleteSelect}>
            指定实习单位
          </Button>
          <Button type="primary" ghost onClick={this.deleteSelect}>
            指定校外指导教师
          </Button>
          <Button type="primary" ghost onClick={this.deleteSelect}>
            指定校内指导教师
          </Button> */}
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
          rowKey={(record) => record.sxgl_plan_id+'-'+record.sxgl_student_class}
          size="small"
          pagination={{
            pageSize: 8,
            onChange: (page, pageSize) => {
              this.setState({
                currentIndex: page,
              });
            },
          }}
          scroll={{ x: 1900 }}
        />
        <UpdateModal
          visible={updateModalShow}
          hideFunc={this.hideUpdateModal}
          record={updateRow}
          onUpdate={this.onUpdate}
        />
        <ArrangeCompany
          visible={arrangeCompanyShow}
          hideFunc={this.hideUpdateComapanyModal}
          record={updateRow}
          onUpdate={this.onUpdateCompany}
        />
        <ArrangeTeacher
          visible={arrangeTeacherShow}
          hideFunc={this.hideUpdateTeacherModal}
          record={updateRow}
          onUpdate={this.onUpdateTeacher}
        />

        <AddModal
          visible={addModalShow}
          hideFunc={this.hideAddModal}
          onAdd={this.onAdd}
        />
      </div>
    );
  }
}
