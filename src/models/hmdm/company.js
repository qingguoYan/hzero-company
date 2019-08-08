import { createPagination, getResponse } from 'utils/utils';
import { fetchTableData } from '../../services/company/companyService';
import { compare } from '../../utils/commonUtils';

export default {
    namespace: 'company',
    state: {
         dataList: [],
         pagination: {},
    },
    effects: {
         *fetchTableData({ payload }, { call, put }) {
           const data=getResponse(yield call(fetchTableData, payload));
           const { content }=data;
           content.sort(
             compare(
               "Supplier",
               "yy1_PurchaseOrder_JEI",
               "yy1_PurchaseOrderItem_JEIe",
               "addAmount",
             )
           );
           if (data) {
             yield put({
                 type: 'updateState',
                 payload: {
                     dataList: content,
                     pagination: createPagination(data),
                 },
             });
           }
           return data;
         },
    },
    reducers: {
      searchDataByTime(state, { payload }){
        const newState=JSON.parse(JSON.stringify(state));
        newState.dataList=newState.dataList.filter((item) => {
          if (item.postingDate === payload) {
            return item;
          } else {
            return null;
          }
        });
        return newState;
      },
      updateState(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
};
