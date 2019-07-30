import request from 'utils/request';

/**
 * 查询数据
 * */
export async function fetchTableData(params) {
  console.log('请求已发出');
  return request(``, {
    method: 'GET',
    query: params,
  });
}
