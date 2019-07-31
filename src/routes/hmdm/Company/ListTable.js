import React, { PureComponent } from 'react';
import EditTable from 'hzero-front/lib/components/EditTable';
import intl from 'utils/intl';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';

export default class ListTable extends PureComponent {
  render() {
    const {
      company: { dataList = [] },
    } = this.props;
    const columns = [
      {
        title: intl.get('companyCode').d('公司代码'),
        dataIndex: 'CompanyCode',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('sortField').d('搜索词'),
        dataIndex: 'SortField',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('assignmentReference').d('分配参考'),
        dataIndex: 'assignmentReference',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('supplier').d('供应商'),
        dataIndex: 'Supplier',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('supplierName').d('供应商名称'),
        dataIndex: 'supplierName',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('yy1PurchaseOrderJel').d('采购订单'),
        dataIndex: 'yy1_PurchaseOrder_JEI',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('yy1PurchaseOrderItemJel').d('采购订单行'),
        dataIndex: 'yy1_PurchaseOrderItem_JEI',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('amountInCompanyCodeCurrency').d('预付款金额'),
        dataIndex: 'amountInCompanyCodeCurrency',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('addAmount').d('累计付款金额'),
        dataIndex: 'addAmount',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('inAmount').d('已开票金额'),
        dataIndex: 'inAmount',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('unInAmount').d('剩余金额'),
        dataIndex: 'unInAmount',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('netDueDate').d('到期日'),
        dataIndex: 'netDueDate',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('cDay').d('净超期天数'),
        dataIndex: 'cday',
        width: 200,
        align: 'center',
      },
      {
        title: intl.get('documentItemText').d('文本'),
        dataIndex: 'documentItemText',
        width: 200,
        align: 'center',
      },
    ];
    return (
      <EditTable
        bordered
        scroll={{ x: tableScrollWidth(columns) }}
        columns={columns}
        dataSource={dataList}
        rowKey="companyCode"
      />
    );
  }
}
