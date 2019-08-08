import React, {PureComponent} from 'react';
import intl from 'utils/intl';
import classNames from 'classnames';
import EditTable from 'hzero-front/lib/components/EditTable';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import styles from './index.less';

export default class Table5 extends PureComponent{
  render() {
    const columns = [
      {
        title: intl.get('leida.sale.closeRecord.material').d('物料'),
        dataIndex: 'material',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.materialDescription').d('物料描述'),
        dataIndex: 'materialDescription',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.glAccount').d('会计科目'),
        dataIndex: 'glAccount',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.glAccountLongName').d('科目描述'),
        dataIndex: 'glAccountLongName',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.fiscalPeriod').d('月'),
        dataIndex: 'fiscalPeriod',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.documentItemText').d('摘要'),
        dataIndex: 'documentItemText',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.debitQuantity').d('借方数量'),
        dataIndex: 'debitQuantity',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.debitUnitprice').d('借方单价'),
        dataIndex: 'debitUnitprice',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.debitAmountInTransCrcy').d('借方金额'),
        dataIndex: 'debitAmountInTransCrcy',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.lenderQuantity').d('贷方数量'),
        dataIndex: 'lenderQuantity',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.lenderUnitPrice').d('贷方单价'),
        dataIndex: 'lenderUnitPrice',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.creditAmountInTransCrcy').d('贷方金额'),
        dataIndex: 'creditAmountInTransCrcy',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.quantity').d('数量'),
        dataIndex: 'quantity',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.unitPrice').d('单价'),
        dataIndex: 'unitPrice',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.direction').d('方向'),
        dataIndex: 'direction',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.balance').d('余额'),
        dataIndex: 'balance',
        align: 'center',
        width: 140,
      },
      {
        title: intl.get('leida.sale.closeRecord.baseUnit').d('单位'),
        dataIndex: 'baseUnit',
        align: 'center',
        width: 140,
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
