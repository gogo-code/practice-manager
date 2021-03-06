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
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { queryCompanyName } from "@/api/adminApi/company";
import { JobQuery } from "@/api/adminApi/companyTutor";

import { getUser } from "@/api/userApi";

class AddModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    companyNameList: [],
    jobNameList: [],
  };

  componentDidMount() {}
  // 获取公司名
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

  // 改变
  onChange = (value) => {
    const { form } = this.props;
    form.setFieldsValue({
      sxgl_company_tutor_job: "",
    });
    JobQuery({ sxgl_company_id: value })
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            jobNameList: result.data,
          });
        }
      })
      .catch(() => {
        message.error("查询失败!");
      });
    // this.queryCompanyTutor(value);
  };

  queryJobName = (params) => {
    JobQuery()
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
        this.props.onAdd(getUser().token, values);
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

    const { visible, uuid } = this.props;

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
        title="新增岗位信息"
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
              <FormItem {...formItemLayout} label="职工号">
                {getFieldDecorator("sxgl_company_tutor_id", {
                  rules: [{ required: true, message: "请输入岗位名称!" }],
                  initialValue: uuid,
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator("sxgl_company_tutor_name", {
                  rules: [{ required: true, message: "请输入姓名!" }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="企业单位">
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
              <FormItem {...formItemLayout} label="学历">
                {getFieldDecorator("sxgl_company_tutor_edu", {
                  rules: [],
                })(
                  <Select placeholder="请选择学历">
                    <Option value="专科">专科</Option>
                    <Option value="本科">本科</Option>
                    <Option value="硕士">硕士</Option>
                    <Option value="博士">博士</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator("sxgl_company_tutor_phone", {})(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="职务">
                {getFieldDecorator(
                  "sxgl_company_tutor_job",
                  {}
                )(
                  <Select
                    placeholder="请选择"
                    // onFocus={this.queryCompanyTutor}
                    allowClear
                  >
                    {this.state.jobNameList.map((val) => (
                      <Option
                        key={val.sxgl_job_id}
                        value={val.sxgl_job_id}
                      >
                        {val.sxgl_job_name}
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

export default withRouter(Form.create()(AddModal));
