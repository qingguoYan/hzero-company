import React, {PureComponent} from 'react';
import intl from 'utils/intl';
import classNames from 'classnames';
import EditTable from 'hzero-front/lib/components/EditTable';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import styles from './index.less';

export default class Table3 extends PureComponent{
  render() {
    const columns = [
      {
        title: intl.get('GLAccount').d('会计科目'),
        dataIndex: 'GLAccount',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('GLAccountLongName').d('科目描述'),
        dataIndex: 'GLAccountLongName',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('Customer').d('客户'),
        dataIndex: 'Customer',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('CustomerName').d('客户名称'),
        dataIndex: 'CustomerName',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('FiscalPeriod').d('月'),
        dataIndex: 'FiscalPeriod',
        width: 200,
        key: 'FiscalPeriod',
        align: 'center',
      },
      {
        title: intl.get('PostingDate').d('日'),
        dataIndex: 'PostingDate',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('AccountingDocument').d('凭证编号'),
        dataIndex: 'AccountingDocument',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('DocumentItemText').d('摘要'),
        dataIndex: 'DocumentItemText',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('ClearingAccountingDocument').d('清账条目'),
        dataIndex: 'ClearingAccountingDocument',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('DebitAmountInTransCrcy').d('借方金额'),
        dataIndex: 'DebitAmountInTransCrcy',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('CreditAmountInTransCrcy').d('贷方金额'),
        dataIndex: 'CreditAmountInTransCrcy',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('netDueDate').d('方向'),
        dataIndex: 'netDueDate',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('cDay').d('余额'),
        dataIndex: 'cday',
        width: 200,
        align: 'center',
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
