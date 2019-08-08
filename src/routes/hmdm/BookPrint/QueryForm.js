import React, {PureComponent} from 'react';
import { Row, Col, Form, Input, Select, Button} from 'hzero-ui';
import Lov from 'components/Lov';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
@Form.create({ fieldNameProp: null })
@connect(({bookPrint, loading})=>({
  bookPrint,
  handleSearchCompanyData: loading.effects['bookPrint/fetchCompanyData'],
}))
export default class QueryForm extends PureComponent{
  @Bind()
  fetchTableData(){
    console.log('hello');
  }

  render() {
    const { form, bookPrint: { companyDataList } } = this.props;
    const companyDropList=[];
    if(companyDataList&&companyDataList.length>0){
      for(let i=0;i<companyDataList.length;i++){
        companyDropList.push(<Option key={companyDataList[i].value}>{companyDataList[i].value}{" "}{companyDataList[i].meaning}</Option>);
      }
    }
    const {getFieldDecorator} = form;
    return(
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem
              label={intl.get('companyCode').d('公司代码')}
            >
              {getFieldDecorator('CompanyCode', {
                rules: [
                  {
                    required: true,
                    message: '必填!',
                  },
                ],
              })(
                <Select
                  style={{ width: 200 }}
                >
                  {companyDropList}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('FiscalYear').d('会计年度')}
            >
              {getFieldDecorator('FiscalYear', {
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                  {
                    max: 4,
                    message: '输入长度最大为4',
                  },
                  {
                    pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                    message: '输入类型必须为数字！',
                  },
                ],
              })(
                <Input placeholder='输入2018-9999' />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('FinancialAccountType').d('科目类型')}
            >
              {getFieldDecorator('FinancialAccountType', {rules: [{required: true}]})(
                <Select
                  style={{ width: 150 }}
                  placeholder="请选择科目类型"
                >
                  <Option value="S">总账</Option>
                  <Option value="D">应收</Option>
                  <Option value="K">应付</Option>
                  <Option value="A">资产</Option>
                  <Option value="M">库存</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem>
              <Button icon="caret-right" type="primary" onClick={this.fetchTableData}>执行</Button>
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem>
              <Button icon="printer" type="primary">打印</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label={intl.get('FiscalPeriod').d('会计期间')}
            >
              {form.getFieldDecorator('FiscalPeriod', {rules: [{required: true, message: '必填'}]})(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('FiscalPeriodEnd').d('到')}
            >
              {getFieldDecorator('FiscalPeriodEnd', {})(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('GLAccount').d('总账科目')}
            >
              {getFieldDecorator('GLAccount', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('GLAccountEnd').d('到')}
            >
              {getFieldDecorator('GLAccountEnd', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label={intl.get('Customer').d('客户')}
            >
              {getFieldDecorator('Customer', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('CustomerEnd').d('')}
            >
              {getFieldDecorator('Customer', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('Supplier').d('供应商')}
            >
              {getFieldDecorator('Supplier', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label={intl.get('SupplierEnd').d('')}
            >
              {getFieldDecorator('SupplierEnd', {})(
                <Lov />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              <Button type="primary">存表</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
