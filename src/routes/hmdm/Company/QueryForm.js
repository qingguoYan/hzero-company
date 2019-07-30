import React, { PureComponent } from 'react';
import { Button, Col, DatePicker, Form, Input, Row} from 'hzero-ui';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';
import {
  FORM_COL_3_4_LAYOUT,
  FORM_COL_3_LAYOUT,
  FORM_COL_4_LAYOUT,
  FORM_COL_2_LAYOUT,
  SEARCH_FORM_ITEM_LAYOUT,
  SEARCH_FORM_ROW_LAYOUT,
} from 'utils/constants';
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

export default class QueryForm extends PureComponent {

  state = {
    expandForm: true,
  };

  /**
   * 提交查询表单
   *
   * @memberof QueryForm
   */
  @Bind()
  handleSearch() {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (isEmpty(err)) {
        const values = { ...fieldsValue };
        console.log(values);
      }
    });
  }

  /**
   * 重置表单
   *
   * @memberof QueryForm
   */
  @Bind()
  handleFormReset() {
    this.props.form.resetFields();
  }

  /**
   * 多查询条件展示
   */
  @Bind()
  toggleForm() {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { expandForm } = this.state;
    const passData=moment().subtract(1, "years");
    const nowData=moment();
    return (
      <React.Fragment>
        <Form className="more-fields-search-form">
          <Row {...SEARCH_FORM_ROW_LAYOUT}>
            <Col {...FORM_COL_3_4_LAYOUT}>
              <Row {...SEARCH_FORM_ROW_LAYOUT}>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('hsdr.concPermission.model.permission.concPragramId').d('公司代码')}
                  >
                    {form.getFieldDecorator('companyCode', {
                    })(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="COMPANY.FENG"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('hsdr.concPermission.model.permission.concPragramId').d('搜索词')}
                  >
                    {form.getFieldDecorator('searchTerm1', {
                    })(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="KEY-001"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('hsdr.concPermission.model.permission.concPragramId').d('供应商')}
                  >
                    {form.getFieldDecorator('supplier', {
                      rules: [{required: true, message: '此处不能为空'}],
                    })(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="SUPPLIER"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: expandForm ? 'block' : 'none' }}>
                <Col {...FORM_COL_2_LAYOUT}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    label={intl
                      .get('hmsg.messageQuery.model.messageQuery.startDate')
                      .d('查询日期')}
                    {...formLayout}
                  >
                    {getFieldDecorator('postingDate', {
                      initialValue: [passData, nowData],
                    })(
                      <RangePicker />
                    )}
                  </FormItem>
                </Col>
                <Col {...FORM_COL_2_LAYOUT}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    label={intl
                      .get('hmsg.messageQuery.model.messageQuery.serverCode')
                      .d('查询范围')}
                    {...formLayout}
                  >
                    {getFieldDecorator('queryScope', {
                      rules: [{required: true, message: '此处不能为空'}],
                    })(<Input />)}
                  </FormItem>
                </Col>

              </Row>
            </Col>
            <Col {...FORM_COL_4_LAYOUT} className="search-btn-more">
              <Form.Item>
                <Button onClick={this.toggleForm}>
                  {expandForm
                    ? intl.get('hzero.common.button.collected').d('收起查询')
                    : intl.get('hzero.common.button.viewMore').d('更多查询')}
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  {intl.get('hzero.common.button.reset').d('重置')}
                </Button>
                <Button type="primary" htmlType="submit" onClick={this.handleSearch}>
                  {intl.get('hzero.common.button.search').d('查询')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
