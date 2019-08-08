import React, {PureComponent} from 'react';
import intl from 'utils/intl';
import classNames from 'classnames';
import EditTable from 'hzero-front/lib/components/EditTable';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import styles from './index.less';

export default class Table4 extends PureComponent{
  render() {
    const columns = [
      {
        title: intl.get('leida.sale.report.salesDocument').d('会计科目'),
        dataIndex: 'salesDocument',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.salesDocumentItemText').d('科目描述'),
        dataIndex: 'salesDocumentItemText',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.orderQuantity').d('供应商'),
        dataIndex: 'orderQuantity',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.unitPrice').d('供应商名称'),
        dataIndex: 'unitPrice',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.subtotal1Amount').d('月'),
        dataIndex: 'subtotal1Amount',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('日'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('凭证编号'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('摘要'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('清账条目'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('借方金额'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('贷方金额'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('方向'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }, {
      }, {
        title: intl.get('leida.sale.report.deliveryDocument').d('余额'),
        dataIndex: 'deliveryDocument',
        align: 'center',
        width: 150,
      }];
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
