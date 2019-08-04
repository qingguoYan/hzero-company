import React from 'react';
import { Form, Button, Row, Col, Select, Input, DatePicker } from 'hzero-ui';
import intl from 'hzero-front/lib/utils/intl';
import { Bind } from 'lodash-decorators';
import { getCurrentUser } from 'hzero-front/lib/utils/utils';
import moment from 'moment';

const FormItem=Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create({ fieldNameProp: null })
export default class FilterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // accountName: '', // 申请人
      // applicationDate: '', // 申请日期
      // approval: '', // 审批状态
      // endDate: '', // 结束日期
      // hzeroId: '', // 流程编号
      // policyNumber: '', // 优惠政策编号
      // requestId: '', // OA流程编号
      // startDate: '', // 开始日期
      // takeEffect: '', // 是否生效
    };
  }

  // 判定日期的范围
  @Bind()
  handleData=(time)=>{
    if(!time){
      return false;
    }else {
        return time<moment(new Date('20190701'))||time>moment(new Date('20190731'));
    }
};


  @Bind()
  fetchData() {
    const { form, search } = this.props;
    // const { accountName, applicationDate, approval, endDate, hzeroId, policyNumber, requestId, startDate, takeEffect } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const searchParams={};
        if(values.accountName){
          searchParams.accountName=values.accountName;
        }
        if(values.applicationDate){
          searchParams.applicationDate=values.applicationDate;
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
  }

  render() {
    const passData=moment('20190701');
    const nowData=moment('20190731');
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
              {getFieldDecorator('accountName', {initialValue: accountName})(<Input defaultValue={accountName} />)}
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
            <Form.Item label={intl.get('policyNumber').d('优惠政策编码')}>
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
                initialValue: "true",
              })(
                <Select
                  style={{ width: '90%' }}
                  onChange={this.handleCurrencyChange}
                  defaultValue="true"
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
                initialValue: "approve",
              })(
                <Select
                  style={{ width: '100%' }}
                  onChange={this.handleCurrencyChange}
                  defaultValue="approve"
                >
                  <Option value="approve">批准</Option>
                  <Option value="reject">拒绝</Option>
                  <Option value="underway">进行中</Option>
                  <Option value="noApproval">无审批</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem
              label={intl.get('applicationDate').d('申请日期(日期范围)')}
            >
              {getFieldDecorator('applicationDate', {
                initialValue: [passData, nowData],
              })(
                <RangePicker disabledDate={this.handleData} defaultValue={[passData, nowData]} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
