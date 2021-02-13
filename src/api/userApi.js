import ajax from './index'
import {saveObj, getObj, removeObj} from './../tools/cache-tool'
import config from './../config/config'

/*
  1. 提供给外部判断是否登录的函数
*/
export const isLogin = ()=>{
    let userObj = getObj(config.USER_KEY);
    // 两个感叹号直接返回真假
    return !!userObj.token;
};

/*
 2. 登录接口
*/
export const  checkLogin = (account, password)=> ajax('/api/auth/user/login', {account, password}, 'post');

/*
  3. 退出登录
*/
export const checkLogOut = ()=> ajax('/api/auth/user/logout');

/*
 4. 保存用户登录的信息
*/
export const saveUser = (userObj)=>{
     saveObj(config.USER_KEY, userObj);
};

/*
 5. 删除本地存储的登录信息
*/
export const removeUser = ()=>{
  removeObj(config.USER_KEY);
};

/*
  6. 获取用户信息
 */
export const getUser = ()=>{
  return getObj(config.USER_KEY);
};

/*
  7. 修改管理员信息
*/
export const changeAdminMsg = (token, account_name, account_icon)=> ajax('/api/auth/admin/edit', {token, account_name, account_icon}, "post");


/*
  7. 修改管理员密码
*/
export const changeAdminPwd = (token, old_pwd, new_pwd)=> ajax('/api/auth/admin/reset_pwd', {token, old_pwd, new_pwd}, "post");