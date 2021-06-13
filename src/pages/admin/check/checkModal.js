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
  Radio,
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { getUser } from "@/api/userApi";
import moment from "moment";
import { teacherNameQuery } from "@/api/adminApi/teacherSetting";
const { RangePicker } = DatePicker;

class Check extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    teacherNameList: [],
  };

  componentDidMount() {}

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
    console.log(visible)
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
        title="审批"
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
              <FormItem {...formItemLayout} label="审批意见">
                {getFieldDecorator("sxgl_select", {
                  rules: [],
                  initialValue:3
                })(
                  <Radio.Group
                    onChange={this.onChange}
                  >
                    <Radio value={3}>通过</Radio>
                    <Radio value={4}>不通过</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator("sxgl_student_remark", {
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

export default withRouter(Form.create()(Check));
