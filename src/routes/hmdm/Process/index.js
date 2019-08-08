import React, { PureComponent } from 'react';
import { Form } from 'hzero-ui';
import { connect } from 'dva';
import intl from 'utils/intl';
import { Header, Content } from 'components/Page';
import ProcessForm from './processForm';
import ProcessTable from './processTable';


@Form.create({fieldNameProp: null})
@connect(({process, loading})=>({
    process, loading,
}))
export default class Process extends PureComponent{
  render() {
    return(
      <React.Fragment>
        <Header title={intl.get('process1.js').d('合同优惠政策流程表单')} />
        <Content>
          <div className='table-list-search'>
            <ProcessForm {...this.props} />
          </div>
          <ProcessTable {...this.props} />
        </Content>
      </React.Fragment>
    );
  }
}
