import { getResponse, createPagination } from 'utils/utils';
import { fetchTableData } from '../../services/process/processService';

export default {
  namespace: 'process',
  state: {
    dataList: [],
    pagination: {},
    hzeroId: '',
    approval: '',
    policyNumber: '',
    takeEffect: '',
    accountName: '',
    applicationDate: '',
    salesLimit: '',
    salesLimitCap: '',
    amountLimit: '',
    amountLimitCap: '',
    startDate: '',
    endDate: '',
  },
  effects: {
    *getData({payload}, {call, put}){
      const data=getResponse(yield call(fetchTableData, payload));
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            dataList: data.lineItems,
            pagination: createPagination(data),
            hzeroId: data.hzeroId,
            approval: data.approval,
            policyNumber: data.policyNumber,
            takeEffect: data.takeEffect,
            accountName: data.accountName,
            applicationDate: data.applicationDate,
            salesLimit: data.salesLimit,
            salesLimitCap: data.salesLimitCap,
            amountLimit: data.amountLimit,
            amountLimitCap: data.amountLimitCap,
            startDate: data.startDate,
            endDate: data.endDate,
          },
        });
      }
      return data;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
