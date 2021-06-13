import React, { Component } from "react";
import {
  Table,
  Button,
  Upload,
  message,
  Modal,
  Divider,
  Form,
  Row,
  Col,
  Spin,
} from "antd";
import { planQuery } from "@/api/studentApi/plan";
import { reportAdd } from "@/api/studentApi/process";
import { getUser } from "@/api/userApi";
import Search from "./search";
import styles from "./index.module.less";
import moment from "moment";

const confirm = Modal.confirm;
class index extends Component {
  state = {
    currentIndex: 1,
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    updateModalShow: false,
    addModalShow: false,
    arrangeCompanyShow: false,
    arrangeTeacherShow: false,
    updateRow: {},
  };

  componentDidMount() {}

  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    planQuery(params)
      .then((result) => {
        if (result && result.status === 1) {
          this.setState({
            loading: false,
            data: result.data[0],
            show: true,
          });
        }
      })
      .catch(() => {
        message.error("查询失败!");
      });
  };

  // 表单搜索
  onSearch = (params) => {
    this.indexQuery(params);
  };

  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      // file.response
      // values.sxgl_file=values.sxgl_file.file.response.data
      if (!err) {
        values.sxgl_student_Report = values.sxgl_file.file.response.data.name;
        values.sxgl_student_id = getUser().sxgl_user_account;
        reportAdd(getUser().token, values)
          .then((result) => {
            if (result && result.status === 1) {
              message.success("提交成功！");
            } else {
              message.error("提交失败!");
            }
          })
          .catch(() => {
            message.error("提交失败!!");
          });
      }
    });
  };

  render() {
    const props = {
      name: "sxgl_file",
      action: "/api/auth/upload/uploadReport",
    };
    const formItemLayout2 = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 },
    };
    const { getFieldDecorator } = this.props.form;
    const {
      sxgl_company_name,
      sxgl_company_phone,
      sxgl_company_tutor_name,
      sxgl_company_tutor_phone,
      sxgl_createtime,
      sxgl_department,
      sxgl_endtime,
      sxgl_grade,
      sxgl_name,
      sxgl_phone,
      sxgl_plan_name,
      sxgl_student_class,
      sxgl_type,
      sxgl_year,
    } = this.state.data;
    return (
      <div>
        <Search openChange={() => this.openChange()} onSearch={this.onSearch} />
        <Spin spinning={this.state.loading}>
          <Form
            className={styles.formbox}
            {...formItemLayout2}
            style={{ display: this.state.show ? "block" : "none" }}
          >
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>实习计划信息
            </div>
            <div>
              <Row>
                {" "}
                <Col span={12}>
                  <Form.Item label="计划名称">
                    <span className="ant-form-text">{sxgl_plan_name}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="实习时间">
                    <span className="ant-form-text">
                      {" "}
                      {sxgl_createtime == ""
                        ? sxgl_createtime
                        : moment(sxgl_createtime).format("yyyy-MM-DD")}
                      {sxgl_createtime == "" ? "" : "~"}
                      {sxgl_endtime == ""
                        ? sxgl_endtime
                        : moment(sxgl_endtime).format("yyyy-MM-DD")}
                    </span>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col span={12}>
                  <Form.Item label="所属院系">
                    <span className="ant-form-text">{sxgl_department}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="实习班级">
                    <span className="ant-form-text">{sxgl_student_class}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col span={12}>
                  <Form.Item label="实习类型">
                    <span className="ant-form-text">{sxgl_type}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="学年学期">
                    <span className="ant-form-text">{sxgl_year}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>实习单位信息
            </div>
            <div>
              <Row>
                {" "}
                <Col span={12}>
                  <Form.Item label="单位名称">
                    <span className="ant-form-text">{sxgl_company_name}</span>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="联系电话">
                    <span className="ant-form-text">{sxgl_company_phone}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>校内教师信息
            </div>
            <Row>
              {" "}
              <Col span={12}>
                <Form.Item label="教师姓名">
                  <span className="ant-form-text">{sxgl_name}</span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系电话">
                  <span className="ant-form-text">{sxgl_phone}</span>
                </Form.Item>
              </Col>
            </Row>
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>校外教师信息
            </div>
            <Row>
              {" "}
              <Col span={12}>
                <Form.Item label="教师姓名">
                  <span className="ant-form-text">
                    {sxgl_company_tutor_name}
                  </span>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系电话">
                  <span className="ant-form-text">
                    {sxgl_company_tutor_phone}
                  </span>
                </Form.Item>
              </Col>
            </Row>
            <div className={styles.title}>
              <span className={styles.titleLeft}></span>实习报告
            </div>
            
            <div style={{marginBottom:8,marginTop:8}}>温馨提示：实习报告可参考 <a style={{color:"#1890ff"}} href="/api/auth/upload/download?data=/public/uploads/documents/template/武汉科技大学毕业实习手册.doc" download="实习手册.doc">模板</a></div>
            <Row>
              {" "}
              <Col span={2}></Col>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator(
                    "sxgl_file",
                    {}
                  )(
                    sxgl_plan_name ? (
                      <Upload {...props}>
                        <Button>上传</Button>
                      </Upload>
                    ) : (
                      <div></div>
                    )
                  )}
                </Form.Item>
              </Col>
              <Col span={5}></Col>
            </Row>
            <div style={{ height: 40 }}></div>
            <Row>
              <Col span={12}>
                <Button type="primary" onClick={this.handleOk}>
                  提交
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    );
  }
}
export default Form.create()(index);
