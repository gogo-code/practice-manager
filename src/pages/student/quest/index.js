import React, { Component } from "react";
import { Table, Button, Upload, message, Modal, Divider } from "antd";
import { quest } from "@/api/teacherApi/quest";
import { getUser } from "@/api/userApi";

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
    updateRow: {},
  };

  componentDidMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    params.sxgl_teacher_id= getUser().sxgl_user_account
    quest(params)
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
        dataIndex: "sxgl_quest_id",
        key: "sxgl_quest_id",
        width: 50,
        align: "center",
        render: (text, record, index) => {
          return (this.state.currentIndex - 1) * 8 + index + 1;
        },
      },
      {
        title: "任务名称",
        dataIndex: "sxgl_quest_name",
        key: "sxgl_quest_name",
        width: 200,
        align: "center",
      },
      {
        title: "开始时间",
        dataIndex: "sxgl_createtime",
        key: "sxgl_createtime",
        width: 200,
        align: "center",
        render: (text) => {
          return moment(text ).format("yyyy-MM-DD");
        },
      },
      {
        title: "结束时间",
        dataIndex: "sxgl_endtime",
        key: "sxgl_endtime",
        width: 200,
        align: "center",
        render: (text) => {
          return moment(text ).format("yyyy-MM-DD");
        },
      },
      {
        title: "任务描述",
        dataIndex: "sxgl_quest_description",
        key: "sxgl_quest_description",
        width: 500,
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
        {/* <Search openChange={() => this.openChange()} onSearch={this.onSearch} /> */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          bordered
          rowKey={(record) => record.sxgl_quest_id}
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
