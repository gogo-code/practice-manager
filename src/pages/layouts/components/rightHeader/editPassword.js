import React from "react";
import { Modal, Form, Input, Button, message, Icon } from "antd";
import PropTypes from "prop-types";
import md5 from "blueimp-md5";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { changeUserPwd, getUser, removeUser } from "./../../../../api/userApi";
import config from "./../../../../config/config";

class EditPassword extends React.Component {
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

  checkPsd(rule, value, callback) {
    let password2 = this.props.form.getFieldValue("confirm_password");
    if (password2 && password2 !== value) {
      callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  }

  checkPsd2(rule, value, callback) {
    let password = this.props.form.getFieldValue("new_password");
    if (password && password !== value) {
      callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    const { visible } = this.props;

    return (
      <Modal
        title="修改密码"
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
          <FormItem>
            {getFieldDecorator("old_password", {
              rules: [{ required: true, message: "请输入旧的密码!" }],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入旧的密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("new_password", {
              rules: [
                { required: true, message: "请输入新的密码!" },
                {
                  validator: (rule, value, callback) => {
                    this.checkPsd(rule, value, callback);
                  },
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入新的密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm_password", {
              rules: [
                { required: true, message: "请输入确认密码!" },
                {
                  validator: (rule, value, callback) => {
                    this.checkPsd2(rule, value, callback);
                  },
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="请输入确认密码"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(Form.create()(EditPassword));
