import React, { PureComponent } from 'react';
import { Button, Col, DatePicker, Form, Select, Row } from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import Lov from 'components/Lov';
import Input from 'hzero-ui/es/input';
import { connect } from 'dva';
import ExcelExport from 'components/ExcelExport';
import moment from 'moment';
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
@connect(({ prepayReporte, loading }) => ({
  prepayReporte,
  loading,
}))
export default class QueryForm extends PureComponent {
  constructor(props) {
    const passData = moment()
      .subtract(1, 'years')
      .format('YYYY-MM-DD');
    const nowData = moment().format('YYYY-MM-DD');
    super(props);
    this.state = {
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
  fetchData() {
    const { form, search } = this.props;
    const {
      CompanyCode,
      SortField,
      Supplier,
      Uncleared,
      PostingDateStart,
      PostingDateEnd,
    } = this.state;
    form.validateFields(err => {
      if (!err) {
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
   * 搜索词事件
   * @param text
   * @param record
   */
  @Bind()
  handleInputChange(e) {
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
  handleSupplierChange(text, record) {
    if (text === undefined) {
      this.setState({ Supplier: '' });
    } else if (record) {
      this.setState({ Supplier: record.businessPartner });
    }
  }

  /**
   * 公司代码事件
   * @param text
   */
  @Bind()
  handleCompanyCodeChange(text) {
    if (text === undefined) {
      this.setState({ CompanyCode: '' });
    } else {
      this.setState({ CompanyCode: text });
    }
  }

  /**
   * 查询范围事件
   * @param text
   */
  @Bind()
  handleUnclearedChange(text) {
    if (text === undefined) {
      this.setState({ Uncleared: 'W' });
    } else {
      this.setState({ Uncleared: text });
    }
  }

  /**
   * 日期事件
   * @param date
   * @param dateString
   */
  @Bind()
  handlePostingDate(date, dateString) {
    const passData = moment()
      .subtract(1, 'years')
      .format('YYYY-MM-DD');
    const nowData = moment().format('YYYY-MM-DD');
    if (date.length === 0) {
      this.setState({ PostingDateStart: passData, PostingDateEnd: nowData });
    } else {
      this.setState({
        PostingDateStart: dateString[0],
        PostingDateEnd: dateString[1],
      });
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      CompanyCode,
      SortField,
      Supplier,
      Uncleared,
      PostingDateStart,
      PostingDateEnd,
    } = this.state;
    const companyCode = CompanyCode;
    const searchTerm1 = SortField;
    const passData = moment().subtract(1, 'years');
    const nowData = moment();
    const exportParam = {
      companyCode: CompanyCode,
      sortField: SortField,
      supplier: Supplier,
      uncleared: Uncleared,
      postingDateStart: PostingDateStart,
      postingDateEnd: PostingDateEnd,
    };
    return (
      <Form className="more-fields-search-form">
        <Row>
          <Col span={8}>
            <Form.Item label={intl.get('CompanyCode').d('公司代码')} {...formLayout}>
              {form.getFieldDecorator('CompanyCode', { initialValue: '' })(
                <Lov
                  style={{ width: '150px' }}
                  originTenantId={getCurrentOrganizationId()}
                  code="LEIDA.COMPANY_NAME"
                  queryParams={{ tenantId: getCurrentOrganizationId() }}
                  onChange={(text, record) => {
                    this.handleCompanyCodeChange(text, record);
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={intl.get('sortField').d('搜索词')} {...formLayout}>
              {form.getFieldDecorator('sortField', { initialValue: '' })(
                <Input
                  style={{ width: '150px' }}
                  value={SortField}
                  onChange={e => {
                    this.handleInputChange(e);
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={intl.get('supplier').d('供应商编号')} {...formLayout}>
              {form.getFieldDecorator('supplier', { initialValue: '' })(
                <Lov
                  style={{ width: '150px' }}
                  originTenantId={getCurrentOrganizationId()}
                  code="LEIDA.SUPPLIER_SEARCH_FIX"
                  queryParams={{ tenantId: getCurrentOrganizationId(), companyCode, searchTerm1 }}
                  onChange={(text, record) => {
                    this.handleSupplierChange(text, record);
                  }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label={intl.get('applicationDate').d('查询日期')} {...formLayout}>
              {getFieldDecorator('applicationDate', {
                initialValue: [passData, nowData],
              })(
                <RangePicker
                  allowClear
                  style={{ width: '200px' }}
                  onChange={this.handlePostingDate}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={intl.get('uncleared').d('查询范围')} {...formLayout}>
              {getFieldDecorator('uncleared', {
                initialValue: 'W',
              })(
                <Select
                  style={{ width: '50%' }}
                  defaultValue="W"
                  onChange={(text, record) => {
                    this.handleUnclearedChange(text, record);
                  }}
                >
                  <Option value="W">{intl.get('uncleared').d('未清项目')}</Option>
                  <Option value="A">{intl.get('uncleared').d('全部项目')}</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button
                style={{ width: '120px' }}
                type="primary"
                htmlType="submit"
                onClick={this.fetchData}
              >
                {intl.get('hzero.common.button.search').d('查询')}
              </Button>
            </Form.Item>
          </Col>
          <Col span={4} className="search-btn-more">
            <Form.Item>
              <ExcelExport requestUrl="/leida/v1/pre-pay-report/export" queryParams={exportParam} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
