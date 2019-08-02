import { getResponse } from 'utils/utils';
import { fetchTableData } from '../../services/preferentialPolicies/preferentialPoliciesService';

export default {
    namespace: 'preferentialPolicies',
    state: {
         dataList: [
          {
            'businessPartners': "1",
            "partnersName": "2",
            'amountDue': '3',
            'notDue': '4',
            'totalAmount': '5',
            'totalAmount2': '6',
            'amountDue2': '7',
            'notDue2': '6',
            'totalAmount3': "1",
            "amountDue3": "2",
            'notDue3': '3',
            'totalAmount4': '4',
            'amountDue4': '5',
            'notDue4': '6',
            'totalAmount5': '7',
            'amountDue5': '5',
            'notDue5': '6',
            'totalAmount6': '7',
          },
         ],
    },
    effects: {
         *fetchTableData({ payload }, { call, put }) {
           const data=getResponse(yield call(fetchTableData, payload));
           if (data) {
             yield put({
                 type: 'updateState',
                 payload: {
                     dataList: data.content,
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
