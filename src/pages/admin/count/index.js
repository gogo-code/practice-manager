import React, { Component } from "react";
import Card from "@/components/Card";
import styles from "./index.module.less";
import TeachertoStudent from "./teachertoStudent";
import DepartmentCount from "./departmentCount";
import Education from "./education";
import State from "./state";

export default class index extends Component {
  render() {
    return (
      <div>
        <div className={styles.box}>
          {" "}
          <Card title="全校师生统计">
            <TeachertoStudent></TeachertoStudent>
          </Card>
          <Card title="学院学生统计">
            <DepartmentCount></DepartmentCount>
          </Card>
        </div>
        <div className={styles.box}>
          <Card title="实习状态分析">
            <State></State>
          </Card>
          <Card title="学历结构分析">
            <Education></Education>
          </Card>
        </div>
      </div>
    );
  }
}
