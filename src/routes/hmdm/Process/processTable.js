import React, { PureComponent } from 'react';
import { Table} from 'hzero-ui';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';

export default class ProcessTable extends PureComponent {

  constructor(props){
    super(props);
    const {hzeroId}=this.props.location.state;
    this.state={hzeroId};
  }

  /**
   *响应分页事件
   */
  @Bind()
  handlePagination(pagination) {
    const {hzeroId}=this.state;
    this.getData( { hzeroId, page: pagination });
  }

  /**
   * 抽取公用查询方法
   * @param params
   */
  @Bind()
  getData(params = {}) {
    const { dispatch } = this.props;
    dispatch({
      type: 'process/getData',
      payload: { ...params },
    });
  }

  render() {
    const {
      process: { dataList = [], pagination= {} },
    } = this.props;
    const columns = [
      {
        title: intl.get('material').d('品种编码'),
        dataIndex: 'material',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('materialDesc').d('品种描述'),
        dataIndex: 'materialDesc',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('basicSalesStart').d('阶段开始销量'),
        dataIndex: 'basicSalesStart',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('basicSalesEnd').d('阶段结束销量'),
        dataIndex: 'basicSalesEnd',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('levelSales').d('等级销量'),
        dataIndex: 'levelSales',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('levelAmount').d('等级优惠金额'),
        dataIndex: 'levelAmount',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('basicDiscountAmount').d('优惠金额'),
        dataIndex: 'basicDiscountAmount',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('limitDiscountAmount').d('优惠封顶值'),
        dataIndex: 'limitDiscountAmount',
        width: 100,
        align: 'center',
      },
    ];
    return (
      <Table
        bordered
        scroll={{ x: tableScrollWidth(columns) }}
        columns={columns}
        dataSource={dataList}
        rowKey="companyCode"
        pagination={pagination}
        onChange={this.handlePagination}
      />
    );
  }
}
