import 'react-app-polyfill/ie9';
import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
// import React from 'react';
// import ReactDOM from 'react-dom';
// 控制 fetch 结束
import 'abort-controller/polyfill';

// user BrowserHistory
import { createBrowserHistory as createHistory } from 'history';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

import { getIeVersion } from 'utils/browser';
import { persistMenuTabs } from 'utils/menuTab';

// import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.less';

const ieVersion = getIeVersion();

const basePath = process.env.BASE_PATH;

// 当 为 ie 且 ie版本小于 11 时 跳转到 推荐浏览器页面
if (ieVersion !== -1 && ieVersion < 10) {
  window.location.href = `${basePath || '/'}suggestBrowser.html`;
}

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const browserHistoryBuildOptions = {};
if (basePath !== '/') {
  browserHistoryBuildOptions.basename = basePath;
}

// 1. Initialize
const app = dva({
  history: createHistory(browserHistoryBuildOptions),
  // onError (error) {
  //   message.error(error.message);
  // },
});

// 1.1 attach dva app to window
window.dvaApp = app;

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);
app.model(require('hzero-front/lib/models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
export default app._store; // eslint-disable-line

window.addEventListener('beforeunload', persistMenuTabs); // 存储 tab 信息

if (process.env.NODE_ENV !== 'development') {
  // 只有在非开发模式下才监听全局错误
  // 开发模式 webpack-dev 会自动将错误的显示出来
  window.addEventListener('error', dealGlobalError);
}

/**
 * 全局错误处理
 * @param {Error} error - 错误
 */
function dealGlobalError(error) {
  window.location.href = `${basePath || '/'}error.html?errorMessage=${encodeURIComponent(
    error && error.message
  )}&errorLocation=${encodeURIComponent(window.location.href)}`;
}

serviceWorker.unregister();
