import request from 'utils/request';
import { parseParameters } from 'hzero-front/lib/utils/utils';

/**
 * 查询数据
 * */
export async function fetchTableData(params) {
  console.log('发送请求');
  const param = parseParameters(params);
  console.log(param);
  return request(`/leida/v1/pre-pay-report/list`, {
    method: 'POST',
    body: param,
  });
}
