import request from 'utils/request';
import { parseParameters } from 'hzero-front/lib/utils/utils';

/**
 * 查询数据
 * */
export async function fetchTableData(params) {
  const param = parseParameters(params);
  const pagination = {
    page: param.page,
    size: param.size,
  };
  return request(`/leida/v1/pre-pay-report/list`, {
    method: 'POST',
    query: pagination,
    body: param,
  });
}
