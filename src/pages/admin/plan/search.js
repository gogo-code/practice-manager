import React, { Component } from "react";
import { Button, Col, Form, Select, Input, Row, message } from "antd";
import styles from "./index.module.less";
import { queryCompanyName } from "@/api/adminApi/company";

class Search extends Component {
  state = {
    companyNameList: [],
  };

  queryCompanyName = (params) => {
    queryCompanyName()
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            companyNameList: result.data,
          });
        }
      })
      .catch(() => {
        message.error("查询失败!");
      });
  };

  // 查询
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values);
      }
    });
  };

  // 重置
  onRefresh = () => {
    this.props.form.resetFields();
    this.onSearch();
  };

  render() {
    // 布局
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };
    // col布局
    const colSpan = {
      md: 6,
      xxl: 6,
    };

    const FormItem = Form.Item;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.searchBox}>
        <Form>
          <Row>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="计划名称:">
                {getFieldDecorator("sxgl_plan_name")(<Input />)}
              </FormItem>
            </Col>
            <Col {...colSpan}>
            </Col>

            <Col {...colSpan} offset={4}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onSearch}
                style={{ marginRight: 8 }}
              >
                查询
              </Button>
              <Button
                type="primary"
                ghost
                htmlType="submit"
                onClick={this.onRefresh}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Search);
