import { getResponse } from 'utils/utils';
import { fetchTableData } from '../../services/company/companyService';

export default {
    namespace: 'company',
    state: {
         dataList: [],
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
