import { getResponse } from 'hzero-front/lib/utils/utils';
import { fetchCompanyData } from '../../services/bookPrint/bookPrintService';

export default {
  namespace: 'bookPrint',
  state: {
    companyDataList: [],
  },
  effects: {
    *fetchCompanyData({ payload }, { call, put }){
       const data = getResponse(yield call(fetchCompanyData, payload));
       const {content}=data;
       if(data){
         yield put({
           type: 'updateState',
           payload: {
             companyDataList: content,
           },
         });
       }
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
