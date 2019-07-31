import { getResponse, createPagination } from 'utils/utils';
import { fetchTableData } from '../../services/company/companyService';

export default {
    namespace: 'company',
    state: {
         dataList: [],
         pagination: {},
    },
    effects: {
         *fetchTableData({ payload }, { call, put }) {
           const data=getResponse(yield call(fetchTableData, payload));
           if (data) {
             yield put({
                 type: 'updateState',
                 payload: {
                     dataList: data.content,
                     pagination: createPagination(data),
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
