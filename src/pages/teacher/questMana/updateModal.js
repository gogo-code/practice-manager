import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Icon,
  Col,
  Row,
  Select,
  DatePicker,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { getUser } from "@/api/userApi";
import moment from 'moment'
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
  componentDidMount() {
    this.queryCompanyName();
  }

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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const formItemLayout2 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    return (
      <Modal
        width="700px"
        title="修改任务信息"
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
      
      <Form className={styles.formbox}>
          <Row>
            <Col>
              <FormItem {...formItemLayout} label="任务名称">
                {getFieldDecorator("sxgl_quest_name", {
                  initialValue:record.sxgl_quest_name,
                  rules: [{ required: true, message: "请输入任务名称!" }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem {...formItemLayout} label="选择时间:">
                {getFieldDecorator("startAndEndTime", {
                  initialValue:[moment(record.sxgl_createtime),moment(record.sxgl_endtime)],
                  rules: [{ required: true, message: "必填" }]
                })(<RangePicker showTime format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
            <Col>
              <FormItem {...formItemLayout} label="任务描述">
                {getFieldDecorator("sxgl_quest_description", {
                  initialValue:record.sxgl_quest_description,
                  rules: [],
                })(<TextArea rows={4} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(Form.create()(UpdateModal));
