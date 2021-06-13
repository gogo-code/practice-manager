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
import {
  queryCompanyName,
  queryCompanyTeacherName,
} from "@/api/adminApi/company";
const { RangePicker } = DatePicker;

class ArrangeCompany extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    companyNameList: [],
    companyTutorList: [],
    startValue: null,
    endValue: null,
  };
  componentDidMount() {
    this.queryCompanyName();
  }

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

  queryCompanyTutor = (value) => {
    const { form } = this.props;
    let values = form.getFieldsValue();
    console.log(values);
    if (values.sxgl_company_id) {
      
    }
  };

  onChange = (value) => {
    const { form } = this.props;
    form.setFieldsValue({
      sxgl_company_tutor_id: "",
    });
    queryCompanyTeacherName({ sxgl_company_id: value })
        .then((result) => {
          if (result && result.status === 1) {
            this.setState({
              companyTutorList: result.data,
            });
          }
        })
        .catch(() => {
          message.error("查询失败!");
        });
    // this.queryCompanyTutor(value);
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
        title="指定实习单位以及校外教师"
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
            <Col span={12}>
              <FormItem {...formItemLayout} label="实习单位">
                {getFieldDecorator("sxgl_company_id", {
                  rules: [],
                })(
                  <Select
                    placeholder="请选择所属单位"
                    onFocus={this.queryCompanyName}
                    onChange={this.onChange}
                    allowClear
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
            <Col span={12}>
              <FormItem {...formItemLayout} label="校外教师">
                {getFieldDecorator("sxgl_company_tutor_id", {
                  rules: [],
                })(
                  <Select
                    placeholder="请选择"
                    // onFocus={this.queryCompanyTutor}
                    allowClear
                  >
                    {this.state.companyTutorList.map((val) => (
                      <Option
                        key={val.sxgl_company_tutor_id}
                        value={val.sxgl_company_tutor_id}
                      >
                        {val.sxgl_company_tutor_name}
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

export default withRouter(Form.create()(ArrangeCompany));
