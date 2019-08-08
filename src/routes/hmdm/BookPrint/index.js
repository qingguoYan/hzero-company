import React, {PureComponent} from 'react';
import { Header, Content } from 'components/Page';
import { Bind } from 'lodash-decorators';
import intl from 'utils/intl';
import { connect } from 'dva';
import { Form } from 'hzero-ui';
import QueryForm from './QueryForm';

@Form.create({ fieldNameProp: null })
@connect(({bookPrint, loading})=>({
   bookPrint,
   handleSearchCompanyData: loading.effects['bookPrint/fetchCompanyData'],
}))
export default class BookPrint extends PureComponent{
  componentDidMount() {
    this.handleSearchCompanyData();
  }

  @Bind()
  handleSearchCompanyData(){
    const {dispatch}=this.props;
    dispatch({
      type: 'bookPrint/fetchCompanyData',
      payload: {
        lovCode: 'LEIDA.COMPANY_NAME',
      },
    });
  }

  render() {
    return(
      <React.Fragment>
        <Header title={intl.get('bookPrint').d('磊达账册打印明细')} />
        <Content>
          <div className="table-list-search">
            <QueryForm />
          </div>
        </Content>
      </React.Fragment>
    );
  }
}
