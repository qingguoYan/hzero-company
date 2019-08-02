import React, { PureComponent } from 'react';
import { Table} from 'hzero-ui';
import intl from 'utils/intl';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';

export default class ProcessTable extends PureComponent {
  render() {
    const {
      process: { dataList = [] },
    } = this.props;
    const columns = [
      {
        title: intl.get('varietiesCoding').d('品种编码'),
        dataIndex: 'varietiesCoding',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('varietiesDescription').d('品种描述'),
        dataIndex: 'varietiesDescription',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('beganSales').d('阶段开始销量'),
        dataIndex: 'beganSales',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('endSales').d('阶段结束销量'),
        dataIndex: 'endSales',
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
        title: intl.get('levelDiscount').d('等级优惠金额'),
        dataIndex: 'levelDiscount',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('discountAmount').d('优惠金额'),
        dataIndex: 'discountAmount',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('capValues').d('优惠封顶值'),
        dataIndex: 'capValues',
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
      />
    );
  }
}
