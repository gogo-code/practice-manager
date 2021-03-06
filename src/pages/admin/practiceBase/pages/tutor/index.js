import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import { companyTutorQuery, companyTutorDelete, companyTutorAdd, companyTutorUpdate } from "@/api/adminApi/companyTutor";
import Search from "./search";
import UpdateModal from "./updateModal";
import AddModal from "./addModal";

const confirm = Modal.confirm;
export default class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    updateModalShow: false,
    addModalShow: false,
    updateRow: {},
    uuid:null,
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    companyTutorQuery(params)
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

  // 显示隐藏添加模态框
  hideAddModal = () => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
    this.indexQuery();
  };

  // 添加数据
  addData = (params) => {
    let uuid=Date.now().toString()
    this.setState({
      addModalShow: !this.state.addModalShow,
      uuid:uuid.slice(2,uuid.length-1).valueOf()
    });
  };

  // 更新获取数据
  updateData = (record) => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
      updateRow: record,
    });
  };

  // 添加调用接口
  onAdd = (token, values) => {
    companyTutorAdd(token, values)
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
    values.sxgl_company_tutor_id = this.state.updateRow.sxgl_company_tutor_id;
    companyTutorUpdate(token, values)
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
        companyTutorDelete(ids)
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
        dataIndex: "sxgl_company_tutor_id",
        key: "sxgl_company_tutor_id",
        width: 50,
        align: "center",
        render: (text, record, index) => {
          return (this.state.currentIndex - 1) * 8 + index + 1;
        },
      },
      {
        title: "职工号",
        dataIndex: "sxgl_company_tutor_id",
        key: "sxgl_company_tutor_id",
        width: 120,
        align: "center",
      },
      {
        title: "姓名",
        dataIndex: "sxgl_company_tutor_name",
        key: "sxgl_company_tutor_name",
        width: 100,
        align: "center",
      },
      {
        title: "企业单位",
        dataIndex: "sxgl_company_name",
        key: "sxgl_company_name",
        width: 200,
        align: "center",
      },
      {
        title: "职务",
        dataIndex: "sxgl_company_tutor_job",
        key: "sxgl_company_tutor_job",
        width: 100,
        align: "center",
      },
      {
        title: "学历",
        dataIndex: "sxgl_company_tutor_edu",
        key: "sxgl_company_tutor_edu",
        width: 80,
        align: "center",
      },
      {
        title: "联系电话",
        dataIndex: "sxgl_company_tutor_phone",
        key: "sxgl_company_tutor_phone",
        width: 180,
        align: "center",
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <div>
              <a onClick={() => this.updateData(record)}>修改</a>
            </div>
          );
        },
        align: "center",
      },
    ];
    const {
      loading,
      selectedRowKeys,
      data,
      updateModalShow,
      addModalShow,
      updateRow,
      uuid
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
          <Button
            type="primary"
            onClick={this.addData}
            style={{ marginRight: 8 }}
          >
            添加
          </Button>
          <Button type="danger" ghost onClick={this.deleteSelect}>
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
          rowKey={(record) => record.sxgl_company_tutor_id}
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
          visible={updateModalShow}
          hideFunc={this.hideUpdateModal}
          record={updateRow}
          onUpdate={this.onUpdate}
        />

        <AddModal
          visible={addModalShow}
          hideFunc={this.hideAddModal}
          onAdd={this.onAdd}
          uuid={uuid}
        />
      </div>
    );
  }
}
