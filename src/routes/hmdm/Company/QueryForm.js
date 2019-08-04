import React, { PureComponent } from 'react';
import { Button, Col, DatePicker, Form, Select, Row } from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';
import Input from 'hzero-ui/es/input';
import { connect } from 'dva';
import ExcelExport from 'components/ExcelExport';
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

  constructor(props) {
    const passData=moment().subtract(1, "years").subtract(1, "days").format('YYYY-MM-DD');
    const nowData=moment().subtract(1, "days").format('YYYY-MM-DD');
    super(props);
    this.state={
      CompanyCode: '',
      SortField: '',
      Supplier: '',
      Uncleared: 'W',
      PostingDateStart: passData,
      PostingDateEnd: nowData,
    };
  }

  /**
   * 提交查询表单
   *
   * @memberof QueryForm
   */
  @Bind()
  fetchData(){
    const { form, search } = this.props;
    const {CompanyCode, SortField, Supplier, Uncleared, PostingDateStart, PostingDateEnd}=this.state;
    form.validateFields((err) => {
      if(!err) {
        const searchParam={ CompanyCode, SortField, Supplier, Uncleared, PostingDateStart, PostingDateEnd};
        search(searchParam);
      }
    });
  }

  /**
   * 搜索词事件
   * @param text
   * @param record
   */
  @Bind()
  handleInputChange(e){
    this.setState({
      SortField: e.target.value,
    });
  }

  /**
   * 供应商事件
   * @param text
   * @param record
   */
  @Bind()
  handleSupplierChange(text, record){
    if(text === undefined){
      this.setState(({Supplier: ''}));
    }else if(record){
      this.setState({Supplier: record.businessPartner});
    }
  }

  /**
   * 公司代码事件
   * @param text
   */
  @Bind()
  handleCompanyCodeChange(text){
    if(text === undefined){
      this.setState({CompanyCode: ''});
    }else{
      this.setState({CompanyCode: text});
    }
  }

  /**
   * 查询范围事件
   * @param text
   */
  @Bind()
  handleUnclearedChange(text){
    if(text === undefined){
      this.setState({Uncleared: 'W'});
    }else {
      this.setState({Uncleared: text});
    }
  }

  /**
   * 日期事件
   * @param date
   * @param dateString
   */
  @Bind()
  handlePostingDate(date, dateString){
    const passData=moment().subtract(1, "years").subtract(1, "days").format('YYYY-MM-DD');
    const nowData=moment().subtract(1, "days").format('YYYY-MM-DD');
    if(date.length===0){
      this.setState({PostingDateStart: passData, PostingDateEnd: nowData});
    }else {
      this.setState({
        PostingDateStart: dateString[0],
        PostingDateEnd: dateString[1],
      });
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { CompanyCode, SortField } =this.state;
    const companyCode = CompanyCode;
    const searchTerm1 = SortField;
    const exportParam={...form.getFieldsValue()};
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
                    label={intl.get('CompanyCode').d('公司代码')}
                  >
                    {form.getFieldDecorator('CompanyCode', {initialValue: ''})(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="LEIDA.COMPANY_NAME"
                        queryParams={{ tenantId: getCurrentOrganizationId() }}
                        onChange={(text, record)=>{this.handleCompanyCodeChange(text, record);}}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('SortField').d('搜索词')}
                  >
                    {form.getFieldDecorator('inputValue', {initialValue: ''})
                    (
                      <Input
                        value={SortField}
                        onChange={(e)=>{this.handleInputChange(e);}}
                      />
                    )
                    }
                  </Form.Item>
                </Col>
                <Col {...FORM_COL_3_LAYOUT}>
                  <Form.Item
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    {...formLayout}
                    label={intl.get('Supplier').d('供应商编号')}
                  >
                    {form.getFieldDecorator('businessPartner', {initialValue: ''})(
                      <Lov
                        originTenantId={getCurrentOrganizationId()}
                        code="LEIDA.SUPPLIER_SEARCH_FIX"
                        queryParams={{ tenantId: getCurrentOrganizationId(), companyCode, searchTerm1 }}
                        onChange={(text, record)=>{this.handleSupplierChange(text, record);}}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...FORM_COL_2_LAYOUT}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    label={intl.get('postingDate').d('查询日期')}
                    {...formLayout}
                  >
                    {getFieldDecorator('postingDate', {
                      initialValue: [passData, nowData],
                    })(
                      <RangePicker
                        allowClear
                        style={{ width: 192 }}
                        onChange={this.handlePostingDate}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...FORM_COL_2_LAYOUT}>
                  <FormItem
                    {...SEARCH_FORM_ITEM_LAYOUT}
                    label={intl
                      .get('Uncleared')
                      .d('查询范围')}
                    {...formLayout}
                  >
                    {getFieldDecorator('Uncleared', {
                      initialValue: 'W',
                    })(
                      <Select
                        style={{ width: '50%' }}
                        defaultValue='W'
                        onChange={(text, record)=>{this.handleUnclearedChange(text, record);}}
                      >
                        <Option value="W">{intl.get('uncleared').d('未清项目')}</Option>
                        <Option value="A">{intl.get('uncleared').d('全部项目')}</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col {...FORM_COL_4_LAYOUT} className="search-btn-more">
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.fetchData}>
                  {intl.get('hzero.common.button.search').d('查询')}
                </Button>
              </Form.Item>
              <Form.Item>
                <ExcelExport
                  requestUrl=""
                  queryParams={exportParam}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
