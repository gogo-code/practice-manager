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

    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.searchBox}>
        <Form>
          <Row>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="学生姓名:">
                {getFieldDecorator("sxgl_student_name")(<Input />)}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="学生学院:">
                {getFieldDecorator("sxgl_student_college")(<Input />)}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <FormItem {...formItemLayout} label="学生专业:">
                {getFieldDecorator("sxgl_student_major")(<Input />)}
              </FormItem>
            </Col>
            <Col {...colSpan}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onSearch}
                style={{ marginRight: 8, marginLeft: 56 }}
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

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
export default Form.create()(Search);
