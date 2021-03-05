import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import {
  companyQuery,
  companyDelete,
  companyAdd,
  companyUpdate,
  companyResetPwd,
} from "@/api/adminApi/company";
import Search from "./search";
import UpdateModal from "./updateModal";
import AddModal from "./addModal";

export default class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    updateModalShow: false,
    addModalShow: false,
    updateRow: {},
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    companyQuery(params)
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

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 显示隐藏修改模态框
  hideUpdateModal = () => {
    this.setState({
      updateModalShow: !this.state.updateModalShow,
    });
  };

   // 显示隐藏添加模态框
   hideUpdateModal = () => {
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

  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "sxgl_company_id",
        key: "sxgl_company_id",
        width: 50,
        align: "center",
        render: (text, record, index) => {
          return (this.state.currentIndex - 1) * 8 + index + 1;
        },
      },
      {
        title: "单位名称",
        dataIndex: "sxgl_company_name",
        key: "sxgl_company_name",
        width: 200,
        align: "center",
      },
      {
        title: "单位地址",
        dataIndex: "sxgl_company_address",
        key: "sxgl_company_address",
        width: 350,
        align: "center",
      },
      {
        title: "联系人",
        dataIndex: "sxgl_connect_person",
        key: "sxgl_connect_person",
        width: 80,
        align: "center",
      },
      {
        title: "联系电话",
        dataIndex: "sxgl_company_phone",
        key: "sxgl_company_phone",
        width: 120,
        align: "center",
      },
      {
        title: "单位类型",
        dataIndex: "sxgl_company_type",
        key: "sxgl_company_type",
        width: 120,
        align: "center",
      },
      {
        title: "所属行业",
        dataIndex: "sxgl_company_industry",
        key: "sxgl_company_industry",
        width: 120,
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
            onClick={this.start}
            style={{ marginRight: 8 }}
          >
            增加
          </Button>
          <Button type="danger" ghost onClick={this.start}>
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
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
        />

        <AddModal
          visible={addModalShow}
          hideFunc={this.hideAddModal}
          record={updateRow}
        />
      </div>
    );
  }
}
