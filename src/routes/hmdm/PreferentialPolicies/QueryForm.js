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
    this.state = {};
  }

  /**
   * 查询数据，调用父组件查询方法
   */
  @Bind()
  fetchData() {
    const {dispatch}=this.props;
    dispatch({
      type: 'preferentialPolicies/fetchTableData',
      payload: '',
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { EmployDuePay, EmployNotDuePay, EmployTotalPay, EmployDueReceiv, EmployNotDueReceiv, EmployTotalReceiv}=this.props.preferentialPolicies;
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
          <Col span={3}>
            <Form.Item
              {...SEARCH_FORM_ITEM_LAYOUT}
              {...formLayout}
              label={intl.get('leida.sale.PreferentialPolicies.BuPartnersHigh').d('')}
            >
              {form.getFieldDecorator('Customer', {initialValue: ''})(
                <Lov
                  originTenantId={getCurrentOrganizationId()}
                  code="LEIDA.BUSINESS_PARTNER"
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
              <Input readOnly value={EmployDuePay} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应付未到期金额')}
            >
              <Input readOnly value={EmployNotDuePay} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应付总金额')}
            >
              <Input readOnly value={EmployTotalPay} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应收到期金额')}
            >
              <Input readOnly value={EmployDueReceiv} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应收未到期金额')}
            >
              <Input readOnly value={EmployNotDueReceiv} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl.get('money').d('员工应手总到期金额')}
            >
              <Input readOnly value={EmployTotalReceiv} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
