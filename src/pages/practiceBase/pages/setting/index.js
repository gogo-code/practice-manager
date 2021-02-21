import React, { Component } from "react";
import { Table, Button } from "antd";

import Search from "./search";

const columns = [
  { title: "序号", dataIndex: "name" },
  {
    title: "单位名称",
    dataIndex: "name",
  },
  {
    title: "单位地址",
    dataIndex: "age",
  },
  {
    title: "联系人",
    dataIndex: "address",
  },
  {
    title: "联系电话",
    dataIndex: "address",
  },
  {
    title: "单位性质",
    dataIndex: "address",
  },
  {
    title: "操作",
    dataIndex: "address",
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
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            style={{ marginRight: 8 }}
          >
            添加
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
          size="middle"
        />
      </div>
    );
  }
}
