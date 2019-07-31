import React, { PureComponent } from 'react';
import { Button, Col, DatePicker, Form, Select, Row} from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';
import { connect } from 'dva';
import moment from 'moment';
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

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

@Form.create({ fieldNameProp: null })
@connect(({ company, loading }) => ({
  company, loading,
}))
export default class QueryForm extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      expandForm: true,
      CompanyCode: '',
      SortField: '',
      Supplier: '',
      Uncleared: '',
    };
  }

  /**
   * 提交查询表单
   *
   * @memberof QueryForm
   */
  @Bind()
  fetchData() {
    const { form, search } = this.props;
    const {
      CompanyCode,
      SortField,
      Supplier,
      Uncleared,
    }=this.state;
    const formValues = form.getFieldsValue();
    const PostingDateStart=formValues.postingDate[0].format('YYYY-MM-DD');
    const PostingDateEnd=formValues.postingDate[1].format('YYYY-MM-DD');
    form.validateFields((err)=>{
      if(!err){
        const searchParam = {
          CompanyCode,
          SortField,
          Supplier,
          Uncleared,
          PostingDateStart,
          PostingDateEnd,
        };
        search(searchParam);
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

  /**
   * 校验组件
   * @param text
   */
  @Bind()
  handleSelectCompanyCode(text){
    if(text === undefined){
      this.setState({
        CompanyCode: '',
      });
    }else {
      this.setState({
        CompanyCode: text,
      });
    }
  }

  /**
   * 校验组件
   * @param text
   * @param record
   */
  @Bind()
  handleSelectSortField(text, record){
    if(text === undefined){
      this.setState({SortField: ''});
    }else {
      this.setState({SortField: record.meaning});
    }
  }

  /**
   * 校验组件
   * @param text
   * @param record
   */
  @Bind()
  handleSelectSupplier(text, record){
    console.log(text);
    console.log(record);
    if(text === undefined){
      this.setState({Supplier: ''});
    }else {
      this.setState({Supplier: record.Supplier});
    }
  }

  /**
   * 校验组件
   * @param text
   */
  @Bind()
  handleSelectUnCleared(text){
    if(text === undefined){
      this.setState({Uncleared: ''});
    }else {
      this.setState({Uncleared: text});
    }
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
                    {form.getFieldDecorator('CompanyCode')(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="LEIDA.COMPANY_NAME"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                        onChange={(text, record) => {
                          this.handleSelectCompanyCode(text, record);
                        }}
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
                    {form.getFieldDecorator('SortField')
                    (
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="LEIDA.KEY_SEARCH"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                        onChange={(text, record) => {
                          this.handleSelectSortField(text, record);
                        }}
                      />
                    )
                    }
                  </Form.Item>
                </Col>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('hsdr.concPermission.model.permission.concPragramId').d('供应商')}
                  >
                    {form.getFieldDecorator('Supplier')(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="LEIDA.SUPPLIER_SEARCH"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                        onChange={(text, record) => {
                          this.handleSelectSupplier(text, record);
                        }}
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
                      <RangePicker
                        allowClear
                        style={{ width: 192 }}
                      />
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
                    {getFieldDecorator('Uncleared', {
                      initialValue: ['W'],
                    })(
                      <Select
                        style={{ width: '50%' }}
                        onChange={this.handleSelectUnCleared}
                        defaultValue='W'
                      >
                        <Option value="W">未清项目</Option>
                        <Option value="A">全部项目</Option>
                      </Select>
                    )}
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
                <Button type="primary" htmlType="submit" onClick={this.fetchData}>
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
