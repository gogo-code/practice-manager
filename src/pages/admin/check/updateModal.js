import React from "react";
import { Modal, Form, Input, Button, message, Icon } from "antd";
import PropTypes from "prop-types";
import md5 from "blueimp-md5";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { changeUserPwd, getUser, removeUser } from "@/api/userApi";
import config from "@/config/config";

class EditPassword extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };



  handleCancel = (e) => {
    this.props.hideFunc();
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    const { visible, record=[{}] } = this.props;
    console.log(record);
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
    return (
      <Modal
        title="实习申请详情"
        visible={visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            返回
          </Button>,
        ]}
        destroyOnClose="true"
      >
        <Form className={styles.formbox}>
          <FormItem {...formItemLayout} label="学年：">
            {record[0].sxgl_year}
          </FormItem>
          <FormItem {...formItemLayout} label="实习公司：">
            {record[0].sxgl_comp_name}
          </FormItem>
          <FormItem {...formItemLayout} label="实习岗位：">
            {record[0].sxgl_intention_position}
          </FormItem>
          <FormItem {...formItemLayout} label="公司联系人：">
            {record[0].sxgl_comp_contact}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话：">
            {record[0].sxgl_comp_phone}
          </FormItem>
          <FormItem {...formItemLayout} label="联系地址：">
            {record[0].sxgl_comp_address}
          </FormItem>
          <FormItem {...formItemLayout} label="附件：">
          <a href={'/api/auth/upload/download?data='+record[0].sxgl_file} download="证明材料.doc">
            下载
          </a>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default withRouter(Form.create()(EditPassword));
