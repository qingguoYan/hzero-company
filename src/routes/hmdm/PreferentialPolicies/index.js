import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Header, Content } from 'components/Page';
import { Form } from 'hzero-ui';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import ListTable from './ListTable';
import QueryForm from './QueryForm';

@Form.create({ fieldNameProp: null })
@connect(({ preferentialPolicies, loading }) => ({
  preferentialPolicies,
  loading,
}))
export default class PreferentialPolicies extends PureComponent {
  constructor(props) {
    super(props);
    this.params = '';
  }
   /**
   * 点击查询,将子组件的参数传递给state的params，以方便分页事件参数的获取
   */
  @Bind
  handleSearch(searchParam) {
    this.params = searchParam;
    this.fetchTableData(searchParam);
  }
   /**
   *响应分页事件
   */
  @Bind()
  handlePagination(pagination) {
    const params = { ...this.params };
    this.fetchTableData({ ...params, page: pagination });
  }

  /**
   * 抽取公用查询方法
   * @param params
   */
  @Bind()
  fetchTableData(params = {}) {
    const { dispatch } = this.props;
    dispatch({
      type: 'PreferentialPolicies/fetchTableData',
      payload: { ...params },
    });
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Header title={intl.get('company').d('优惠政策记录查询')} />
        <Content>
          <div className="table-list-search">
            <QueryForm {...this.props} />
          </div>
          <ListTable {...this.props} />
        </Content>
      </React.Fragment>
    );
  }
}
