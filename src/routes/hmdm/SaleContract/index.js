import React from 'react';
import { Header, Content } from 'hzero-front/lib/components/Page';
import intl from 'hzero-front/lib/utils/intl';
import formatterCollections from 'hzero-front/lib/utils/intl/formatterCollections';
import { Form } from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import classNames from 'classnames';
import EditTable from 'hzero-front/lib/components/EditTable';
import { connect } from 'dva';
import { tableScrollWidth } from 'hzero-front/lib/utils/utils';
import styles from './index.less';
import FilterForm from './FilterForm';

@Form.create({ fieldNameProp: null })
@formatterCollections({ code: ['ddcl.collect'] })
@connect(({ saleContract, loading }) => ({
  saleContract,
  loading,
}))
export default class SaleContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.params = '';
  }

  /**
   * 点击查询,将子组件的参数传递给state的params，以方便分页事件参数的获取
   */
  @Bind()
  handleSearch(params) {
    this.params=params;
    this.fetchTableData(params);
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
  fetchTableData(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'saleContract/fetchTableData',
      payload: { ...params },
    });
  }

  /**
   * 表单跳转
   * */
  @Bind()
  handleClick(){
    const { history }=this.props;
    history.push('/hmdm/process');
  }

  render() {
    const {
      saleContract: { dataList = [], pagination = {} },
    } = this.props;
    const columns = [
      {
          title: intl.get('hzeroId').d('流程编码'),
          dataIndex: 'hzeroId',
          width: 100,
          align: 'center',
      },
      {
        title: intl.get('applicationDate').d('申请日期'),
        dataIndex: 'applicationDate',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('accountName').d('申请人'),
        dataIndex: 'accountName',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('requestId').d('OA流程编号'),
        dataIndex: 'requestId',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('takeEffect').d('是否生效'),
        dataIndex: 'takeEffect',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('policyNumber').d('优惠政策编号'),
        dataIndex: 'policyNumber',
        width: 100,
        align: 'center',
      },
      {
        title: intl.get('approval').d('审批状态'),
        dataIndex: 'approval',
        width: 100,
        align: 'center',
      },
      {
        title: ('表单'),
        dataIndex: 'form',
        width: 100,
        align: 'center',
        render: ()=><a onClick={this.handleClick}>流程表单</a>,
      },
    ];

    return (
      <React.Fragment>
        <Header title={intl.get('leida.sale.close').d('销售合同优惠政策记录查询')} />
        <Content>
          <div className="table-list-search">
            <FilterForm search={this.handleSearch} />
          </div>
          <EditTable
            bordered
            className={classNames(styles['hdg-hr-list'])}
            scroll={{ x: tableScrollWidth(columns) }}
            columns={columns}
            dataSource={dataList}
            pagination={pagination}
            onChange={this.handlePagination}
          />
        </Content>
      </React.Fragment>
    );
  }
}
