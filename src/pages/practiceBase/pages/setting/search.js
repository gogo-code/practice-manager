import React, { Component } from "react";
import { Button, Col, Form, Select, Input, Row } from "antd";
import styles from "./index.module.less";

const FormItem = Form.Item;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  // 查询
  onSearch = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch({ param: values });
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

    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.searchBox}>
        <Form >
          <Row>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="单位名称:">
                {getFieldDecorator("categoryCode")(<Input />)}
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
