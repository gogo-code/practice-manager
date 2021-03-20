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
  DatePicker
} from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "./index.module.less";

import { queryCompanyName } from "@/api/adminApi/company";

import { getUser } from "@/api/userApi";

const { RangePicker } = DatePicker;
class AddModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
  };

  state = {
    companyNameList: [],
    startValue: null,
      endValue: null,
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
      [field]: value
    });
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };

  onEndChange = (value) => {
    this.onChange("endValue", value);
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
            <Col>
              <FormItem {...formItemLayout2} label="计划名称">
                {getFieldDecorator("sxgl_job_name", {
                  rules: [{ required: true, message: "请输入计划名称!" }],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem {...formItemLayout2} label="实习时间:">
                {getFieldDecorator("startAndEndTime", {
                  rules: [{ required: true, message: "必填" }]
                })(<RangePicker showTime format="YYYY-MM-DD" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="学年">
                {getFieldDecorator("sxgl_job_name", {
                })(
                  <Select placeholder="请选择">
                    <Option value="2020-2021">2020-2021</Option>
                    <Option value="2021-2022">2021-2022</Option>
                    <Option value="2022-2023">2022-2023</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="所属院系">
                {getFieldDecorator("sxgl_company_id", {
                  rules: [],
                })(
                  <Select placeholder="请选择">
                    <Option value="计算机学院">计算机学院</Option>
                    <Option value="医学院">医学院</Option>
                    <Option value="机械学院">机械学院</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="实习年级">
                {getFieldDecorator("sxgl_company_id", {
                  rules: [],
                })(
                  <Select placeholder="请选择">
                    <Option value="2017级">2017级</Option>
                    <Option value="2018级">2018级</Option>
                    <Option value="2019级">2019级</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="实习类型">
                {getFieldDecorator("sxgl_job_type", {
                  rules: [],
                })(
                  <Select placeholder="请选择">
                    <Option value="认识实习">认识实习</Option>
                    <Option value="生产实习">生产实习</Option>
                    <Option value="毕业实习">毕业实习</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
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
