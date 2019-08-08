import React, { PureComponent } from 'react';
import { Header, Content } from 'components/Page';
import { Bind } from 'lodash-decorators';
import intl from 'utils/intl';
import { connect } from 'dva';
import { Form } from 'hzero-ui';
import QueryForm from './QueryForm';
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';

@Form.create({ fieldNameProp: null })
@connect(({ bookPrint, loading }) => ({
  bookPrint,
  handleSearchCompanyData: loading.effects['bookPrint/fetchCompanyData'],
}))
export default class BookPrint extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      condition: 'S',
    };
  }

  componentDidMount() {
    this.handleSearchCompanyData();
  }

  /**
   * 获取公司代码数据
   */
  @Bind()
  handleSearchCompanyData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookPrint/fetchCompanyData',
      payload: {
        lovCode: 'LEIDA.COMPANY_NAME',
      },
    });
  }

  /**
   * 监听科目类型变化
   * @param params
   */
   @Bind()
   changeTable(params){
      if(params==='S'){
        this.setState({condition: params});
      }else if(params==='D'){
        this.setState({condition: params});
      }else if(params==='K'){
        this.setState({condition: params});
      }else if(params==='A'){
        this.setState({condition: params});
      }else if(params==='M'){
        this.setState({condition: params});
      }
   }

  render() {
    return (
      <React.Fragment>
        <Header title={intl.get('bookPrint').d('磊达账册打印明细')} />
        <Content>
          <div className="table-list-search">
            <QueryForm changeTable={this.changeTable} />
          </div>
          {this.state.condition==='S'?(<Table1 />):''}
          {this.state.condition==='D'?(<Table2 />):''}
          {this.state.condition==='K'?(<Table3 />):''}
          {this.state.condition==='A'?(<Table4 />):''}
          {this.state.condition==='M'?(<Table5 />):''}
        </Content>
      </React.Fragment>
    );
  }
}
