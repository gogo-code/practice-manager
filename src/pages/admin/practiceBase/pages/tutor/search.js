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

  onSearch = (val) => {
    console.log(val)
  }
  onBlur = (params) => {
    console.log(1123)
  }
  onChange = (val) => {
    console.log(`selected ${val}`);
  }
  
  
  

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
              <FormItem {...formItemLayout} label="岗位名称:">
                {getFieldDecorator("sxgl_job_name")(<Input />)}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="所属单位">
                {getFieldDecorator("sxgl_company_id", {
                  rules: [],
                })(
                  <Select
                    style={{ width: "174px" }}
                    placeholder="请选择所属单位"
                    onFocus={this.queryCompanyName}
                    allowClear
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.companyNameList.map((val) => (
                      <Option
                        key={val.sxgl_company_id}
                        value={val.sxgl_company_id}
                      >
                        {val.sxgl_company_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
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
