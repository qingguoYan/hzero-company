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
        title: intl.get('BusinessPartner').d('业务伙伴'),
        dataIndex: 'BusinessPartner',
        align: 'center',
        width: 150,
      },
      {
        title: intl.get('BuPartnerName').d('业务伙伴名称'),
        dataIndex: 'BuPartnerName',
        align: 'center',
        width: 150,
      },
      {
        title: intl.get('leida.sale.policy.xx3').d('应收'),
        width: 500,
        children: [
          {
            title: intl.get('DueReceiv_V').d('到期金额'),
            dataIndex: 'DueReceiv_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('NotDueReceiv_V').d('未到期金额'),
            dataIndex: 'NotDueReceiv_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('TotalReceiv_V').d('总金额'),
            dataIndex: 'TotalReceiv_V',
            width: 150,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx4').d('预收'),
        children: [
          {
            title: intl.get('PreTotalReceiv_V').d('总金额'),
            dataIndex: 'PreTotalReceiv_V',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx5').d('其他应收'),
        children: [
          {
            title: intl.get('OtherDueReceiv_V').d('到期金额'),
            dataIndex: 'OtherDueReceiv_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('OtherNotDueReceiv_V').d('未到期金额'),
            dataIndex: 'OtherNotDueReceiv_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('OtherTotalReceiv_V').d('总金额'),
            dataIndex: 'OtherTotalReceiv_V',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx6').d('应付'),
        children: [
          {
            title: intl.get('DuePay_V').d('到期金额'),
            dataIndex: 'DuePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('NotDuePay_V').d('未到期金额'),
            dataIndex: 'NotDuePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('TotalPay_V').d('总金额'),
            dataIndex: 'TotalPay_V',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx7').d('其他应付'),
        children: [
          {
            title: intl.get('OtherDuePay_V').d('到期金额'),
            dataIndex: 'OtherDuePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('OtherNotDuePay_V').d('未到期金额'),
            dataIndex: 'OtherNotDuePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('OtherTotalPay_V').d('总金额'),
            dataIndex: 'OtherTotalPay_V',
            width: 200,
            align: 'center',
          },
        ],
      },
      {
        title: intl.get('leida.sale.policy.xx8').d('预付'),
        children: [
          {
            title: intl.get('DuePrePay_V').d('到期金额'),
            dataIndex: 'DuePrePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('NotDuePrePay_V').d('未到期金额'),
            dataIndex: 'NotDuePrePay_V',
            width: 200,
            align: 'center',
          },
          {
            title: intl.get('TotalPrePay_V').d('总金额'),
            dataIndex: 'TotalPrePay_V',
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
        rowKey="companyCode"
      />
    );
  }
}
