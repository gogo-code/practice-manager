import React, { Component } from "react";
import { Button, Col, Form, Select, Input, Row, message } from "antd";
import styles from "./index.module.less";
import { queryCompanyName } from "@/api/adminApi/company";
import { getUser } from "@/api/userApi";

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
        console.log(values)
        values.sxgl_student_name = getUser().sxgl_user_name;
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
      labelCol: { span: 8 },
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
            <FormItem {...formItemLayout} label="学年学期">
                {getFieldDecorator("sxgl_year", {
                })(
                  <Select placeholder="请选择">
                  <Option value="2020-2021上学期">2020-2021上学期</Option>
                  <Option value="2020-2021下学期">2020-2021下学期</Option>
                  <Option value="2021-2022上学期">2021-2022上学期</Option>
                </Select>
                )}
              </FormItem>
            </Col>

            <Col {...colSpan} offset={1}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onSearch}
                style={{ marginRight: 8 }}
              >
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Search);
