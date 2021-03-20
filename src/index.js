import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';

// 1. 引入provider组件
import { Provider } from 'react-redux'
import store from './store/index'
moment.locale('zhCN')

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
  <Provider store={store}>
    <App/>
  </Provider>
  </ConfigProvider>
  ,
  document.getElementById("root")
);
