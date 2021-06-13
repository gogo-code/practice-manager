import React, { Component, PropTypes } from "react";
import {
  Form,
  Icon,
  Modal,
  Input,
  Button,
  Checkbox,
  Tabs,
  Row,
  Col,
  message,
} from "antd";
import md5 from "blueimp-md5";
import classNames from 'classnames';

import { checkLogin, saveUser } from "./../../api/userApi";
import config from "./../../config/config";

import styles from "./index.module.less";
import logo from "./images/logo.png";
import img from "./images/img.png";
import bg from "./images/bg.png";
import leftBg from "./images/leftBg.png";
import changeToQrcode from "./images/change_01.png";
import changeToPwd from "./images/change_02.png";
import icon_qrcode from "./images/icon_01.png";
import icon_pwd from "./images/icon_02.png";
import qrcode from "./images/qrcode.png";
import reset from "./images/shuaxin.png";
import slider from "./images/slider.png";
import sliderEnd from "./images/sliderEnd.png";

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLeft: icon_qrcode,
      iconRight: changeToQrcode,
      logoUrl: logo,
      imageUrl: img,
      title: "欢迎登录实习管理系统",
      change: 0,
      move: false, // 控制滑块滑动
      translateX: 0,
      verifyText: "请按住滑块，拖动到最右边",
      sliderImg: slider,
    };
    // 解决鼠标滑动过快事件丢失的问题
    window.onmouseup = (e) => this.onMouseUp(e);
    window.onmousemove = (e) => this.onMouseMove(e);
  }

  componentDidMount() {}

  // 登录提交
  handleAccountSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("表单提交的数据: ", values);
        // 对密码进行MD5加密
        const hash_pwd = md5(values.password, config.KEY);
        // 发送验证码
        const verifyCode = this.state.verifyText === "验证成功" ? "1" : "0";
        // 处理登录业务
        checkLogin(values.account, hash_pwd, verifyCode)
          .then((result) => {
            console.log(result);
            if (result && result.status === 1) {
              message.success(result.msg);
              // 保存用户信息到本地
              saveUser(result.data);
              // 跳转到主面板
              this.props.history.replace("/");
            } else if (result && result.status === 0) {
              message.error(result.msg);
            } else {
              message.error("网络出现一点小问题!");
            }
          })
          .catch((error) => {
            message.error("服务器端内部错误!");
          });
      }
    });
  };

  // 刷新二维码
  handleReset = (params) => {
    let originAngle = this.spin.style.transform.replace(/[^0-9]/gi, "");
    originAngle = originAngle ? Number(originAngle) : 0;
    this.spin.style.transform = `rotate(${originAngle + 360}deg)`;
  };

  // 更换页面
  pageChange = () => {
    if (this.state.iconLeft === icon_qrcode) {
      this.setState({
        iconLeft: icon_pwd,
        iconRight: changeToPwd,
        change: 1,
      });
    } else {
      this.setState({
        iconLeft: icon_qrcode,
        iconRight: changeToQrcode,
        change: 0,
      });
    }
    // 解决页面跳转到二维码再跳转到登录页验证成功的问题
    if (this.state.change === 0) {
      this.setState({
        verifyText: "请按住滑块，拖动到最右边",
        sliderImg: slider,
      });
    }
  };

  // 点击滑块
  onMouseDown = (e) => {
    // console.log(e)
    // 后面的判断解决当验证成功时鼠标点击会回到初始位置的bug
    if (!this.state.move && this.state.verifyText !== "验证成功") {
      this.setState({
        move: true,
        translateX: e.clientX,
      });
    }
  };

  // 移动滑块
  onMouseMove = (e) => {
    let maxWidth;
    // 阻止不能滑动的情况
    // e.preventDefault();
    // 解决页面跳转到二维码后获取不到dom的bug
    if (this.verifyBox !== null && this.slider !== null) {
      maxWidth = this.verifyBox.clientWidth - this.slider.clientWidth;
    }
    // 如果可以移动就更改滑块位置以及背景块的宽度
    if (this.state.move) {
      if (e.clientX - this.state.translateX < 0) {
        this.slider.style.left = `0px`;
        this.verifyBg.style.width = `0px`;
      } else if (e.clientX - this.state.translateX > maxWidth) {
        this.slider.style.left = `${maxWidth}px`;
        this.verifyBg.style.width = `${maxWidth}px`;
      } else {
        this.slider.style.left = `${e.clientX - this.state.translateX}px`;
        this.verifyBg.style.width = `${e.clientX - this.state.translateX}px`;
      }
    }
  };

  // 释放滑块
  onMouseUp = (e) => {
    let maxWidth;
    // 解决页面跳转到二维码后获取不到dom的bug
    if (this.verifyBox !== null && this.slider !== null) {
      maxWidth = this.verifyBox.clientWidth - this.slider.clientWidth;
    }
    // 外层判断是为了和前面鼠标移动建立联系
    if (this.state.move) {
      if (e.clientX - this.state.translateX >= maxWidth) {
        this.slider.style.left = `${maxWidth}px`;
        this.slider.style.borderRadius = `6px`;
        this.setState({
          verifyText: "验证成功",
          sliderImg: sliderEnd,
        });
      } else {
        this.verifyBox.style.backgroundColor = "#f0f2f5";
        this.slider.style.left = `0px`;
        this.verifyBg.style.width = `0px`;
      }
    }

    this.setState({
      move: false,
    });
  };

  // 忘记密码提示信息
  info = () => {
    Modal.info({
      title: "忘记密码请联系管理员重置密码 !",
      onOk() {},
      okText: "好的",
    });
  };

  render() {
    const {
      imageUrl,
      logoUrl,
      title,
      iconLeft,
      iconRight,
      change,
      verifyText,
      sliderImg,
    } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${bg})` }}
        onMouseUp={this.onMouseUp}
      >
        <div className={styles.content}>
          <div
            className={styles.main}
            style={{
              backgroundImage: `url(${leftBg})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className={styles.left}>
              <img src={`${logoUrl}`} className={styles.logo} />
              <img src={`${imageUrl}`} className={styles.img} />
            </div>
            <div className={styles.right}>
              <div className={styles.icon}>
                <div className={styles.iconLeft}>
                  <img src={`${iconLeft}`} alt="" onClick={this.pageChange} />
                </div>
                <div className={styles.iconRight}>
                  <img src={`${iconRight}`} alt="" onClick={this.pageChange} />
                </div>
              </div>
              {change === 0 ? (
                <div>
                  <div className={styles.logoTitle}>{title}</div>
                  <Form
                    className={styles.formbox}
                    onSubmit={this.handleAccountSubmit}
                  >
                    <FormItem>
                      {getFieldDecorator("account", {
                        rules: [
                          {
                            required: true,
                            message: "请输入您的职工号/学号",
                          },
                        ],
                      })(
                        <Input size="large" placeholder="请输入职工号/学号" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "请输入密码",
                          },
                        ],
                      })(
                        <Input
                          size="large"
                          type="password"
                          placeholder="请输入密码（初始密码为身份证后六位）"
                        />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator("verifyText", {
                        rules: [],
                      })(
                        <div
                          className={styles.verifyBox}
                          onMouseMove={this.onMouseMove}
                          ref={(ref) => {
                            this.verifyBox = ref;
                          }}
                        >
                          <div
                            className={styles.verifyBtn}
                            ref={(ref) => {
                              this.slider = ref;
                            }}
                            onMouseDown={this.onMouseDown}
                          >
                            <img
                              src={`${sliderImg}`}
                              alt=""
                              draggable="false"
                            />
                          </div>
                          <p
                            className={styles.verifyText}
                            style={{
                              color:
                                verifyText === "验证成功" ? "#11D1A3" : "null",
                              background:
                                verifyText === "验证成功" ? "#CFF6EE" : "null",
                            }}
                          >
                            {verifyText}
                          </p>
                          <div
                            className={styles.verifyBg}
                            ref={(ref) => {
                              this.verifyBg = ref;
                            }}
                          ></div>
                        </div>
                      )}
                    </FormItem>
                    <FormItem>
                      <Button
                        className={classNames(styles.btn, verifyText === "验证成功" ? styles.btnSuc : "")}
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{
                          opacity: verifyText === "验证成功" ? "1" : "0.65",
                          transition: "0.5s",
                        }}
                      >
                        登&nbsp;录
                      </Button>
                    </FormItem>
                    <FormItem>
                      <div>
                        <a
                          href="javascript:;"
                          className={styles.forget}
                          onClick={this.info}
                        >
                          忘记密码？
                        </a>
                      </div>
                    </FormItem>
                  </Form>
                </div>
              ) : (
                <div>
                  <div className={styles.qrcodeTitle}>扫码登录</div>
                  <div className={styles.qrcodeContent}>
                    <div className={styles.qrcodeBox}>
                      <img src={`${qrcode}`} alt="" />
                      <div className={styles.qrcode} onClick={this.handleReset}>
                        <img
                          src={reset}
                          alt=""
                          ref={(ref) => {
                            this.spin = ref;
                          }}
                        />
                        &nbsp;&nbsp;
                        <span>点击刷新验证码</span>
                      </div>
                    </div>
                    <div className={styles.text}>
                      <p>
                        1、请使用“企业微信 - 工作台 - 教务系统 -
                        扫一扫”功能登录本系统
                      </p>
                      <p>
                        2、若未关注“✕✕大学”企业微信，请先关注“✕✕大学”企业微信
                        后使用，关注方式请点击
                        <a href="javascript:;">此处链接</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.mottoLeft}>厚德博学</div>
        <div className={styles.mottoRight}>崇实去浮</div>
        <div className={styles.footer}>
          Copyright 2021 ✕✕大学 版权所有 校址： ✕✕省 ✕✕市 ✕✕路
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
