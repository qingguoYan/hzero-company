import React, { PureComponent } from 'react';
import intl from 'utils/intl';
import moment from 'moment';
import { Form, Row, Col, Input, DatePicker } from 'hzero-ui';


export default class ProcessForm extends PureComponent{

  constructor(props){
    super(props);
    const {hzeroId}=this.props.location.state;
    this.state={hzeroId};
  }

  componentDidMount() {
    const {dispatch}=this.props;
    const {hzeroId}=this.state;
    dispatch({
      type: 'process/getData',
      payload: hzeroId,
    });
  }

  render() {
    const { hzeroId, approval, policyNumber, startDate, endDate, takeEffect, amountLimit, salesLimit, salesLimitCap, amountLimitCap, accountName, applicationDate }=this.props.process;
    const map={'00': '无审批', '01': '进行中', '02': '批准', '03': '拒绝'};
    const dateStart=moment(startDate);
    const dateEnd=moment(endDate);
    const formLayout = {
      labelCol: {
        span: 9,
      },
      wrapperCol: {
        span: 13,
      },
    };
    const {form}=this.props;
    const { RangePicker } = DatePicker;
    return(
      <React.Fragment>
        <Row type="flex">
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('HZEROID').d('流程编号')}>
              <Input value={hzeroId} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('Status').d('审批状态')}>
              <Input value={map[approval]} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.accountName').d('申请人')}
            >
              <Input value={accountName} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.applicationDate').d('申请日期')}
            >
              <Input value={applicationDate} readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr1').d('优惠政策编号')}
            >
              <Input value={policyNumber} readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr2').d('优惠合同总数量封顶值')}
            >
              <Input value={amountLimit} readOnly />
              <span className="ant-form-text">{amountLimitCap}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr3').d('优惠合同总金额封顶值')}
            >
              <Input value={salesLimit} readOnly />
              <span className="ant-form-text"> {salesLimitCap}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr4').d('优惠政策有效期间')}
            >
              {form.getFieldDecorator('attr4', {initialValue: [dateStart, dateEnd]})(
                <RangePicker />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('isEffect').d('是否生效')}>
              <Input value={takeEffect?"是":"否"} readOnly />
            </Form.Item>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
