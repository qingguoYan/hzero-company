import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Header, Content } from 'components/Page';
import { Bind } from 'lodash-decorators';
import { Form } from 'hzero-ui';
import intl from 'utils/intl';
import classNames from 'classnames';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import EditTable from 'hzero-front/lib/components/EditTable';
import styles from './index.less';
import QueryForm from './QueryForm';

@Form.create({ fieldNameProp: null })
@connect(({ company, loading }) => ({
  company,
  fetchTableDataLoading: loading.effects['company/fetchTableData'],
}))
export default class Company extends PureComponent {
  constructor(props){
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
    const params = {...this.params};
    this.fetchTableData( { ...params, page: pagination });
  }

  /**
   * 抽取公用查询方法
   * @param params
   */
  @Bind()
  fetchTableData(params = {}) {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/fetchTableData',
      payload: { ...params },
    });
  }

  render() {
    const {
      fetchTableDataLoading,
      company: { dataList = [], pagination = {} },
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
      <React.Fragment>
        <Header title={intl.get('company').d('磊达预付款')} />
        <Content>
          <div className="table-list-search">
            <QueryForm search={this.handleSearch} />
          </div>
          <EditTable
            bordered
            scroll={{ x: tableScrollWidth(columns) }}
            className={classNames(styles['hdg-hr-list'])}
            columns={columns}
            dataSource={dataList}
            loading={fetchTableDataLoading}
            pagination={pagination}
            onChange={this.handlePagination}
          />
        </Content>
      </React.Fragment>
    );
  }
}
