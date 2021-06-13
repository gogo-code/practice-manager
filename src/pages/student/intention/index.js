import React, { Component } from "react";

import {
  message,
  Modal,
  Button,
  Spin,
  Form,
  Col,
  Row,
  Select,
  Input,
  Upload,
} from "antd";
import styles from "./index.module.less";
import {
  intentionQuery,
  arrangeUpdate,
  intentionAdd,
} from "@/api/studentApi/intention";
import { getUser } from "@/api/userApi";
import { withRouter } from "react-router-dom";
const { confirm } = Modal;
const { Option } = Select;

class index extends Component {
  state = {
    select: null,
    reason: null,
  };

  componentWillMount() {
    this.indexQuery();
  }

  indexQuery = (params = {}) => {
    params.sxgl_student_id = getUser().sxgl_user_account;
    this.setState({
      loading: true,
    });
    intentionQuery(params)
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            loading: false,
            select: result.data[0].sxgl_select,
          });
          if (result.data[0].sxgl_select === 4) {
            message.error("审批未通过！");
            this.setState({
              reason: result.data[0].sxgl_student_remark,
            });
          }
        }
      })
      .catch(() => {
        message.error("查询失败!");
      });
  };

  onSelfSelect = (params) => {
    let _this = this;
    let values = {};
    values.sxgl_select = 5;
    values.sxgl_student_id = getUser().sxgl_user_account;
    let token = getUser().token;
    confirm({
      title: "你确定选择自主实习吗?",
      content: "选择后需要填写一些信息，管理员对其进行审核。",
      onOk() {
        arrangeUpdate(token, values).then((result) => {
          if (result && result.status === 1) {
            _this.setState({ select: 5 });
          } else {
            message.success("申请失败！");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  onSchoolArrange = (params) => {
    let _this = this;
    let values = {};
    values.sxgl_select = 2;
    values.sxgl_student_id = getUser().sxgl_user_account;
    let token = getUser().token;
    confirm({
      title: "你确定选择学校安排吗?",
      content: "选择后不可更改。",
      onOk() {
        arrangeUpdate(token, values).then((result) => {
          if (result && result.status === 1) {
            _this.setState({ select: 2 });
            message.success("提交成功！");
          } else {
            message.success("申请失败！");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      // file.response
      // values.sxgl_file=values.sxgl_file.file.response.data
      if (!err) {
        values.sxgl_file = values.sxgl_file.file.response.data.name;
        values.sxgl_student_id = getUser().sxgl_user_account;
        values.sxgl_select = 1;
        arrangeUpdate(getUser().token, values).then((result) => {
          if (result && result.status === 1) {
            intentionAdd(getUser().token, values)
              .then((result) => {
                if (result && result.status === 1) {
                  message.success("提交成功！");
                  this.setState({
                    select: 1,
                  });
                } else {
                  message.error("提交失败!");
                }
              })

              .catch(() => {
                message.error("提交失败!!");
              });
          } else {
            message.success("申请失败！");
          }
        });
      }
    });
  };

  again = (params) => {
    let values = {};
    values.sxgl_select = 0;
    values.sxgl_student_id = getUser().sxgl_user_account;
    let token = getUser().token;
    arrangeUpdate(token, values).then((result) => {
      if (result && result.status === 1) {
        this.setState({ select: 0 });
      } else {
        message.success("申请失败！");
      }
    });
  }
  

  // 学校安排结果

  render() {
    const props = {
      name: "sxgl_file",
      action: "/api/auth/upload/uploadIntention",
    };
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 },
    };
    const { select } = this.state;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const { TextArea } = Input;
    if (select === 0)
      return (
        <div className={styles.container}>
          <Button
            type="primary"
            style={{ marginRight: 16 }}
            onClick={this.onSelfSelect}
          >
            自主实习
          </Button>
          <Button type="primary" onClick={this.onSchoolArrange}>
            学校安排
          </Button>
        </div>
      );
    else if (select === 1)
      return (
        <div className={styles.container}>请耐心等待,管理员正在审核中...</div>
      );
    else if (select === 2)
      return <div className={styles.container}>提交成功！</div>;
    else if (select === 3) return <div className={styles.container}>审批通过!</div>;
    else if (select === 5)
      return (
        <div>
          <Form className={styles.formbox}>
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>实习申请单
            </div>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="学年">
                  {getFieldDecorator(
                    "sxgl_year",
                    {}
                  )(
                    <Select placeholder="请选择">
                      <Option value="2020-2021上学期">2020-2021上学期</Option>
                      <Option value="2020-2021下学期">2020-2021下学期</Option>
                      <Option value="2021-2022上学期">2021-2022上学期</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实习公司">
                  {getFieldDecorator("sxgl_comp_name", {
                    rules: [{ required: true, message: "请输入公司名称!" }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="实习岗位">
                  {getFieldDecorator("sxgl_intention_position", {
                    rules: [{ required: true, message: "请输入实习岗位!" }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="公司联系人">
                  {getFieldDecorator("sxgl_comp_contact", {
                    rules: [{ required: true, message: "请输入公司联系人!" }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="联系电话">
                  {getFieldDecorator("sxgl_comp_phone", {
                    rules: [{ required: true, message: "请输入联系电话!" }],
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="附件">
                  {getFieldDecorator("sxgl_file", {
                    rules: [{ required: true, message: "请上传附件!" }],
                  })(
                    <Upload {...props}>
                      <Button>上传</Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem {...formItemLayout} label="联系地址">
                  {getFieldDecorator("sxgl_comp_address", {
                    rules: [{ required: true, message: "请输入联系地址!" }],
                  })(<TextArea />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={this.handleOk}>
                  提交
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      );
    else if (select === 4) {
      return (
        <div className={styles.containerTwo}>
          {" "}
          <Row> 审批未通过！ </Row>
          <Row>原因：{this.state.reason}</Row>
          <Row>  </Row>
          <Row>  </Row>
          <Row>
            {" "}
            <Button type="primary" onClick={this.again}>
              再次申请
            </Button>
          </Row>
        </div>
      );
    } else if (select === null)
      return (
        <div className={styles.container}>
          <Spin />
        </div>
      );
  }
}

export default withRouter(Form.create()(index));
