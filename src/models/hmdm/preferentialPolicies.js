import { getResponse } from 'utils/utils';
import { fetchTableData } from '../../services/preferentialPolicies/preferentialPoliciesService';

export default {
    namespace: 'preferentialPolicies',
    state: {
      dataList: [],
      EmployDuePay: '',
      EmployNotDuePay: '',
      EmployTotalPay: '',
      EmployDueReceiv: '',
      EmployNotDueReceiv: '',
      EmployTotalReceiv: '',
    },
    effects: {
         *fetchTableData({ payload }, { call, put }) {
           const data=getResponse(yield call(fetchTableData, payload));
           const EmployDuePay=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployDuePay_V);
           }, 0);
           const EmployNotDuePay=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployNotDuePay_V);
           }, 0);
           const EmployTotalPay=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployTotalPay_V);
           }, 0);
           const EmployDueReceiv=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployDueReceiv_V);
           }, 0);
           const EmployNotDueReceiv=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployNotDueReceiv_V);
           }, 0);
           const EmployTotalReceiv=data.content.reduce((pre, cur)=>{
             return pre+parseFloat(cur.EmployTotalReceiv_V);
           }, 0);
           if (data) {
             yield put({
                 type: 'updateState',
                 payload: {
                   dataList: data.content,
                   EmployDuePay,
                   EmployNotDuePay,
                   EmployTotalPay,
                   EmployDueReceiv,
                   EmployNotDueReceiv,
                   EmployTotalReceiv,
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
