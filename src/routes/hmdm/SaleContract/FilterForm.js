import React from 'react';
import { Form, Button, Row, Col, Select, Input, DatePicker } from 'hzero-ui';
import intl from 'hzero-front/lib/utils/intl';
import { Bind } from 'lodash-decorators';
import { getCurrentUser } from 'hzero-front/lib/utils/utils';
import moment from 'moment';
import { connect } from 'dva';

const FormItem=Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create({ fieldNameProp: null })
@connect(({ saleContract, loading }) => ({
  saleContract,
  loading,
}))
export default class FilterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: getCurrentUser().realName,
      id: "",
      inheritRoleId: "",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { name } = this.state;
    dispatch({
      type: 'saleContract/getParent',
      payload: { name },
    });
  }

  @Bind()
  fetchData() {
    const { form, search } = this.props;
    if (this.state.id!==9&&this.state.inheritRoleId!==9) {
      this.props.form.setFieldsValue({
        "accountName": getCurrentUser().loginName,
      });
    }else{
      this.props.form.getFieldsError();
    }
    const now=moment().format('YYYY-MM-DD');
    form.validateFields((err, values) => {
      if (!err) {
        const searchParams={};
        searchParams.applicationDate=now;
        if(values.accountName){
          searchParams.accountName=values.accountName;
        }
        if(values.postingDate){
          searchParams.startDate=values.postingDate[0]?values.postingDate[0].format('YYYY-MM-DD'):"";
          searchParams.endDate=values.postingDate[1]?values.postingDate[1].format('YYYY-MM-DD'):"";
        }
        if(values.approval){
          searchParams.approval=values.approval;
        }
        if(values.hzeroId){
          searchParams.hzeroId=values.hzeroId;
        }
        if(values.policyNumber){
          searchParams.policyNumber=values.policyNumber;
        }
        if(values.requestId){
          searchParams.requestId=values.requestId;
        }
        if(values.takeEffect){
          searchParams.takeEffect=values.takeEffect;
        }
        search(searchParams);
      }
    });
    if(this.state.id!==9&&this.state.inheritRoleId!==9) {
      this.props.form.resetFields("accountName");
    }
  }

  render() {
    const {saleContract: {parent=[]}}=this.props;
    if(parent[0]!==undefined) {
      const {id, inheritRoleId}=parent[0];
      this.setState({
        id,
        inheritRoleId,
      });
    }
    const { accountName } = {
      accountName: getCurrentUser().realName,
    };
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <Form.Item label={intl.get('hzeroId').d('流程编号')}>
              {getFieldDecorator('hzeroId', {initialValue: ""})(<Input defaultValue="" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={intl.get('accountName').d('申请人')}>
              {getFieldDecorator('accountName', {initialValue: accountName})(<Input disabled={this.state.id!==9&&this.state.inheritRoleId!==9} />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={intl.get('requestId').d('OA流程编号')}>
              {getFieldDecorator('requestId', {initialValue: ""})(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item label={intl.get('policyNumber').d('优惠政策编号')}>
              {getFieldDecorator('policyNumber', {initialValue: ""})(<Input />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <FormItem
              label={intl
                .get('takeEffect')
                .d('是否生效')}
            >
              {getFieldDecorator('takeEffect', {
                initialValue: "",
              })(
                <Select
                  style={{ width: '60px' }}
                  allowClear
                >
                  <Option value="true">是</Option>
                  <Option value="false">否</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button icon="up-square" type="primary" onClick={this.fetchData}>
                {intl.get('select').d('查询')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label={intl.get('approval').d('审批状态')}
            >
              {getFieldDecorator('approval', {
                initialValue: "",
              })(
                <Select
                  allowClear
                  style={{ width: 150 }}
                  placeholder="请选择审批状态"
                >
                  <Option value="00">无审批</Option>
                  <Option value="01">进行中</Option>
                  <Option value="02">批准</Option>
                  <Option value="03">拒绝</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem
              label={intl.get('postingDate').d('申请日期(日期范围)')}
            >
              {getFieldDecorator('postingDate', {
              })(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
