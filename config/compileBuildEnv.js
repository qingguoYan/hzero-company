/**
 * 打包编译时的环境变量配置
 * compileBuildEnv
 * @author WY <yangg.wang06@hand-china.com>
 * @date 2019-06-17
 * @copyright 2019-06-17 © HAND
 */

module.exports = {
  BASE_PATH: '/',
  PLATFORM_VERSION: 'BUILD_PLATFORM_VERSION',
  WEBSOCKET_HOST: 'BUILD_WEBSOCKET_HOST',
  BPM_HOST: 'http://hzeronb.saas.hand-china.com/hwfe',
  WFP_EDITOR: 'BUILD_WFP_EDITOR',
  CLIENT_ID: 'BUILD_CLIENT_ID',
  API_HOST: 'BUILD_API_HOST',
  GENERATE_SOURCEMAP: false,
  // 服务合并的环境变量
  routeMap: JSON.stringify({
    "/hpfm": "/hpfm",
    "/iam": "/iam",
    "/hdtt": "/hdtt",
    "/hmsg": "/hmsg",
    "/hptl": "/hptl",
    "/hwfl": "/hwfl",
    "/hdtw": "/hdtw",
    "/hsdr": "/hsdr",
    "/hsgp": "/hsgp",
    "/hitf": "/hitf",
    "/hfle": "/hfle",
    "/oauth": "/oauth",
    "/hagd": "/hagd",
    "/himp": "/himp",
    "/hrpt": "/hrpt",
    "/hcnf": "/hcnf",
    "/hwfp": "/hwfp",
    "/hnlp": "/hnlp"
  }),
};
