import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Icon,
  InputNumber,
  Col,
  Row,
  Select,
  DatePicker,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { getUser } from "@/api/userApi";
import moment from "moment";
import { queryCompanyName } from "@/api/adminApi/company";

class UpdateModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    companyNameList: [],
    startValue: null,
    endValue: null,
  };
  componentDidMount() {}

  disabledStartDate = (startValue) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };

  onEndChange = (value) => {
    this.onChange("endValue", value);
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

  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUpdate(getUser().token, values);
      }
    });
  };

  handleCancel = (e) => {
    this.props.hideFunc();
  };

  render() {
    const FormItem = Form.Item;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const { visible, record } = this.props;
    const { RangePicker } = DatePicker;

    console.log(record);
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
    };
    const formItemLayout2 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    return (
      <Modal
        width="500px"
        title="成绩评定"
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            返回
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            提交
          </Button>,
        ]}
        destroyOnClose="true"
      >
        {record&&record.sxgl_select === 3 ? (
          <Form className={styles.formbox}>
            <Row>
              <Col>
                <FormItem {...formItemLayout} label="实习表现(占50%)">
                  {getFieldDecorator("usual", {
                    rules: [{ required: true, message: "请输入分数!" }],
                  })(<InputNumber />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="实习报告(占50%)">
                  {getFieldDecorator("report", {
                    rules: [{ required: true, message: "请输入分数!" }],
                  })(<InputNumber />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form className={styles.formbox}>
            <Row>
              <Col>
                <FormItem {...formItemLayout} label="考勤(占20%)">
                  {getFieldDecorator("work", {
                    rules: [{ required: true, message: "请输入分数!" }],
                  })(<InputNumber />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem {...formItemLayout} label="平时成绩(占30%)">
                  {getFieldDecorator("usual", {
                    rules: [{ required: true, message: "请输入分数!" }],
                  })(<InputNumber />)}
                </FormItem>
              </Col>
              <Col>
                <FormItem {...formItemLayout} label="实习报告(占50%)">
                  {getFieldDecorator("report", {
                    rules: [{ required: true, message: "请输入分数!" }],
                  })(<InputNumber />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    );
  }
}

export default withRouter(Form.create()(UpdateModal));
