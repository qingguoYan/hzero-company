import request from 'utils/request';

/**
 * 获得公司代码数据
 * */
export async function fetchCompanyData(params) {
  return request(`/hpfm/v1/lovs/value/page`, {
    method: 'GET',
    query: params,
  });
}
