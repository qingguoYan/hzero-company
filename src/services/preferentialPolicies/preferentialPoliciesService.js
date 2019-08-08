import request from 'utils/request';
import { parseParameters } from 'hzero-front/lib/utils/utils';

export async function fetchTableData(params) {
  const param=parseParameters(params);
  const pagination={
    page: param.page,
    size: param.size,
  };
  const a={
    "CompanyCode": "1300",
    "FromDate": "2018-08-05",
    "ToDate": "2019-08-05",
    "BuPartnerLow": "3000000",
    "BuPartnerHigh": "3000000",
    "Control": "X",
    "to_ResultList": {
      "results": [],
    },
  };
  return request(`/leida/v1/Receive_Pay/list`, {
    method: 'POST',
    body: a,
    query: pagination,
  });
}
