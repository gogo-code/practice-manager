import React, { Component } from "react";
import styles from "./index.module.less";
import { resultQuery } from "@/api/studentApi/result";
import { getUser } from "@/api/userApi";

export default class index extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.indexQuery();
  }
  indexQuery = (params = {}) => {
    this.setState({
      loading: true,
    });
    params.sxgl_student_id = getUser().sxgl_user_account;
    resultQuery(params)
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
        // message.error("查询失败!");
      });
  };
  render() {
    console.log(this.state.data);
    if(this.state.data.sxgl_student_score&&this.state.data) return <div className={styles.container}>您的实习结果出来啦~ 成绩为：{this.state.data.sxgl_student_score}分</div>
    return <div className={styles.container}>目前还没有出成绩哦 ！</div>;
  }
}
