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
import moment from "moment";
import { teacherNameQuery } from "@/api/adminApi/teacherSetting";
const { RangePicker } = DatePicker;

class ArrangeTeacher extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    teacherNameList: [],
  };

  componentDidMount() {}

  queryTeacher = (params) => {
    teacherNameQuery({sxgl_department:params})
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            teacherNameList: result.data,
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

    const { visible, record } = this.props;

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
        title="指定校内教师"
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
              <FormItem {...formItemLayout} label="校内教师">
                {getFieldDecorator("sxgl_teacher_id", {
                  rules: [],
                })(
                  <Select
                    placeholder="请选择"
                    onFocus={()=>{this.queryTeacher(record.sxgl_department)}}
                    allowClear
                  >
                    {this.state.teacherNameList.map((val) => (
                      <Option
                        key={val.sxgl_teacher_id}
                        value={val.sxgl_teacher_id}
                      >
                        {val.sxgl_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(Form.create()(ArrangeTeacher));
