import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Header, Content } from 'components/Page';
import { Form } from 'hzero-ui';
import intl from 'utils/intl';
import ListTable from './ListTable';
import QueryForm from './QueryForm';

@Form.create({ fieldNameProp: null })
@connect(({ company, loading }) => ({
  company,
  fetchTableDataLoading: loading.effects['company/fetchTableData'],
}))
export default class MessageQuery extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Header title={intl.get('company').d('磊达预付款')} />
        <Content>
          <div className="table-list-search">
            <QueryForm {...this.props} />
          </div>
          <ListTable {...this.props} />
        </Content>
      </React.Fragment>
    );
  }
}
