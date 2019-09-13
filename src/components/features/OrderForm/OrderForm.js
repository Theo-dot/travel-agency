/* eslint-disable linebreak-style */
import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';

const OrderForm = props =>
  <Row>
    <Col xs={12}>
      <OrderSummary price={props.tripCost} options={props.options} />
    </Col>
  </Row>;

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
};

export default OrderForm;
