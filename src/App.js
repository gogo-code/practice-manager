import React from 'react';
import './App.css';
import { Button } from 'antd';
import styles from './demo.module.less'

function App() {
  return (
    <div className={styles.span}>
      <Button type="primary">点击</Button>
    </div>
  );
}

export default App;