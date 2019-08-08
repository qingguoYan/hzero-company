import { getResponse, createPagination } from 'utils/utils';
import { fetchTableData, getParent} from '../../services/saleContract/saleContractService';

export default {
    namespace: 'saleContract',
    state: {
      dataList: [],
      pagination: {},
      parent: [],
    },
    effects: {
      *fetchTableData({ payload }, { call, put }){
        const data=getResponse(yield call(fetchTableData, payload));
        if(data){
          yield put({
            type: "updateState",
            payload: {
              dataList: data.content,
              pagination: createPagination(data),
            },
          });
        }
        return data;
      },
      *getParent({payload}, {call, put}){
        const data=getResponse(yield call(getParent, payload));
        if(data){
          yield put({
            type: 'updateState',
            payload: {
              parent: data.content,
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
