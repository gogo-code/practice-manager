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

import { getUser } from "@/api/userApi";

class AddModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

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

    const { visible } = this.props;

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
              <FormItem {...formItemLayout} label="岗位名称">
                {getFieldDecorator("sxgl_job_name", {
                  rules: [{ required: true, message: "请输入岗位名称!" }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="所属单位">
                {getFieldDecorator("sxgl_company_id", {
                  rules: [],
                })(
                  <Select
                    placeholder="请选择所属单位"
                    onFocus={this.queryCompanyName}
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
              <FormItem {...formItemLayout} label="岗位类型">
                {getFieldDecorator("sxgl_job_type", {
                  rules: [],
                })(
                  <Select placeholder="请选择岗位类型">
                    <Option value="管理岗位">管理岗位</Option>
                    <Option value="工勤岗位">工勤岗位</Option>
                    <Option value="专业技术岗位">专业技术岗位</Option>
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
