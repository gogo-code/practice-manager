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
import md5 from "blueimp-md5";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { changeUserPwd, getUser, removeUser } from "@/api/userApi";
import config from "@/config/config";

class AddModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.old_password === values.new_password) {
          message.warning("新密码和旧密码不能一致!");
          return;
        }

        // 密码加密
        const old_pwd = md5(values.old_password, config.KEY);
        const new_pwd = md5(values.new_password, config.KEY);

        // 调用接口
        changeUserPwd(getUser().token, old_pwd, new_pwd)
          .then((result) => {
            if (result && result.status === 1) {
              message.success(result.msg);
              // 清除用户信息
              removeUser();
              //  路由跳转
              this.props.history.replace("/login");
            } else if (result && result.status === 0) {
              message.error(result.msg);
            } else {
              message.error("服务器内部错误!");
            }
          })
          .catch(() => {
            message.error("修改密码失败!!");
          });
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

    const { visible} = this.props;

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
        title="新增单位信息"
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
      >
        <Form className={styles.formbox}>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="单位名称">
                {getFieldDecorator("old_password", {
                  rules: [{ required: true, message: "请输入单位名称!" }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="所属行业">
                {getFieldDecorator("old_password", {
                  rules: [],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="单位类型">
                {getFieldDecorator("old_password", {
                  rules: [],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系人">
                {getFieldDecorator("old_password", {
                  rules: [],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="联系电话">
                {getFieldDecorator("old_password", {
                  rules: [],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout2} label="详细地址">
                {getFieldDecorator("old_password", {
                  rules: [],
                })(<Input.TextArea />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(Form.create()(AddModal));
