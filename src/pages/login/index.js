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
} from "antd";

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
  handleAccountSubmit = (e) => {};

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
          <div className={styles.main}>
            <div
              className={styles.left}
              style={{
                backgroundImage: `url(${leftBg})`,
              }}
            >
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
                      {getFieldDecorator("userName", {
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
                      {getFieldDecorator("token", {
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
                      {getFieldDecorator("verifyBox", {
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
                            <img src={`${sliderImg}`} alt="" />
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
                        className={styles.btn}
                        type="primary"
                        size="large"
                        htmlType="submit"
                      >
                        登&nbsp;录
                      </Button>
                    </FormItem>
                    <FormItem>
                      <div>
                        <a href="javascript:;" className={styles.forget}>
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
          Copyright 2020 ✕✕大学 版权所有 校址： ✕✕省 ✕✕市 ✕✕路
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
