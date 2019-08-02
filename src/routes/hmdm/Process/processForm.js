import React, { PureComponent } from 'react';
import intl from 'utils/intl';
import moment from 'moment';
import { getCurrentUser } from 'hzero-front/lib/utils/utils';
import { Form, Row, Col, Input, InputNumber, DatePicker } from 'hzero-ui';
import { digitUppercase } from '../../../utils/numberUtil';


export default class ProcessForm extends PureComponent{
  render() {
    const formLayout = {
      labelCol: {
        span: 9,
      },
      wrapperCol: {
        span: 13,
      },
    };
    const { accountName, applicationDate } = {
      accountName: getCurrentUser().realName,
      applicationDate: moment().format('YYYY/MM/DD'),
    };
    const {form}=this.props;
    const { RangePicker } = DatePicker;
    const attr2C = digitUppercase(this.props.form.getFieldValue('attr2'), 3);
    const attr3C = digitUppercase(this.props.form.getFieldValue('attr3'), 2);
    return(
      <React.Fragment>
        <Row type="flex">
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('HZEROID').d('流程编号')}>
              <Input value='1111' readOnly />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('Status').d('审批状态')}>
              <Input value='批准' readOnly />
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
              <Input value='00001' readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr2').d('优惠合同总数量封顶值')}
            >
              {form.getFieldDecorator('attr2', { rules: [{ required: true, message: '必填' }] })(
                <InputNumber min={0} precision={3} />
              )}
              <span className="ant-form-text">{attr2C}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr3').d('优惠合同总金额封顶值')}
            >
              {form.getFieldDecorator('attr3', { rules: [{ required: true, message: '必填' }] })(
                <InputNumber min={0} precision={2} />
              )}
              <span className="ant-form-text"> {attr3C}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formLayout}
              label={intl.get('leida.sale.policy.attr4').d('优惠政策有效期间')}
            >
              {form.getFieldDecorator('attr4', { rules: [{ required: true, message: '必填' }] })(
                <RangePicker allowClear />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={8}>
            <Form.Item {...formLayout} label={intl.get('isEffect').d('是否生效')}>
              <Input value='是' readOnly />
            </Form.Item>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
