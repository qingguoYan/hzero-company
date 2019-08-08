import React, {PureComponent} from 'react';
import intl from 'utils/intl';
import classNames from 'classnames';
import EditTable from 'hzero-front/lib/components/EditTable';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import styles from './index.less';

export default class Table1 extends PureComponent{
  render() {
    const columns = [
      {
        title: intl.get('leida.sale.closeRecord.glAccount').d('会计科目'),
        dataIndex: 'glAccount',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.glAccountLongName').d('科目描述'),
        dataIndex: 'glAccountLongName',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.fiscalPeriod').d('月'),
        dataIndex: 'fiscalPeriod',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.postingDate').d('日'),
        dataIndex: 'postingDate',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.accountingDocument').d('凭证编号'),
        dataIndex: 'accountingDocument',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.documentItemText').d('摘要'),
        dataIndex: 'documentItemText',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.debitAmountInTransCrcy').d('借方金额'),
        dataIndex: 'debitAmountInTransCrcy',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.creditAmountInTransCrcy').d('贷方金额'),
        dataIndex: 'creditAmountInTransCrcy',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.direction').d('方向'),
        dataIndex: 'direction',
        align: 'center',
        width: 80,
      },
      {
        title: intl.get('leida.sale.closeRecord.balance').d('余额'),
        dataIndex: 'balance',
        align: 'center',
        width: 80,
      },
    ];
    return(
      <EditTable
        bordered
        className={classNames(styles['hdg-hr-list'])}
        scroll={{ x: tableScrollWidth(columns) }}
        columns={columns}
      />
    );
  }
}
