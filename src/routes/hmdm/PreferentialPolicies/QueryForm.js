import React from 'react';
import { Form, Button, Row, Col, Input, DatePicker } from 'hzero-ui';
import intl from 'hzero-front/lib/utils/intl';
import { Bind } from 'lodash-decorators';
import Lov from 'hzero-front/lib/components/Lov';
import moment from 'moment';
import { getCurrentOrganizationId } from 'utils/utils';
import {SEARCH_FORM_ITEM_LAYOUT} from 'utils/constants';


const FormItem=Form.Item;
const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

@Form.create({ fieldNameProp: null })
export default class QueryForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accountName1: "30000",
      accountName2: "50000",
      accountName3: "80000",
      accountName4: "50000",
      accountName5: "40000",
      accountName6: "90000",
    };
  }

  /**
   * 查询数据，调用父组件查询方法
   */
  @Bind()
  fetchData() {
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const {accountName1, accountName2, accountName3, accountName4, accountName5, accountName6}=this.state;
    const nowDate= moment();
    return (
      <Form layout="inline">
        <Row>
          <Col span={4}>
            <Form.Item
              {...SEARCH_FORM_ITEM_LAYOUT}
              {...formLayout}
              label={intl.get('CompanyCode').d('公司代码')}
            >
              {form.getFieldDecorator('CompanyCode', {initialValue: ''})(
                <Lov
                  originTenantId={getCurrentOrganizationId()}
                  code="LEIDA.COMPANY_NAME"
                  queryParams={{ tenantId: getCurrentOrganizationId() }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              {...SEARCH_FORM_ITEM_LAYOUT}
              {...formLayout}
              label={intl.get('BusinessPartners').d('业务伙伴')}
            >
              {form.getFieldDecorator('BusinessPartners', {initialValue: ''})(
                <Lov
                  originTenantId={getCurrentOrganizationId()}
                  code="LEIDA.COMPANY_NAME"
                  queryParams={{ tenantId: getCurrentOrganizationId() }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.get('BusinessPartners').d('查询日期')}
            >
              <DatePicker defaultValue={moment('20180101')} disabled />—
              {getFieldDecorator('PostingDate', {initialValue: ''})(
                <DatePicker defaultValue={nowDate} />
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" onClick={this.fetchData}>
                {intl.get('button').d('执行')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应付到期金额')}
            >
              <Input readOnly placeholder='10000' value={accountName1} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应付未到期金额')}
            >
              <Input readOnly placeholder='10000' value={accountName2} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应付总金额')}
            >
              <Input readOnly placeholder='10000' value={accountName3} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应收到期金额')}
            >
              <Input readOnly placeholder='10000' value={accountName4} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应收未到期金额')}
            >
              <Input readOnly placeholder='10000' value={accountName5} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应手总到期金额')}
            >
              <Input readOnly placeholder='10000' value={accountName6} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
