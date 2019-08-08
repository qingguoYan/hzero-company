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
  return request(`/leida/v1/process-select/list/discountOAReport`, {
    method: 'POST',
    query: pagination,
    body: params,
  });
}
export async function getParent(params) {
  const pa2 = parseParameters(params);
  const pa3={
    name: pa2.name,
  };
  return request(`/iam/hzero/v1/roles/self/manageable-roles`, {
    method: 'GET',
    query: pa3,
  });
}
