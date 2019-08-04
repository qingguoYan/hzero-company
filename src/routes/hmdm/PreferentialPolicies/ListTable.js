import React, { PureComponent } from 'react';
import { Table } from 'hzero-ui';
import intl from 'utils/intl';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';

export default class ListTable extends PureComponent {
  render() {
    const {
      preferentialPolicies: { dataList = [] },
    } = this.props;
    const columns = [
      {
        title: intl.get('businessPartners').d('业务伙伴'),
        dataIndex: 'businessPartners',
        align: 'center',
        width: 150,
      },
      {
        title: intl.get('partnersName').d('业务伙伴名称'),
        dataIndex: 'partnersName',
        align: 'center',
        width: 150,
      },
      {
        title: intl.get('leida.sale.policy.xx3').d('应收'),
        width: 500,
        children: [
          {
            title: intl.get('amountDue').d('到期金额'),
            dataIndex: 'amountDue',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('notDue').d('未到期金额'),
            dataIndex: 'notDue',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('totalAmount').d('总金额'),
            dataIndex: 'totalAmount',
            width: 150,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx4').d('预收'),
        children: [
          {
            title: intl.get('totalAmount2').d('总金额'),
            dataIndex: 'totalAmount2',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx5').d('其他应收'),
        children: [
          {
            title: intl.get('amountDue2').d('到期金额'),
            dataIndex: 'amountDue2',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('notDue2').d('未到期金额'),
            dataIndex: 'notDue2',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('totalAmount3').d('总金额'),
            dataIndex: 'totalAmount3',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx6').d('应付'),
        children: [
          {
            title: intl.get('amountDue3').d('到期金额'),
            dataIndex: 'amountDue3',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('notDue3').d('未到期金额'),
            dataIndex: 'notDue3',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('totalAmount4').d('总金额'),
            dataIndex: 'totalAmount4',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx7').d('其他应付'),
        children: [
          {
            title: intl.get('amountDue4').d('到期金额'),
            dataIndex: 'amountDue4',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('notDue4').d('未到期金额'),
            dataIndex: 'notDue4',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('totalAmount5').d('总金额'),
            dataIndex: 'totalAmount5',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx8').d('预付'),
        children: [
          {
            title: intl.get('amountDue5').d('到期金额'),
            dataIndex: 'amountDue5',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('notDue5').d('未到期金额'),
            dataIndex: 'notDue5',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('totalAmount6').d('总金额'),
            dataIndex: 'totalAmount6',
            width: 200,
            align: 'center',
          },
        ],
      }];
    return (
      <Table
        bordered
        scroll={{ x: tableScrollWidth(columns) }}
        columns={columns}
        dataSource={dataList}
      />
    );
  }
}
