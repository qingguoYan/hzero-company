import React, { PureComponent } from 'react';
import { Row, Col, Form, Select, Button, InputNumber, Input } from 'hzero-ui';
import Lov from 'components/Lov';
import intl from 'utils/intl';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
@Form.create({ fieldNameProp: null })
@connect(({ bookPrint, loading }) => ({
  bookPrint,
  handleSearchCompanyData: loading.effects['bookPrint/fetchCompanyData'],
}))
export default class QueryForm extends PureComponent {
  @Bind()
  fetchTableData() {}

  /**
   * 校验区间
   * @returns {*}
   */
  @Bind()
  validatorRange(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    const FiscalPeriodStart = getFieldValue('FiscalPeriodStart');
    const FiscalPeriodEnd = getFieldValue('FiscalPeriodEnd');
    const GLAccountStart = getFieldValue('GLAccountStart');
    const GLAccountEnd = getFieldValue('GLAccountEnd');
    if (FiscalPeriodStart > FiscalPeriodEnd) {
      callback('开始编号要小于终止编号');
    }
    if (GLAccountStart > GLAccountEnd) {
      callback('开始编号要小于终止编号');
    }
    callback();
  }

  /**
   * 只输入起始值，设置终止值为起始值
   * @returns {*}
   */
  @Bind()
  setEnd(e) {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const endValue = getFieldValue('FiscalPeriodEnd');
    if (endValue === '') {
      setFieldsValue({
        FiscalPeriodEnd: e.target.value,
      });
    }
  }

  /**
   *改变table表单数据
   * @param text
   */
  @Bind()
  changeTable(text){
    this.props.changeTable(text);
  }

  render() {
    const {
      form,
      bookPrint: { companyDataList },
    } = this.props;
    const companyDropList = [];
    if (companyDataList && companyDataList.length > 0) {
      for (let i = 0; i < companyDataList.length; i++) {
        companyDropList.push(
          <Option key={companyDataList[i].value}>
            {companyDataList[i].value} {companyDataList[i].meaning}
          </Option>
        );
      }
    }
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label={intl.get('companyCode').d('公司代码')}>
              {getFieldDecorator('CompanyCode', {
                rules: [
                  {
                    required: true,
                    message: '必填!',
                  },
                ],
              })(<Select style={{ width: 180 }}>{companyDropList}</Select>)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={intl.get('FiscalYear').d('会计年度')}>
              {getFieldDecorator('FiscalYear', {
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                  {
                    pattern: new RegExp(/^[0-9]\d*$/, 'g'),
                    message: '输入类型必须为数字！',
                  },
                ],
              })(
                <InputNumber
                  placeholder="输入2018-9999"
                  max={9999}
                  min={2018}
                  style={{ width: 120 }}
                />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={intl.get('FinancialAccountType').d('科目类型')}>
              {getFieldDecorator('FinancialAccountType', { rules: [{ required: true }] })(
                <Select style={{ width: 120 }} placeholder="请选择科目类型" onChange={(text)=>{this.changeTable(text);}}>
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
              <Button icon="caret-right" type="primary" onClick={this.fetchTableData}>
                执行
              </Button>
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem>
              <Button icon="printer" type="primary">
                打印
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={8}>
            <FormItem label={intl.get('FiscalPeriodStart').d('会计期间')}>
              {form.getFieldDecorator('FiscalPeriodStart', {
                rules: [{ validator: this.validatorRange }],
              })(
                <InputNumber
                  placeholder="输入1-12"
                  style={{ marginRight: '-16px', width: "120px" }}
                  min={1}
                  max={12}
                  onChange={e => {
                    this.setEnd(e);
                  }}
                />
              )}
            </FormItem>
            <FormItem>
              <Input
                style={{
                  width: 37,
                  borderLeft: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#fff',
                }}
                placeholder="到"
                disabled
              />
              {getFieldDecorator('FiscalPeriodEnd', {
                rules: [{ validator: this.validatorRange }],
              })(<InputNumber
                style={{ marginRight: '-10px', width: "120px" }}
                placeholder="输入1-12"
                min={1}
                max={12}
              />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={intl.get('GLAccountStart').d('总账科目')} hasFeedbacks>
              {getFieldDecorator('GLAccountStart', { rules: [{ validator: this.validatorRange }] })(
                <Input style={{ width: '120px', marginRight: '-16px'}} />
              )}
            </FormItem>
            <FormItem>
              <Input
                style={{
                  width: 37,
                  borderLeft: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#fff',
                }}
                placeholder="到"
                disabled
              />
              {getFieldDecorator('GLAccountEnd', { rules: [{ validator: this.validatorRange }] })(
                <Input style={{ width: '120px', marginRight: '-10px' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem label={intl.get('Customer').d('客户')} style={{ marginLeft: '25px' }}>
              {getFieldDecorator('Customer', {})(
                <Lov style={{ width: '120px', marginLeft: '8px' }} />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label={intl.get('CustomerEnd').d('')}>
              {getFieldDecorator('Customer', {})(
                <Lov style={{ width: '120px', marginLeft: '15px' }} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={intl.get('Supplier').d('供应商')}>
              {getFieldDecorator('Supplier', {})(
                <Lov style={{ width: '120px', marginLeft: '12px' }} />
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label={intl.get('SupplierEnd').d('')}>
              {getFieldDecorator('SupplierEnd', {})(
                <Lov style={{ width: '120px', marginLeft: '25px' }} />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <FormItem>
              <Button type="primary">存表</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
