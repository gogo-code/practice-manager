import React, { Component } from "react";
import { Table, Button, Upload } from "antd";

import Search from "./search";

const columns = [
  {
    title: "序号",
    dataIndex: "sxgl_student_id",
    key: "sxgl_student_id",
    width: 50,
    align: "center",
  },
  {
    title: "单位名称",
    dataIndex: "sxgl_company_name",
    key: "sxgl_company_name",
    width: 180,
    align: "center",
  },
  {
    title: "单位地址",
    dataIndex: "sxgl_company_address",
    key: "sxgl_company_address",
    width: 220,
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
    dataIndex: "sxgl_phone",
    key: "sxgl_phone",
    width: 120,
    align: "center",
  },
  {
    title: "单位性质",
    dataIndex: "sxgl_company_type",
    key: "sxgl_company_type",
    width: 120,
    align: "center",
  },
  {
    title: "操作",
    render: (text, record) => {
      return (
        <div>
          <a
            onClick={() => {
              this.props.pageChange(record, "update");
            }}
          >
            修改
          </a>
        </div>
      );
    },
    align: "center",
  },
];

const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

export default class index extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
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
          <Button
            type="primary"
            onClick={this.start}
            style={{ marginRight: 8 }}
          >
            导入
          </Button>
          <Button type="danger" ghost onClick={this.start}>
            删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          bordered
          size="small"
        />
      </div>
    );
  }
}
